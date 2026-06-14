import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, UploadIcon, TruckIcon, ClockIcon } from 'lucide-react';
import { TruckQueueChart } from '@/components/first-reply-time-chart';

export default function PetugasRamDashboard() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard Petugas', href: '/petugas-ram/dashboard' }]}>
            <Head title="Dashboard Petugas RAM" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                
                {/* Header & Search */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Halo, Petugas Timbangan!</h2>
                        <p className="text-muted-foreground">Silakan cari plat nomor truk untuk mengunggah foto nota timbangan.</p>
                    </div>
                    
                    <Card className="border-[#65A30D]/20 bg-green-50/50 dark:bg-green-950/10">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex w-full flex-col items-center gap-3 sm:flex-row">
                                <div className="relative flex-1">
                                    <SearchIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
                                    <Input 
                                        type="text" 
                                        placeholder="Cari plat nomor truk... (Contoh: BM 1234 XY)" 
                                        className="h-12 w-full bg-background pl-10 text-lg uppercase"
                                    />
                                </div>
                                <Button size="lg" className="h-12 w-full bg-[#65A30D] text-white hover:bg-[#4D7C0F] sm:w-auto">
                                    Cari Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    
                    {/* Queue Card */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <div>
                                <CardTitle>Menunggu Nota</CardTitle>
                                <CardDescription>Truk yang telah menimbang namun belum diunggah fotonya</CardDescription>
                            </div>
                            <span className="flex size-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                                2
                            </span>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex flex-col justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/10 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                            <TruckIcon className="size-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold uppercase tracking-wider">BM 8899 ZA</h4>
                                            <p className="flex items-center text-sm text-muted-foreground">
                                                <ClockIcon className="mr-1 size-3.5" />
                                                Timbang: 10 menit yang lalu
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="shrink-0 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/50">
                                        <UploadIcon className="mr-2 size-4" />
                                        Upload Nota
                                    </Button>
                                </div>

                                <div className="flex flex-col justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/10 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                            <TruckIcon className="size-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold uppercase tracking-wider">BM 5544 CD</h4>
                                            <p className="flex items-center text-sm text-muted-foreground">
                                                <ClockIcon className="mr-1 size-3.5" />
                                                Timbang: 25 menit yang lalu
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="shrink-0 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/50">
                                        <UploadIcon className="mr-2 size-4" />
                                        Upload Nota
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Aktivitas Anda</CardTitle>
                            <CardDescription>Hari Ini</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-3xl font-bold text-[#65A30D]">12</div>
                                <p className="text-sm text-muted-foreground">Nota Berhasil Diunggah</p>
                            </div>
                            <div className="h-px w-full bg-border" />
                            <div>
                                <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">2</div>
                                <p className="text-sm text-muted-foreground">Truk Menunggu Nota</p>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Daily Volume Chart */}
                <div className="flex flex-col">
                    <TruckQueueChart />
                </div>

            </div>
        </AppLayout>
    );
}
