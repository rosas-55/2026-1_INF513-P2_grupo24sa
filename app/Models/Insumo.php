<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Insumo extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'insumo';

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
        'nombre',
        'descripcion',
        'costo_unitario',
        'estado',
        'stock_actual',
        'stock_minimo',
        'unidad_medida',
    ];

    /**
     * Los atributos que deben tener un cast de tipo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'costo_unitario' => 'decimal:2',
            'stock_actual' => 'decimal:2',
            'stock_minimo' => 'decimal:2',
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Detalles de compra que incluyen este insumo.
     */
    public function detallesCompra(): HasMany
    {
        return $this->hasMany(DetalleCompra::class);
    }

    /**
     * Movimientos de inventario de este insumo.
     */
    public function inventarios(): HasMany
    {
        return $this->hasMany(Inventario::class);
    }

    /**
     * Productos asociados a este insumo.
     */
    public function productos(): HasMany
    {
        return $this->hasMany(Producto::class);
    }

    /**
     * Recetas que utilizan este insumo (vía tabla pivote).
     */
    public function recetas(): BelongsToMany
    {
        return $this->belongsToMany(Receta::class, 'receta_insumo')
                    ->using(RecetaInsumo::class)
                    ->withPivot('cantidad');
    }
}
