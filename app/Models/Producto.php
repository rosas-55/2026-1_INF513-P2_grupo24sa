<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Producto extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'producto';

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
        'estado',
        'nombre',
        'precio_venta',
        'stock_actual',
        'insumo_id',
    ];

    /**
     * Los atributos que deben tener un cast de tipo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'precio_venta' => 'decimal:2',
            'stock_actual' => 'decimal:2',
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Insumo asociado a este producto (puede ser nulo).
     */
    public function insumo(): BelongsTo
    {
        return $this->belongsTo(Insumo::class);
    }

    /**
     * Receta de este producto.
     */
    public function receta(): HasOne
    {
        return $this->hasOne(Receta::class);
    }

    /**
     * Detalles de venta donde aparece este producto.
     */
    public function detallesVenta(): HasMany
    {
        return $this->hasMany(DetalleVenta::class);
    }
}
