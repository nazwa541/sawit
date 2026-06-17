import { Head, Link, useForm } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeftIcon, LoaderCircle, UploadCloudIcon, TruckIcon, MapPinIcon, UserIcon, ScaleIcon, AlertTriangleIcon, XIcon } from 'lucide-react';
import InputError from '@/components/input-error';

interface Pengiriman {
    id: number;
    berat_netto_kg: number | null;
    mobil: { nama_mobil: string; plat_nomor: string };
    lahan: { nama_blok: string };
    pekerja: { name: string };
}

export default function NotaUpload({ pengiriman }: { pengiriman: Pengiriman }) {
    const { data, setData, post, processing, errors } = useForm({
        berat_ram_kg: '',
        foto_nota: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/nota/${pengiriman.id}`);
    };

    const beratPekerja = pengiriman.berat_netto_kg ?? 0;
    const beratRam = Number(data.berat_ram_kg) || 0;
    const selisih = beratRam - beratPekerja;

    return (
        <AppHeaderLayout>
            <Head title="Upload Bukti Timbang" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Link href="/nota">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Upload Bukti Timbang</h1>
                        <p className="text-sm text-muted-foreground">Masukkan berat sesuai nota RAM dan unggah foto buktinya.</p>
                    </div>
                </div>

                <div className="mx-auto mt-4 w-full max-w-xl space-y-4">

                    {/* Info pengiriman */}
                    <Card className="rounded-[20px] shadow-sm border-border bg-muted/30">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex items-center gap-3 text-sm">
                                <TruckIcon className="size-4 text-muted-foreground shrink-0" />
                                <span className="font-medium uppercase tracking-wider">{pengiriman.mobil?.plat_nomor}</span>
                                <span className="text-muted-foreground">— {pengiriman.mobil?.nama_mobil}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPinIcon className="size-4 text-muted-foreground shrink-0" />
                                <span>Blok: <span className="font-medium">{pengiriman.lahan?.nama_blok}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <UserIcon className="size-4 text-muted-foreground shrink-0" />
                                <span>Supir: <span className="font-medium">{pengiriman.pekerja?.name}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <ScaleIcon className="size-4 text-muted-foreground shrink-0" />
                                <span>Berat laporan supir: <span className="font-semibold text-foreground">
                                    {beratPekerja > 0 ? `${beratPekerja.toLocaleString('id-ID')} kg` : '-'}
                                </span></span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form */}
                    <Card className="rounded-[20px] shadow-sm">
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Data Timbangan RAM</CardTitle>
                                <CardDescription>Masukkan berat sesuai yang tertulis di nota timbangan asli.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Berat RAM */}
                                <div className="space-y-2">
                                    <Label htmlFor="berat_ram_kg">Berat Netto Menurut Nota RAM (kg)</Label>
                                    <div className="relative">
                                        <Input
                                            id="berat_ram_kg"
                                            type="number"
                                            min="1"
                                            placeholder="Contoh: 8500"
                                            className="pr-12 text-lg font-semibold"
                                            value={data.berat_ram_kg}
                                            onChange={(e) => setData('berat_ram_kg', e.target.value)}
                                            autoFocus
                                            required
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">kg</span>
                                    </div>
                                    <InputError message={errors.berat_ram_kg} />

                                    {/* Perbandingan selisih */}
                                    {data.berat_ram_kg !== '' && beratPekerja > 0 && (
                                        <div className={`rounded-lg border p-3 text-sm ${selisih === 0
                                            ? 'border-[#FFD4CC] bg-[#FFF2F0] text-[#F0654F] dark:border-[#5A2820]/30 dark:bg-[#3A1714]/20 dark:text-[#FF9485]'
                                            : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400'
                                            }`}>
                                            {selisih === 0 ? (
                                                <span>✓ Berat sesuai dengan laporan supir.</span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <AlertTriangleIcon className="size-4 shrink-0" />
                                                    Selisih: <strong>{selisih > 0 ? '+' : ''}{selisih.toLocaleString('id-ID')} kg</strong>
                                                    {' '}({selisih > 0 ? 'nota RAM lebih berat' : 'nota RAM lebih ringan'} dari laporan supir)
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Upload foto */}
                                <div className="space-y-2">
                                    <Label htmlFor="foto_nota">Foto Nota Asli</Label>

                                    {/* Area upload — sembunyikan kalau sudah ada foto */}
                                    {!data.foto_nota && (
                                        <div className="flex w-full items-center justify-center">
                                            <label htmlFor="foto_nota" className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50">
                                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                    <UploadCloudIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                                                    <p className="mb-1 text-sm text-muted-foreground">
                                                        <span className="font-semibold">Klik untuk mengunggah</span> atau seret file
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">PNG, JPG (Maks 4MB)</p>
                                                </div>
                                                <input
                                                    id="foto_nota"
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => setData('foto_nota', e.target.files ? e.target.files[0] : null)}
                                                />
                                            </label>
                                        </div>
                                    )}

                                    {/* Preview foto */}
                                    {data.foto_nota && (
                                        <div className="space-y-2">
                                            <div className="relative overflow-hidden rounded-lg border border-border">
                                                <img
                                                    src={URL.createObjectURL(data.foto_nota)}
                                                    alt="Preview nota"
                                                    className="w-full max-h-64 object-contain bg-muted/30"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setData('foto_nota', null)}
                                                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                >
                                                    <XIcon className="size-3" />
                                                </button>
                                            </div>
                                            <p className="text-sm font-medium text-[#FF7E6B]">✓ {data.foto_nota.name}</p>
                                        </div>
                                    )}

                                    <InputError message={errors.foto_nota} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t p-6">
                                <Button
                                    type="submit"
                                    className="bg-[#FF7E6B] hover:bg-[#FF9485]"
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Simpan & Selesaikan
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppHeaderLayout>
    );
}