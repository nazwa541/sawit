import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TruckIcon, PlusIcon, ListChecksIcon, MapPinIcon } from 'lucide-react';
import { DeliveryStatusChart } from '@/components/csat-responses-chart';

export default function PekerjaDashboard() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard Pekerja', href: '/pekerja/dashboard' }]}>
            <Head title="Dashboard Pekerja" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Halo, Supir!</h2>
                        <p className="text-muted-foreground">Kelola pengiriman dan riwayat perjalanan Anda hari ini.</p>
                    </div>
                    <Button className="bg-[#65A30D] text-white hover:bg-[#4D7C0F]">
                        <PlusIcon className="mr-2 size-4" />
                        Lapor Keberangkatan
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    
                    {/* Active Status Card */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle>Status Pengiriman Saat Ini</CardTitle>
                            <CardDescription>Informasi truk yang sedang beroperasi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                    <TruckIcon className="size-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">Truk BM 1234 XY</h4>
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                                            Dalam Perjalanan
                                        </span>
                                    </div>
                                    <p className="mt-1 flex items-center text-sm text-muted-foreground">
                                        <MapPinIcon className="mr-1 size-3.5" />
                                        Blok A1 - Menuju RAM
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Statistik Hari Ini</CardTitle>
                            <CardDescription>Total pengiriman Anda</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">3 <span className="text-sm font-normal text-muted-foreground">Ritase</span></div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Estimasi total muatan: <span className="font-medium text-foreground">18.5 Ton</span>
                            </p>
                        </CardContent>
                    </Card>

                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Deliveries */}
                    <Card>
                        <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ListChecksIcon className="size-5" />
                            Riwayat Pengiriman Terakhir
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Waktu</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Truk</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Blok Asal</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle">Hari ini, 08:30</td>
                                        <td className="p-4 align-middle">BM 1234 XY</td>
                                        <td className="p-4 align-middle">Blok A1</td>
                                        <td className="p-4 align-middle">
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                                Selesai
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle">Kemarin, 14:15</td>
                                        <td className="p-4 align-middle">BM 9876 ZB</td>
                                        <td className="p-4 align-middle">Blok C3</td>
                                        <td className="p-4 align-middle">
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                                Selesai
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
                <DeliveryStatusChart />
                </div>
            </div>
        </AppLayout>
    );
}
