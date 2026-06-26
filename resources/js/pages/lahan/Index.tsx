import { Head, Link, router, usePage } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { PlusIcon, EditIcon, TrashIcon, SearchIcon } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface Lahan {
    id: number;
    nama_blok: string;
    luas_ha: number;
}

export default function LahanIndex() {
    // Ambil data dari usePage
    const { lahans, flash } = usePage<any>().props;
    const [searchQuery, setSearchQuery] = useState('');

    // Filter data (hanya untuk tampilan, pagination tetap dari backend)
    const filteredLahans = lahans.data?.filter((lahan: Lahan) =>
        lahan.nama_blok.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const handleDelete = (id: number) => {
        router.delete(`/lahan/${id}`);
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handlePageChange = (page: number) => {
        router.get('/lahan', { page, search: searchQuery });
    };

    return (
        <AppHeaderLayout>
            <Head title="Manajemen Lahan" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6" data-theme="light">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Blok Kebun</h1>
                        <p className="text-sm text-muted-foreground">Kelola data lahan dan blok kebun sawit Anda.</p>
                    </div>
                    <Button asChild className="bg-[#FF7E6B] hover:bg-[#FF9485]">
                        <Link href="/lahan/create">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Tambah Lahan
                        </Link>
                    </Button>
                </div>

                <div className="rounded-[20px] border border-base-300 bg-base-100 shadow-sm" data-theme="light">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-base-300">
                        <div>
                            <h3 className="text-lg font-semibold text-base-content">Daftar Lahan</h3>
                            <p className="text-sm text-base-content/70">Semua lahan yang terdaftar di sistem.</p>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-base-content/50" />
                            <Input
                                type="text"
                                placeholder="Cari nama blok..."
                                className="pl-9 h-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto p-0">
                        <table className="table table-zebra table-pin-rows !bg-base-100">
                            <thead>
                                <tr>
                                    <th className="text-base-content/70 font-medium">Nama Blok</th>
                                    <th className="text-base-content/70 font-medium">Luas (Hektar)</th>
                                    <th className="text-base-content/70 font-medium w-[100px]">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLahans.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="h-24 text-center text-base-content/50">
                                            {lahans.data?.length === 0 ? 'Belum ada data lahan.' : 'Data lahan tidak ditemukan.'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLahans.map((lahan: Lahan) => (
                                        <tr key={lahan.id} className="hover:bg-base-200/50">
                                            <td className="font-medium text-base-content">{lahan.nama_blok}</td>
                                            <td className="text-base-content">{lahan.luas_ha} ha</td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/lahan/${lahan.id}/edit`}
                                                        className="btn btn-ghost btn-xs btn-square !text-blue-600 hover:!bg-blue-50"
                                                    >
                                                        <EditIcon className="h-4 w-4" />
                                                    </Link>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-red-600 hover:text-red-700"
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Hapus lahan?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Data lahan <span className="font-semibold">{lahan.nama_blok}</span> akan dihapus permanen dan tidak bisa dikembalikan.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                                    onClick={() => handleDelete(lahan.id)}
                                                                >
                                                                    Ya, Hapus
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination DaisyUI */}
                    {lahans.links && lahans.links.length > 0 && (
                        <div className="flex justify-center border-t border-base-300 py-4">
                             <div className="join">
                                {lahans.links.map((link: any, index: number) => {
                                const isPrevious = link.label === '&laquo; Previous';
                                const isNext = link.label === 'Next &raquo;';
                                const isNumber = !isPrevious && !isNext;

                                return (
                                    <button
                                    key={index}
                                    className={`join-item btn btn-sm ${link.active ? 'btn-primary' : ''} ${isNumber ? 'min-w-[40px]' : 'px-4'}`}
                                    onClick={() => {
                                        if (link.url) {
                                            const url = new URL(link.url);
                                            const page = url.searchParams.get('page');
                                            router.get('/lahan', { page: page || 1 });
                                        }
                                    }}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    disabled={!link.url}
                    />           );
                                 })}
                             </div>
                        </div>)}
                </div>
            </div>
        </AppHeaderLayout>
    );
}
