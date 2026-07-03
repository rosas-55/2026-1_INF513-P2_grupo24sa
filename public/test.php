<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$request = Illuminate\Http\Request::capture();

echo "<pre>";
echo "URL: " . $request->url() . "\n";
echo "BaseUrl: " . $request->getBaseUrl() . "\n";
echo "PathInfo: " . $request->getPathInfo() . "\n";
echo "Method: " . $request->method() . "\n";
echo "</pre>";
