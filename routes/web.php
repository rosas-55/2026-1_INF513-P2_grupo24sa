<?php

use App\Http\Controllers\BusquedaController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\CuotaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InsumoController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\ProduccionController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\RecetaController;
use App\Http\Controllers\TemaController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\SeguridadController;
use App\Http\Controllers\BitacoraController;
use App\Http\Controllers\ReporteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

// Perfil
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ═══════════════════════════════════════════════════════════
// MÓDULOS DEL NEGOCIO (FASE 8)
// ═══════════════════════════════════════════════════════════

// Proveedores — solo PROPIETARIO
Route::middleware(['auth', 'role:PROPIETARIO'])->group(function () {
    Route::get('/proveedores', [ProveedorController::class, 'index'])->name('proveedores.index');
    Route::get('/proveedores/create', [ProveedorController::class, 'create'])->name('proveedores.create');
    Route::post('/proveedores', [ProveedorController::class, 'store'])->name('proveedores.store');
    Route::get('/proveedores/{proveedore}/edit', [ProveedorController::class, 'edit'])->name('proveedores.edit');
    Route::patch('/proveedores/{proveedore}', [ProveedorController::class, 'update'])->name('proveedores.update');
    Route::delete('/proveedores/{proveedore}', [ProveedorController::class, 'destroy'])->name('proveedores.destroy');
});

// Insumos — solo PROPIETARIO
Route::middleware(['auth', 'role:PROPIETARIO'])->group(function () {
    Route::get('/insumos', [InsumoController::class, 'index'])->name('insumos.index');
    Route::get('/insumos/create', [InsumoController::class, 'create'])->name('insumos.create');
    Route::post('/insumos', [InsumoController::class, 'store'])->name('insumos.store');
    Route::get('/insumos/{insumo}/edit', [InsumoController::class, 'edit'])->name('insumos.edit');
    Route::patch('/insumos/{insumo}', [InsumoController::class, 'update'])->name('insumos.update');
    Route::delete('/insumos/{insumo}', [InsumoController::class, 'destroy'])->name('insumos.destroy');
});

// Compras — solo PROPIETARIO
Route::middleware(['auth', 'role:PROPIETARIO'])->group(function () {
    Route::get('/compras', [CompraController::class, 'index'])->name('compras.index');
    Route::get('/compras/create', [CompraController::class, 'create'])->name('compras.create');
    Route::post('/compras', [CompraController::class, 'store'])->name('compras.store');
    Route::get('/compras/{compra}', [CompraController::class, 'show'])->name('compras.show');
    Route::delete('/compras/{compra}', [CompraController::class, 'destroy'])->name('compras.destroy');
});

// Inventario — solo PROPIETARIO
Route::middleware(['auth', 'role:PROPIETARIO'])->group(function () {
    Route::get('/inventario', [InventarioController::class, 'index'])->name('inventario.index');
    Route::get('/inventario/create', [InventarioController::class, 'create'])->name('inventario.create');
    Route::post('/inventario', [InventarioController::class, 'store'])->name('inventario.store');
});

// Productos — PROPIETARIO y VENDEDOR
Route::middleware(['auth', 'role:PROPIETARIO,VENDEDOR'])->group(function () {
    Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
    Route::get('/productos/create', [ProductoController::class, 'create'])->name('productos.create');
    Route::post('/productos', [ProductoController::class, 'store'])->name('productos.store');
    Route::get('/productos/{producto}/edit', [ProductoController::class, 'edit'])->name('productos.edit');
    Route::patch('/productos/{producto}', [ProductoController::class, 'update'])->name('productos.update');
    Route::delete('/productos/{producto}', [ProductoController::class, 'destroy'])->name('productos.destroy');
});

// Recetas — solo PROPIETARIO
Route::middleware(['auth', 'role:PROPIETARIO'])->group(function () {
    Route::get('/recetas', [RecetaController::class, 'index'])->name('recetas.index');
    Route::get('/recetas/create', [RecetaController::class, 'create'])->name('recetas.create');
    Route::post('/recetas', [RecetaController::class, 'store'])->name('recetas.store');
    Route::get('/recetas/{recetum}/edit', [RecetaController::class, 'edit'])->name('recetas.edit');
    Route::patch('/recetas/{recetum}', [RecetaController::class, 'update'])->name('recetas.update');
    Route::delete('/recetas/{recetum}', [RecetaController::class, 'destroy'])->name('recetas.destroy');
});

