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
        $pengiriman = $this->route('pengiriman');
        $pengirimanId = $pengiriman instanceof \App\Models\Pengiriman ? $pengiriman->id : $pengiriman;

        return [
            'mobil_id' => [
                'required',
                'exists:mobils,id',
                function ($attribute, $value, $fail) use ($pengirimanId) {
                    $isUsed = \App\Models\Pengiriman::where('mobil_id', $value)
                        ->whereIn('status', ['perjalanan', 'menunggu_nota'])
                        ->when($pengirimanId, function ($query) use ($pengirimanId) {
                            return $query->where('id', '!=', $pengirimanId);
                        })
                        ->exists();
                    if ($isUsed) {
                        $fail('Mobil ini sedang dalam proses pengiriman dan belum selesai.');
                    }
                }
            ],
            'lahan_id' => 'required|exists:lahans,id',
            'waktu_berangkat' => 'required|date',
            'berat_netto_kg' => 'nullable|numeric|min:0',
            'status' => 'required|in:perjalanan,menunggu_nota,selesai',
        ];
    }
}
