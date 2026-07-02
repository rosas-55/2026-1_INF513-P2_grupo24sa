<?php

namespace App\Http\Controllers;

use App\Models\Modulo;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeguridadController extends Controller
{
    /**
     * Mostrar panel de seguridad (Roles, Módulos y Usuarios).
     */
    public function index()
    {
        $roles = Role::with('modulos')->get();
        $modulos = Modulo::where('estado', 'ACTIVO')->orderBy('nivel')->get();
        $usuarios = User::with('roles')->get();

        return Inertia::render('Seguridad/Index', [
            'roles' => $roles,
            'modulos' => $modulos,
            'usuarios' => $usuarios,
        ]);
    }

    /**
     * Actualizar los módulos asignados a un rol.
     */
    public function updateRoleModulos(Request $request, Role $role)
    {
        $request->validate([
            'modulos' => 'array',
            'modulos.*' => 'exists:modulo,id',
        ]);

        $role->modulos()->sync($request->modulos ?? []);

        // Limpiar caché de menú/permisos para usuarios con este rol (simplificado, idealmente usar tags o iterar)
        // Por simplicidad, Cache::flush() o limpiar todos los menús si no usamos Redis tags.
        \Illuminate\Support\Facades\Cache::flush();

        return redirect()->back()->with('success', 'Módulos actualizados correctamente para el rol.');
    }

    /**
     * Actualizar los roles asignados a un usuario.
     */
    public function updateUserRoles(Request $request, User $usuario)
    {
        $request->validate([
            'roles' => 'array',
            'roles.*' => 'exists:role,id',
        ]);

        $usuario->roles()->sync($request->roles ?? []);

        \Illuminate\Support\Facades\Cache::forget("menu:user:{$usuario->id}");
        \Illuminate\Support\Facades\Cache::forget("permisos:user:{$usuario->id}");

        return redirect()->back()->with('success', 'Roles actualizados correctamente para el usuario.');
    }
}
