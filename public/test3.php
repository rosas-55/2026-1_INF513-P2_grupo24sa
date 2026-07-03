<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$columns = \Illuminate\Support\Facades\Schema::getColumnListing('tema_usuario');
echo "Columns:\n";
print_r($columns);

foreach($columns as $col) {
    $type = \Illuminate\Support\Facades\Schema::getColumnType('tema_usuario', $col);
    echo "$col : $type\n";
}