// Producción — solo PROPIETARIO
Route::middleware(['auth', 'role:PROPIETARIO'])->group(function () {
    Route::get('/produccion', [ProduccionController::class, 'index'])->name('produccion.index');
    Route::get('/produccion/create', [ProduccionController::class, 'create'])->name('produccion.create');
    Route::post('/produccion', [ProduccionController::class, 'store'])->name('produccion.store');
});

// Ventas — PROPIETARIO y VENDEDOR
Route::middleware(['auth', 'role:PROPIETARIO,VENDEDOR'])->group(function () {
    Route::get('/ventas', [VentaController::class, 'index'])->name('ventas.index');
    Route::get('/ventas/create', [VentaController::class, 'create'])->name('ventas.create');
    Route::post('/ventas', [VentaController::class, 'store'])->name('ventas.store');
    Route::post('/ventas/with-payment', [VentaController::class, 'storeWithPayment'])->name('ventas.store-with-payment');
    // Crear cliente rápido desde el formulario de ventas
    Route::post('/ventas/cliente', [VentaController::class, 'storeClient'])->name('ventas.store-client');
    Route::get('/ventas/{ventum}', [VentaController::class, 'show'])->name('ventas.show');
    Route::delete('/ventas/{ventum}', [VentaController::class, 'destroy'])->name('ventas.destroy');
    // Confirmar pago QR: marca la venta (o cuota) como PAGADA tras polling exitoso
    Route::patch('/ventas/{ventum}/confirmar-pago', [VentaController::class, 'confirmarPago'])->name('ventas.confirmar-pago');
});

// Polling de estado de pago QR (FASE 13 — el callback de PagoFácil no funciona)
Route::middleware('auth')->get('/pagos/{transactionId}/status', [PagoController::class, 'status'])
    ->name('pagos.status')
    ->where('transactionId', '[0-9]+');

// Cuotas — Todos los roles (CLIENTE ve solo las suyas vía filtro)
Route::middleware('auth')->group(function () {
    Route::get('/cuotas', [CuotaController::class, 'index'])->name('cuotas.index');
    Route::patch('/cuotas/{cuotum}', [CuotaController::class, 'update'])->name('cuotas.update');
    // Pago QR por cuota individual
    Route::post('/cuotas/{cuotum}/generar-qr', [CuotaController::class, 'generarQr'])->name('cuotas.generar-qr');
    Route::patch('/cuotas/{cuotum}/confirmar-pago', [CuotaController::class, 'confirmarPago'])->name('cuotas.confirmar-pago');
});

// ═══════════════════════════════════════════════════════════
// MÓDULOS DE ADMINISTRACIÓN (FASE 14)
// ═══════════════════════════════════════════════════════════

Route::middleware(['auth', 'role:PROPIETARIO'])->group(function () {
    // Seguridad
    Route::get('/seguridad', [SeguridadController::class, 'index'])->name('seguridad.index');
    Route::patch('/seguridad/roles/{role}/modulos', [SeguridadController::class, 'updateRoleModulos'])->name('seguridad.role.modulos');
    Route::patch('/seguridad/usuarios/{usuario}/roles', [SeguridadController::class, 'updateUserRoles'])->name('seguridad.user.roles');

    // Bitácora
    Route::get('/bitacora', [BitacoraController::class, 'index'])->name('bitacora.index');

    // Reportes
    Route::get('/reportes', [ReporteController::class, 'index'])->name('reportes.index');
});

// ═══════════════════════════════════════════════════════════
// TEMA DE USUARIO (FASE 9)
// ═══════════════════════════════════════════════════════════

Route::middleware('auth')->group(function () {
    Route::get('/api/tema', [TemaController::class, 'show'])->name('tema.show');
    Route::patch('/api/tema', [TemaController::class, 'update'])->name('tema.update');
});

// ═══════════════════════════════════════════════════════════
// BÚSQUEDA GLOBAL (FASE 12)
// ═══════════════════════════════════════════════════════════

Route::middleware('auth')->get('/buscar', [BusquedaController::class, 'buscar'])
    ->name('buscar');

require __DIR__.'/auth.php';
