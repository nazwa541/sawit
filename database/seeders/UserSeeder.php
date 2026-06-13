<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Pemilik Kebun',
            'email' => 'pemilik@sawit.com',
            'phone' => '081111111111',
            'role' => 'pemilik',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Pekerja Kebun',
            'email' => 'pekerja@sawit.com',
            'phone' => '082222222222',
            'role' => 'pekerja',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Petugas RAM',
            'email' => 'ram@sawit.com',
            'phone' => '083333333333',
            'role' => 'petugas_ram',
            'password' => Hash::make('password'),
        ]);
    }
}
