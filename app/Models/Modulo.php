<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Modulo extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'modulo';

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
        'codigo',
        'descripcion',
        'estado',
        'name',
        'nivel',
    ];

    /**
     * Los atributos que deben tener un cast de tipo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'nivel' => 'integer',
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Roles que tienen acceso a este módulo.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_modulo', 'modulo_id', 'role_id');
    }

    /**
     * Acciones disponibles dentro de este módulo.
     */
    public function acciones(): HasMany
    {
        return $this->hasMany(Accion::class);
    }
}
