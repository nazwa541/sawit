"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Bar, BarChart, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    selesai: { label: "Selesai", color: "#2B2E6B" },
    nota: { label: "Menunggu Nota", color: "#EAB308" },
    jalan: { label: "Dalam Perjalanan", color: "#3B82F6" },
} satisfies ChartConfig;

const BAR_RADIUS = 5;

function ColumnHoverCursor(props: React.ComponentProps<typeof Rectangle>) {
    return <Rectangle fill="var(--muted)" fillOpacity={0.5} radius={BAR_RADIUS * 2} stroke="none" {...props} />;
}

type ChartRow = { day: string; selesai: number; nota: number; jalan: number };

interface Props extends ComponentProps<typeof Card> {
    data?: ChartRow[];
}

export function DeliveryStatusChart({ className, data, ...props }: Props) {
    const chartData = data ?? [];

    return (
        <Card className={cn("shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card", className)} {...props}>
            <CardHeader>
                <CardTitle>Status Pengiriman</CardTitle>
                <CardDescription>Total pengiriman per status dalam 10 hari terakhir.</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
                        Belum ada data pengiriman.
                    </div>
                ) : (
                    <ChartContainer className="h-[300px] w-full" config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <XAxis
                                axisLine={false}
                                dataKey="day"
                                interval={0}
                                minTickGap={8}
                                tickFormatter={(v) => String(v)}
                                tickLine={false}
                                tickMargin={10}
                            />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={<ColumnHoverCursor />} />
                            <Bar background={{ fill: "var(--muted)", radius: BAR_RADIUS }} barSize={8} dataKey="jalan" fill="var(--color-jalan)" overflow="visible" radius={[0, 0, BAR_RADIUS, BAR_RADIUS]} stackId="status" />
                            <Bar barSize={8} dataKey="nota" fill="var(--color-nota)" overflow="visible" radius={0} stackId="status" />
                            <Bar barSize={8} dataKey="selesai" fill="var(--color-selesai)" overflow="visible" radius={[BAR_RADIUS, BAR_RADIUS, 0, 0]} stackId="status" />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
