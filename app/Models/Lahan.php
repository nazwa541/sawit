<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lahan extends Model
{
    protected $fillable = [
        'nama_blok',
        'luas_ha'
    ];

    public function pengiriman()
    {
        return $this->hasMany(Pengiriman::class);
    }
}
