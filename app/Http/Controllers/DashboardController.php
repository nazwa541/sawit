<?php

namespace App\Http\Controllers;

use App\Models\Lahan;
use App\Models\Mobil;
use App\Models\Pengiriman;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalMobil = Mobil::count();

        $totalLahan = Lahan::count();

        $totalPengiriman = Pengiriman::count();

        $pengirimanSelesai = Pengiriman::where(
            'status',
            'selesai'
        )->count();

        $menungguNota = Pengiriman::where(
            'status',
            'menunggu_nota'
        )->count();

        $totalBeratSawit = Pengiriman::whereNotNull(
            'berat_netto_kg'
        )->sum('berat_netto_kg');

        $pengirimanTerbaru = Pengiriman::with([
            'mobil',
            'lahan',
            'pekerja',
        ])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard/Index', [
            'stats' => [
                'totalMobil' => $totalMobil,
                'totalLahan' => $totalLahan,
                'totalPengiriman' => $totalPengiriman,
                'pengirimanSelesai' => $pengirimanSelesai,
                'menungguNota' => $menungguNota,
                'totalBeratSawit' => $totalBeratSawit,
            ],

            'pengirimanTerbaru' => $pengirimanTerbaru,
        ]);
    }
}
