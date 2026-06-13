<?php

namespace Database\Seeders;

use App\Models\Mobil;
use Illuminate\Database\Seeder;

class MobilSeeder extends Seeder
{
    public function run(): void
    {
        Mobil::insert([
            [
                'plat_nomor' => 'B1234XYZ',
                'nama_mobil' => 'Mitsubishi Colt Diesel',
                'kapasitas_kg' => 8000,
                'foto_mobil' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'plat_nomor' => 'B5678ABC',
                'nama_mobil' => 'Hino Dutro',
                'kapasitas_kg' => 10000,
                'foto_mobil' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
