<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class RecetaInsumo extends Pivot
{
    /**
     * La tabla asociada al modelo (pivote).
     *
     * @var string
     */
    protected $table = 'receta_insumo';

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
        'receta_id',
        'insumo_id',
        'cantidad',
    ];

    /**
     * Los atributos que deben tener un cast de tipo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'cantidad' => 'decimal:2',
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Receta a la que pertenece esta relación.
     */
    public function receta(): BelongsTo
    {
        return $this->belongsTo(Receta::class);
    }

    /**
     * Insumo asociado en esta relación.
     */
    public function insumo(): BelongsTo
    {
        return $this->belongsTo(Insumo::class);
    }
}
