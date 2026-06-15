import { useState } from 'react';
import axios from 'axios';

// ── Logo WhatsApp SVG resmi ──────────────────────────────────────────────────
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={className}
            fill="none"
        >
            <circle cx="24" cy="24" r="24" fill="#25D366" />
            <path
                fill="#fff"
                d="M34.603 13.337A14.87 14.87 0 0 0 24.054 9C16.29 9 9.972 15.317 9.969 23.083c-.001 2.494.651 4.928 1.89 7.079L9.85 38.15l8.18-2.145a14.94 14.94 0 0 0 7.014 1.786h.006c7.762 0 14.08-6.318 14.083-14.084a14.87 14.87 0 0 0-4.53-10.37zm-10.549 21.69h-.005a12.4 12.4 0 0 1-6.32-1.733l-.453-.269-4.696 1.232 1.254-4.58-.295-.47a12.38 12.38 0 0 1-1.898-6.624c.002-6.843 5.572-12.41 12.419-12.41a12.33 12.33 0 0 1 8.77 3.637 12.33 12.33 0 0 1 3.628 8.773c-.003 6.845-5.573 12.444-12.404 12.444zm6.81-9.3c-.373-.187-2.207-1.09-2.549-1.213-.342-.124-.591-.187-.84.187-.248.374-.963 1.213-1.18 1.463-.217.249-.435.28-.808.094-.373-.187-1.575-.581-3-1.851-1.109-.99-1.857-2.212-2.074-2.585-.217-.374-.023-.576.163-.762.168-.167.373-.436.56-.654.187-.218.249-.374.373-.623.125-.249.063-.468-.031-.655-.094-.187-.84-2.024-1.15-2.772-.303-.728-.61-.629-.84-.641l-.716-.012c-.249 0-.653.093-.995.468-.342.374-1.306 1.276-1.306 3.112s1.337 3.61 1.523 3.859c.187.249 2.63 4.015 6.374 5.63.89.385 1.585.615 2.127.787.894.284 1.707.244 2.35.148.717-.107 2.207-.902 2.518-1.773.311-.871.311-1.618.218-1.773-.092-.156-.341-.25-.715-.437z"
            />
        </svg>
    );
}

type Step = 'phone' | 'otp' | 'profile';

export default function WhatsAppOtpForm() {
    const [step, setStep]       = useState<Step>('phone');
    const [phone, setPhone]     = useState<string>('');
    const [otp, setOtp]         = useState<string>('');
    const [name, setName]       = useState<string>('');
    const [email, setEmail]     = useState<string>('');
    const [verifiedPhone, setVerifiedPhone] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError]     = useState<string>('');

    // ─── Step 1: Kirim OTP ────────────────────────────────────────────────────
    const handleSendOtp = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.post(route('otp.send'), { phone });
            setStep('otp');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Gagal mengirim OTP.');
        } finally {
            setLoading(false);
        }
    };

    // ─── Step 2: Verifikasi OTP ───────────────────────────────────────────────
    const handleVerifyOtp = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(route('otp.verify'), { phone, otp });

            if (res.data.needs_profile) {
                setVerifiedPhone(res.data.phone);
                setStep('profile');
            } else {
                window.location.href = res.data.redirect;
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'OTP tidak valid.');
        } finally {
            setLoading(false);
        }
    };

    // ─── Step 3: Lengkapi Profil ──────────────────────────────────────────────
    const handleCompleteProfile = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(route('otp.complete'), {
                phone: verifiedPhone,
                name,
                email,
            });
            window.location.href = res.data.redirect;
        } catch (err: any) {
            const errData = err.response?.data;
            if (errData?.errors) {
                const messages = Object.values(errData.errors).flat().join(' ');
                setError(messages as string);
            } else {
                setError(errData?.error || 'Gagal menyimpan profil.');
            }
        } finally {
            setLoading(false);
        }
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="mt-4 border-t pt-4">

            {/* ── STEP 1: Input Nomor HP ── */}
            {step === 'phone' && (
                <div className="space-y-3">
                    <p className="text-sm text-gray-500 font-medium text-center">atau masuk via WhatsApp</p>
                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#25D366] focus-within:border-[#25D366] transition">
                        <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500 border-r select-none">
                            +62
                        </span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            placeholder="8123456789"
                            className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                            onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading || !phone}
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        {loading ? 'Mengirim...' : 'Kirim OTP via WhatsApp'}
                    </button>
                </div>
            )}

            {/* ── STEP 2: Input OTP ── */}
            {step === 'otp' && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                        <p className="text-xs text-gray-500">
                            Kode OTP dikirim ke <strong>+62{phone}</strong>
                        </p>
                    </div>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="Masukkan 6 digit OTP"
                        className="w-full border rounded-lg px-3 py-2 text-sm tracking-[0.5em] text-center outline-none focus:ring-2 focus:ring-[#25D366] focus:border-[#25D366] transition font-mono"
                        onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
                        autoFocus
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading || otp.length < 6}
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        {loading ? 'Memverifikasi...' : 'Verifikasi OTP'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                        className="w-full text-xs text-gray-400 hover:text-gray-600 transition"
                    >
                        ← Ganti nomor
                    </button>
                </div>
            )}

            {/* ── STEP 3: Lengkapi Profil ── */}
            {step === 'profile' && (
                <div className="space-y-3">
                    <div className="bg-[#e9fdf0] border border-[#25D366]/40 rounded-lg px-3 py-2.5 flex items-center gap-2">
                        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                        <p className="text-xs text-green-800 font-medium">
                            Nomor <strong>+{verifiedPhone}</strong> berhasil diverifikasi!<br />
                            Lengkapi data diri untuk melanjutkan.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1 font-medium">Nama Lengkap</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan nama lengkap"
                            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#25D366] focus:border-[#25D366] transition"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1 font-medium">Alamat Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="contoh@email.com"
                            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#25D366] focus:border-[#25D366] transition"
                            onKeyDown={(e) => e.key === 'Enter' && handleCompleteProfile()}
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    <button
                        type="button"
                        onClick={handleCompleteProfile}
                        disabled={loading || !name.trim() || !email.trim()}
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        {loading ? 'Menyimpan...' : 'Buat Akun & Masuk'}
                    </button>
                </div>
            )}
        </div>
    );
}