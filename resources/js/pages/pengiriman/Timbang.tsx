import { Head, Link, useForm } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeftIcon, LoaderCircle, ScaleIcon, TruckIcon, MapPinIcon } from 'lucide-react';
import InputError from '@/components/input-error';

interface Pengiriman {
    id: number;
    status: string;
    waktu_berangkat: string;
    mobil: { nama_mobil: string; plat_nomor: string; kapasitas_kg: number };
    lahan: { nama_blok: string };
}

export default function Timbang({ pengiriman }: { pengiriman: Pengiriman }) {
    const { data, setData, patch, processing, errors } = useForm({
        berat_netto_kg: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/pengiriman/${pengiriman.id}/timbang`);
    };

    return (
        <AppHeaderLayout>
            <Head title="Input Berat Timbangan" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Link href="/pengiriman">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Input Berat Timbangan</h1>
                        <p className="text-sm text-muted-foreground">Masukkan berat netto sesuai hasil timbangan di RAM.</p>
                    </div>
                </div>

                <div className="mx-auto mt-4 w-full max-w-xl space-y-4">
                    {/* Info pengiriman */}
                    <Card className="rounded-[20px] shadow-sm border-border bg-muted/30">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <TruckIcon className="size-4 text-muted-foreground shrink-0" />
                                <span className="font-medium uppercase tracking-wider">{pengiriman.mobil?.plat_nomor}</span>
                                <span className="text-muted-foreground">— {pengiriman.mobil?.nama_mobil}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPinIcon className="size-4 text-muted-foreground shrink-0" />
                                <span>Asal: <span className="font-medium">{pengiriman.lahan?.nama_blok}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <ScaleIcon className="size-4 shrink-0" />
                                <span>Kapasitas maks: {pengiriman.mobil?.kapasitas_kg?.toLocaleString('id-ID')} kg</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form input berat */}
                    <Card className="rounded-[20px] shadow-sm">
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Berat Netto</CardTitle>
                                <CardDescription>
                                    Setelah submit, status pengiriman akan berubah menjadi <strong>Menunggu Nota</strong> dan petugas RAM akan mengupload foto nota.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="berat_netto_kg">Berat Netto (kg)</Label>
                                    <div className="relative">
                                        <Input
                                            id="berat_netto_kg"
                                            type="number"
                                            min="1"
                                            max="99999"
                                            placeholder="Contoh: 7500"
                                            className="pr-12 text-lg font-semibold"
                                            value={data.berat_netto_kg}
                                            onChange={(e) => setData('berat_netto_kg', e.target.value)}
                                            autoFocus
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">kg</span>
                                    </div>
                                    <InputError message={errors.berat_netto_kg} />
                                    {data.berat_netto_kg && (
                                        <p className="text-sm text-muted-foreground">
                                            = <span className="font-medium text-foreground">
                                                {(Number(data.berat_netto_kg) / 1000).toFixed(2)} ton
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t p-6">
                                <Button
                                    type="submit"
                                    className="bg-[#FF7E6B] hover:bg-[#FF9485]"
                                    disabled={processing || !data.berat_netto_kg}
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Konfirmasi Berat
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
