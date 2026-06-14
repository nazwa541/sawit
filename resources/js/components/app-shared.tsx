import type { ReactNode } from "react";
import { LayoutGridIcon, ListChecksIcon, BarChart3Icon, TruckIcon, UsersIcon, SproutIcon, SettingsIcon, HelpCircleIcon, ActivityIcon, FileTextIcon, HistoryIcon } from "lucide-react";

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	isActive?: boolean;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label?: string;
	items: SidebarNavItem[];
};

const pemilikNavGroups: SidebarNavGroup[] = [
	{
		label: "Utama",
		items: [
			{
				title: "Dashboard",
				path: "/dashboard-pemilik",
				icon: <LayoutGridIcon />,
				isActive: true,
			},
		],
	},
	{
		label: "Operasional",
		items: [
			{
				title: "Antrean Truk",
				path: "#/queue",
				icon: <ListChecksIcon />,
			},
			{
				title: "Laporan Panen",
				path: "#/team-insights",
				icon: <BarChart3Icon />,
			},
		],
	},
	{
		label: "Logistik",
		items: [
			{
				title: "Pengiriman TBS",
				icon: <TruckIcon />,
				subItems: [
					{ title: "Menunggu Nota", path: "#/inbox/unassigned" },
					{ title: "Dalam Perjalanan", path: "#/inbox/assigned" },
					{ title: "Selesai", path: "#/inbox/closed" },
				],
			},
			{
				title: "Data Supir",
				path: "#/customers",
				icon: <UsersIcon />,
			},
			{
				title: "Blok Kebun",
				path: "#/channels",
				icon: <SproutIcon />,
			},
		],
	},
	{
		label: "Sistem",
		items: [
			{
				title: "Pengaturan",
				icon: <SettingsIcon />,
				subItems: [
					{ title: "Akses Karyawan", path: "#/workspace/branding" },
					{ title: "Data Pabrik", path: "#/workspace/team" },
				],
			},
		],
	},
];

const pekerjaNavGroups: SidebarNavGroup[] = [
	{
		label: "Utama",
		items: [
			{
				title: "Dashboard",
				path: "/dashboard-pekerja",
				icon: <LayoutGridIcon />,
				isActive: true,
			},
		],
	},
	{
		label: "Tugas",
		items: [
			{
				title: "Lapor Keberangkatan",
				path: "#/pekerja/lapor",
				icon: <TruckIcon />,
			},
			{
				title: "Riwayat Perjalanan",
				path: "#/pekerja/riwayat",
				icon: <HistoryIcon />,
			},
		],
	},
];

const petugasRamNavGroups: SidebarNavGroup[] = [
	{
		label: "Utama",
		items: [
			{
				title: "Dashboard",
				path: "/dashboard-ram",
				icon: <LayoutGridIcon />,
				isActive: true,
			},
		],
	},
	{
		label: "Operasional",
		items: [
			{
				title: "Antrean Truk",
				path: "#/petugas-ram/antrean",
				icon: <ListChecksIcon />,
			},
			{
				title: "Upload Foto Nota",
				path: "#/petugas-ram/upload",
				icon: <FileTextIcon />,
			},
		],
	},
];

export const footerNavLinks: SidebarNavItem[] = [
	{
		title: "Pusat Bantuan",
		path: "#/help",
		icon: <HelpCircleIcon />,
	},
	{
		title: "Status Sistem",
		path: "#/status",
		icon: <ActivityIcon />,
	},
];

export function getNavGroups(role?: string): SidebarNavGroup[] {
	switch (role) {
		case 'pemilik':
			return pemilikNavGroups;
		case 'pekerja':
			return pekerjaNavGroups;
		case 'petugas_ram':
			return petugasRamNavGroups;
		default:
			return pemilikNavGroups; // Fallback
	}
}

export function getNavLinks(role?: string): SidebarNavItem[] {
	const groups = getNavGroups(role);
	return [
		...groups.flatMap((group) =>
			group.items.flatMap((item) =>
				item.subItems?.length ? [item, ...item.subItems] : [item]
			)
		),
		...footerNavLinks,
	];
}
