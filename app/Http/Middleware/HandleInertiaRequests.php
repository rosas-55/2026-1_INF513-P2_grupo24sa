<?php

namespace App\Http\Middleware;

use App\Models\Modulo;
use App\Models\TemaUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'menu'    => fn () => $this->getMenu($request),
            'permisos' => fn () => $this->getPermisos($request),
            'tema'    => fn () => $this->getTema($request),
            'visitas' => $request->attributes->get('visitas', 0),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // MENÚ DINÁMICO (FASE 5)
    // ═══════════════════════════════════════════════════════════

    /**
     * Devuelve los módulos del menú asignados al rol del usuario.
     *
     * @return array<int, array{name: string, route: string, icon: string}>
     */
    private function getMenu(Request $request): array
    {
        $user = $request->user();

        if (! $user) {
            return [];
        }

        $roleIds = $user->roles()->pluck('role_id');

        return Cache::remember(
            "menu:user:{$user->id}",
            now()->addMinutes(30),
            function () use ($roleIds) {
                $modulos = Modulo::query()
                    ->select(['modulo.id', 'modulo.name', 'modulo.codigo', 'modulo.nivel'])
                    ->join('role_modulo', 'modulo.id', '=', 'role_modulo.modulo_id')
                    ->whereIn('role_modulo.role_id', $roleIds)
                    ->where('modulo.estado', 'ACTIVO')
                    ->orderBy('modulo.nivel')
                    ->orderBy('modulo.id')
                    ->get();

                return $modulos->map(fn (Modulo $m) => [
                    'name'  => $m->name,
                    'route' => $this->codigoToRoute($m->codigo),
                    'icon'  => $this->codigoToIcon($m->codigo),
                ])->toArray();
            }
        );
    }

    // ═══════════════════════════════════════════════════════════
    // MATRIZ DE ACCESO (FASE 6)
    // ═══════════════════════════════════════════════════════════

    /**
     * Devuelve los permisos del usuario: [modulo_codigo => [accion, accion, ...]].
     *
     * @return array<string, string[]>
     */
    private function getPermisos(Request $request): array
    {
        $user = $request->user();

        if (! $user) {
            return [];
        }

        $roleIds = $user->roles()->pluck('role_id');

        return Cache::remember(
            "permisos:user:{$user->id}",
            now()->addMinutes(30),
            function () use ($roleIds) {
                $result = [];
                $rows = Modulo::query()
                    ->select(['modulo.codigo', 'accion.codigo as accion_codigo'])
                    ->join('role_modulo', 'modulo.id', '=', 'role_modulo.modulo_id')
                    ->join('accion', 'modulo.id', '=', 'accion.modulo_id')
                    ->whereIn('role_modulo.role_id', $roleIds)
                    ->where('modulo.estado', 'ACTIVO')
                    ->where('accion.estado', 'ACTIVO')
                    ->get();

                foreach ($rows as $row) {
                    $result[$row->codigo][] = $row->accion_codigo;
                }

                return $result;
            }
        );
    }

    // ═══════════════════════════════════════════════════════════
    // TEMA DE USUARIO (FASE 9)
    // ═══════════════════════════════════════════════════════════

    /**
     * Devuelve las preferencias de tema del usuario autenticado.
     * Si no hay usuario o no tiene preferencias, usa defaults.
     *
     * @return array{tema: string, modo: string, tamano_letra: string, alto_contraste: bool}
     */
    private function getTema(Request $request): array
    {
        $defaults = [
            'tema'           => TemaUsuario::TEMA_JOVENES,
            'modo'           => TemaUsuario::MODO_DIA,
            'tamano_letra'   => 'normal',
            'alto_contraste' => false,
        ];

        $user = $request->user();
        if (! $user) {
            return $defaults;
        }

        $tema = TemaUsuario::where('user_id', $user->id)->first();
        if (! $tema) {
            return $defaults;
        }

        return [
            'tema'           => $tema->tema ?? $defaults['tema'],
            'modo'           => $tema->modo ?? $defaults['modo'],
            'tamano_letra'   => $tema->tamano_letra ?? $defaults['tamano_letra'],
            'alto_contraste' => (bool) ($tema->alto_contraste ?? $defaults['alto_contraste']),
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════════════

    private function codigoToRoute(string $codigo): string
    {
        $map = [
            'DASHBOARD'   => 'dashboard',
            'PROVEEDORES' => 'proveedores.index',
            'INSUMOS'     => 'insumos.index',
            'COMPRAS'     => 'compras.index',
            'INVENTARIO'  => 'inventario.index',
            'PRODUCTOS'   => 'productos.index',
            'RECETAS'     => 'recetas.index',
            'PRODUCCION'  => 'produccion.index',
            'VENTAS'      => 'ventas.index',
            'CUOTAS'      => 'cuotas.index',
            'SEGURIDAD'   => 'seguridad.index',
            'REPORTES'    => 'reportes.index',
            'BITACORA'    => 'bitacora.index',
        ];

        return $map[$codigo] ?? 'dashboard';
    }

    private function codigoToIcon(string $codigo): string
    {
        $map = [
            'DASHBOARD'   => 'layout-dashboard',
            'PROVEEDORES' => 'truck',
            'INSUMOS'     => 'package',
            'COMPRAS'     => 'shopping-cart',
            'INVENTARIO'  => 'warehouse',
            'PRODUCTOS'   => 'barcode',
            'RECETAS'     => 'book-open',
            'PRODUCCION'  => 'factory',
            'VENTAS'      => 'receipt',
            'CUOTAS'      => 'credit-card',
            'SEGURIDAD'   => 'shield-check',
            'REPORTES'    => 'bar-chart-3',
            'BITACORA'    => 'scroll-text',
        ];

        return $map[$codigo] ?? 'circle';
    }
}
