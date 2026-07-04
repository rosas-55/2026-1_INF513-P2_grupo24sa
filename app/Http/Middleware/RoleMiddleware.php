<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Verifica que el usuario autenticado tenga al menos uno de los roles indicados.
 *
 * Uso en rutas:
 *   Route::middleware(['auth', 'role:PROPIETARIO,VENDEDOR'])->group(...)
 */
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(Request):Response  $next
     * @param  string  ...$roles  Nombres de rol permitidos (separados por coma)
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401, 'No autenticado.');
        }

        // Si no se especifican roles, se permite el paso (solo verifica auth)
        if (empty($roles)) {
            return $next($request);
        }

        // Cargar los nombres de los roles del usuario desde la BD
        $userRoles = $user->roles()->pluck('nombre')->toArray();

        // Verificar intersección: al menos un rol coincide
        $allowed = array_intersect($roles, $userRoles);

        if (empty($allowed)) {
            abort(403, 'No tienes permisos para acceder a este recurso.');
        }

        return $next($request);
    }
}
