<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Insumo;
use App\Models\Proveedor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CompraController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Compra::query()->with('proveedor:id,nombre');

        if ($request->filled('proveedor_id')) {
            $query->where('proveedor_id', $request->proveedor_id);
        }

        $compras = $query->orderBy('fecha', 'desc')->paginate(10)->withQueryString();
        $proveedores = Proveedor::select('id', 'nombre')->orderBy('nombre')->get();

        return Inertia::render('Compras/Index', [
            'compras'     => $compras,
            'proveedores' => $proveedores,
            'filters'     => $request->only('proveedor_id'),
        ]);
    }

    public function create(): Response
    {
        $proveedores = Proveedor::select('id', 'nombre')->orderBy('nombre')->get();
        $insumos = Insumo::select('id', 'nombre', 'costo_unitario', 'unidad_medida')
            ->where('estado', 'ACTIVO')->orderBy('nombre')->get();

        return Inertia::render('Compras/Create', [
            'proveedores' => $proveedores,
            'insumos'     => $insumos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'proveedor_id' => 'required|integer|exists:proveedor,id',
            'estado'       => 'required|in:PENDIENTE,COMPLETADO,ANULADO',
            'detalles'     => 'required|array|min:1',
            'detalles.*.insumo_id'       => 'required|integer|exists:insumo,id',
            'detalles.*.cantidad'        => 'required|numeric|min:0.01',
            'detalles.*.precio_unitario' => 'required|numeric|min:0',
            'fecha'                      => 'nullable|date',
        ]);

        DB::transaction(function () use ($data) {
            $total = collect($data['detalles'])->sum(fn ($d) => $d['cantidad'] * $d['precio_unitario']);

            $compra = Compra::create([
                'proveedor_id' => $data['proveedor_id'],
                'estado'       => $data['estado'],
                'total'        => $total,
                'fecha'        => isset($data['fecha']) ? \Carbon\Carbon::parse($data['fecha']) : now(),
            ]);

            foreach ($data['detalles'] as $det) {
                $compra->detalles()->create([
                    'insumo_id'       => $det['insumo_id'],
                    'cantidad'        => $det['cantidad'],
                    'precio_unitario' => $det['precio_unitario'],
                    'subtotal'        => $det['cantidad'] * $det['precio_unitario'],
                ]);

                // Incrementar stock del insumo si la compra está completada
                if ($data['estado'] === 'COMPLETADO') {
                    Insumo::where('id', $det['insumo_id'])->increment('stock_actual', $det['cantidad']);
                }
            }
        });

        return Redirect::route('compras.index')->with('success', 'Compra registrada.');
    }

    public function show(Compra $compra): Response
    {
        $compra->load('proveedor:id,nombre', 'detalles.insumo:id,nombre,unidad_medida');

        return Inertia::render('Compras/Show', [
            'compra' => $compra,
        ]);
    }

    public function destroy(Compra $compra): RedirectResponse
    {
        if ($compra->estado === 'COMPLETADO') {
            return Redirect::back()->with('error', 'No se puede eliminar una compra completada.');
        }

        $compra->delete();

        return Redirect::route('compras.index')->with('success', 'Compra eliminada.');
    }
}
