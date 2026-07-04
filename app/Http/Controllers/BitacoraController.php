<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BitacoraController extends Controller
{
    /**
     * Mostrar historial de bitácora (auditoría).
     */
    public function index(Request $request)
    {
        $query = Bitacora::with('user')->orderBy('id', 'desc');

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $bitacoras = $query->paginate(50)->withQueryString();

        return Inertia::render('Bitacora/Index', [
            'bitacoras' => $bitacoras,
            'filtros' => $request->only(['tipo', 'user_id']),
        ]);
    }
}
