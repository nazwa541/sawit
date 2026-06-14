import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { NavUser } from "@/components/nav-user";
import { Separator } from "@/components/ui/separator";
import { usePage } from '@inertiajs/react';
import { getNavLinks } from "@/components/app-shared";
import type { SharedData } from '@/types';
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const url = page.url;
    
    // Get current user role to fetch matching nav items
    const role = auth.user?.role || 'pemilik';
    const navLinks = getNavLinks(role);
    
    // Find active page title based on current URL path
    const activeItem = navLinks.find(item => item.path && url.includes(item.path.replace('#', '')));
    const breadcrumbPage = activeItem ? { title: activeItem.title, icon: activeItem.icon } : { title: "Dashboard" };

	return (
		<header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-sidebar-border/80 border-b bg-background">
			<div className="flex w-full items-center gap-2 px-4">
				<CustomSidebarTrigger />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<AppBreadcrumbs page={breadcrumbPage} />
				
				<div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                        <BellIcon className="size-5" />
                        <span className="absolute top-1.5 right-1.5 size-2.5 rounded-full bg-red-500 border-2 border-background"></span>
                    </Button>
					<NavUser />
				</div>
			</div>
		</header>
	);
}
