<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lahan\StoreLahanRequest;
use App\Http\Requests\Lahan\UpdateLahanRequest;
use App\Models\Lahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LahanController extends Controller
{
    public function index(Request $request)
    {
        // Ambil parameter pencarian dari query string
        $search = $request->input('search');

        // Query dengan pencarian (jika ada)
        $query = Lahan::query();

        if ($search) {
            $query->where('nama_blok', 'like', "%{$search}%");
        }

        // Gunakan paginate(10) untuk 10 data per halaman
        $lahans = $query->latest()->paginate(3);

        // Jika ada parameter search, tambahkan ke pagination agar tetap terbawa
        if ($search) {
            $lahans->appends(['search' => $search]);
        }

        return Inertia::render('lahan/Index', [
            'lahans' => $lahans
        ]);
    }

    public function create()
    {
        return Inertia::render('lahan/Create');
    }

    public function store(StoreLahanRequest $request)
    {
        Lahan::create($request->validated());

        return redirect()
            ->route('lahan.index')
            ->with('success', 'Lahan berhasil ditambahkan');
    }

    public function edit(Lahan $lahan)
    {
        return Inertia::render('lahan/Edit', [
            'lahan' => $lahan
        ]);
    }

    public function update(UpdateLahanRequest $request, Lahan $lahan)
    {
        $lahan->update($request->validated());

        return redirect()
            ->route('lahan.index')
            ->with('success', 'Lahan berhasil diperbarui');
    }

    public function destroy(Lahan $lahan)
    {
        $lahan->delete();

        return redirect()
            ->route('lahan.index')
            ->with('success', 'Lahan berhasil dihapus');
    }
}
