<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use App\Models\Producto;
use App\Models\Receta;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RecetaController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Receta::query()->with('producto:id,nombre');

        if ($request->filled('search')) {
            $s = $request->search;
            $query->whereHas('producto', fn ($q) => $q->where('nombre', 'ilike', "%{$s}%"))
                ->orWhere('descripcion', 'ilike', "%{$s}%");
        }

        $recetas = $query->orderBy('id')->paginate(10)->withQueryString();

        return Inertia::render('Recetas/Index', [
            'recetas' => $recetas,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        $productos = Producto::select('id', 'nombre')->where('estado', 'ACTIVO')
            ->whereDoesntHave('receta')->orderBy('nombre')->get();
        $insumos = Insumo::select('id', 'nombre', 'unidad_medida')->where('estado', 'ACTIVO')->orderBy('nombre')->get();

        return Inertia::render('Recetas/Create', [
            'productos' => $productos,
            'insumos'   => $insumos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'producto_id'        => 'required|integer|unique:receta,producto_id|exists:producto,id',
            'descripcion'        => 'nullable|string',
            'tiempo_preparacion' => 'nullable|string|max:100',
            'insumos'            => 'required|array|min:1',
            'insumos.*.insumo_id' => 'required|integer|exists:insumo,id',
            'insumos.*.cantidad'  => 'required|numeric|min:0.001',
        ]);

        DB::transaction(function () use ($data) {
            $receta = Receta::create([
                'producto_id'        => $data['producto_id'],
                'descripcion'        => $data['descripcion'] ?? null,
                'tiempo_preparacion' => $data['tiempo_preparacion'] ?? null,
            ]);

            foreach ($data['insumos'] as $ins) {
                $receta->insumos()->attach($ins['insumo_id'], ['cantidad' => $ins['cantidad']]);
            }
        });

        return Redirect::route('recetas.index')->with('success', 'Receta creada.');
    }

    public function edit(Receta $recetum): Response
    {
        $recetum->load('producto:id,nombre', 'insumos:id,nombre,unidad_medida');

        $insumos = Insumo::select('id', 'nombre', 'unidad_medida')->where('estado', 'ACTIVO')->orderBy('nombre')->get();

        return Inertia::render('Recetas/Edit', [
            'receta'  => $recetum,
            'insumos' => $insumos,
        ]);
    }

    public function update(Request $request, Receta $recetum): RedirectResponse
    {
        $data = $request->validate([
            'descripcion'        => 'nullable|string',
            'tiempo_preparacion' => 'nullable|string|max:100',
            'insumos'            => 'required|array|min:1',
            'insumos.*.insumo_id' => 'required|integer|exists:insumo,id',
            'insumos.*.cantidad'  => 'required|numeric|min:0.001',
        ]);

        DB::transaction(function () use ($data, $recetum) {
            $recetum->update([
                'descripcion'        => $data['descripcion'] ?? null,
                'tiempo_preparacion' => $data['tiempo_preparacion'] ?? null,
            ]);

            // Sincronizar insumos (elimina los anteriores y pone los nuevos)
            $sync = [];
            foreach ($data['insumos'] as $ins) {
                $sync[$ins['insumo_id']] = ['cantidad' => $ins['cantidad']];
            }
            $recetum->insumos()->sync($sync);
        });

        return Redirect::route('recetas.index')->with('success', 'Receta actualizada.');
    }

    public function destroy(Receta $recetum): RedirectResponse
    {
        $recetum->delete();

        return Redirect::route('recetas.index')->with('success', 'Receta eliminada.');
    }
}
