<?php

namespace Database\Seeders;

use App\Models\Pengiriman;
use Illuminate\Database\Seeder;

class PengirimanSeeder extends Seeder
{
    public function run(): void
    {
        Pengiriman::create([
            'mobil_id' => 1,
            'lahan_id' => 1,
            'pekerja_id' => 2,
            'waktu_berangkat' => now(),
            'berat_netto_kg' => 7500,
            'status' => 'menunggu_nota',
        ]);
    }
}
