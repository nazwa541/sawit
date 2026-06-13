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
                'nama_blok' => 'A1',
                'luas_ha' => 5.50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_blok' => 'B1',
                'luas_ha' => 8.25,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
