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
use Barryvdh\DomPDF\Facade\Pdf;

class ReporteController extends Controller
{
    /**
     * Mostrar panel de reportes (Estadísticas y Visitas).
     */
    public function index(Request $request)
    {
        $data = $this->getReportData($request);
        $data['filtros'] = [
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ];
        
        return Inertia::render('Reportes/Index', $data);
    }

    /**
     * Exportar reporte general a PDF.
     */
    public function exportPdf(Request $request)
    {
        $data = $this->getReportData($request);
        
        $pdf = Pdf::loadView('reportes.pdf', $data);

        return $pdf->download('reporte_general.pdf');
    }

    /**
     * Obtener los datos del reporte con filtros.
     */
    private function getReportData(Request $request)
    {
        $startDate = $request->start_date ? $request->start_date . ' 00:00:00' : null;
        $endDate = $request->end_date ? $request->end_date . ' 23:59:59' : null;

        // Base query para Ventas
        $ventasQuery = Venta::whereIn('estado', ['COMPLETADO', 'PENDIENTE']);
        if ($startDate) $ventasQuery->where('fecha', '>=', $startDate);
        if ($endDate) $ventasQuery->where('fecha', '<=', $endDate);

        // Base query para Compras
        $comprasQuery = Compra::whereIn('estado', ['COMPLETADO', 'PENDIENTE']);
        if ($startDate) $comprasQuery->where('fecha', '>=', $startDate);
        if ($endDate) $comprasQuery->where('fecha', '<=', $endDate);

        // Estadísticas de visitas (no tienen fecha por ahora, pero las traemos igual)
        $datosVisitas = ContadorVisitas::orderBy('total_visitas', 'desc')->get();
        $totalVisitas = $datosVisitas->sum('total_visitas');

        $kpis = [
            'total_ventas' => (float) $ventasQuery->sum('total'),
            'total_compras' => (float) $comprasQuery->sum('total'),
            'clientes_registrados' => User::whereHas('roles', fn ($q) => $q->where('nombre', 'CLIENTE'))->count(), // Clientes es histórico
            'productos_activos' => Producto::where('estado', 'ACTIVO')->count(), // Productos es histórico
        ];

        // Productos más vendidos
        $prodQuery = DB::table('detalle_venta')
            ->join('producto', 'detalle_venta.producto_id', '=', 'producto.id')
            ->join('venta', 'detalle_venta.venta_id', '=', 'venta.id')
            ->select('producto.nombre', DB::raw('SUM(detalle_venta.cantidad) as total_vendido'), DB::raw('SUM(detalle_venta.sub_total) as ingresos'))
            ->whereIn('venta.estado', ['COMPLETADO', 'PENDIENTE']);
        
        if ($startDate) $prodQuery->where('venta.fecha', '>=', $startDate);
        if ($endDate) $prodQuery->where('venta.fecha', '<=', $endDate);

        $productosMasVendidos = $prodQuery
            ->groupBy('producto.id', 'producto.nombre')
            ->orderByDesc('total_vendido')
            ->limit(5)
            ->get();

        // Ventas recientes
        $ventasRecientesQuery = Venta::with('cliente');
        if ($startDate) $ventasRecientesQuery->where('fecha', '>=', $startDate);
        if ($endDate) $ventasRecientesQuery->where('fecha', '<=', $endDate);

        $ventasRecientes = $ventasRecientesQuery
            ->orderBy('fecha', 'desc')
            ->limit(10)
            ->get();

        return [
            'datos_visitas' => $datosVisitas,
            'total_visitas' => $totalVisitas,
            'kpis' => $kpis,
            'productos_mas_vendidos' => $productosMasVendidos,
            'ventas_recientes' => $ventasRecientes,
        ];
    }
}
