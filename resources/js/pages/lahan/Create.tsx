import { Head, Link, useForm } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftIcon, LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

export default function LahanCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nama_blok: '',
        luas_ha: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/lahan');
    };

    return (
        <AppHeaderLayout>
            <Head title="Tambah Lahan" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Link href="/lahan">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Tambah Lahan</h1>
                        <p className="text-sm text-muted-foreground">Daftarkan blok kebun sawit baru.</p>
                    </div>
                </div>

                <div className="mx-auto mt-4 w-full max-w-xl">
                    <Card className="rounded-[20px] shadow-sm">
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Informasi Lahan</CardTitle>
                                <CardDescription>Masukkan detail lahan dengan benar.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nama_blok">Nama Blok</Label>
                                    <Input 
                                        id="nama_blok" 
                                        value={data.nama_blok} 
                                        onChange={(e) => setData('nama_blok', e.target.value)} 
                                        placeholder="Contoh: Blok A1"
                                        required 
                                    />
                                    <InputError message={errors.nama_blok} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="luas_ha">Luas (Hektar)</Label>
                                    <Input 
                                        id="luas_ha" 
                                        type="number"
                                        step="0.01"
                                        value={data.luas_ha} 
                                        onChange={(e) => setData('luas_ha', e.target.value)} 
                                        placeholder="Contoh: 10.5"
                                        required 
                                    />
                                    <InputError message={errors.luas_ha} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t p-6">
                                <Button 
                                    type="submit" 
                                    className="bg-[#FF7E6B] hover:bg-[#FF9485]"
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Simpan Lahan
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
