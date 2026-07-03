<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    $v = App\Models\Venta::where('estado', 'PENDIENTE')->first();
    if ($v) {
        $controller = app()->make(App\Http\Controllers\VentaController::class);
        $controller->destroy($v);
        echo "SUCCESS\n";
    } else {
        echo "NO_VENTA\n";
    }
} catch (\Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
