<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    protected $fillable = [
        'pengiriman_id',
        'petugas_id',
        'foto_nota',
        'waktu_upload',
    ];

    protected $casts = [
        'waktu_upload' => 'datetime',
    ];

    public function pengiriman()
    {
        return $this->belongsTo(Pengiriman::class);
    }

    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }
}
