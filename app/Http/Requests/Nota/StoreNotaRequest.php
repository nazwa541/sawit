<?php

namespace App\Http\Requests\Nota;

use Illuminate\Foundation\Http\FormRequest;

class StoreNotaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'foto_nota' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png',
                'max:4096',
            ],

            'berat_netto_kg' => [
                'required',
                'numeric',
                'min:1',
            ],
        ];
    }
}
