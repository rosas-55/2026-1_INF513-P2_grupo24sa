<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\ContadorVisitas;
use App\Models\Producto;
use App\Models\User;
use App\Models\Venta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReporteController extends Controller
{
    /**
     * Mostrar panel de reportes (Estadísticas y Visitas).
     */
    public function index()
    {
        // Estadísticas de visitas
        $datosVisitas = ContadorVisitas::orderBy('total_visitas', 'desc')->get();
        $totalVisitas = $datosVisitas->sum('total_visitas');

        // Estadísticas del negocio
        $kpis = [
            'total_ventas' => Venta::whereIn('estado', ['COMPLETADO', 'PENDIENTE'])->sum('total'),
            'total_compras' => Compra::whereIn('estado', ['COMPLETADO', 'PENDIENTE'])->sum('total'),
            'clientes_registrados' => User::whereHas('roles', fn ($q) => $q->where('nombre', 'CLIENTE'))->count(),
            'productos_activos' => Producto::where('estado', 'ACTIVO')->count(),
        ];

        // Productos más vendidos
        $productosMasVendidos = DB::table('detalle_venta')
            ->join('producto', 'detalle_venta.producto_id', '=', 'producto.id')
            ->join('venta', 'detalle_venta.venta_id', '=', 'venta.id')
            ->select('producto.nombre', DB::raw('SUM(detalle_venta.cantidad) as total_vendido'), DB::raw('SUM(detalle_venta.sub_total) as ingresos'))
            ->whereIn('venta.estado', ['COMPLETADO', 'PENDIENTE'])
            ->groupBy('producto.id', 'producto.nombre')
            ->orderByDesc('total_vendido')
            ->limit(5)
            ->get();

        // Ventas recientes
        $ventasRecientes = Venta::with('cliente')
            ->orderBy('fecha', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Reportes/Index', [
            'datos_visitas' => $datosVisitas,
            'total_visitas' => $totalVisitas,
            'kpis' => $kpis,
            'productos_mas_vendidos' => $productosMasVendidos,
            'ventas_recientes' => $ventasRecientes,
        ]);
    }
}
