<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$modulos = App\Models\Modulo::orderBy('nivel')->orderBy('id')->get();
foreach ($modulos as $m) {
    echo $m->id . ': ' . $m->codigo . " (nivel: " . $m->nivel . ")\n";
}
