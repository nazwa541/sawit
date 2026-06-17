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

/**
 * Cek apakah nav item aktif.
 * Pakai exact match kalau path diakhiri segment unik (misal /create, /edit).
 * Kalau path adalah "index" (tidak diakhiri segment action), pakai startsWith
 * tapi pastikan karakter berikutnya bukan huruf (hindari false match).
 */
function isNavActive(itemPath: string, currentUrl: string): boolean {
	// Exact match selalu prioritas
	if (currentUrl === itemPath) return true;
	// Kalau item path diakhiri /create atau /edit, harus exact match
	if (itemPath.endsWith('/create') || itemPath.endsWith('/edit')) return false;
	// Untuk path index, jangan aktif kalau url-nya adalah /create atau /edit dari path yang sama
	const urlWithoutQuery = currentUrl.split('?')[0];
	if (urlWithoutQuery === itemPath + '/create') return false;
	if (urlWithoutQuery === itemPath + '/edit') return false;
	if (/\/\d+\/edit$/.test(urlWithoutQuery) && urlWithoutQuery.startsWith(itemPath + '/')) return false;
	// Aktif kalau url dimulai dengan path + '/'
	return currentUrl.startsWith(itemPath + '/') || currentUrl.startsWith(itemPath + '?');
}

export function AppSidebar() {
	const { auth } = usePage<SharedData>().props;
	const { url } = usePage();
	const role = auth.user?.role || 'pemilik';
	
	const navGroups = getNavGroups(role).map(group => ({
		...group,
		items: group.items.map(item => ({
			...item,
			isActive: item.path ? isNavActive(item.path, url) : false,
			subItems: item.subItems?.map(sub => ({
				...sub,
				isActive: sub.path ? isNavActive(sub.path, url) : false
			}))
		}))
	}));

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader className="h-14 justify-center">
				<SidebarMenuButton asChild>
					<Link href="/dashboard">
						<LogoIcon />
						<span className="font-semibold text-[#FF7E6B]">SISTRA-SAWIT</span>
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
								isActive={item.path ? url.startsWith(item.path) : false}
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
