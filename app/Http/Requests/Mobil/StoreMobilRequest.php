<?php

namespace App\Http\Requests\Mobil;

use Illuminate\Foundation\Http\FormRequest;

class StoreMobilRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'plat_nomor' => 'required|string|max:255|unique:mobils,plat_nomor',
            'nama_mobil' => 'required|string|max:255',
            'kapasitas_kg' => 'required|integer|min:1',
            'foto_mobil' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
