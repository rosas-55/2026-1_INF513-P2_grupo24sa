<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$propietario = App\Models\Role::where('nombre', 'PROPIETARIO')->first();
echo "Role ID: " . $propietario->id . "\n";
foreach ($propietario->modulos as $m) {
    echo $m->id . ': ' . $m->codigo . " (estado: " . $m->estado . ")\n";
}
