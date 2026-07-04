<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Produccion extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'produccion';

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
        'cantidad_producida',
        'fecha',
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
            'cantidad_producida' => 'decimal:2',
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Receta utilizada en esta producción.
     */
    public function receta(): BelongsTo
    {
        return $this->belongsTo(Receta::class);
    }
}
