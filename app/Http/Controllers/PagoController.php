<?php

namespace App\Http\Controllers;

use App\Services\PagoFacilService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function __construct(private readonly PagoFacilService $pagoFacil) {}

    /**
     * Polling del estado de un pago QR.
     * Reemplaza al callback que PagoFácil no entrega.
     *
     * GET /pagos/{transactionId}/status
     */
    public function status(Request $request, string $transactionId): JsonResponse
    {
        try {
            // Bug fix: consultarTransaccion() espera int, la ruta entrega string
            $info = $this->pagoFacil->consultarTransaccion((int) $transactionId);
        } catch (\Throwable $e) {
            return response()->json([
                'error'         => $e->getMessage(),
                'transactionId' => (int) $transactionId,
                'paid'          => false,
            ], 502);
        }

        $values = $info['values'] ?? [];
        $paymentStatus = (int) ($values['paymentStatus'] ?? 0);

        return response()->json([
            'transactionId'            => (int) $transactionId,
            'paymentStatus'            => $paymentStatus,
            'paymentStatusDescription' => $values['paymentStatusDescription'] ?? 'DESCONOCIDO',
            // Bug fix: paymentStatus 5 = "Revisión" (QR confirmado por banco), NO 2
            'paid'                     => $this->pagoFacil->estaPagada($info),
            'amount'                   => (float) ($values['amount'] ?? 0),
            'paymentDate'              => $values['paymentDate'] ?? null,
            'paymentTime'              => $values['paymentTime'] ?? null,
        ]);
    }
}
