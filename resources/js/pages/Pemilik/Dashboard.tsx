import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DashboardStats } from '@/components/dashboard/Pemilik/stats';
import { ProductionVolumeChart } from '@/components/dashboard/Pemilik/conversation-volume-chart';
import { StatusPieChart } from '@/components/dashboard/Pemilik/channel-breakdown-chart';
import { RecentDeliveries } from '@/components/dashboard/Pemilik/recent-conversations';
import { FactoryActivity } from '@/components/dashboard/Pemilik/support-activity';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard-pemilik' },
];

export interface PemilikDashboardProps {
    stats: {
        beratHariIni: number;
        deltaBerat: number;
        totalPengirimanHariIni: number;
        deltaTruk: number;
        menungguNota: number;
        deltaMenunggu: number;
        totalMobil: number;
        totalLahan: number;
    };
    statusChart?: never;
    pieChart: { status: string; label: string; jumlah: number }[];
    produksiChart: { date: string; ton: number }[];
    pengirimanTerbaru: {
        id: number;
        noTruk: string;
        supir: string;
        blok: string;
        waktu: string;
        status: string;
    }[];
}

export default function Dashboard() {
    const { stats, pieChart, produksiChart, pengirimanTerbaru, auth } =
        usePage<{ props: PemilikDashboardProps } & SharedData>().props as unknown as PemilikDashboardProps & SharedData;

    // State untuk animasi rotasi teks
    const [currentIndex, setCurrentIndex] = useState(0);
    const textOptions = [
        { label: 'Pemilik Kebun', color: 'bg-emerald-400 text-emerald-800 dark:bg-emerald-500/30 dark:text-emerald-300' },
        { label: 'Pengelola Lahan', color: 'bg-sky-400 text-sky-800 dark:bg-sky-500/30 dark:text-sky-300' },
        { label: 'Mitra Sawit', color: 'bg-amber-400 text-amber-800 dark:bg-amber-500/30 dark:text-amber-300' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % textOptions.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | SISTRA-SAWIT" />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">

                {/* ===== TEXT ROTATE DAISYUI - SIMULASI ===== */}
                <div className="rounded-xl border border-base-300 bg-base-100/50 px-6 py-4 shadow-sm">
                    <span className="text-base-content/70 text-sm font-medium flex items-center gap-2">
                        🚜 Monitoring Perkebunan untuk{' '}
                        <span
                            className="inline-block transition-all duration-700 ease-in-out"
                            style={{
                                transform: `rotateX(${currentIndex === 0 ? '0deg' : '360deg'})`,
                            }}
                        >
                            <span className={`${textOptions[currentIndex].color} px-3 py-1 rounded-md font-semibold whitespace-nowrap`}>
                                {textOptions[currentIndex].label}
                            </span>
                        </span>
                    </span>
                </div>

                {/* Sapaan Selamat Datang dari Upstream */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold tracking-tight">Selamat datang pemilik kebun, {auth?.user?.name}</h2>
                    <p className="text-muted-foreground">Kelola data lahan, mobil, dan lihat laporan pengiriman kelapa sawit Anda.</p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <DashboardStats stats={stats} />
                </div>

                {/* Chart: produksi + pie */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <ProductionVolumeChart data={produksiChart} className="lg:col-span-3" />
                    <StatusPieChart data={pieChart} className="lg:col-span-1" />
                </div>

                {/* Tabel + aktivitas */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <RecentDeliveries rows={pengirimanTerbaru} className="lg:col-span-3" />
                    <FactoryActivity pengirimanTerbaru={pengirimanTerbaru} className="lg:col-span-1" />
                </div>

            </div>
        </AppLayout>
    );
}
