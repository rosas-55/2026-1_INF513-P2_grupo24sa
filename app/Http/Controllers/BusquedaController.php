<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Insumo;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Venta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BusquedaController extends Controller
{
    /**
     * Búsqueda global across the catálogo del usuario.
     *
     * Devuelve hasta 5 resultados por entidad, agrupados.
     * Las entidades visibles dependen del rol del usuario
     * (mismo criterio que el middleware de acceso a rutas).
     */
    public function buscar(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));

        // Mínimo 2 caracteres para no saturar con queries vacías
        if (mb_strlen($q) < 2) {
            return response()->json(['q' => $q, 'groups' => []]);
        }

        $like = '%'.$q.'%';
        $user = $request->user();
        $roles = $user?->roles->pluck('nombre')->all() ?? [];

        $isOwner   = in_array('PROPIETARIO', $roles, true);
        $isVendor  = in_array('VENDEDOR',    $roles, true);
        $isClient  = in_array('CLIENTE',     $roles, true);

        $groups = [];

        // ── Productos (todos los roles pueden ver el catálogo) ──
        $groups['productos'] = Producto::where('nombre', 'ilike', $like)
            ->orderBy('nombre')
            ->limit(5)
            ->get(['id', 'nombre', 'precio_venta', 'stock_actual'])
            ->map(fn ($p) => [
                'id'       => $p->id,
                'title'    => $p->nombre,
                'subtitle' => 'Bs. '.number_format((float) $p->precio_venta, 2)
                              .' · Stock: '.number_format((float) $p->stock_actual, 2),
                'url'      => route('productos.index', ['search' => $p->nombre]),
            ])
            ->all();

        // ── Insumos (solo PROPIETARIO) ──
        if ($isOwner) {
            $groups['insumos'] = Insumo::where('nombre', 'ilike', $like)
                ->orderBy('nombre')
                ->limit(5)
                ->get(['id', 'nombre', 'stock_actual', 'unidad_medida'])
                ->map(fn ($i) => [
                    'id'       => $i->id,
                    'title'    => $i->nombre,
                    'subtitle' => 'Stock: '.number_format((float) $i->stock_actual, 2).' '.$i->unidad_medida,
                    'url'      => route('insumos.index', ['search' => $i->nombre]),
                ])
                ->all();
        }

        // ── Proveedores (solo PROPIETARIO) ──
        if ($isOwner) {
            $groups['proveedores'] = Proveedor::where('nombre', 'ilike', $like)
                ->orderBy('nombre')
                ->limit(5)
                ->get(['id', 'nombre', 'telefono'])
                ->map(fn ($p) => [
                    'id'       => $p->id,
                    'title'    => $p->nombre,
                    'subtitle' => $p->telefono ?: '—',
                    'url'      => route('proveedores.index', ['search' => $p->nombre]),
                ])
                ->all();
        }

        // ── Ventas (todos; CLIENTE solo ve las suyas) ──
        $ventasQuery = Venta::query()
            ->where(DB::raw("id::text"), 'ilike', $like)
            ->with('cliente:id,name')
            ->orderByDesc('id')
            ->limit(5);

        if ($isClient && ! $isOwner && ! $isVendor) {
            $ventasQuery->where('cliente_id', $user->id);
        }

        $groups['ventas'] = $ventasQuery->get()
            ->map(fn ($v) => [
                'id'       => $v->id,
                'title'    => 'Venta #'.$v->id,
                'subtitle' => 'Bs. '.number_format((float) $v->total, 2)
                              .' · '.($v->cliente->name ?? 's/cliente')
                              .' · '.($v->fecha?->format('d/m/Y') ?? '—'),
                'url'      => route('ventas.show', $v->id),
            ])
            ->all();

        // ── Compras (solo PROPIETARIO) ──
        if ($isOwner) {
            $groups['compras'] = Compra::query()
                ->where(DB::raw("id::text"), 'ilike', $like)
                ->orderByDesc('id')
                ->limit(5)
                ->get()
                ->map(fn ($c) => [
                    'id'       => $c->id,
                    'title'    => 'Compra #'.$c->id,
                    'subtitle' => 'Bs. '.number_format((float) $c->total, 2)
                                  .' · '.($c->fecha?->format('d/m/Y') ?? '—'),
                    'url'      => route('compras.show', $c->id),
                ])
                ->all();
        }

        // Quitar grupos vacíos para no inflar la respuesta
        $groups = array_filter($groups, fn ($items) => ! empty($items));

        return response()->json([
            'q'      => $q,
            'groups' => $groups,
        ]);
    }
}
