<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

/**
 * Cliente HTTP para la API PagoFácil v2 (Bolivia).
 *
 * Flujo:
 *   1. autenticar() → obtener accessToken (cacheado)
 *   2. generarQr()  → crear orden y obtener QR en Base64
 *   3. consultarTransaccion() → verificar si ya se pagó
 *   4. Callback webhook → PagoFácil notifica pago completado
 *
 * Documentación: https://masterqr.pagofacil.com.bo/api/services/v2
 */
class PagoFacilService
{
    private string $baseUrl;
    private string $tokenService;
    private string $tokenSecret;
    private string $commerceId;
    private string $callbackUrl;
    private int $timeout;
    private int $retryTimes;
    private int $retrySleep;
    private bool $verifySsl;

    /** Clave de caché para el access token. */
    private const TOKEN_CACHE_KEY = 'pagofacil.access_token';

    public function __construct()
    {
        $config = config('services.pagofacil');

        $this->baseUrl      = $config['base_url'];
        $this->tokenService = $config['token_service'] ?? '';
        $this->tokenSecret  = $config['token_secret'] ?? '';
        $this->commerceId   = $config['commerce_id'] ?? '';
        $this->callbackUrl  = $config['callback_url'] ?? '';
        $this->timeout      = $config['timeout'];
        $this->retryTimes   = $config['retry_times'];
        $this->retrySleep   = $config['retry_sleep'];
        $this->verifySsl    = (bool) ($config['verify_ssl'] ?? true);
    }

    /**
     * Configura el cliente HTTP respetando `verify_ssl`.
     */
    private function http(): \Illuminate\Http\Client\PendingRequest
    {
        $http = Http::timeout($this->timeout)
            ->retry($this->retryTimes, $this->retrySleep);

        if (! $this->verifySsl) {
            $http = $http->withoutVerifying();
        }

        return $http;
    }

    // ═══════════════════════════════════════════════════════════
    // AUTENTICACIÓN
    // ═══════════════════════════════════════════════════════════

    /**
     * Obtiene el access token (cacheado o nuevo).
     *
     * @throws RuntimeException Si falla la autenticación.
     */
    public function getAccessToken(): string
    {
        return Cache::remember(
            self::TOKEN_CACHE_KEY,
            now()->addMinutes(50), // margen de seguridad sobre los ~60 min reales
            fn (): string => $this->authenticate()
        );
    }

    /**
     * Autentica contra la API y devuelve un nuevo token.
     *
     * @throws RuntimeException
     */
    private function authenticate(): string
    {
        try {
            $response = $this->http()
                ->withHeaders([
                    'tcTokenSecret'  => $this->tokenSecret,
                    'tcTokenService' => $this->tokenService,
                ])
                ->post("{$this->baseUrl}/login")
                ->throw();
        } catch (RequestException $e) {
            Log::error('PagoFácil — Error de autenticación', [
                'status' => $e->response->status(),
                'body'   => $e->response->body(),
            ]);
            throw new RuntimeException(
                'No se pudo autenticar con PagoFácil. Verifique las credenciales.'
            );
        } catch (ConnectionException $e) {
            Log::error('PagoFácil — Error de conexión al autenticar', [
                'message' => $e->getMessage(),
            ]);
            throw new RuntimeException(
                'No se puede conectar con PagoFácil en este momento. Intente más tarde.'
            );
        }

        $data = $response->json();

        $token = $data['values']['accessToken'] ?? null;

        if (empty($token)) {
            Log::error('PagoFácil — Token no recibido en respuesta', ['response' => $data]);
            throw new RuntimeException('Respuesta inesperada de PagoFácil al autenticar.');
        }

        // Cacheamos explícitamente con el TTL que indica la API
        $ttlMinutes = (int) ($data['values']['expiresInMinutes'] ?? 60);

        Cache::put(self::TOKEN_CACHE_KEY, $token, now()->addMinutes($ttlMinutes - 2));

        return $token;
    }

    /**
     * Fuerza la renovación del token (útil si se recibe 401).
     */
    public function refreshToken(): string
    {
        Cache::forget(self::TOKEN_CACHE_KEY);

        return $this->getAccessToken();
    }

    // ═══════════════════════════════════════════════════════════
    // MÉTODOS DE PAGO HABILITADOS
    // ═══════════════════════════════════════════════════════════

    /**
     * Lista los métodos de pago QR habilitados para el comercio.
     *
     * @return array{error: int, status: int, message: string, values: array<int, array<string, mixed>>}
     *
     * @throws RuntimeException
     */
    public function listarMetodosHabilitados(): array
    {
        return $this->sendAuthenticated('POST', '/list-enabled-services');
    }

    // ═══════════════════════════════════════════════════════════
    // GENERACIÓN DE QR
    // ═══════════════════════════════════════════════════════════

    /**
     * Genera un código QR de pago.
     *
     * @param array{
     *     paymentMethod: int,
     *     clientName: string,
     *     documentType: int,
     *     documentId: string,
     *     phoneNumber: string,
     *     email: string,
     *     clientCode: string,
     *     paymentNumber: string,
     *     amount: float,
     *     currency: int,
     *     orderDetail: array<int, array{serial: int, product: string, quantity: int, price: float, discount: float, total: float}>,
     * } $payload
     *
     * @return array{error: int, status: int, message: string, values: array<string, mixed>}
     *
     * @throws RuntimeException
     */
    public function generarQr(array $payload): array
    {
        $payload['callbackUrl'] = $this->callbackUrl;
        $payload['clientCode'] = $this->commerceId;

        return $this->sendAuthenticated('POST', '/generate-qr', $payload);
    }

