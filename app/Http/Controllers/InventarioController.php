<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use App\Models\Insumo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class InventarioController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Inventario::query()->with('insumo:id,nombre');

        if ($request->filled('insumo_id')) {
            $query->where('insumo_id', $request->insumo_id);
        }

        $movimientos = $query->orderBy('fecha', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(15)->withQueryString();

        $insumos = Insumo::select('id', 'nombre')->where('estado', 'ACTIVO')->orderBy('nombre')->get();

        return Inertia::render('Inventario/Index', [
            'movimientos' => $movimientos,
            'insumos'     => $insumos,
            'filters'     => $request->only('insumo_id'),
        ]);
    }

    public function create(): Response
    {
        $insumos = Insumo::select('id', 'nombre', 'costo_unitario', 'stock_actual', 'unidad_medida')
            ->where('estado', 'ACTIVO')->orderBy('nombre')->get();

        return Inertia::render('Inventario/Create', [
            'insumos' => $insumos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'insumo_id'      => 'required|integer|exists:insumo,id',
            'cantidad'       => 'required|numeric|min:0.01',
            'tipo_movimiento' => 'required|in:ENTRADA,SALIDA,AJUSTE',
            'observacion'    => 'nullable|string',
            'costo_unitario' => 'required|numeric|min:0',
            'fecha'          => 'nullable|date',
        ]);

        $data['valor_total'] = $data['cantidad'] * $data['costo_unitario'];
        $fecha = isset($data['fecha']) ? \Carbon\Carbon::parse($data['fecha']) : now();

        Inventario::create(array_merge($data, ['fecha' => $fecha]));

        // Actualizar stock del insumo
        $insumo = Insumo::find($data['insumo_id']);
        if ($data['tipo_movimiento'] === 'ENTRADA') {
            $insumo->increment('stock_actual', $data['cantidad']);
        } elseif ($data['tipo_movimiento'] === 'SALIDA') {
            $insumo->decrement('stock_actual', $data['cantidad']);
        }
        // AJUSTE: recalcular stock (se asume que el ajuste es el nuevo stock)
        // Para simplificar, no se modifica stock en ajuste automático

        return Redirect::route('inventario.index')->with('success', 'Movimiento registrado.');
    }
}
