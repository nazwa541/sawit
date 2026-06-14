<?php

namespace Database\Seeders;

use App\Models\Lahan;
use Illuminate\Database\Seeder;

class LahanSeeder extends Seeder
{
    public function run(): void
    {
        Lahan::insert([
            [
                'nama_blok' => 'Blok A1',
                'luas_ha' => 5.5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_blok' => 'Blok B1',
                'luas_ha' => 8.2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
