<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mobil extends Model
{
    protected $fillable = [
        'plat_nomor',
        'nama_mobil',
        'foto_mobil',
        'kapasitas_kg'
    ];

    public function pengiriman()
    {
        return $this->hasMany(Pengiriman::class);
    }
}
