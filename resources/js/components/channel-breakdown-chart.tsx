"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { LabelList, Pie, PieChart } from "recharts";
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
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";

type QualityKey = "grade_a" | "grade_b" | "grade_c";

type QualityDatum = {
	quality: QualityKey;
	share: number;
	fill: string;
};

const chartData: QualityDatum[] = [
	{ quality: "grade_a", share: 55, fill: "var(--color-grade_a)" },
	{ quality: "grade_b", share: 30, fill: "var(--color-grade_b)" },
	{ quality: "grade_c", share: 15, fill: "var(--color-grade_c)" },
];

const chartConfig = {
	share: {
		label: "Persentase",
	},
	grade_a: {
		label: "A",
		color: "#65A30D", // Primary Palm Green
	},
	grade_b: {
		label: "B",
		color: "#84CC16", // Secondary Palm Green
	},
	grade_c: {
		label: "C",
		color: "#EAB308", // Harvest Yellow
	},
} satisfies ChartConfig;

export function QualityBreakdownChart({
	className,
	...props
}: ComponentProps<typeof Card>) {
	return (
		<Card
			className={cn("flex flex-col shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card", className)}
			{...props}
		>
			<CardHeader className="items-center space-y-1 pb-0 sm:items-start">
				<div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
					<CardTitle>Kualitas TBS</CardTitle>
				</div>
				<CardDescription>
					Distribusi kualitas Tandan Buah Segar hari ini
				</CardDescription>
			</CardHeader>
			<CardContent className="my-auto">
				<ChartContainer
					className="mx-auto aspect-square max-h-72 w-full"
					config={chartConfig}
				>
					<PieChart accessibilityLayer>
						<Pie
							cornerRadius={6}
							data={chartData}
							dataKey="share"
							innerRadius={20}
							nameKey="quality"
							outerRadius="95%"
							stroke="var(--card)"
							strokeWidth={3}
						>
							<LabelList
								className="fill-background font-medium"
								dataKey="share"
								fill="currentColor"
								fontWeight={500}
								formatter={(label: string | number) => {
									const n = Number(label);
									return Number.isFinite(n) ? `${n}%` : String(label ?? "");
								}}
								position="inside"
								stroke="none"
							/>
						</Pie>
						<ChartLegend content={<ChartLegendContent nameKey="quality" />} />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
