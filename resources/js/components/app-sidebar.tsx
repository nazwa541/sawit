import { Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { footerNavLinks, getNavGroups } from "@/components/app-shared";

import { PlusIcon, SearchIcon } from "lucide-react";

export function AppSidebar() {
	const { auth } = usePage<SharedData>().props;
	const role = auth.user?.role || 'pemilik';
	const navGroups = getNavGroups(role);

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader className="h-14 justify-center">
				<SidebarMenuButton asChild>
					<Link href="/dashboard">
						<LogoIcon />
						<span className="font-medium text-[#65A30D] dark:text-green-400">SISTRA-SAWIT</span>
					</Link>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>

				{navGroups.map((group, index) => (
					<NavGroup key={`sidebar-group-${index}`} {...group} />
				))}
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu className="mt-2">
					{footerNavLinks.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								className="text-muted-foreground"
								isActive={item.isActive}
								size="sm"
							>
								<Link href={item.path || '#'}>
									{item.icon}
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
