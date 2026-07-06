<?php

namespace App\Http\Controllers;

use App\Models\Lahan;
use App\Models\Mobil;
use App\Models\Pengiriman;
use App\Models\User;
use App\Notifications\PengirimanStatusChanged;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

use App\Http\Requests\Pengiriman\StorePengirimanRequest;
use App\Http\Requests\Pengiriman\UpdatePengirimanRequest;

class PengirimanController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $query = Pengiriman::with(['mobil', 'lahan', 'pekerja', 'nota'])->latest();

        // Pekerja hanya bisa melihat pengiriman mereka sendiri
        // Pemilik dan Petugas RAM bisa melihat semua pengiriman
        if ($user->role === 'pekerja') {
            $query->where('pekerja_id', $user->id);
        }

        return Inertia::render('pengiriman/Index', [
            'pengiriman' => $query->get()
        ]);
    }

    public function show(Pengiriman $pengiriman)
    {
        $pengiriman->load(['mobil', 'lahan', 'pekerja', 'nota.petugas']);

        return Inertia::render('pengiriman/Show', [
            'pengiriman' => $pengiriman,
        ]);
    }

    public function create()
    {
        $activeMobilIds = Pengiriman::whereIn('status', ['perjalanan', 'menunggu_nota'])
            ->pluck('mobil_id')
            ->toArray();

        return Inertia::render('pengiriman/Create', [
            'mobils' => Mobil::whereNotIn('id', $activeMobilIds)->orderBy('nama_mobil')->get(),
            'lahans' => Lahan::orderBy('nama_blok')->get(),
        ]);
    }

    public function store(StorePengirimanRequest $request)
    {
        $pengiriman = Pengiriman::create([
            ...$request->validated(),
            'pekerja_id' => auth()->id(),
        ]);

        // Notif ke semua pemilik: ada pengiriman baru masuk
        $pengiriman->load('mobil');
        $pemilik = User::where('role', 'pemilik')->get();
        Notification::send($pemilik, new PengirimanStatusChanged($pengiriman));

        return redirect()
            ->route('pengiriman.index')
            ->with('success', 'Pengiriman berhasil dibuat');
    }

    public function edit(Pengiriman $pengiriman)
    {
        $activeMobilIds = Pengiriman::whereIn('status', ['perjalanan', 'menunggu_nota'])
            ->where('id', '!=', $pengiriman->id)
            ->pluck('mobil_id')
            ->toArray();

        return Inertia::render('pengiriman/Edit', [
            'pengiriman' => $pengiriman,
            'mobils' => Mobil::whereNotIn('id', $activeMobilIds)->orderBy('nama_mobil')->get(),
            'lahans' => Lahan::orderBy('nama_blok')->get(),
        ]);
    }

    public function update(UpdatePengirimanRequest $request, Pengiriman $pengiriman)
    {
        $pengiriman->update($request->validated());

        return redirect()
            ->route('pengiriman.index')
            ->with('success', 'Pengiriman berhasil diperbarui');
    }

    public function destroy(Pengiriman $pengiriman)
    {
        $pengiriman->delete();

        return redirect()
            ->route('pengiriman.index')
            ->with('success', 'Pengiriman berhasil dihapus');
    }

    public function timbang(Pengiriman $pengiriman)
    {
        if ($pengiriman->status !== 'perjalanan') {
            return redirect()->route('pengiriman.index')
                ->with('error', 'Berat sudah diinput atau pengiriman sudah selesai.');
        }

        return Inertia::render('pengiriman/Timbang', [
            'pengiriman' => $pengiriman->load(['mobil', 'lahan']),
        ]);
    }

    public function simpanBerat(Pengiriman $pengiriman)
    {
        request()->validate([
            'berat_netto_kg' => 'required|numeric|min:1|max:99999',
        ]);

        $pengiriman->update([
            'berat_netto_kg' => request('berat_netto_kg'),
            'status' => 'menunggu_nota',
        ]);

        // Notif ke semua pemilik + petugas RAM: ada pengiriman menunggu nota
        $pengiriman->load('mobil');
        $penerima = User::whereIn('role', ['pemilik', 'petugas_ram'])->get();
        Notification::send($penerima, new PengirimanStatusChanged($pengiriman));

        return redirect()->route('pengiriman.index')
            ->with('success', 'Berat berhasil diinput. Status berubah ke Menunggu Nota.');
    }
}
