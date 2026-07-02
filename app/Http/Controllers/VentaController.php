<?php

namespace App\Http\Controllers;

use App\Models\Cuota;
use App\Models\Producto;
use App\Models\User;
use App\Models\Venta;
use App\Services\PagoFacilService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class VentaController extends Controller
{
    /**
     * ID del método de pago QR en PagoFácil.
     * // TODO: mover a config('services.pagofacil.qr_payment_method') si cambia por comercio.
     */
    private const QR_PAYMENT_METHOD = 34;

    public function __construct(private readonly PagoFacilService $pagoFacil) {}

    public function index(Request $request): Response
    {
        $query = Venta::query()
            ->with('cliente:id,name', 'vendedor:id,name');

        if ($request->filled('cliente_id')) {
            $query->where('cliente_id', $request->cliente_id);
        }
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        $ventas = $query->orderBy('fecha', 'desc')->paginate(10)->withQueryString();
        $clientes = User::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('Ventas/Index', [
            'ventas'   => $ventas,
            'clientes' => $clientes,
            'filters'  => $request->only('cliente_id', 'estado'),
        ]);
    }

    public function create(): Response
    {
        $clientes = User::select('id', 'name')->orderBy('name')->get();
        $productos = Producto::select('id', 'nombre', 'precio_venta', 'stock_actual')
            ->where('estado', 'ACTIVO')->where('stock_actual', '>', 0)->orderBy('nombre')->get();

        return Inertia::render('Ventas/Create', [
            'clientes'  => $clientes,
            'productos' => $productos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'cliente_id'   => 'required|integer|exists:"User",id',
            'tipo'         => 'required|in:CONTADO,CREDITO',
            'nro_cuotas'   => $request->tipo === 'CREDITO' ? 'required|integer|min:1|max:24' : 'nullable|integer',
            'interes'      => 'nullable|numeric|min:0',
            'detalles'     => 'required|array|min:1',
            'detalles.*.producto_id' => 'required|integer|exists:producto,id',
            'detalles.*.cantidad'    => 'required|numeric|min:0.01',
        ]);

        DB::transaction(function () use ($data, $request) {
            ['venta' => $venta] = $this->crearVentaConDetalles($data, $request->user()->id);
        });

        return Redirect::route('ventas.index')->with('success', 'Venta registrada.');
    }

    public function storeClient(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'   => 'required|string|max:255',
            'email'  => 'required|email|unique:User,email',
            'cedula' => 'required|string|max:20|unique:User,cedula',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'cedula'   => $data['cedula'],
            'password' => bcrypt($data['cedula']), // Contraseña = carnet
        ]);

        // Asignar rol CLIENTE si existe
        $role = \App\Models\Role::where('nombre', 'CLIENTE')->first();
        if ($role) {
            $user->roles()->attach($role->id);
        }

        return response()->json($user);
    }

    public function show(Venta $ventum): Response
    {
        $ventum->load('cliente:id,name', 'vendedor:id,name', 'detalles.producto:id,nombre', 'cuotas');

        return Inertia::render('Ventas/Show', [
            'venta' => $ventum,
        ]);
    }

    public function storeWithPayment(Request $request): JsonResponse
    {
        $data = $request->validate([
            'cliente_id'               => 'required|integer|exists:"User",id',
            'tipo'                     => 'required|in:CONTADO,CREDITO',
            'nro_cuotas'               => $request->tipo === 'CREDITO' ? 'required|integer|min:1|max:24' : 'nullable|integer',
            'interes'                  => 'nullable|numeric|min:0',
            'detalles'                 => 'required|array|min:1',
            'detalles.*.producto_id'   => 'required|integer|exists:producto,id',
            'detalles.*.cantidad'      => 'required|numeric|min:0.01',
        ]);

        $cliente = User::findOrFail($data['cliente_id']);

        try {
            [$venta, $cuotas, $qrs] = DB::transaction(function () use ($data, $request, $cliente) {
                ['venta' => $venta, 'cuotas' => $cuotas, 'orderDetail' => $orderDetail]
                    = $this->crearVentaConDetalles($data, $request->user()->id);

                $qrs = [];
                $commonQrPayload = [
                    'paymentMethod' => self::QR_PAYMENT_METHOD,
                    'clientName'    => $cliente->name,
                    'documentType'  => 1, // CI
                    'documentId'    => (string) ($cliente->cedula ?? '0'),
                    'phoneNumber'   => (string) ($cliente->celular ?? '0'),
                    'email'         => $cliente->email,
                ];

                if ($data['tipo'] === 'CONTADO') {
                    $response = $this->pagoFacil->generarQr(array_merge($commonQrPayload, [
                        'paymentNumber' => (string) $venta->id,
                        'amount'        => (float) $venta->total,
                        'currency'      => 2, // BOB
                        'orderDetail'   => $orderDetail,
                    ]));

                    $values = $response['values'] ?? [];
                    $venta->update(['pagofaciltransactionid' => (string) ($values['transactionId'] ?? null)]);

                    $qrs[] = [
                        'target'         => 'venta',
                        'target_id'      => $venta->id,
                        'transactionId'  => (int) ($values['transactionId'] ?? 0),
                        'qrBase64'       => $values['qrBase64'] ?? '',
                        'expirationDate' => $values['expirationDate'] ?? null,
                        'amount'         => (float) $venta->total,
                        'label'          => "Pago total · Venta #{$venta->id}",
                        'status'         => 'pending',
                    ];
                } else {
                    // CREDITO: un QR por cuota
                    foreach ($cuotas as $cuota) {
                        $response = $this->pagoFacil->generarQr(array_merge($commonQrPayload, [
                            'paymentNumber' => (string) $cuota->id,
                            'amount'        => (float) $cuota->monto_fijo,
                            'currency'      => 2,
                            'orderDetail'   => [[
                                'serial'   => 1,
                                'product'  => "Cuota {$cuota->nro_cuota} de {$venta->nro_cuotas}",
                                'quantity' => 1,
                                'price'    => (float) $cuota->monto_fijo,
                                'discount' => 0.0,
                                'total'    => (float) $cuota->monto_fijo,
                            ]],
                        ]));

                        $values = $response['values'] ?? [];
                        $cuota->update(['pagofaciltransactionid' => (string) ($values['transactionId'] ?? null)]);

                        $qrs[] = [
                            'target'         => 'cuota',
                            'target_id'      => $cuota->id,
                            'transactionId'  => (int) ($values['transactionId'] ?? 0),
                            'qrBase64'       => $values['qrBase64'] ?? '',
                            'expirationDate' => $values['expirationDate'] ?? null,
                            'amount'         => (float) $cuota->monto_fijo,
                            'label'          => "Cuota {$cuota->nro_cuota}/{$venta->nro_cuotas}",
                            'status'         => 'pending',
                        ];
                    }
                }

                return [$venta, $cuotas, $qrs];
            });
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }

        return response()->json([
            'success'     => true,
            'venta_id'    => $venta->id,
            'venta_total' => (float) $venta->total,
            'tipo'        => $venta->tipo,
            'nro_cuotas'  => $venta->nro_cuotas,
            'qrs'         => $qrs,
        ]);
    }

    public function destroy(Venta $ventum): RedirectResponse
    {
        if ($ventum->estado !== 'PENDIENTE') {
            return Redirect::back()->with('error', 'Solo se pueden eliminar ventas pendientes.');
        }

        DB::transaction(function () use ($ventum) {
            // Fix: acceso de propiedad en modelos Eloquent, no de array
            foreach ($ventum->detalles as $det) {
                Producto::where('id', $det->producto_id)->increment('stock_actual', $det->cantidad);
            }
            $ventum->cuotas()->delete();
            $ventum->detalles()->delete();
            $ventum->delete();
        });

        return Redirect::route('ventas.index')->with('success', 'Venta eliminada.');
    }

    /**
     * Marca la venta como PAGADA tras confirmar con PagoFácil que paymentStatus = 5.
     *
     * PATCH /ventas/{ventum}/confirmar-pago
     */
    public function confirmarPago(Venta $ventum): JsonResponse
    {
        if ($ventum->estado === 'PAGADA') {
            return response()->json(['success' => true, 'message' => 'Venta ya estaba pagada.']);
        }

        if (empty($ventum->pagofaciltransactionid)) {
            return response()->json(['error' => 'Esta venta no tiene transacción QR asociada.'], 422);
        }

        try {
            $info = $this->pagoFacil->consultarTransaccion((int) $ventum->pagofaciltransactionid);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'No se pudo verificar el pago con PagoFácil: ' . $e->getMessage()], 502);
        }

        if (! $this->pagoFacil->estaPagada($info)) {
            return response()->json(['error' => 'El pago aún no fue confirmado por PagoFácil.'], 422);
        }

        $values = $info['values'] ?? [];
        $ventum->update([
            'estado' => 'PAGADA',
            'fecha'  => now(), // registramos la fecha efectiva de pago
        ]);

        \Illuminate\Support\Facades\Log::info('Venta confirmada como PAGADA', [
            'venta_id'           => $ventum->id,
            'pagofacil_tx'       => $ventum->pagofaciltransactionid,
            'payerName'          => $values['payerName'] ?? null,
            'paymentDate'        => ($values['paymentDate'] ?? '') . ' ' . ($values['paymentTime'] ?? ''),
        ]);

        return response()->json([
            'success'     => true,
            'venta_id'    => $ventum->id,
            'estado'      => 'PAGADA',
            'payerName'   => $values['payerName'] ?? null,
            'paymentDate' => $values['paymentDate'] ?? null,
            'paymentTime' => $values['paymentTime'] ?? null,
        ]);
    }

    // ═══════════════════════════════════════════════════════════
    // HELPERS PRIVADOS
    // ═══════════════════════════════════════════════════════════

    /**
     * Fix #9: lógica extraída que antes estaba duplicada en store() y storeWithPayment().
     *
     * Crea la venta, sus detalles (descontando stock) y las cuotas si es CRÉDITO.
     * Debe ejecutarse dentro de una transacción DB.
     *
     * @return array{venta: Venta, cuotas: Cuota[], orderDetail: array<int, array<string, mixed>>}
     */
    private function crearVentaConDetalles(array $data, int $vendedorId): array
    {
        $subtotal    = 0;
        $detProc     = [];
        $orderDetail = [];
        $serial      = 1;

        foreach ($data['detalles'] as $det) {
            $producto = Producto::findOrFail($det['producto_id']);
            if ($producto->stock_actual < $det['cantidad']) {
                throw new \RuntimeException("Stock insuficiente para: {$producto->nombre}");
            }
            $precio   = $producto->precio_venta;
            $subDet   = $det['cantidad'] * $precio;
            $detProc[] = [
                'producto_id'     => $producto->id,
                'cantidad'        => $det['cantidad'],
                'precio_unitario' => $precio,
                'sub_total'       => $subDet,
            ];
            $subtotal += $subDet;
            $orderDetail[] = [
                'serial'   => $serial++,
                'product'  => $producto->nombre,
                'quantity' => (int) $det['cantidad'],
                'price'    => (float) $precio,
                'discount' => 0.0,
                'total'    => (float) $subDet,
            ];
        }

        $total     = $subtotal + ($data['interes'] ?? 0);
        $nroCuotas = $data['tipo'] === 'CREDITO' ? $data['nro_cuotas'] : 0;

        $venta = Venta::create([
            'cliente_id'  => $data['cliente_id'],
            'vendedor_id' => $vendedorId,
            'estado'      => 'PENDIENTE',
            'tipo'        => $data['tipo'],
            'nro_cuotas'  => $nroCuotas,
            'interes'     => $data['interes'] ?? 0,
            'total'       => $total,
        ]);

        foreach ($detProc as $det) {
            $venta->detalles()->create($det);
            Producto::where('id', $det['producto_id'])->decrement('stock_actual', $det['cantidad']);
        }

        $cuotas = [];
        if ($data['tipo'] === 'CREDITO' && $nroCuotas > 0) {
            $montoFijo = round($total / $nroCuotas, 2);
            $fechaBase = now();
            for ($i = 1; $i <= $nroCuotas; $i++) {
                $cuotas[] = $venta->cuotas()->create([
                    'nro_cuota'         => $i,
                    'monto_fijo'        => $montoFijo,
                    'fecha_vencimiento' => $fechaBase->copy()->addMonths($i),
                    'estado'            => 'PENDIENTE',
                    'plan_pago'         => "Cuota {$i} de {$nroCuotas}",
                ]);
            }
        }

        return compact('venta', 'cuotas', 'orderDetail');
    }
}
