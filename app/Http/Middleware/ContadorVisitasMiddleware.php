<?php

namespace App\Http\Middleware;

use App\Models\ContadorVisitas;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Incrementa el contador de visitas para cada página Inertia (FASE 10).
 * El contador se muestra en el footer de cada página.
 */
class ContadorVisitasMiddleware
{
    /**
     * Rutas que NO se contabilizan (assets, debug, api, etc.).
     */
    private const EXCLUIDAS = [
        '_debugbar',
        '_ignition',
        'api',
        'build',
        'vendor',
        'sanctum',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        if ($this->esContabilizable($request)) {
            $ruta         = '/' . trim($request->path(), '/');
            $nombrePagina = $request->route()?->getName() ?? $ruta;

            // Incrementar contador (atomic update-or-create)
            $contador = ContadorVisitas::firstOrCreate(
                ['ruta' => $ruta],
                ['nombre_pagina' => $nombrePagina]
            );

            $contador->increment('total_visitas');
            $contador->touch('updated_at');

            // Pasar el total al request ANTES de generar la vista Inertia
            $request->attributes->set('visitas', $contador->total_visitas);
        } else {
            // Si es un POST o algo no contabilizable, al menos mandamos las visitas actuales
            $ruta = '/' . trim($request->path(), '/');
            $contador = ContadorVisitas::where('ruta', $ruta)->first();
            $request->attributes->set('visitas', $contador ? $contador->total_visitas : 0);
        }

        return $next($request);
    }

    private function esContabilizable(Request $request): bool
    {
        // Solo peticiones GET (vistas de página, no POST/PATCH/DELETE)
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
        if (preg_match('/\.(css|js|ico|png|jpg|jpeg|gif|svg|woff|woff2|map|txt|xml)$/i', $path)) {
            return false;
        }

        // Excluir raíz (welcome page no autenticada)
        if ($path === '/') {
            return false;
        }

        return true;
    }
}
