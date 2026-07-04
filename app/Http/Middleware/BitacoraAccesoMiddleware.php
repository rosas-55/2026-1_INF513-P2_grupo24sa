<?php

namespace App\Http\Middleware;

use App\Models\Bitacora;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Registra en bitácora cada acceso a páginas Inertia (recursos más accedidos).
 */
class BitacoraAccesoMiddleware
{
    /**
     * Rutas que NO se registran (assets, debug, etc.).
     */
    private const EXCLUIDAS = [
        '_debugbar',
        '_ignition',
        'api',
        'build',
        'vendor',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Respetar flag de activación (evita saturar BD remota en desarrollo)
        if (! env('BITACORA_ACTIVATE', true)) {
            return $response;
        }

        // Solo registrar peticiones Inertia (vistas de página, no assets)
        if (! $this->esRegistrable($request)) {
            return $response;
        }

        $user = $request->user();

        Bitacora::create([
            'user_id'    => $user?->id,
            'tipo'       => Bitacora::TIPO_ACCESO_RECURSO,
            'recurso'    => $request->path(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'datos_extra' => json_encode([
                'method'     => $request->method(),
                'route_name' => $request->route()?->getName(),
                'user_name'  => $user?->name,
            ]),
        ]);

        return $response;
    }

    private function esRegistrable(Request $request): bool
    {
        // Solo peticiones GET a páginas (no assets)
        if ($request->method() !== 'GET') {
            return false;
        }

        $path = $request->path();

        // Excluir rutas de sistema
        foreach (self::EXCLUIDAS as $palabra) {
            if (str_starts_with($path, $palabra)) {
                return false;
            }
        }

        // Excluir archivos estáticos
        if (preg_match('/\.(css|js|ico|png|jpg|jpeg|gif|svg|woff|woff2|map)$/i', $path)) {
            return false;
        }

        return true;
    }
}
