<?php

namespace App\Http\Controllers;

use App\Models\Cuota;
use App\Models\Venta;
use App\Services\PagoFacilService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CuotaController extends Controller
{
    public function __construct(private readonly PagoFacilService $pagoFacil) {}

    public function index(Request $request): Response
    {
        $user  = $request->user();
        $roles = $user->roles()->pluck('nombre')->toArray();
        $esCliente = in_array('CLIENTE', $roles);

        $query = Cuota::query()
            ->with('venta:id,cliente_id,total,tipo', 'venta.cliente:id,name');

        // ── BUG FIX: CLIENTE solo ve sus propias cuotas ──────────────
        if ($esCliente) {
            $query->whereHas('venta', fn ($q) => $q->where('cliente_id', $user->id));
        } else {
            // Filtros opcionales para PROPIETARIO / VENDEDOR
            if ($request->filled('estado')) {
                $query->where('estado', $request->estado);
            }
            if ($request->filled('venta_id')) {
                $query->where('venta_id', $request->venta_id);
            }
        }

        $cuotas = $query->orderBy('fecha_vencimiento')->paginate(15)->withQueryString();

        $ventas = $esCliente
            ? []
            : Venta::select('id', 'cliente_id')->with('cliente:id,name')->where('tipo', 'CREDITO')->get();

        return Inertia::render('Cuotas/Index', [
            'cuotas'    => $cuotas,
            'ventas'    => $ventas,
            'filters'   => $request->only('estado', 'venta_id'),
            'esCliente' => $esCliente,
        ]);
    }

    /**
     * Genera un QR de PagoFácil para pagar una cuota individual.
     * POST /cuotas/{cuotum}/generar-qr
     */
    public function generarQr(Cuota $cuotum): JsonResponse
    {
        if ($cuotum->estado === 'PAGADO') {
            return response()->json(['error' => 'Esta cuota ya está pagada.'], 422);
        }

        $venta   = $cuotum->venta()->with('cliente')->firstOrFail();
        $cliente = $venta->cliente;

        try {
            $response = $this->pagoFacil->generarQr([
                'paymentMethod' => 34, // QR
                'clientName'    => $cliente->name,
                'documentType'  => 1,
                'documentId'    => (string) ($cliente->cedula ?? '0'),
                'phoneNumber'   => (string) ($cliente->celular ?? '0'),
                'email'         => $cliente->email ?? '',
                'paymentNumber' => "C{$cuotum->id}-" . time(),
                'amount'        => 0.1, // Académico
                'currency'      => 2, // BOB
                'orderDetail'   => [[
                    'serial'   => 1,
                    'product'  => "Cuota {$cuotum->nro_cuota} de {$venta->nro_cuotas} — Venta #{$venta->id}",
                    'quantity' => 1,
                    'price'    => 0.1,
                    'discount' => 0.0,
                    'total'    => 0.1,
                ]],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'No se pudo generar el QR: ' . $e->getMessage()], 502);
        }

        $values = $response['values'] ?? [];
        $cuotum->update(['pagofaciltransactionid' => (string) ($values['transactionId'] ?? null)]);

        return response()->json([
            'transactionId'  => (int) ($values['transactionId'] ?? 0),
            'qrBase64'       => $values['qrBase64'] ?? '',
            'expirationDate' => $values['expirationDate'] ?? null,
            'amount'         => (float) $cuotum->monto_fijo,
            'label'          => "Cuota {$cuotum->nro_cuota}/{$venta->nro_cuotas}",
        ]);
    }

    /**
     * Confirma el pago de una cuota tras verificar con PagoFácil (paymentStatus 5).
     * PATCH /cuotas/{cuotum}/confirmar-pago
     */
    public function confirmarPago(Cuota $cuotum): JsonResponse
    {
        if ($cuotum->estado === 'PAGADO') {
            return response()->json(['success' => true, 'message' => 'Cuota ya estaba pagada.']);
        }

        if (empty($cuotum->pagofaciltransactionid)) {
            return response()->json(['error' => 'Esta cuota no tiene transacción QR asociada.'], 422);
        }

        try {
            $info = $this->pagoFacil->consultarTransaccion((int) $cuotum->pagofaciltransactionid);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'No se pudo verificar el pago: ' . $e->getMessage()], 502);
        }

        if (! $this->pagoFacil->estaPagada($info)) {
            return response()->json(['error' => 'El pago aún no fue confirmado por PagoFácil.'], 422);
        }

        $cuotum->update([
            'estado'       => 'PAGADO',
            'monto_pagado' => $cuotum->monto_fijo,
            'fecha_pago'   => now(),
        ]);

        // Si todas las cuotas están pagadas, marcar la venta como COMPLETADO
        $venta = $cuotum->venta;
        if ($venta->cuotas()->where('estado', '!=', 'PAGADO')->count() === 0) {
            $venta->update(['estado' => 'COMPLETADO']);
        }

        return response()->json(['success' => true, 'cuota_id' => $cuotum->id]);
    }

    public function update(Request $request, Cuota $cuotum): RedirectResponse
    {
        $data = $request->validate([
            'estado'                  => 'required|in:PENDIENTE,PAGADO,VENCIDO',
            'monto_pagado'            => 'required|numeric|min:0',
            'pagofaciltransactionid'  => 'nullable|string',
        ]);

        $data['fecha_pago'] = $data['estado'] === 'PAGADO' ? now() : null;
        $cuotum->update($data);

        // Si todas las cuotas están pagadas, actualizar la venta
        $venta = $cuotum->venta;
        $cuotasPendientes = $venta->cuotas()->where('estado', '!=', 'PAGADO')->count();
        if ($cuotasPendientes === 0) {
            $venta->update(['estado' => 'COMPLETADO']);
        }

        return Redirect::route('cuotas.index')->with('success', 'Cuota actualizada.');
    }
}
