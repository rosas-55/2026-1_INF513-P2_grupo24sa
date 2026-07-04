<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TemaUsuario extends Model
{
    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'tema_usuario';

    /**
     * Solo usamos updated_at.
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
        'user_id',
        'tema',
        'modo',
        'tamano_letra',
        'alto_contraste',
        'updated_at',
    ];

    /**
     * Los atributos que deben tener un cast de tipo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
            'alto_contraste' => 'boolean',
        ];
    }

    // ═══════════════════════════════════════════════
    // CONSTANTES
    // ═══════════════════════════════════════════════

    public const TEMA_NINOS   = 'ninos';
    public const TEMA_JOVENES = 'jovenes';
    public const TEMA_ADULTOS = 'adultos';

    public const MODO_DIA    = 'dia';
    public const MODO_NOCHE  = 'noche';
    public const MODO_AUTO   = 'auto';

    public const LETRA_PEQUENO = 'pequeno';
    public const LETRA_NORMAL  = 'normal';
    public const LETRA_GRANDE  = 'grande';

    // ═══════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
