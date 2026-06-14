import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Dashboard as DashboardContent } from '@/components/dashboard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | SISTRA-SAWIT" />
            
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
                <DashboardContent />
            </div>
        </AppLayout>
    );
}
