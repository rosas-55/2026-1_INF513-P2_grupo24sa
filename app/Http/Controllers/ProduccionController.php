<?php

namespace App\Http\Controllers;

use App\Models\Produccion;
use App\Models\Producto;
use App\Models\Receta;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProduccionController extends Controller
{
    public function index(Request $request): Response
    {
        $producciones = Produccion::query()
            ->with('receta.producto:id,nombre')
            ->orderBy('fecha', 'desc')
            ->paginate(15)->withQueryString();

        return Inertia::render('Produccion/Index', [
            'producciones' => $producciones,
        ]);
    }

    public function create(): Response
    {
        $recetas = Receta::with('producto:id,nombre')->orderBy('id')->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'label' => $r->producto?->nombre . ' — ' . ($r->descripcion ?? 'Sin descripción'),
            ]);

        return Inertia::render('Produccion/Create', [
            'recetas' => $recetas,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'receta_id'           => 'required|integer|exists:receta,id',
            'cantidad_producida'  => 'required|numeric|min:0.01',
        ]);

        DB::transaction(function () use ($data) {
            $produccion = Produccion::create(array_merge($data, ['fecha' => now()]));

            // Incrementar stock del producto asociado a la receta
            $receta = Receta::with('producto')->find($data['receta_id']);
            if ($receta && $receta->producto) {
                $receta->producto->increment('stock_actual', $data['cantidad_producida']);

                // Descontar insumos según la receta
                foreach ($receta->insumos as $insumo) {
                    $cantidadPorUnidad = $insumo->pivot->cantidad;
                    $totalConsumido = $data['cantidad_producida'] * $cantidadPorUnidad;
                    $insumo->decrement('stock_actual', $totalConsumido);
                }
            }
        });

        return Redirect::route('produccion.index')->with('success', 'Producción registrada.');
    }
}
