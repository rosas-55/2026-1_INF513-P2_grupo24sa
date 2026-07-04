<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inventario extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'inventario';

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
        'insumo_id',
        'cantidad',
        'fecha',
        'observacion',
        'tipo_movimiento',
        'costo_unitario',
        'valor_total',
    ];

    /**
     * Los atributos que deben tener un cast de tipo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha' => 'datetime',
            'cantidad' => 'decimal:2',
            'costo_unitario' => 'decimal:2',
            'valor_total' => 'decimal:2',
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Insumo al que pertenece este movimiento de inventario.
     */
    public function insumo(): BelongsTo
    {
        return $this->belongsTo(Insumo::class);
    }
}
