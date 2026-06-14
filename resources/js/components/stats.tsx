import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { Trees, Truck, FileText, AlertTriangle } from "lucide-react";
import React from "react";

type Stat = {
	label: string;
	value: string;
	delta: number;
	footnote: string;
	/** When true, a negative delta is treated as favorable. */
	lowerIsBetter: boolean;
	icon: React.ReactNode;
	iconContainerStyle: string;
};

const stats: readonly Stat[] = [
	{
		label: "Total Panen Hari Ini",
		value: "1,240 Ton",
		delta: 5.4,
		footnote: "vs kemarin",
		lowerIsBetter: false,
		icon: <Trees className="h-4 w-4 text-[#65A30D] dark:text-green-400" />,
		iconContainerStyle: "bg-[#DCFCE7] dark:bg-green-500/20",
	},
	{
		label: "Total Pengiriman",
		value: "142 Truk",
		delta: 12.5,
		footnote: "vs minggu lalu",
		lowerIsBetter: false,
		icon: <Truck className="h-4 w-4 text-[#1D4ED8] dark:text-blue-400" />,
		iconContainerStyle: "bg-[#DBEAFE] dark:bg-blue-500/20",
	},
	{
		label: "Menunggu Nota",
		value: "24 Antrean",
		delta: -2.4,
		footnote: "vs rata-rata harian",
		lowerIsBetter: true,
		icon: <FileText className="h-4 w-4 text-[#B45309] dark:text-amber-400" />,
		iconContainerStyle: "bg-[#FEF3C7] dark:bg-amber-500/20",
	},
	{
		label: "Selisih Timbangan",
		value: "3 Kasus",
		delta: 1.1,
		footnote: "perlu verifikasi",
		lowerIsBetter: true,
		icon: <AlertTriangle className="h-4 w-4 text-[#DC2626] dark:text-red-400" />,
		iconContainerStyle: "bg-[#FEE2E2] dark:bg-red-500/20",
	},
];

export function DashboardStats() {
	return (
		<>
			{stats.map((s) => (
				<Card 
					className={cn("shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border-border rounded-[20px] bg-card")} 
					key={s.label}
				>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="font-medium text-sm text-muted-foreground">
							{s.label}
						</CardTitle>
						<div className={cn("flex h-8 w-8 items-center justify-center rounded-full", s.iconContainerStyle)}>
							{s.icon}
						</div>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						<p className="font-bold text-2xl tabular-nums text-card-foreground">{s.value}</p>
						<div className="flex items-center gap-1 text-xs">
							<Delta value={s.delta}>
								<DeltaIcon />
								<DeltaValue />
							</Delta>
							<span className="text-muted-foreground">{s.footnote}</span>
						</div>
					</CardContent>
				</Card>
			))}
		</>
	);
}
