<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContadorVisitas extends Model
{
    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'contador_visitas';

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
        'ruta',
        'nombre_pagina',
        'total_visitas',
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
            'total_visitas' => 'integer',
        ];
    }
}
