import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ArrowRightIcon } from "lucide-react";

type Delivery = {
	noTruk: string;
	supir: string;
	tujuan: string;
	waktu: string;
	state: "jalan" | "nota" | "selesai" | "verifikasi";
};

const rows: Delivery[] = [
	{
		noTruk: "BM 8192 XA",
		supir: "Budi Santoso",
		tujuan: "PKS 1",
		waktu: "10 menit lalu",
		state: "selesai",
	},
	{
		noTruk: "BK 1234 YB",
		supir: "Ahmad Riyadi",
		tujuan: "PKS 2",
		waktu: "25 menit lalu",
		state: "nota",
	},
	{
		noTruk: "BH 9876 ZC",
		supir: "Siti Aminah",
		tujuan: "PKS 1",
		waktu: "1 jam lalu",
		state: "jalan",
	},
	{
		noTruk: "BA 4567 WD",
		supir: "Joko Anwar",
		tujuan: "PKS 3",
		waktu: "2 jam lalu",
		state: "verifikasi",
	},
];

function statusBadgeStyle(state: Delivery["state"]) {
	if (state === "jalan") return "bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#DBEAFE] dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/20";
	if (state === "nota") return "bg-[#FEF3C7] text-[#B45309] hover:bg-[#FEF3C7] dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/20";
	if (state === "selesai") return "bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7] dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/20";
	if (state === "verifikasi") return "bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FEE2E2] dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/20";
	return "";
}

function statusLabel(state: Delivery["state"]): string {
	if (state === "jalan") return "Dalam Perjalanan";
	if (state === "nota") return "Menunggu Nota";
	if (state === "selesai") return "Selesai";
	if (state === "verifikasi") return "Perlu Verifikasi";
	return "Selesai";
}

export function RecentDeliveries({
	className,
	...props
}: ComponentProps<typeof Card>) {
	return (
		<Card
			className={cn("gap-0 shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card md:col-span-2 lg:col-span-3", className)}
			{...props}
		>
			<CardHeader className="border-b border-border">
				<CardTitle>Pengiriman Terakhir</CardTitle>
				<CardDescription>4 pengiriman terbaru ke pabrik</CardDescription>
			</CardHeader>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent bg-muted/50">
							<TableHead className="pl-6 text-muted-foreground font-medium">No Truk</TableHead>
							<TableHead className="hidden sm:table-cell text-muted-foreground font-medium">Supir</TableHead>
							<TableHead className="text-muted-foreground font-medium">Tujuan</TableHead>
							<TableHead className="text-right text-muted-foreground font-medium">Waktu</TableHead>
							<TableHead className="pr-6 text-right text-muted-foreground font-medium">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((r) => {
							return (
								<TableRow
									className="h-14 hover:bg-muted/50 border-b-border"
									key={`${r.noTruk}-${r.supir}`}
								>
									<TableCell className="max-w-36 truncate pl-6 font-medium text-card-foreground">
										{r.noTruk}
									</TableCell>
									<TableCell className="hidden max-w-32 sm:table-cell text-card-foreground">
										{r.supir}
									</TableCell>
									<TableCell className="text-card-foreground">
										{r.tujuan}
									</TableCell>
									<TableCell className="text-right text-muted-foreground text-sm">
										{r.waktu}
									</TableCell>
									<TableCell className="pr-6 text-right">
										<Badge className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium border-none shadow-none", statusBadgeStyle(r.state))}>
											{statusLabel(r.state)}
										</Badge>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<div className="flex justify-center border-t border-border py-3">
					<Button asChild size="sm" variant="ghost" className="text-[#65A30D] dark:text-green-400 hover:text-[#4d7a0a] dark:hover:text-green-300 hover:bg-[#DCFCE7] dark:hover:bg-green-500/20">
						<a href="#/deliveries">
							Lihat semua pengiriman
							<ArrowRightIcon aria-hidden="true" className="ml-2 h-4 w-4" />
						</a>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
