<?php

namespace App\Http\Controllers;

use App\Models\ContadorVisitas;
use App\Models\Producto;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Dashboard con estadísticas del negocio (FASE 11).
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'resumen'          => $this->resumen(),
                'ventasPorMes'     => $this->ventasPorMes(),
                'productosTop'     => $this->productosTop(),
                'paginasVisitadas' => $this->paginasVisitadas(),
            ],
        ]);
    }

    /**
     * Tarjetas de resumen: totales clave del negocio.
     */
    private function resumen(): array
    {
        return [
            'totalVentas'    => Venta::count(),
            'ventasMes'      => Venta::whereMonth('fecha', now()->month)
                ->whereYear('fecha', now()->year)
                ->count(),
            'ingresosMes'    => Venta::whereMonth('fecha', now()->month)
                ->whereYear('fecha', now()->year)
                ->sum('total'),
            'totalProductos' => Producto::count(),
            'visitasTotales' => ContadorVisitas::sum('total_visitas'),
        ];
    }

    /**
     * Ventas por mes (últimos 12 meses) — 1 query GROUP BY en lugar de 24.
     */
    private function ventasPorMes(): array
    {
        $desde = now()->subMonths(11)->startOfMonth();

        $rows = DB::table('venta')
            ->selectRaw("DATE_TRUNC('month', fecha) as mes, SUM(total) as total, COUNT(*) as cantidad")
            ->where('fecha', '>=', $desde)
            ->groupByRaw("DATE_TRUNC('month', fecha)")
            ->orderBy('mes')
            ->get()
            ->keyBy(fn ($r) => \Carbon\Carbon::parse($r->mes)->format('Y-m'));

        $meses = [];
        $totales = [];
        $cantidades = [];

        for ($i = 11; $i >= 0; $i--) {
            $fecha = now()->subMonths($i);
            $key   = $fecha->format('Y-m');
            $meses[]      = $fecha->translatedFormat('M Y');
            $totales[]    = (float) ($rows[$key]->total ?? 0);
            $cantidades[] = (int)   ($rows[$key]->cantidad ?? 0);
        }

        return ['labels' => $meses, 'totales' => $totales, 'cantidades' => $cantidades];
    }

    /**
     * Top 5 productos más vendidos (por cantidad total).
     */
    private function productosTop(): array
    {
        $top = DB::table('detalle_venta')
            ->join('producto', 'detalle_venta.producto_id', '=', 'producto.id')
            ->select(
                'producto.nombre',
                DB::raw('SUM(detalle_venta.cantidad) as total_vendido'),
                DB::raw('SUM(detalle_venta.sub_total) as ingreso_total')
            )
            ->groupBy('producto.id', 'producto.nombre')
            ->orderByDesc('total_vendido')
            ->limit(5)
            ->get();

        return [
            'labels'  => $top->pluck('nombre')->toArray(),
            'ventas'  => $top->pluck('total_vendido')->map(fn ($v) => (float) $v)->toArray(),
            'ingresos' => $top->pluck('ingreso_total')->map(fn ($v) => (float) $v)->toArray(),
        ];
    }

    /**
     * Páginas más visitadas (top 8).
     */
    private function paginasVisitadas(): array
    {
        $top = ContadorVisitas::orderByDesc('total_visitas')
            ->limit(8)
            ->get();

        return [
            'labels'  => $top->pluck('nombre_pagina')->toArray(),
            'visitas' => $top->pluck('total_visitas')->toArray(),
        ];
    }
}
