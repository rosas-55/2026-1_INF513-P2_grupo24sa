<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = App\Models\User::first();
if (!$user) {
    echo "No user\n";
    exit;
}
try {
    $res = App\Models\TemaUsuario::updateOrCreate(
        ['user_id' => $user->id],
        [
            'tema' => 'adultos',
            'modo' => 'noche',
            'tamano_letra' => 'large',
            'alto_contraste' => true,
            'updated_at' => now()
        ]
    );
    echo "Success: \n";
    print_r($res->toArray());
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
