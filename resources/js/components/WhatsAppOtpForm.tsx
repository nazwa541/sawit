import { useState } from 'react';
import axios from 'axios';

export default function WhatsAppOtpForm() {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

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

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(route('otp.verify'), { phone, otp });
            window.location.href = res.data.redirect;
        } catch (err: any) {
            setError(err.response?.data?.error || 'OTP tidak valid.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 border-t pt-4">
            <p className="text-sm text-gray-600 mb-2 font-medium">
                Masuk via WhatsApp OTP
            </p>

            {step === 'phone' ? (
                <div className="space-y-3">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500 border-r">
                            +62
                        </span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="8123456789"
                            className="flex-1 px-3 py-2 text-sm outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading || !phone}
                        className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? 'Mengirim...' : '📲 Kirim OTP ke WhatsApp'}
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                        OTP dikirim ke WhatsApp <strong>+62{phone}</strong>
                    </p>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Masukkan 6 digit OTP"
                        className="w-full border rounded-lg px-3 py-2 text-sm tracking-widest text-center outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading || otp.length < 6}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? 'Memverifikasi...' : 'Verifikasi OTP'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                        className="w-full text-xs text-gray-400 hover:text-gray-600 mt-1"
                    >
                        Ganti nomor
                    </button>
                </div>
            )}
        </div>
    );
}