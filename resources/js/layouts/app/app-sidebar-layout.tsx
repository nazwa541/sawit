import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    // Note: breadcrumbs are currently handled by the new AppHeader based on active nav item,
    // but we accept the prop to maintain compatibility with AppLayout wrapper.
    return (
        <AppShell>
            {children}
        </AppShell>
    );
}
