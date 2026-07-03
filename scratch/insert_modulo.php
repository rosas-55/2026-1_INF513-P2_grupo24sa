<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Modulo;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

try {
    DB::transaction(function () {
        // Insert module if doesn't exist
        $modulo = Modulo::firstOrCreate(
            ['codigo' => 'USUARIOS'],
            ['name' => 'Usuarios', 'nivel' => 10, 'estado' => 'ACTIVO'] // Nivel 10 or similar
        );

        // Assign to PROPIETARIO role
        $propietario = Role::where('nombre', 'PROPIETARIO')->first();
        if ($propietario) {
            $propietario->modulos()->syncWithoutDetaching([$modulo->id]);
        }

        echo "Modulo USUARIOS creado y asignado al PROPIETARIO exitosamente.\n";
    });
} catch (\Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
