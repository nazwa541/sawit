<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use App\Models\Pengiriman;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use App\Http\Requests\Nota\StoreNotaRequest;

class NotaController extends Controller
{
    public function index()
    {
        return Inertia::render('nota/Index', [
            'pengiriman' => Pengiriman::with([
                'mobil',
                'lahan',
                'pekerja'
            ])
                ->where('status', 'menunggu_nota')
                ->get()
        ]);
    }

    public function create(Pengiriman $pengiriman)
    {
        return Inertia::render('nota/Upload', [
            'pengiriman' => $pengiriman
        ]);
    }

    public function store(
        StoreNotaRequest $request,
        Pengiriman $pengiriman
    ) {

        $fotoPath = $request
            ->file('foto_nota')
            ->store('nota', 'public');

        Nota::create([
            'pengiriman_id' => $pengiriman->id,
            'petugas_id' => auth()->id(),
            'foto_nota' => $fotoPath,
            'waktu_upload' => now(),
        ]);

        $pengiriman->update([
            'berat_netto_kg' => $request->berat_netto_kg,
            'status' => 'selesai',
        ]);

        return redirect()
            ->route('nota.index')
            ->with('success', 'Nota berhasil diupload');
    }
}
