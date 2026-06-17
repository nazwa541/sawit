import { Head, Link, useForm } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftIcon, LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

export default function PengirimanCreate({ mobils, lahans }: { mobils: any[], lahans: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        mobil_id: '',
        lahan_id: '',
        waktu_berangkat: new Date().toISOString().slice(0, 16), // YYYY-MM-DDThh:mm
        status: 'perjalanan',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pengiriman');
    };

    return (
        <AppHeaderLayout>
            <Head title="Lapor Keberangkatan" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Link href="/pengiriman">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Lapor Keberangkatan</h1>
                        <p className="text-sm text-muted-foreground">Catat perjalanan Anda menuju pabrik (RAM).</p>
                    </div>
                </div>

                <div className="mx-auto mt-4 w-full max-w-xl">
                    <Card className="rounded-[20px] shadow-sm">
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Detail Perjalanan</CardTitle>
                                <CardDescription>Mohon isi data armada dan asal muatan dengan benar.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="mobil_id">Kendaraan</Label>
                                    <Select value={data.mobil_id} onValueChange={(value) => setData('mobil_id', value)}>
                                        <SelectTrigger id="mobil_id">
                                            <SelectValue placeholder="Pilih kendaraan yang digunakan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mobils.map((mobil) => (
                                                <SelectItem key={mobil.id} value={mobil.id.toString()}>
                                                    {mobil.nama_mobil} ({mobil.plat_nomor})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.mobil_id} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lahan_id">Asal Panen (Blok Kebun)</Label>
                                    <Select value={data.lahan_id} onValueChange={(value) => setData('lahan_id', value)}>
                                        <SelectTrigger id="lahan_id">
                                            <SelectValue placeholder="Pilih blok asal panen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {lahans.map((lahan) => (
                                                <SelectItem key={lahan.id} value={lahan.id.toString()}>
                                                    {lahan.nama_blok}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.lahan_id} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="waktu_berangkat">Waktu Keberangkatan</Label>
                                    <Input 
                                        id="waktu_berangkat" 
                                        type="datetime-local"
                                        value={data.waktu_berangkat} 
                                        onChange={(e) => setData('waktu_berangkat', e.target.value)} 
                                        required 
                                    />
                                    <InputError message={errors.waktu_berangkat} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t p-6">
                                <Button 
                                    type="submit" 
                                    className="bg-[#FF7E6B] hover:bg-[#FF9485]"
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Berangkat Sekarang
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
