<?php

use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LahanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MobilController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PengirimanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest');

// Route Dashboard utama (Redirector)
Route::middleware(['auth'])->get('/dashboard', function () {
    $role = auth()->user()->role ?? 'pekerja';
    if ($role === 'pemilik') return redirect()->route('dashboard.pemilik');
    if ($role === 'petugas_ram') return redirect()->route('dashboard.ram');
    return redirect()->route('dashboard.pekerja');
})->name('dashboard');

// Route Pemilik
Route::middleware(['auth', 'role:pemilik'])
    ->get('/dashboard-pemilik', [DashboardController::class, 'pemilik'])
    ->name("dashboard.pemilik");

// Route Pekerja
Route::middleware(['auth', 'role:pekerja'])
    ->get('/dashboard-pekerja', [DashboardController::class, 'pekerja'])
    ->name("dashboard.pekerja");

// Route Petugas RAM
Route::middleware(['auth', 'role:petugas_ram'])
    ->get('/dashboard-ram', [DashboardController::class, 'ram'])
    ->name("dashboard.ram");


// Route Laporan (khusus pemilik)
Route::middleware(['auth', 'role:pemilik'])
    ->get('/laporan', [LaporanController::class, 'index'])
    ->name('laporan.index');

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
Route::resource('pengiriman', PengirimanController::class);

// Route input berat netto (khusus pekerja)
Route::middleware(['auth', 'role:pekerja'])->group(function () {
    Route::get('/pengiriman/{pengiriman}/timbang', [PengirimanController::class, 'timbang'])
        ->name('pengiriman.timbang');
    Route::patch('/pengiriman/{pengiriman}/timbang', [PengirimanController::class, 'simpanBerat'])
        ->name('pengiriman.simpan-berat');
});


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

// Route PDF
Route::get('/laporan/pdf', [LaporanController::class, 'exportPdf']);

// Notification
Route::middleware('auth')->group(function () {
    // ... route lain yang sudah ada
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead']);
});

// Google WA
Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);
Route::post('/auth/otp/send',   [OtpController::class, 'sendOtp'])
    ->middleware('throttle:5,1')
    ->name('otp.send');

Route::post('/auth/otp/verify', [OtpController::class, 'verifyOtp'])
    ->name('otp.verify');

Route::post('/auth/otp/complete', [OtpController::class, 'completeProfile'])
    ->name('otp.complete');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
