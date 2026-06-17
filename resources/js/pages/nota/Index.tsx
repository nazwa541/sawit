import { Head, Link } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CameraIcon, SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function NotaIndex({ pengiriman }: { pengiriman: any[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPengiriman = pengiriman.filter(item => {
        const searchStr = searchQuery.toLowerCase();
        return (
            item.mobil?.plat_nomor?.toLowerCase().includes(searchStr) ||
            item.pekerja?.name?.toLowerCase().includes(searchStr) ||
            item.lahan?.nama_blok?.toLowerCase().includes(searchStr)
        );
    });

    const { flash } = usePage<any>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    return (
        <AppHeaderLayout>
            <Head title="Antrean Upload Nota" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Antrean Upload Nota</h1>
                        <p className="text-sm text-muted-foreground">
                            Daftar pengiriman truk yang menunggu proses timbang dan unggah nota.
                        </p>
                    </div>
                </div>

                <Card className="rounded-[20px] shadow-sm">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Menunggu Nota</CardTitle>
                            <CardDescription>Pilih kendaraan yang sudah ditimbang untuk mengunggah bukti nota asli.</CardDescription>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari plat, supir, atau blok..."
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
                                    <TableHead>Waktu Tiba</TableHead>
                                    <TableHead>Armada</TableHead>
                                    <TableHead>Supir</TableHead>
                                    <TableHead>Asal Kebun</TableHead>
                                    <TableHead className="w-[150px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPengiriman.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            {pengiriman.length === 0 ? 'Tidak ada antrean truk saat ini.' : 'Data antrean tidak ditemukan.'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPengiriman.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {new Date(item.waktu_berangkat).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{item.mobil?.nama_mobil}</div>
                                                <div className="text-xs text-muted-foreground">{item.mobil?.plat_nomor}</div>
                                            </TableCell>
                                            <TableCell>{item.pekerja?.name}</TableCell>
                                            <TableCell>{item.lahan?.nama_blok}</TableCell>
                                            <TableCell>
                                                <Button asChild size="sm" className="bg-[#FF7E6B] hover:bg-[#FF9485]">
                                                    <Link href={`/nota/${item.id}/upload`}>
                                                        <CameraIcon className="mr-2 h-4 w-4" />
                                                        Upload Nota
                                                    </Link>
                                                </Button>
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
