<?php

namespace App\Http\Requests\Pengiriman;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePengirimanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'mobil_id' => 'required|exists:mobils,id',
            'lahan_id' => 'required|exists:lahans,id',
            'waktu_berangkat' => 'required|date',
            'berat_netto_kg' => 'nullable|numeric|min:0',
            'status' => 'required|in:perjalanan,menunggu_nota,selesai',
        ];
    }
}
