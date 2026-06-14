<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lahan\StoreLahanRequest;
use App\Models\Lahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LahanController extends Controller
{
    public function index()
    {
        return Inertia::render('lahan/Index', [
            'lahans' => Lahan::latest()->get()
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
