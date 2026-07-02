<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bitacora extends Model
{
    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'bitacora';

    /**
     * Solo usamos created_at.
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
        'tipo',
        'recurso',
        'ip_address',
        'user_agent',
        'datos_extra',
        'created_at',
    ];

    /**
     * Los atributos que deben tener un cast de tipo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'datos_extra' => 'array',
        ];
    }

    // ═══════════════════════════════════════════════
    // CONSTANTES
    // ═══════════════════════════════════════════════

    public const TIPO_LOGIN_OK       = 'LOGIN_OK';
    public const TIPO_LOGIN_FAIL     = 'LOGIN_FAIL';
    public const TIPO_ACCESO_RECURSO = 'ACCESO_RECURSO';

    // ═══════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
