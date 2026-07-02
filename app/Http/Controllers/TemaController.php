<?php

namespace App\Http\Controllers;

use App\Models\TemaUsuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class TemaController extends Controller
{
    /**
     * Obtener las preferencias de tema del usuario.
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'tema'           => TemaUsuario::TEMA_JOVENES,
                'modo'           => TemaUsuario::MODO_DIA,
                'tamano_letra'   => 'normal',
                'alto_contraste' => false,
            ]);
        }

        $tema = TemaUsuario::where('user_id', $user->id)->first();

        return response()->json([
            'tema'           => $tema?->tema ?? TemaUsuario::TEMA_JOVENES,
            'modo'           => $tema?->modo ?? TemaUsuario::MODO_DIA,
            'tamano_letra'   => $tema?->tamano_letra ?? 'normal',
            'alto_contraste' => (bool) ($tema?->alto_contraste ?? false),
        ]);
    }

    /**
     * Guardar/actualizar las preferencias de tema del usuario.
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $validated = $request->validate([
            'tema'           => ['sometimes', 'string', Rule::in([TemaUsuario::TEMA_NINOS, TemaUsuario::TEMA_JOVENES, TemaUsuario::TEMA_ADULTOS])],
            'modo'           => ['sometimes', 'string', Rule::in([TemaUsuario::MODO_DIA, TemaUsuario::MODO_NOCHE])],
            'tamano_letra'   => ['sometimes', 'string', Rule::in(['small', 'normal', 'large', 'xlarge'])],
            'alto_contraste' => ['sometimes', 'boolean'],
        ]);

        if (empty($validated)) {
            return response()->json(['message' => 'Sin cambios'], 200);
        }

        $tema = TemaUsuario::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($validated, ['updated_at' => now()]),
        );

        // Invalidar cachés de menú/permisos/tema para reflejar cambios
        Cache::forget("menu:user:{$user->id}");
        Cache::forget("permisos:user:{$user->id}");

        return response()->json([
            'message' => 'Tema actualizado',
            'tema'    => [
                'tema'           => $tema->tema,
                'modo'           => $tema->modo,
                'tamano_letra'   => $tema->tamano_letra,
                'alto_contraste' => (bool) $tema->alto_contraste,
            ],
        ]);
    }
}
