<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Verifica que el usuario tenga una acción específica sobre un módulo.
 *
 * Uso: Route::middleware(['auth', 'acceso:PRODUCTOS,VER'])->group(...)
 *       Route::middleware(['auth', 'acceso:VENTAS,CREAR'])->group(...)
 */
class AccesoMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(Request):Response  $next
     * @param  string  $moduloCodigo  Código del módulo (ej: 'PRODUCTOS')
     * @param  string  $accionCodigo  Código de la acción (ej: 'VER', 'CREAR', 'EDITAR', 'ELIMINAR')
     */
    public function handle(Request $request, Closure $next, string $moduloCodigo, string $accionCodigo): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401, 'No autenticado.');
        }

        // Obtener los IDs de los roles del usuario
        $roleIds = $user->roles()->pluck('role_id');

        // Verificar si alguno de sus roles tiene esta acción en este módulo
        $tieneAcceso = \App\Models\Modulo::query()
            ->join('role_modulo', 'modulo.id', '=', 'role_modulo.modulo_id')
            ->join('accion', 'modulo.id', '=', 'accion.modulo_id')
            ->where('modulo.codigo', $moduloCodigo)
            ->where('accion.codigo', $accionCodigo)
            ->where('accion.estado', 'ACTIVO')
            ->where('modulo.estado', 'ACTIVO')
            ->whereIn('role_modulo.role_id', $roleIds)
            ->exists();

        if (! $tieneAcceso) {
            abort(403, "No tienes permiso para {$accionCodigo} en {$moduloCodigo}.");
        }

        return $next($request);
    }
}
