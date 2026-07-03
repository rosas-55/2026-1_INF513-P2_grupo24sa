<?php
$content = file_get_contents(__DIR__ . '/../resources/css/app.css');
$content = substr($content, 0, 20686);
file_put_contents(__DIR__ . '/../resources/css/app.css', $content);