    // ═══════════════════════════════════════════════════════════
    // CONSULTA DE TRANSACCIÓN
    // ═══════════════════════════════════════════════════════════

    /**
     * Consulta el estado de una transacción.
     *
     * @param int|null    $pagoFacilTransactionId  ID interno de PagoFácil
     * @param string|null $companyTransactionId   ID de la empresa (paymentNumber)
     *
     * @return array{error: int, status: int, message: string, values: array<string, mixed>}
     *
     * @throws RuntimeException
     */
    public function consultarTransaccion(
        ?int $pagoFacilTransactionId = null,
        ?string $companyTransactionId = null
    ): array {
        if (empty($pagoFacilTransactionId) && empty($companyTransactionId)) {
            throw new RuntimeException(
                'Debe proporcionar pagofacilTransactionId o companyTransactionId.'
            );
        }

        $payload = [];

        if ($pagoFacilTransactionId) {
            $payload['pagofacilTransactionId'] = $pagoFacilTransactionId;
        } else {
            $payload['companyTransactionId'] = $companyTransactionId;
        }

        return $this->sendAuthenticated('POST', '/query-transaction', $payload);
    }

    /**
     * Determina si una transacción ya fue pagada a partir de la respuesta
     * de consultarTransaccion().
     *
     * PagoFácil devuelve paymentStatus = 5 ("Revisión") cuando el banco
     * confirmó el débito al cliente y el pago está en proceso de acreditación.
     *
     * Ejemplo de respuesta pagada:
     *   { "error": 0, "status": 2008, "values": { "paymentStatus": 5, ... } }
     *
     * @param  array<string, mixed> $respuestaConsulta  Resultado de consultarTransaccion()
     */
    public function estaPagada(array $respuestaConsulta): bool
    {
        // ponytail: paymentStatus 5 = "Revisión" (único estado de pago confirmado conocido)
        return ($respuestaConsulta['values']['paymentStatus'] ?? null) === 5;
    }

    // ═══════════════════════════════════════════════════════════
    // HTTP INTERNO
    // ═══════════════════════════════════════════════════════════

    /**
     * Envía una petición autenticada a la API.
     *
     * @param  string               $method  HTTP method (POST, GET)
     * @param  string               $endpoint Ruta relativa (ej: /generate-qr)
     * @param  array<string, mixed> $payload  Cuerpo JSON (opcional)
     * @return array<string, mixed>          Respuesta decodificada
     *
     * @throws RuntimeException
     */
    private function sendAuthenticated(string $method, string $endpoint, array $payload = []): array
    {
        $token = $this->getAccessToken();

        try {
            $response = $this->http()
                ->withToken($token)
                ->send($method, "{$this->baseUrl}{$endpoint}", [
                    'json' => $payload,
                ])
                ->throw();
        } catch (RequestException $e) {
            $statusCode = $e->response->status();

            // Si el token expiró, lo renovamos y reintentamos UNA vez
            if ($statusCode === 401) {
                Log::warning('PagoFácil — Token expirado, renovando...');
                Cache::forget(self::TOKEN_CACHE_KEY);
                $token = $this->getAccessToken();

                $response = $this->http()
                    ->withToken($token)
                    ->send($method, "{$this->baseUrl}{$endpoint}", [
                        'json' => $payload,
                    ])
                    ->throw();
            } else {
                Log::error("PagoFácil — Error en {$endpoint}", [
                    'status' => $statusCode,
                    'body'   => $e->response->body(),
                ]);
                throw new RuntimeException(
                    "Error al comunicarse con PagoFácil ({$endpoint}): HTTP {$statusCode}"
                );
            }
        } catch (ConnectionException $e) {
            Log::error("PagoFácil — Error de conexión en {$endpoint}", [
                'message' => $e->getMessage(),
            ]);
            throw new RuntimeException(
                'No se puede conectar con PagoFácil en este momento. Intente más tarde.'
            );
        }

        return $response->json();
    }

    // ═══════════════════════════════════════════════════════════
    // VERIFICACIÓN DE CALLBACK (Webhook)
    // ═══════════════════════════════════════════════════════════

    /**
     * Procesa el payload recibido en el webhook de PagoFácil.
     *
     * Estructura esperada:
     * {
     *     "PedidoID": "string",
     *     "Fecha": "string",
     *     "Hora": "string",
     *     "MetodoPago": "string",
     *     "Estado": "string"
     * }
     *
     * @param  array<string, string> $payload
     * @return array{success: bool, pedidoId: string, estado: string}
     */
    public function procesarCallback(array $payload): array
    {
        $pedidoId   = $payload['PedidoID'] ?? null;
        $estado     = $payload['Estado'] ?? 'DESCONOCIDO';
        $fecha      = $payload['Fecha'] ?? '';
        $hora       = $payload['Hora'] ?? '';
        $metodoPago = $payload['MetodoPago'] ?? '';

        Log::info('PagoFácil — Callback recibido', [
            'PedidoID'   => $pedidoId,
            'Estado'     => $estado,
            'Fecha'      => $fecha,
            'Hora'       => $hora,
            'MetodoPago' => $metodoPago,
        ]);

        return [
            'success'   => true,
            'pedidoId'  => $pedidoId,
            'estado'    => $estado,
        ];
    }

    /**
     * Respuesta estándar que PagoFácil espera del comercio al recibir un callback.
     *
     * @return array{error: int, status: int, message: string, values: true}
     */
    public function respuestaCallbackExitosa(): array
    {
        return [
            'error'   => 0,
            'status'  => 1,
            'message' => 'Callback procesado correctamente',
            'values'  => true,
        ];
    }
}
