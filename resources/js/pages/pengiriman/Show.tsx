import { Head, Link } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftIcon, TruckIcon, MapPinIcon, UserIcon, ClockIcon, ScaleIcon, CameraIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Nota {
    id: number;
    berat_ram_kg: number | null;
    foto_nota: string;
    waktu_upload: string;
    petugas: { name: string };
}

interface Pengiriman {
    id: number;
    waktu_berangkat: string;
    berat_netto_kg: number | null;
    status: string;
    mobil: { nama_mobil: string; plat_nomor: string; kapasitas_kg: number };
    lahan: { nama_blok: string; luas_ha: number };
    pekerja: { name: string };
    nota: Nota | null;
}

function statusBadgeStyle(status: string) {
    if (status === 'perjalanan')    return 'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-blue-500/20 dark:text-blue-400';
    if (status === 'menunggu_nota') return 'bg-[#FEF3C7] text-[#B45309] dark:bg-amber-500/20 dark:text-amber-400';
    if (status === 'selesai')       return 'bg-[#FFE7E2] text-[#2B2E6B] dark:bg-[#FF7E6B]/20 dark:text-[#FF9485]';
    return '';
}

function statusLabel(status: string) {
    if (status === 'perjalanan')    return 'Perjalanan';
    if (status === 'menunggu_nota') return 'Menunggu Nota';
    if (status === 'selesai')       return 'Selesai';
    return status;
}

