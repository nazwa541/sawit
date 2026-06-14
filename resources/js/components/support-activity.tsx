import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Factory, Truck, FileCheck, Users, ArrowRightIcon } from "lucide-react";

const items = [
	{
		title: "Mesin Sterilizer 1 selesai proses rebus",
		time: "12 menit lalu",
		icon: (
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCFCE7] dark:bg-green-500/20">
				<Factory className="h-4 w-4 text-[#65A30D] dark:text-green-400" />
			</div>
		),
	},
	{
		title: "Truk BM 8192 XA masuk antrean bongkar",
		time: "28 menit lalu",
		icon: (
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DBEAFE] dark:bg-blue-500/20">
				<Truck className="h-4 w-4 text-[#1D4ED8] dark:text-blue-400" />
			</div>
		),
	},
	{
		title: "Laporan selisih timbangan disetujui",
		time: "1 jam lalu",
		icon: (
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEF3C7] dark:bg-amber-500/20">
				<FileCheck className="h-4 w-4 text-[#B45309] dark:text-amber-400" />
			</div>
		),
	},
	{
		title: "Operator shift 2 mulai bertugas",
		time: "3 jam lalu",
		icon: (
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F4F5] dark:bg-zinc-500/20">
				<Users className="h-4 w-4 text-[#52525B] dark:text-zinc-400" />
			</div>
		),
	},
] as const;

export function FactoryActivity({
	className,
	...props
}: ComponentProps<typeof Card>) {
	return (
		<Card className={cn("gap-0 shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card", className)} {...props}>
			<CardHeader className="border-b border-border">
				<CardTitle>Aktivitas Pabrik</CardTitle>
				<CardDescription>Log aktivitas operasional terbaru.</CardDescription>
			</CardHeader>
			<CardContent className="px-0 pb-0">
				<ul className="flex flex-col divide-y divide-border">
					{items.map((item) => (
						<li className="flex h-16 items-center gap-3 px-4 hover:bg-muted/50" key={item.title}>
							<span
								aria-hidden="true"
								className="flex shrink-0 items-center justify-center"
							>
								{item.icon}
							</span>
							<div className="min-w-0 flex-1 space-y-1">
								<p className="line-clamp-2 text-pretty text-card-foreground font-medium text-sm leading-snug">
									{item.title}
								</p>
								<p className="text-muted-foreground text-xs tabular-nums">
									{item.time}
								</p>
							</div>
						</li>
					))}
				</ul>
			</CardContent>
			<div className="flex items-center justify-center border-t border-border py-2">
				<Button asChild size="sm" variant="ghost" className="text-[#65A30D] dark:text-green-400 hover:text-[#4d7a0a] dark:hover:text-green-300 hover:bg-[#DCFCE7] dark:hover:bg-green-500/20">
					<a href="/#">
						Lihat Semua Log
						<ArrowRightIcon aria-hidden="true" className="ml-2 h-4 w-4" />
					</a>
				</Button>
			</div>
		</Card>
	);
}
