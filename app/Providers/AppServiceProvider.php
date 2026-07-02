<?php

namespace App\Providers;

use App\Listeners\AuthEventLogger;
use App\Services\PagoFacilService;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // PagoFácil — singleton para reutilizar token cacheado
        $this->app->singleton(PagoFacilService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Registrar listener de bitácora para login OK y fallido
        $logger = new AuthEventLogger();

        Event::listen(Login::class, fn (Login $event) => $logger->handleLogin($event));
        Event::listen(Failed::class, fn (Failed $event) => $logger->handleFailed($event));
    }
}
