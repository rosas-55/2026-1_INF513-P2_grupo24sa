<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'User';

    /**
     * La BD no tiene created_at / updated_at.
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
        'cedula',
        'celular',
        'direccion',
        'email',
        'name',
        'password',
    ];

    /**
     * Los atributos ocultos en serialización.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // REMEMBER TOKEN — deshabilitado (no existe columna en BD)
    // ═══════════════════════════════════════════════════════════

    /**
     * No usar remember_token (la tabla no tiene esa columna).
     */
    public function getRememberToken(): ?string
    {
        return null;
    }

    public function setRememberToken($value): void
    {
        // no-op: la tabla "User" no tiene remember_token
    }

    public function getRememberTokenName(): string
    {
        return '';
    }

    // ═══════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════

    /**
     * Ventas donde el usuario es el cliente.
     */
    public function comprasComoCliente(): HasMany
    {
        return $this->hasMany(Venta::class, 'cliente_id');
    }

    /**
     * Ventas donde el usuario es el vendedor.
     */
    public function ventasComoVendedor(): HasMany
    {
        return $this->hasMany(Venta::class, 'vendedor_id');
    }

    /**
     * Roles asignados al usuario.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_users', 'user_id', 'role_id');
    }

    /**
     * Entradas de bitácora de este usuario.
     */
    public function bitacoras(): HasMany
    {
        return $this->hasMany(Bitacora::class);
    }

    /**
     * Preferencias de tema del usuario.
     */
    public function tema(): HasOne
    {
        return $this->hasOne(TemaUsuario::class);
    }
}
