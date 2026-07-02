<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cuota extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'cuota';

    /**
     * Indica si el modelo tiene timestamps (created_at, updated_at).
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Los atributos asignables masivamente.
     *
     * @var list<string>
     */
    protected $fillable = [
        'venta_id',
        'estado',
        'fecha_pago',
        'fecha_vencimiento',
        'interes_mora',
        'monto_pagado',
        'nro_cuota',
        'plan_pago',
        'monto_fijo',
        'pagofaciltransactionid',
    ];

    /**
     * Los atributos que deben tener un cast de tipo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_pago' => 'datetime',
            'fecha_vencimiento' => 'date',
            'interes_mora' => 'decimal:2',
            'monto_pagado' => 'decimal:2',
            'monto_fijo' => 'decimal:2',
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Venta a la que pertenece esta cuota.
     */
    public function venta(): BelongsTo
    {
        return $this->belongsTo(Venta::class);
    }
}
