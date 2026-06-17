import { Head, Link, router } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusIcon, EditIcon, TrashIcon, TruckIcon, SearchIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface Mobil {
    id: number;
    plat_nomor: string;
    nama_mobil: string;
    foto_mobil?: string;
    kapasitas_kg: number;
}

export default function MobilIndex({ mobils }: { mobils: Mobil[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMobils = mobils.filter(mobil =>
        mobil.nama_mobil.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mobil.plat_nomor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: number) => {
        router.delete(`/mobil/${id}`);
    };

    const { flash } = usePage<any>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppHeaderLayout>
            <Head title="Manajemen Mobil" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Armada Mobil</h1>
                        <p className="text-sm text-muted-foreground">Kelola armada pengangkut TBS Anda.</p>
                    </div>
                    <Button asChild className="bg-[#FF7E6B] hover:bg-[#FF9485]">
                        <Link href="/mobil/create">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Tambah Mobil
                        </Link>
                    </Button>
                </div>

                <Card className="rounded-[20px] shadow-sm">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Daftar Mobil</CardTitle>
                            <CardDescription>Semua kendaraan operasional yang terdaftar di sistem.</CardDescription>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari kendaraan atau plat..."
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
                                    <TableHead>Kendaraan</TableHead>
                                    <TableHead>Plat Nomor</TableHead>
                                    <TableHead>Kapasitas (Kg)</TableHead>
                                    <TableHead className="w-[100px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMobils.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            {mobils.length === 0 ? 'Belum ada armada mobil.' : 'Data mobil tidak ditemukan.'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredMobils.map((mobil) => (
                                        <TableRow key={mobil.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 rounded-md border">
                                                        <AvatarImage src={mobil.foto_mobil ? `/storage/${mobil.foto_mobil}` : ''} alt={mobil.nama_mobil} />
                                                        <AvatarFallback className="rounded-md bg-muted">
                                                            <TruckIcon className="h-5 w-5 text-muted-foreground" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{mobil.nama_mobil}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
                                                    {mobil.plat_nomor}
                                                </span>
                                            </TableCell>
                                            <TableCell>{mobil.kapasitas_kg.toLocaleString('id-ID')} kg</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                                                        <Link href={`/mobil/${mobil.id}/edit`}>
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
                                                                <AlertDialogTitle>Hapus Mobil?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Data mobil <span className="font-semibold">{mobil.nama_mobil}</span> akan dihapus permanen dan tidak bisa dikembalikan.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                                    onClick={() => handleDelete(mobil.id)}
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
