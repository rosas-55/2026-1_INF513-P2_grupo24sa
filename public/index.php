<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$request = Illuminate\Http\Request::capture();

echo "<pre>";
echo "URL: " . $request->url() . "\n";
echo "BaseUrl: " . $request->getBaseUrl() . "\n";
echo "PathInfo: " . $request->getPathInfo() . "\n";
echo "Method: " . $request->method() . "\n";
echo "</pre>";
exit;

