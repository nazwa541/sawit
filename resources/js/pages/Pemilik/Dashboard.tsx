import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DashboardStats } from '@/components/dashboard/Pemilik/stats';
import { ProductionVolumeChart } from '@/components/dashboard/Pemilik/conversation-volume-chart';
import { StatusPieChart } from '@/components/dashboard/Pemilik/channel-breakdown-chart';
import { RecentDeliveries } from '@/components/dashboard/Pemilik/recent-conversations';
import { FactoryActivity } from '@/components/dashboard/Pemilik/support-activity';

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
    const { stats, pieChart, produksiChart, pengirimanTerbaru } =
        usePage<{ props: PemilikDashboardProps }>().props as unknown as PemilikDashboardProps;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | SISTRA-SAWIT" />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">

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
