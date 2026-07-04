<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | PagoFácil — Servicio de Cobro QR (Bolivia)
    |--------------------------------------------------------------------------
    |
    | Credenciales y configuración de la API PagoFácil v2.
    | Documentación: https://masterqr.pagofacil.com.bo/api/services/v2
    |
    */
    'pagofacil' => [
        'base_url'      => env('PAGOFACIL_BASE_URL', 'https://masterqr.pagofacil.com.bo/api/services/v2'),
        'token_service' => env('PAGOFACIL_TOKEN_SERVICE'),
        'token_secret'  => env('PAGOFACIL_TOKEN_SECRET'),
        'commerce_id'   => env('COMMERCE_ID'),
        'callback_url'  => env('PAGOFACIL_CALLBACK_URL'),
        'timeout'       => (int) env('PAGOFACIL_TIMEOUT', 30),
        'retry_times'   => (int) env('PAGOFACIL_RETRY_TIMES', 2),
        'retry_sleep'   => (int) env('PAGOFACIL_RETRY_SLEEP', 500), // ms
        // ponytail: SSL verify off por defecto fuera de producción; cURL en Windows local
        // muchas veces no trae el bundle de CA. Producción siempre verifica.
        'verify_ssl'    => filter_var(env('PAGOFACIL_VERIFY_SSL', config('app.env') === 'production'), FILTER_VALIDATE_BOOLEAN),
    ],

];
