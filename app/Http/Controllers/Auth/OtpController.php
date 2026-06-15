<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OtpController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|min:9|max:13',
        ]);

        $phone = $this->formatPhone($request->phone);
        $otp = (string) rand(100000, 999999);

        Cache::put("otp_{$phone}", $otp, now()->addMinutes(5));

        $response = Http::withHeaders([
            'Authorization' => env('FONNTE_TOKEN'),
        ])->post('https://api.fonnte.com/send', [
            'target'  => $phone,
            'message' => "Kode OTP Anda: *{$otp}*\n\nJangan berikan kode ini kepada siapapun. Berlaku 5 menit.",
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Gagal mengirim OTP. Coba lagi.'], 500);
        }

        return response()->json(['message' => 'OTP berhasil dikirim ke WhatsApp Anda.']);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp'   => 'required|string|digits:6',
        ]);

        $phone     = $this->formatPhone(trim($request->phone));
        $inputOtp  = trim($request->otp);
        $cachedOtp = (string) Cache::get("otp_{$phone}");

        Log::info('Verify OTP Debug', [
            'input_phone'  => $request->phone,
            'format_phone' => $phone,
            'input_otp'    => $inputOtp,
            'cached_otp'   => $cachedOtp,
            'match'        => ($cachedOtp === $inputOtp),
        ]);

        if (!$cachedOtp || $cachedOtp !== $inputOtp) {
            return response()->json([
                'error' => 'OTP tidak valid atau sudah kadaluarsa.',
                'debug' => [
                    'cached' => $cachedOtp,
                    'input'  => $inputOtp,
                    'phone'  => $phone,
                ]
            ], 422);
        }

        // OTP valid — hapus dari cache
        Cache::forget("otp_{$phone}");

        // Cek apakah user dengan nomor ini sudah terdaftar
        $existingUser = User::where('phone', $phone)->first();

        if ($existingUser) {
            // User sudah ada → langsung login
            Auth::login($existingUser, true);
            return response()->json([
                'message'  => 'Login berhasil.',
                'redirect' => route('dashboard'),
            ]);
        }

        // User belum ada → simpan flag verified, minta isi profil
        Cache::put("otp_verified_{$phone}", true, now()->addMinutes(10));

        return response()->json([
            'needs_profile' => true,
            'phone'         => $phone,
            'message'       => 'OTP terverifikasi. Silakan lengkapi profil Anda.',
        ]);
    }

    public function completeProfile(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'name'  => 'required|string|min:2|max:100',
            'email' => 'required|email|unique:users,email',
        ]);

        $phone = $this->formatPhone(trim($request->phone));

        // Pastikan OTP sudah diverifikasi sebelumnya
        if (!Cache::get("otp_verified_{$phone}")) {
            return response()->json([
                'error' => 'Sesi verifikasi OTP tidak ditemukan atau sudah kadaluarsa. Ulangi dari awal.',
            ], 403);
        }

        Cache::forget("otp_verified_{$phone}");

        $user = User::create([
            'name'              => $request->name,
            'email'             => $request->email,
            'phone'             => $phone,
            'email_verified_at' => now(),
        ]);

        Auth::login($user, true);

        return response()->json([
            'message'  => 'Akun berhasil dibuat. Selamat datang!',
            'redirect' => route('dashboard'),
        ]);
    }

    private function formatPhone(string $phone): string
    {
        $phone = preg_replace('/\D/', '', $phone);

        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        } elseif (!str_starts_with($phone, '62')) {
            $phone = '62' . $phone;
        }

        return $phone;
    }
}
