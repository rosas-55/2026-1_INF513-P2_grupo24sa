<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('cedula', 'like', '%' . $request->search . '%');
        }

        $usuarios = $query->orderBy('name')->paginate(10)->withQueryString();

        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios,
            'filters'  => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Usuarios/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'cedula'   => 'required|string|max:20|unique:users',
            'celular'  => 'nullable|string|max:20',
            'password' => 'required|string|min:8',
        ]);

        $data['password'] = Hash::make($data['password']);

        User::create($data);

        return Redirect::route('usuarios.index')->with('success', 'Usuario creado correctamente.');
    }

    public function edit(User $usuario): Response
    {
        return Inertia::render('Usuarios/Edit', [
            'usuario' => $usuario,
        ]);
    }

    public function update(Request $request, User $usuario): RedirectResponse
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($usuario->id)],
            'cedula'   => ['required', 'string', 'max:20', Rule::unique('users')->ignore($usuario->id)],
            'celular'  => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8',
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $usuario->update($data);

        return Redirect::route('usuarios.index')->with('success', 'Usuario actualizado correctamente.');
    }

    public function destroy(User $usuario): RedirectResponse
    {
        // Prevenir auto-eliminación
        if ($usuario->id === request()->user()->id) {
            return Redirect::back()->with('error', 'No puedes eliminar tu propio usuario.');
        }

        $usuario->delete();

        return Redirect::route('usuarios.index')->with('success', 'Usuario eliminado.');
    }
}
