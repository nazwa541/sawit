<?php

namespace Database\Seeders;

use App\Models\Nota;
use Illuminate\Database\Seeder;

class NotaSeeder extends Seeder
{
    public function run(): void
    {
        Nota::create([
            'pengiriman_id' => 1,
            'petugas_id' => 3,
            'foto_nota' => 'nota/contoh.jpg',
            'waktu_upload' => now(),
        ]);
    }
}
