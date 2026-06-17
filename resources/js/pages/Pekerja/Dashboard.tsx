import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TruckIcon, PlusIcon, ListChecksIcon, MapPinIcon, ScaleIcon, ClockIcon } from 'lucide-react';
import { DeliveryStatusChart } from '@/components/dashboard/Pekerja/csat-responses-chart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';

interface PengirimanAktif {
    id: number;
    noTruk: string;
    blok: string;
    status: string;
    waktu: string;
    berat: number | null;
}

interface RiwayatItem {
    id: number;
    waktu: string;
    noTruk: string;
    blok: string;
    status: string;
}

interface PekerjaDashboardProps {
    pengirimanAktif: PengirimanAktif | null;
    ritaseHariIni: number;
    totalBeratHariIni: number;
    riwayat: RiwayatItem[];
    statusChart: { day: string; selesai: number; nota: number; jalan: number }[];
}

function statusBadgeStyle(status: string) {
    if (status === 'perjalanan') return 'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-blue-500/20 dark:text-blue-400';
    if (status === 'menunggu_nota') return 'bg-[#FEF3C7] text-[#B45309] dark:bg-amber-500/20 dark:text-amber-400';
    if (status === 'selesai') return 'bg-[#FFE7E2] text-[#2B2E6B] dark:bg-[#FF7E6B]/20 dark:text-[#FF9485]';
    return '';
}

function statusLabel(status: string) {
    if (status === 'perjalanan') return 'Perjalanan';
    if (status === 'menunggu_nota') return 'Nota';
    if (status === 'selesai') return 'Selesai';
    return status;
}

export default function PekerjaDashboard() {
    const { pengirimanAktif, ritaseHariIni, totalBeratHariIni, riwayat, statusChart, auth } =
        usePage<{ props: PekerjaDashboardProps } & SharedData>().props as unknown as PekerjaDashboardProps & SharedData;

    const namaUser = auth?.user?.name?.split(' ')[0] ?? 'Supir';

    // Tambahkan di PekerjaDashboard, setelah baris namaUser
    console.log('Auth user:', auth?.user);
    console.log('Riwayat:', riwayat);

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard Pekerja', href: '/dashboard-pekerja' }]}>
            <Head title="Dashboard Pekerja" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Halo, {namaUser}!</h2>
                        <p className="text-muted-foreground">Kelola pengiriman dan riwayat perjalanan Anda hari ini.</p>
                    </div>
                    <Button
                        className="bg-[#FF7E6B] text-white hover:bg-[#F0654F]"
                        onClick={() => router.visit('/pengiriman/create')}
                    >
                        <PlusIcon className="mr-2 size-4" />
                        Lapor Keberangkatan
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {/* Status Aktif */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle>Status Pengiriman Saat Ini</CardTitle>
                            <CardDescription>Informasi truk yang sedang beroperasi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {pengirimanAktif ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
                                        <div className={cn(
                                            "flex size-12 shrink-0 items-center justify-center rounded-full",
                                            pengirimanAktif.status === 'perjalanan'
                                                ? "bg-blue-100 dark:bg-blue-900/30"
                                                : "bg-amber-100 dark:bg-amber-900/30"
                                        )}>
                                            {pengirimanAktif.status === 'perjalanan'
                                                ? <TruckIcon className="size-6 text-blue-600 dark:text-blue-400" />
                                                : <ScaleIcon className="size-6 text-amber-600 dark:text-amber-400" />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="font-semibold uppercase tracking-wider">{pengirimanAktif.noTruk}</h4>
                                                <Badge className={cn("rounded-full border-none text-xs font-semibold shadow-none whitespace-nowrap", statusBadgeStyle(pengirimanAktif.status))}>
                                                    {statusLabel(pengirimanAktif.status)}
                                                </Badge>
                                            </div>
                                            <p className="mt-1 flex items-center text-sm text-muted-foreground">
                                                <MapPinIcon className="mr-1 size-3.5 shrink-0" />
                                                Blok {pengirimanAktif.blok}
                                                {pengirimanAktif.status === 'perjalanan' && ' — sedang menuju RAM'}
                                                {pengirimanAktif.status === 'menunggu_nota' && ' — sudah ditimbang, menunggu foto nota'}
                                            </p>
                                            <p className="mt-0.5 flex items-center text-xs text-muted-foreground">
                                                <ClockIcon className="mr-1 size-3 shrink-0" />
                                                Berangkat {pengirimanAktif.waktu}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Aksi kontekstual */}
                                    {pengirimanAktif.status === 'perjalanan' && (
                                        <Button
                                            className="w-full bg-[#FF7E6B] hover:bg-[#F0654F] text-white"
                                            onClick={() => router.visit(`/pengiriman/${pengirimanAktif.id}/timbang`)}
                                        >
                                            <ScaleIcon className="mr-2 size-4" />
                                            Sudah Timbang? Input Berat Sekarang
                                        </Button>
                                    )}
                                    {pengirimanAktif.status === 'menunggu_nota' && (
                                        <div className="rounded-lg border border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-950/10 p-3 text-sm text-amber-700 dark:text-amber-400">
                                            Berat tercatat: <span className="font-bold">{pengirimanAktif.berat?.toLocaleString('id-ID')} kg</span>. Tunggu petugas RAM mengupload foto nota.
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-8 text-center">
                                    <TruckIcon className="size-8 text-muted-foreground/40" />
                                    <p className="text-sm text-muted-foreground">Tidak ada pengiriman aktif saat ini.</p>
                                    <Button
                                        size="sm"
                                        className="bg-[#FF7E6B] hover:bg-[#F0654F] text-white"
                                        onClick={() => router.visit('/pengiriman/create')}
                                    >
                                        <PlusIcon className="mr-1 size-3.5" />
                                        Lapor Keberangkatan
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Statistik Hari Ini</CardTitle>
                            <CardDescription>Total pengiriman Anda</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {ritaseHariIni}{' '}
                                <span className="text-sm font-normal text-muted-foreground">Ritase</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Total muatan:{' '}
                                <span className="font-medium text-foreground">
                                    {(totalBeratHariIni / 1000).toFixed(1)} Ton
                                </span>
                            </p>
                        </CardContent>
                    </Card>

                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Riwayat */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ListChecksIcon className="size-5" />
                                Riwayat Pengiriman Terakhir
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Waktu</th>
                                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Truk</th>
                                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Blok</th>
                                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riwayat.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                                                    Belum ada riwayat pengiriman.
                                                </td>
                                            </tr>
                                        ) : riwayat.map((r) => (
                                            <tr key={r.id} className="border-b hover:bg-muted/50">
                                                <td className="p-4 align-middle text-muted-foreground text-xs">{r.waktu}</td>
                                                <td className="p-4 align-middle font-medium uppercase">{r.noTruk}</td>
                                                <td className="p-4 align-middle">{r.blok}</td>
                                                <td className="p-4 align-middle">
                                                    <Badge className={cn("rounded-full border-none text-xs shadow-none whitespace-nowrap", statusBadgeStyle(r.status))}>
                                                        {statusLabel(r.status)}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <DeliveryStatusChart data={statusChart} />
                </div>
            </div>
        </AppLayout>
    );
}
