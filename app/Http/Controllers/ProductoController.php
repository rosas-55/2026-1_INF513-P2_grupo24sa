<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductoController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Producto::query()->with('insumo:id,nombre');

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where('nombre', 'ilike', "%{$s}%");
        }

        $productos = $query->orderBy('nombre')->paginate(10)->withQueryString();

        return Inertia::render('Productos/Index', [
            'productos' => $productos,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        $insumos = \App\Models\Insumo::select('id', 'nombre')->where('estado', 'ACTIVO')->orderBy('nombre')->get();

        return Inertia::render('Productos/Create', [
            'insumos' => $insumos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nombre'       => 'required|string|max:100',
            'precio_venta' => 'required|numeric|min:0',
            'stock_actual' => 'required|numeric|min:0',
            'insumo_id'    => 'nullable|integer|exists:insumo,id',
        ]);

        Producto::create($data + ['estado' => 'ACTIVO']);

        return Redirect::route('productos.index')->with('success', 'Producto creado.');
    }

    public function edit(Producto $producto): Response
    {
        $insumos = \App\Models\Insumo::select('id', 'nombre')->where('estado', 'ACTIVO')->orderBy('nombre')->get();

        return Inertia::render('Productos/Edit', [
            'producto' => $producto,
            'insumos'  => $insumos,
        ]);
    }

    public function update(Request $request, Producto $producto): RedirectResponse
    {
        $data = $request->validate([
            'nombre'       => 'required|string|max:100',
            'precio_venta' => 'required|numeric|min:0',
            'stock_actual' => 'required|numeric|min:0',
            'insumo_id'    => 'nullable|integer|exists:insumo,id',
            'estado'       => 'sometimes|in:ACTIVO,INACTIVO',
        ]);

        $producto->update($data);

        return Redirect::route('productos.index')->with('success', 'Producto actualizado.');
    }

    public function destroy(Producto $producto): RedirectResponse
    {
        $producto->update(['estado' => 'INACTIVO']);

        return Redirect::route('productos.index')->with('success', 'Producto desactivado.');
    }
}
