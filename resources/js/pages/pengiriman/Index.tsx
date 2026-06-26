import { Head, Link, router, usePage } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { PlusIcon, EditIcon, TrashIcon, CameraIcon, ScaleIcon, EyeIcon, SearchIcon } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Pengiriman {
    id: number;
    waktu_berangkat: string;
    berat_netto_kg: number | null;
    status: string;
    mobil: { nama_mobil: string; plat_nomor: string };
    lahan: { nama_blok: string };
    pekerja: { name: string };
    nota: { id: number; foto_nota: string } | null;
}

export default function PengirimanIndex({ pengiriman }: { pengiriman: Pengiriman[] }) {
    const { auth } = usePage<any>().props;
    const isPekerja = auth.user.role === 'pekerja';
    const isPemilik = auth.user.role === 'pemilik';

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('semua');

    const filteredPengiriman = pengiriman.filter(item => {
        const searchStr = searchQuery.toLowerCase();
        const matchesSearch =
            item.mobil?.plat_nomor?.toLowerCase().includes(searchStr) ||
            item.pekerja?.name?.toLowerCase().includes(searchStr) ||
            item.lahan?.nama_blok?.toLowerCase().includes(searchStr);

        const matchesStatus = statusFilter === 'semua' || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: number) => {
        router.delete(`/pengiriman/${id}`);
    };
    const { flash } = usePage<any>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'perjalanan':
                return <span className="badge badge-info !bg-blue-100 !text-blue-700 !border-none">Perjalanan</span>;
            case 'menunggu_nota':
                return <span className="badge badge-warning !bg-yellow-100 !text-yellow-700 !border-none">Nota</span>;
            case 'selesai':
                return <span className="badge badge-success !bg-green-100 !text-green-700 !border-none">Selesai</span>;
            default:
                return <span className="badge badge-ghost">{status || '-'}</span>;
        }
    };

    return (
        <AppHeaderLayout>
            <Head title="Pengiriman TBS" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6" data-theme="light">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{isPekerja ? 'Riwayat Perjalanan' : 'Pengiriman TBS'}</h1>
                        <p className="text-sm text-muted-foreground">
                            {isPekerja ? 'Daftar perjalanan pengiriman Anda.' : 'Pantau pergerakan truk dan hasil panen ke RAM.'}
                        </p>
                    </div>
                    {isPekerja && (
                        <Button asChild className="bg-[#FF7E6B] hover:bg-[#FF9485]">
                            <Link href="/pengiriman/create">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Lapor Keberangkatan
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="rounded-[20px] border border-base-300 bg-base-100 shadow-sm" data-theme="light">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-base-300">
                        <div>
                            <h3 className="text-lg font-semibold text-base-content">Daftar Pengiriman</h3>
                            <p className="text-sm text-base-content/70">Menampilkan log perjalanan armada.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-base-content/50" />
                                <Input
                                    type="text"
                                    placeholder="Cari plat, supir, atau blok..."
                                    className="pl-9 h-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="h-9 w-full sm:w-[150px]">
                                    <SelectValue placeholder="Semua Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="semua">Semua Status</SelectItem>
                                    <SelectItem value="perjalanan">Perjalanan</SelectItem>
                                    <SelectItem value="menunggu_nota">Menunggu Nota</SelectItem>
                                    <SelectItem value="selesai">Selesai</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="overflow-x-auto p-0">
                        <table className="table table-zebra table-pin-rows !bg-base-100">
                            <thead>
                                <tr>
                                    <th className="text-base-content/70 font-medium">Waktu</th>
                                    <th className="text-base-content/70 font-medium">Armada</th>
                                    <th className="text-base-content/70 font-medium">Asal Kebun</th>
                                    {!isPekerja && <th className="text-base-content/70 font-medium">Supir</th>}
                                    <th className="text-base-content/70 font-medium">Status</th>
                                    <th className="text-base-content/70 font-medium">Netto (Kg)</th>
                                    <th className="text-base-content/70 font-medium w-[100px]">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPengiriman.length === 0 ? (
                                    <tr>
                                        <td colSpan={isPekerja ? 6 : 7} className="h-24 text-center text-base-content/50">
                                            {pengiriman.length === 0 ? 'Belum ada data pengiriman.' : 'Data pengiriman tidak ditemukan.'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPengiriman.map((item) => (
                                        <tr key={item.id} className="hover:bg-base-200/50">
                                            <td className="whitespace-nowrap text-base-content">
                                                {new Date(item.waktu_berangkat).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                                            </td>
                                            <td>
                                                <div className="font-medium text-base-content">{item.mobil?.nama_mobil}</div>
                                                <div className="text-xs text-base-content/60">{item.mobil?.plat_nomor}</div>
                                            </td>
                                            <td className="text-base-content">{item.lahan?.nama_blok}</td>
                                            {!isPekerja && <td className="text-base-content">{item.pekerja?.name}</td>}
                                            <td>{getStatusBadge(item.status)}</td>
                                            <td>
                                                {item.berat_netto_kg ? (
                                                    <span className="font-bold text-[#F0654F]">{item.berat_netto_kg.toLocaleString('id-ID')}</span>
                                                ) : (
                                                    <span className="text-base-content/40">-</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    {item.status === 'selesai' && (
                                                        <Link href={`/pengiriman/${item.id}`} className="btn btn-ghost btn-xs btn-square !text-blue-600 hover:!bg-blue-50">
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>
                                                    )}
                                                    {!isPekerja && (
                                                        <Link href={`/pengiriman/${item.id}/edit`} className="btn btn-ghost btn-xs btn-square !text-blue-600 hover:!bg-blue-50">
                                                            <EditIcon className="h-4 w-4" />
                                                        </Link>
                                                    )}
                                                    {isPekerja && item.status === 'perjalanan' && (
                                                        <Link href={`/pengiriman/${item.id}/timbang`} className="btn btn-outline btn-xs border-[#FF7E6B]/40 text-[#FF7E6B] hover:bg-[#FFE7E2] hover:text-[#F0654F]">
                                                            <ScaleIcon className="mr-1 h-3 w-3" />
                                                            Input Berat
                                                        </Link>
                                                    )}
                                                    {!isPemilik && !isPekerja && !item.nota && (
                                                        <Link href={`/nota/${item.id}/upload`} className="btn btn-outline btn-xs border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700">
                                                            <CameraIcon className="mr-1 h-3 w-3" />
                                                            Nota
                                                        </Link>
                                                    )}
                                                    {(isPemilik || isPekerja) && (
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-red-600 hover:text-red-700"
                                                                    disabled={item.status === 'selesai'}
                                                                    title="Batalkan Pengiriman"
                                                                >
                                                                    <TrashIcon className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Batalkan Pengiriman?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Pengiriman truk <span className="font-semibold">{item.mobil?.plat_nomor}</span> dari blok <span className="font-semibold">{item.lahan?.nama_blok}</span> akan dihapus permanen dan tidak bisa dikembalikan.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        className="bg-red-600 hover:bg-red-700 text-white"
                                                                        onClick={() => handleDelete(item.id)}
                                                                    >
                                                                        Ya, Batalkan
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
