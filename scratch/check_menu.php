<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$u = App\Models\User::first();
echo "User: " . $u->name . "\n";

$roleIds = $u->roles()->pluck('role_id');
echo "Roles: " . json_encode($roleIds) . "\n";

$modulos = App\Models\Modulo::query()
    ->select(['modulo.id', 'modulo.name', 'modulo.codigo', 'modulo.nivel'])
    ->join('role_modulo', 'modulo.id', '=', 'role_modulo.modulo_id')
    ->whereIn('role_modulo.role_id', $roleIds)
    ->where('modulo.estado', 'ACTIVO')
    ->orderBy('modulo.nivel')
    ->orderBy('modulo.id')
    ->get();

foreach ($modulos as $m) {
    echo $m->codigo . "\n";
}
