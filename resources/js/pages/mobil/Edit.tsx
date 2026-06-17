import { Head, Link, useForm } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftIcon, LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

interface Mobil {
    id: number;
    plat_nomor: string;
    nama_mobil: string;
    kapasitas_kg: number;
}

export default function MobilEdit({ mobil }: { mobil: Mobil }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        plat_nomor: mobil.plat_nomor,
        nama_mobil: mobil.nama_mobil,
        kapasitas_kg: mobil.kapasitas_kg.toString(),
        foto_mobil: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use POST with _method=PUT to support file uploads in Laravel
        post(`/mobil/${mobil.id}`);
    };

    return (
        <AppHeaderLayout>
            <Head title={`Edit Mobil: ${mobil.plat_nomor}`} />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Link href="/mobil">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Mobil</h1>
                        <p className="text-sm text-muted-foreground">Perbarui data armada kendaraan.</p>
                    </div>
                </div>

                <div className="mx-auto mt-4 w-full max-w-xl">
                    <Card className="rounded-[20px] shadow-sm">
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Informasi Armada</CardTitle>
                                <CardDescription>Ubah detail kendaraan pengangkut TBS di bawah ini.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="plat_nomor">Plat Nomor</Label>
                                    <Input 
                                        id="plat_nomor" 
                                        value={data.plat_nomor} 
                                        onChange={(e) => setData('plat_nomor', e.target.value)} 
                                        required 
                                    />
                                    <InputError message={errors.plat_nomor} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nama_mobil">Nama/Tipe Mobil</Label>
                                    <Input 
                                        id="nama_mobil" 
                                        value={data.nama_mobil} 
                                        onChange={(e) => setData('nama_mobil', e.target.value)} 
                                        required 
                                    />
                                    <InputError message={errors.nama_mobil} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="kapasitas_kg">Kapasitas (Kg)</Label>
                                    <Input 
                                        id="kapasitas_kg" 
                                        type="number"
                                        value={data.kapasitas_kg} 
                                        onChange={(e) => setData('kapasitas_kg', e.target.value)} 
                                        required 
                                    />
                                    <InputError message={errors.kapasitas_kg} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="foto_mobil">Foto Kendaraan (Biarkan kosong jika tidak ingin mengubah)</Label>
                                    <Input 
                                        id="foto_mobil" 
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('foto_mobil', e.target.files ? e.target.files[0] : null)} 
                                        className="cursor-pointer file:text-muted-foreground"
                                    />
                                    <InputError message={errors.foto_mobil} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t p-6">
                                <Button 
                                    type="submit" 
                                    className="bg-[#FF7E6B] hover:bg-[#FF9485]"
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Perbarui Kendaraan
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
