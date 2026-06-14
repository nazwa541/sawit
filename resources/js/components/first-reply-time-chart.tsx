"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";

type QueueRow = {
	day: string;
	minutes: number;
};

const chartRows: QueueRow[] = [
	{ day: "Sen", minutes: 45.4 },
	{ day: "Sel", minutes: 42.9 },
	{ day: "Rab", minutes: 55.2 },
	{ day: "Kam", minutes: 34.7 },
	{ day: "Jum", minutes: 30.5 },
	{ day: "Sab", minutes: 50.0 },
	{ day: "Min", minutes: 25.1 },
];

const firstMinutes = chartRows[0]?.minutes ?? 0;
const lastMinutes = chartRows.at(-1)?.minutes ?? firstMinutes;

/** Positive when median queue faster Sen → Min. */
const queueImprovementPct =
	firstMinutes > 0 ? ((firstMinutes - lastMinutes) / firstMinutes) * 100 : 0;

const chartConfig = {
	minutes: {
		label: "Menit",
		color: "#65A30D", // Primary Palm Green
	},
} satisfies ChartConfig;

export function TruckQueueChart({
	className,
	...props
}: ComponentProps<typeof Card>) {
	return (
		<Card
			className={cn("shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card", className)}
			{...props}
		>
			<CardHeader className="space-y-1">
				<div className="flex flex-wrap items-center gap-2">
					<CardTitle>Rata-rata Waktu Antrean</CardTitle>
					<Delta value={queueImprovementPct} variant="badge">
						<DeltaIcon variant="trend" />
						<DeltaValue />
					</Delta>
				</div>
				<CardDescription>
					Menit tunggu truk di timbangan, 7 hari terakhir.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer className="aspect-auto h-[300px] w-full" config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartRows}
						margin={{ top: 24, left: 12, right: 12, bottom: 8 }}
					>
						<defs>
							<linearGradient id="fillMinutes" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-minutes)" stopOpacity={0.3} />
								<stop offset="95%" stopColor="var(--color-minutes)" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid className="stroke-border/50" vertical={false} strokeDasharray="4 4" />
						<XAxis
							axisLine={false}
							dataKey="day"
							interval={0}
							tickFormatter={(value) => String(value).slice(0, 3)}
							tickLine={false}
							tickMargin={12}
						/>
						<ChartTooltip
							content={<ChartTooltipContent indicator="line" />}
							cursor={false}
						/>
						<Area
							activeDot={{ r: 6, fill: "var(--color-minutes)", stroke: "var(--background)", strokeWidth: 2 }}
							dataKey="minutes"
							fill="url(#fillMinutes)"
							fillOpacity={1}
							stroke="var(--color-minutes)"
							strokeWidth={3}
							type="monotone"
						>
							<LabelList
								className="fill-foreground/80 font-medium"
								dataKey="minutes"
								fontSize={12}
								formatter={(label: any) => {
									const n = Number(label);
									return Number.isFinite(n)
										? `${n.toFixed(0)}m`
										: String(label ?? "");
								}}
								offset={12}
								position="top"
							/>
						</Area>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
