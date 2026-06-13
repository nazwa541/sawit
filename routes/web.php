<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Route Pemilik
Route::middleware(['auth', 'role:pemilik'])
    ->get('/dashboard-pemilik', function () {
        return 'Dashboard Pemilik';
    })->name("dashboard.pemilik");


// Route Pekerja
Route::middleware(['auth', 'role:pekerja'])
    ->get('/dashboard-pekerja', function () {
        return 'Dashboard Pekerja';
    })->name("dashboard.pekerja");


// Route Petugas RAM
Route::middleware(['auth', 'role:petugas_ram'])
    ->get('/dashboard-ram', function () {
        return 'Dashboard Petugas RAM';
    })->name("dashboard.ram");

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
