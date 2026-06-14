<?php

namespace App\Http\Requests\Lahan;

use Illuminate\Foundation\Http\FormRequest;

class StoreLahanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_blok' => 'required|string|max:255',
            'luas_ha' => 'required|numeric|min:0.1',
        ];
    }
}
