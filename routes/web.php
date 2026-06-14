<?php

use App\Http\Controllers\LahanController;
use App\Http\Controllers\MobilController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\PengirimanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest')->name('home');

Route::middleware(['auth'])->group(function () {
    // We will keep a generic fallback dashboard route just in case
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Route Pemilik
Route::middleware(['auth', 'role:pemilik'])
    ->get('/dashboard-pemilik', function () {
        return Inertia::render('Pemilik/Dashboard');
    })->name("dashboard.pemilik");


// Route Pekerja
Route::middleware(['auth', 'role:pekerja'])
    ->get('/dashboard-pekerja', function () {
        return Inertia::render('Pekerja/Dashboard');
    })->name("dashboard.pekerja");


// Route Petugas RAM
Route::middleware(['auth', 'role:petugas_ram'])
    ->get('/dashboard-ram', function () {
        return Inertia::render('PetugasRam/Dashboard');
    })->name("dashboard.ram");


// Route Mobil
Route::middleware(['auth'])
    ->group(function () {

        Route::resource('mobil', MobilController::class);
    });


// Route Lahan
Route::middleware(['auth'])->group(function () {

    Route::resource('lahan', LahanController::class);
});


// Route Pengiriman
Route::resource(
    'pengiriman',
    PengirimanController::class
);


// Route Nota
Route::middleware([
    'auth',
    'role:petugas_ram'
])->group(function () {

    Route::get('/nota', [NotaController::class, 'index'])
        ->name('nota.index');

    Route::get('/nota/{pengiriman}/upload', [NotaController::class, 'create'])
        ->name('nota.create');

    Route::post('/nota/{pengiriman}', [NotaController::class, 'store'])
        ->name('nota.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
