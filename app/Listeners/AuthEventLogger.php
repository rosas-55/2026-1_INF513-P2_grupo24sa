<?php

namespace App\Listeners;

use App\Models\Bitacora;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Request;

/**
 * Registra en bitácora los intentos de login exitosos y fallidos.
 */
class AuthEventLogger
{
    /**
     * Login exitoso.
     */
    public function handleLogin(Login $event): void
    {
        if (! env('BITACORA_ACTIVATE', true)) {
            return;
        }

        Bitacora::create([
            'user_id'    => $event->user->id,
            'tipo'       => Bitacora::TIPO_LOGIN_OK,
            'recurso'    => 'login',
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
            'datos_extra' => json_encode([
                'email' => $event->user->email,
                'guard' => $event->guard,
            ]),
        ]);
    }

    /**
     * Login fallido.
     */
    public function handleFailed(Failed $event): void
    {
        if (! env('BITACORA_ACTIVATE', true)) {
            return;
        }

        Bitacora::create([
            'user_id'    => null, // fallido — no hay usuario autenticado
            'tipo'       => Bitacora::TIPO_LOGIN_FAIL,
            'recurso'    => 'login',
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
            'datos_extra' => json_encode([
                'email'  => $event->credentials['email'] ?? 'desconocido',
                'guard'  => $event->guard,
            ]),
        ]);
    }
}
