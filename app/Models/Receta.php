<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Receta extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'receta';

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
        'producto_id',
        'descripcion',
        'tiempo_preparacion',
    ];

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Producto al que pertenece esta receta.
     */
    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    /**
     * Insumos utilizados en esta receta (vía tabla pivote con cantidad).
     */
    public function insumos(): BelongsToMany
    {
        return $this->belongsToMany(Insumo::class, 'receta_insumo')
                    ->using(RecetaInsumo::class)
                    ->withPivot('cantidad');
    }

    /**
     * Producciones realizadas con esta receta.
     */
    public function producciones(): HasMany
    {
        return $this->hasMany(Produccion::class);
    }
}
