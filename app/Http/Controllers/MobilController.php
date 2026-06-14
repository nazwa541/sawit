<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mobil\StoreMobilRequest;
use App\Http\Requests\Mobil\UpdateMobilRequest;
use App\Models\Mobil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MobilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('mobil/Index', [
            'mobils' => Mobil::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('mobil/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMobilRequest $request)
    {
        $validated = $request->validated();

        $fotoPath = null;

        if ($request->hasFile('foto_mobil')) {
            $fotoPath = $request
                ->file('foto_mobil')
                ->store('mobil', 'public');
        }

        Mobil::create([
            'plat_nomor' => $validated['plat_nomor'],
            'nama_mobil' => $validated['nama_mobil'],
            'kapasitas_kg' => $validated['kapasitas_kg'],
            'foto_mobil' => $fotoPath,
        ]);

        return redirect()
            ->route('mobil.index')
            ->with('success', 'Mobil berhasil ditambahkan');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mobil $mobil)
    {
        return Inertia::render('mobil/Edit', [
            'mobil' => $mobil
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMobilRequest $request, Mobil $mobil)
    {
        $validated = $request->validated();

        if ($request->hasFile('foto_mobil')) {

            if (
                $mobil->foto_mobil &&
                Storage::disk('public')->exists($mobil->foto_mobil)
            ) {
                Storage::disk('public')->delete($mobil->foto_mobil);
            }

            $mobil->foto_mobil = $request
                ->file('foto_mobil')
                ->store('mobil', 'public');
        }

        $mobil->plat_nomor = $validated['plat_nomor'];
        $mobil->nama_mobil = $validated['nama_mobil'];
        $mobil->kapasitas_kg = $validated['kapasitas_kg'];

        $mobil->save();

        return redirect()
            ->route('mobil.index')
            ->with('success', 'Mobil berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mobil $mobil)
    {
        if (
            $mobil->foto_mobil &&
            Storage::disk('public')->exists($mobil->foto_mobil)
        ) {
            Storage::disk('public')->delete($mobil->foto_mobil);
        }

        $mobil->delete();

        return redirect()
            ->route('mobil.index')
            ->with('success', 'Mobil berhasil dihapus');
    }
}
