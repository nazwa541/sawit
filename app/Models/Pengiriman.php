<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengiriman extends Model
{
    protected $fillable = [
        'mobil_id',
        'lahan_id',
        'pekerja_id',
        'waktu_berangkat',
        'berat_netto_kg',
        'status',
    ];

    protected $casts = [
        'waktu_berangkat' => 'datetime',
    ];

    public function mobil()
    {
        return $this->belongsTo(Mobil::class);
    }

    public function lahan()
    {
        return $this->belongsTo(Lahan::class);
    }

    public function pekerja()
    {
        return $this->belongsTo(User::class, 'pekerja_id');
    }

    public function nota()
    {
        return $this->hasOne(Nota::class);
    }
}
