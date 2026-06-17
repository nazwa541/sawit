import { Head, router, usePage } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScaleIcon, TruckIcon, AlertTriangleIcon, CheckCircleIcon, EyeIcon, FilterIcon, PrinterIcon, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Row {
    id: number;
    waktu: string;
    plat_nomor: string;
    nama_mobil: string;
    blok: string;
    supir: string;
    berat_pekerja: number | null;
    berat_ram: number | null;
    selisih: number | null;
    petugas: string;
    foto_nota: string | null;
}

interface Summary {
    totalRitase: number;
    totalBeratKg: number;
    totalBeratRam: number;
    selisihTotal: number;
    kasusSelisih: number;
}

interface Lahan { id: number; nama_blok: string; }

interface Filters { dari: string; sampai: string; lahan_id: string | null; }

interface Props {
    pengiriman: Row[];
    summary: Summary;
    lahans: Lahan[];
    filters: Filters;
}

export default function LaporanIndex() {
    const { pengiriman, summary, lahans, filters } = usePage<any>().props as Props;

    const [dari, setDari] = useState(filters.dari);
    const [sampai, setSampai] = useState(filters.sampai);
    const [lahanId, setLahanId] = useState(filters.lahan_id ?? 'semua');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPengiriman = pengiriman.filter(row => {
        const searchStr = searchQuery.toLowerCase();
        return (
            row.plat_nomor?.toLowerCase().includes(searchStr) ||
            row.nama_mobil?.toLowerCase().includes(searchStr) ||
            row.blok?.toLowerCase().includes(searchStr) ||
            row.supir?.toLowerCase().includes(searchStr)
        );
    });

    const applyFilter = () => {
        router.get('/laporan', {
            dari,
            sampai,
            lahan_id: lahanId === 'semua' ? undefined : lahanId,
        }, { preserveState: true });
    };

    const fmt = (n: number | null) => n != null ? n.toLocaleString('id-ID') : '-';
    const handleExportPdf = () => {
        window.print();
    };

    return (
        <AppHeaderLayout>
            <Head title="Laporan Panen" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Laporan Panen</h1>
                    <p className="text-sm text-muted-foreground">Rekap pengiriman selesai beserta perbandingan berat supir vs nota RAM.</p>
                </div>

                {/* Filter */}
                <Card className="rounded-[20px] shadow-sm">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-1">
                                <Label className="text-xs">Dari Tanggal</Label>
                                <Input type="date" className="h-9 w-full" value={dari} onChange={(e) => setDari(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Sampai Tanggal</Label>
                                <Input type="date" className="h-9 w-full" value={sampai} onChange={(e) => setSampai(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Blok Kebun</Label>
                                <Select value={lahanId} onValueChange={setLahanId}>
                                    <SelectTrigger className="h-9 w-full">
                                        <SelectValue placeholder="Semua blok" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">Semua Blok</SelectItem>
                                        {lahans.map((l) => (
                                            <SelectItem key={l.id} value={String(l.id)}>{l.nama_blok}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button onClick={applyFilter} className="h-9 w-full bg-[#FF7E6B] hover:bg-[#F0654F] text-white">
                                    <FilterIcon className="mr-2 size-3.5" />
                                    Terapkan
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <Card className="rounded-[20px] shadow-sm">
                        <CardContent className="p-4">
                            <p className="text-xs text-muted-foreground">Total Ritase</p>
                            <p className="text-2xl font-bold mt-1">{summary.totalRitase}</p>
                            <p className="text-xs text-muted-foreground">pengiriman selesai</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-[20px] shadow-sm">
                        <CardContent className="p-4">
                            <p className="text-xs text-muted-foreground">Total Berat (Supir)</p>
                            <p className="text-2xl font-bold mt-1 text-[#FF7E6B]">{(summary.totalBeratKg / 1000).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">ton</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-[20px] shadow-sm">
                        <CardContent className="p-4">
                            <p className="text-xs text-muted-foreground">Total Berat (Nota RAM)</p>
                            <p className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">{(summary.totalBeratRam / 1000).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">ton</p>
                        </CardContent>
                    </Card>
                    <Card className={cn("rounded-[20px] shadow-sm", summary.kasusSelisih > 0 ? "border-red-200 dark:border-red-900/40" : "")}>
                        <CardContent className="p-4">
                            <p className="text-xs text-muted-foreground">Kasus Selisih</p>
                            <p className={cn("text-2xl font-bold mt-1", summary.kasusSelisih > 0 ? "text-red-600 dark:text-red-400" : "text-[#FF7E6B]")}>
                                {summary.kasusSelisih}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {summary.kasusSelisih > 0
                                    ? `Total selisih: ${summary.selisihTotal > 0 ? '+' : ''}${fmt(summary.selisihTotal)} kg`
                                    : 'Tidak ada selisih'}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabel */}
                <Card className="rounded-[20px] shadow-sm">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Detail Pengiriman</CardTitle>
                            <CardDescription>{pengiriman.length} data pengiriman selesai</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                            <div className="relative w-full sm:w-64">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Cari plat, mobil, blok, supir..."
                                    className="pl-9 h-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleExportPdf}
                                variant="outline"
                                className="print-hide h-9 gap-2 border-[#FF7E6B] text-[#FF7E6B] hover:bg-[#FFF2F0] hover:text-[#F0654F] w-full sm:w-auto"
                            >
                                <PrinterIcon className="size-4" />
                                Export PDF
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                                        <TableHead className="pl-6">Waktu</TableHead>
                                        <TableHead>Armada</TableHead>
                                        <TableHead>Blok</TableHead>
                                        <TableHead>Supir</TableHead>
                                        <TableHead className="text-right">Berat Supir</TableHead>
                                        <TableHead className="text-right">Berat RAM</TableHead>
                                        <TableHead className="text-right">Selisih</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead className="pr-6 text-center">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {filteredPengiriman.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                                                {pengiriman.length === 0 ? 'Tidak ada data untuk periode yang dipilih.' : 'Data tidak ditemukan.'}
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredPengiriman.map((row) => {
                                        const adaSelisih = row.selisih !== null && row.selisih !== 0;
                                        return (
                                            <TableRow key={row.id} className={cn("hover:bg-muted/50", adaSelisih && "bg-red-50/50 dark:bg-red-950/10")}>
                                                <TableCell className="pl-6 whitespace-nowrap text-sm">{row.waktu}</TableCell>
                                                <TableCell>
                                                    <p className="font-medium uppercase tracking-wider text-sm">{row.plat_nomor}</p>
                                                    <p className="text-xs text-muted-foreground">{row.nama_mobil}</p>
                                                </TableCell>
                                                <TableCell className="text-sm">{row.blok}</TableCell>
                                                <TableCell className="text-sm">{row.supir}</TableCell>
                                                <TableCell className="text-right font-medium tabular-nums text-sm">
                                                    {row.berat_pekerja != null ? `${fmt(row.berat_pekerja)} kg` : '-'}
                                                </TableCell>
                                                <TableCell className="text-right font-medium tabular-nums text-sm">
                                                    {row.berat_ram != null ? `${fmt(row.berat_ram)} kg` : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right tabular-nums text-sm">
                                                    {row.selisih !== null ? (
                                                        <span className={cn("font-semibold", row.selisih === 0 ? "text-[#FF7E6B]" : "text-red-600 dark:text-red-400")}>
                                                            {row.selisih === 0 ? '✓' : `${row.selisih > 0 ? '+' : ''}${fmt(row.selisih)} kg`}
                                                        </span>
                                                    ) : <span className="text-muted-foreground">-</span>}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {row.selisih === null ? (
                                                        <Badge className="rounded-full border-none shadow-none text-xs whitespace-nowrap bg-[#FEF3C7] text-[#B45309] dark:bg-amber-500/20 dark:text-amber-400">
                                                            Belum ada nota
                                                        </Badge>
                                                    ) : row.selisih === 0 ? (
                                                        <Badge className="rounded-full border-none shadow-none text-xs bg-[#FFE7E2] text-[#2B2E6B] dark:bg-[#FF7E6B]/20 dark:text-[#FF9485]">
                                                            <CheckCircleIcon className="mr-1 size-3" />Sesuai
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="rounded-full border-none shadow-none text-xs whitespace-nowrap bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">
                                                            <AlertTriangleIcon className="mr-1 size-3" />Selisih
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="pr-6 text-center">
                                                    <Button
                                                        asChild
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                        title="Lihat Detail"
                                                    >
                                                        <a href={`/pengiriman/${row.id}`}>
                                                            <EyeIcon className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </AppHeaderLayout>
    );
}
