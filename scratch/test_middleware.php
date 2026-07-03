<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = \App\Models\User::where('name', 'Propietario')->first();
$middleware = new \App\Http\Middleware\HandleInertiaRequests();
$reflection = new \ReflectionClass($middleware);
$method = $reflection->getMethod('getMenu');
$method->setAccessible(true);

$fakeRequest = \Illuminate\Http\Request::create('/dashboard', 'GET');
$fakeRequest->setUserResolver(function() use ($user) { return $user; });

$menu = $method->invoke($middleware, $fakeRequest);
echo json_encode($menu, JSON_PRETTY_PRINT);
