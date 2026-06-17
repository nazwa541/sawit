import { Head, Link, router } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { usePage } from '@inertiajs/react';

interface Lahan {
    id: number;
    nama_blok: string;
    luas_ha: number;
}

export default function LahanIndex({ lahans }: { lahans: Lahan[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLahans = lahans.filter(lahan =>
        lahan.nama_blok.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: number) => {

        router.delete(`/lahan/${id}`);

    };
    const { flash } = usePage<any>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppHeaderLayout>
            <Head title="Manajemen Lahan" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
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

                <Card className="rounded-[20px] shadow-sm">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Daftar Lahan</CardTitle>
                            <CardDescription>Semua lahan yang terdaftar di sistem.</CardDescription>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari nama blok..."
                                className="pl-9 h-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Blok</TableHead>
                                    <TableHead>Luas (Hektar)</TableHead>
                                    <TableHead className="w-[100px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLahans.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            {lahans.length === 0 ? 'Belum ada data lahan.' : 'Data lahan tidak ditemukan.'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredLahans.map((lahan) => (
                                        <TableRow key={lahan.id}>
                                            <TableCell className="font-medium">{lahan.nama_blok}</TableCell>
                                            <TableCell>{lahan.luas_ha} ha</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                                                        <Link href={`/lahan/${lahan.id}/edit`}>
                                                            <EditIcon className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
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
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppHeaderLayout>
    );
}