export default function PengirimanShow({ pengiriman }: { pengiriman: Pengiriman }) {
    const nota = pengiriman.nota;
    const beratPekerja = pengiriman.berat_netto_kg ?? 0;
    const beratRam = nota?.berat_ram_kg ?? 0;
    const selisih = beratRam - beratPekerja;
    const adaSelisih = nota && beratPekerja > 0 && beratRam > 0 && selisih !== 0;

    return (
        <AppHeaderLayout>
            <Head title={`Detail Pengiriman #${pengiriman.id}`} />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Link href="/pengiriman">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight">Detail Pengiriman #{pengiriman.id}</h1>
                            <Badge className={cn("rounded-full border-none shadow-none whitespace-nowrap", statusBadgeStyle(pengiriman.status))}>
                                {statusLabel(pengiriman.status)}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {new Date(pengiriman.waktu_berangkat).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
                        </p>
                    </div>
                </div>

                {/* Alert selisih */}
                {adaSelisih && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
                        <AlertTriangleIcon className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-red-700 dark:text-red-400">Terdeteksi Selisih Timbangan</p>
                            <p className="text-sm text-red-600 dark:text-red-400 mt-0.5">
                                Berat laporan supir <strong>{beratPekerja.toLocaleString('id-ID')} kg</strong> berbeda dengan nota RAM <strong>{beratRam.toLocaleString('id-ID')} kg</strong>.
                                Selisih: <strong>{selisih > 0 ? '+' : ''}{selisih.toLocaleString('id-ID')} kg</strong> ({selisih > 0 ? 'RAM lebih berat' : 'RAM lebih ringan'}).
                            </p>
                        </div>
                    </div>
                )}

                {nota && !adaSelisih && beratPekerja > 0 && beratRam > 0 && (
                    <div className="flex items-center gap-3 rounded-lg border border-[#FFD4CC] bg-[#FFF2F0] p-4 dark:border-[#5A2820]/30 dark:bg-[#3A1714]/20">
                        <CheckCircleIcon className="size-5 text-[#F0654F] dark:text-[#FF9485] shrink-0" />
                        <p className="text-sm font-medium text-[#F0654F] dark:text-[#FF9485]">
                            Berat laporan supir sesuai dengan nota RAM. Tidak ada selisih.
                        </p>
                    </div>
                )}

                <div className="grid gap-4 lg:grid-cols-2">

                    {/* Info pengiriman */}
                    <Card className="rounded-[20px] shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Informasi Pengiriman</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <TruckIcon className="size-4 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="font-medium uppercase tracking-wider">{pengiriman.mobil?.plat_nomor}</p>
                                    <p className="text-xs text-muted-foreground">{pengiriman.mobil?.nama_mobil} · Kapasitas {pengiriman.mobil?.kapasitas_kg?.toLocaleString('id-ID')} kg</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPinIcon className="size-4 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="font-medium">{pengiriman.lahan?.nama_blok}</p>
                                    <p className="text-xs text-muted-foreground">Luas {pengiriman.lahan?.luas_ha} Ha</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <UserIcon className="size-4 text-muted-foreground shrink-0" />
                                <p>{pengiriman.pekerja?.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <ClockIcon className="size-4 text-muted-foreground shrink-0" />
                                <p>{new Date(pengiriman.waktu_berangkat).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Komparasi berat */}
                    <Card className="rounded-[20px] shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <ScaleIcon className="size-4" />
                                Perbandingan Berat
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                                    <p className="text-xs text-muted-foreground mb-1">Laporan Supir</p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {beratPekerja > 0 ? beratPekerja.toLocaleString('id-ID') : '-'}
                                    </p>
                                    {beratPekerja > 0 && <p className="text-xs text-muted-foreground">kg</p>}
                                    <p className="text-xs text-muted-foreground mt-1">{pengiriman.pekerja?.name}</p>
                                </div>
                                <div className={cn(
                                    "rounded-lg border p-4 text-center",
                                    nota
                                        ? adaSelisih
                                            ? "border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-950/20"
                                            : "border-[#FFD4CC] bg-[#FFF2F0] dark:border-[#5A2820]/30 dark:bg-[#3A1714]/20"
                                        : "border-border bg-muted/30"
                                )}>
                                    <p className="text-xs text-muted-foreground mb-1">Nota RAM</p>
                                    <p className={cn(
                                        "text-2xl font-bold",
                                        nota ? (adaSelisih ? "text-red-700 dark:text-red-400" : "text-[#F0654F] dark:text-[#FF9485]") : "text-foreground"
                                    )}>
                                        {beratRam > 0 ? beratRam.toLocaleString('id-ID') : '-'}
                                    </p>
                                    {beratRam > 0 && <p className="text-xs text-muted-foreground">kg</p>}
                                    <p className="text-xs text-muted-foreground mt-1">{nota?.petugas?.name ?? '—'}</p>
                                </div>
                            </div>

                            {nota && beratPekerja > 0 && beratRam > 0 && (
                                <div className={cn(
                                    "mt-3 rounded-lg p-3 text-center text-sm font-medium",
                                    adaSelisih
                                        ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                                        : "bg-[#FFF2F0] text-[#F0654F] dark:bg-[#3A1714]/20 dark:text-[#FF9485]"
                                )}>
                                    {adaSelisih
                                        ? `Selisih: ${selisih > 0 ? '+' : ''}${selisih.toLocaleString('id-ID')} kg`
                                        : '✓ Tidak ada selisih'
                                    }
                                </div>
                            )}

                            {!nota && (
                                <p className="mt-4 text-center text-sm text-muted-foreground">
                                    Nota belum diupload oleh petugas RAM.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Foto nota */}
                {nota && (
                    <Card className="rounded-[20px] shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <CameraIcon className="size-4" />
                                Bukti Foto Nota Timbangan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <img
                                        src={`/storage/${nota.foto_nota}`}
                                        alt="Foto nota timbangan"
                                        className="w-full rounded-lg border border-border object-contain max-h-96 bg-muted/30"
                                    />
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Diunggah oleh</p>
                                        <p className="font-medium">{nota.petugas?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Waktu upload</p>
                                        <p className="font-medium">{new Date(nota.waktu_upload).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Berat menurut nota</p>
                                        <p className="font-bold text-lg">{beratRam > 0 ? `${beratRam.toLocaleString('id-ID')} kg` : '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppHeaderLayout>
    );
}
