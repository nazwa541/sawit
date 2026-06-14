"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Bar, BarChart, Rectangle, XAxis } from "recharts";
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

const chartData = [
	{ day: "1 Jun", selesai: 11, nota: 9, jalan: 4 },
	{ day: "2 Jun", selesai: 15, nota: 11, jalan: 5 },
	{ day: "3 Jun", selesai: 13, nota: 10, jalan: 5 },
	{ day: "4 Jun", selesai: 16, nota: 12, jalan: 5 },
	{ day: "5 Jun", selesai: 12, nota: 10, jalan: 5 },
	{ day: "6 Jun", selesai: 14, nota: 10, jalan: 6 },
	{ day: "7 Jun", selesai: 11, nota: 9, jalan: 5 },
	{ day: "8 Jun", selesai: 16, nota: 7, jalan: 4 },
	{ day: "9 Jun", selesai: 13, nota: 11, jalan: 5 },
	{ day: "10 Jun", selesai: 15, nota: 11, jalan: 6 },
] as const;

const chartConfig = {
	selesai: {
		label: "Selesai",
		color: "#65A30D", // Primary Palm Green
	},
	nota: {
		label: "Menunggu Nota",
		color: "#EAB308", // Harvest Yellow
	},
	jalan: {
		label: "Dalam Perjalanan",
		color: "#3B82F6", // Info Blue
	},
} satisfies ChartConfig;

/** Half of bar width (8) so ends read as fully rounded “caps”. */
const BAR_RADIUS = 5;

/**
 *  column hover background.
 */
function ColumnHoverCursor(props: React.ComponentProps<typeof Rectangle>) {
	return (
		<Rectangle
			fill="var(--muted)"
			fillOpacity={0.5}
			radius={BAR_RADIUS * 2}
			stroke="none"
			{...props}
		/>
	);
}

export function DeliveryStatusChart({
	className,
	...props
}: ComponentProps<typeof Card>) {
	return (
		<Card
			className={cn("shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>Status Pengiriman</CardTitle>
				<CardDescription>
					Total pengiriman per status dalam 10 hari terakhir.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer className="aspect-auto h-[300px] w-full" config={chartConfig}>
					<BarChart accessibilityLayer data={[...chartData]}>
						<XAxis
							axisLine={false}
							dataKey="day"
							interval={0}
							minTickGap={8}
							tickFormatter={(value) => String(value)}
							tickLine={false}
							tickMargin={10}
						/>
						<ChartTooltip
							content={<ChartTooltipContent hideLabel />}
							cursor={<ColumnHoverCursor />}
						/>
						<Bar
							background={{
								fill: "var(--muted)",
								radius: BAR_RADIUS,
							}}
							barSize={8}
							dataKey="jalan"
							fill="var(--color-jalan)"
							overflow="visible"
							radius={[0, 0, BAR_RADIUS, BAR_RADIUS]}
							stackId="status"
						/>
						<Bar
							barSize={8}
							dataKey="nota"
							fill="var(--color-nota)"
							overflow="visible"
							radius={0}
							stackId="status"
						/>
						<Bar
							barSize={8}
							dataKey="selesai"
							fill="var(--color-selesai)"
							overflow="visible"
							radius={[BAR_RADIUS, BAR_RADIUS, 0, 0]}
							stackId="status"
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
