<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\BitacoraAccesoMiddleware::class,
            \App\Http\Middleware\ContadorVisitasMiddleware::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role'   => \App\Http\Middleware\RoleMiddleware::class,
            'acceso' => \App\Http\Middleware\AccesoMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException $e) {
            echo "<pre>";
            echo "Exception: " . get_class($e) . "\n";
            echo "Message: " . $e->getMessage() . "\n";
            echo "File: " . $e->getFile() . " on line " . $e->getLine() . "\n";
            echo "Trace:\n" . $e->getTraceAsString() . "\n";
            echo "</pre>";
            exit;
        });
        
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );
    })->create();
