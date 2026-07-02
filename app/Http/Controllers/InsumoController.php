<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class InsumoController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Insumo::query();

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where('nombre', 'ilike', "%{$s}%")
                ->orWhere('descripcion', 'ilike', "%{$s}%");
        }

        $insumos = $query->orderBy('nombre')->paginate(10)->withQueryString();

        return Inertia::render('Insumos/Index', [
            'insumos' => $insumos,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Insumos/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nombre'         => 'required|string|max:100',
            'descripcion'    => 'nullable|string',
            'costo_unitario' => 'required|numeric|min:0',
            'stock_actual'   => 'required|numeric|min:0',
            'stock_minimo'   => 'required|numeric|min:0',
            'unidad_medida'  => 'nullable|string|max:50',
        ]);

        Insumo::create($data + ['estado' => 'ACTIVO']);

        return Redirect::route('insumos.index')->with('success', 'Insumo creado.');
    }

    public function edit(Insumo $insumo): Response
    {
        return Inertia::render('Insumos/Edit', [
            'insumo' => $insumo,
        ]);
    }

    public function update(Request $request, Insumo $insumo): RedirectResponse
    {
        $data = $request->validate([
            'nombre'         => 'required|string|max:100',
            'descripcion'    => 'nullable|string',
            'costo_unitario' => 'required|numeric|min:0',
            'stock_actual'   => 'required|numeric|min:0',
            'stock_minimo'   => 'required|numeric|min:0',
            'unidad_medida'  => 'nullable|string|max:50',
            'estado'         => 'sometimes|in:ACTIVO,INACTIVO',
        ]);

        $insumo->update($data);

        return Redirect::route('insumos.index')->with('success', 'Insumo actualizado.');
    }

    public function destroy(Insumo $insumo): RedirectResponse
    {
        $insumo->update(['estado' => 'INACTIVO']);

        return Redirect::route('insumos.index')->with('success', 'Insumo desactivado.');
    }
}
