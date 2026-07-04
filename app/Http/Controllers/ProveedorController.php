<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProveedorController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Proveedor::query();

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(fn ($q) => $q->where('nombre', 'ilike', "%{$s}%")
                ->orWhere('telefono', 'ilike', "%{$s}%"));
        }

        $proveedores = $query->orderBy('nombre')->paginate(10)->withQueryString();

        return Inertia::render('Proveedores/Index', [
            'proveedores' => $proveedores,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Proveedores/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:100',
            'direccion' => 'nullable|string|max:200',
            'telefono' => 'nullable|string|max:30',
        ]);

        Proveedor::create($data);

        return Redirect::route('proveedores.index')->with('success', 'Proveedor creado.');
    }

    public function edit(Proveedor $proveedore): Response
    {
        return Inertia::render('Proveedores/Edit', [
            'proveedor' => $proveedore,
        ]);
    }

    public function update(Request $request, Proveedor $proveedore): RedirectResponse
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:100',
            'direccion' => 'nullable|string|max:200',
            'telefono' => 'nullable|string|max:30',
        ]);

        $proveedore->update($data);

        return Redirect::route('proveedores.index')->with('success', 'Proveedor actualizado.');
    }

    public function destroy(Proveedor $proveedore): RedirectResponse
    {
        $proveedore->delete();

        return Redirect::route('proveedores.index')->with('success', 'Proveedor eliminado.');
    }
}
