<!DOCTYPE html>
@php
    $modoActual = $page['props']['tema']['modo'] ?? 'dia';
@endphp
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    class="{{ $modoActual === 'noche' ? 'dark' : '' }}"
    style="color-scheme: {{ $modoActual === 'noche' ? 'dark' : 'light' }}"
    data-theme="{{ $page['props']['tema']['tema'] ?? 'jovenes' }}"
    data-modo="{{ $modoActual }}"
    data-font-size="{{ $page['props']['tema']['tamano_letra'] ?? 'normal' }}"
    data-high-contrast="{{ ($page['props']['tema']['alto_contraste'] ?? false) ? 'true' : 'false' }}"
>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="{{ $modoActual === 'noche' ? '#1a1530' : '#6366F1' }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts: Figtree (base) + 3 theme fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600|nunito:400,500,600,700|inter:400,500,600,700|lora:400,500,600,700&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
