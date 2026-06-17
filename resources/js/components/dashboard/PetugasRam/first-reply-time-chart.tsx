"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";

type QueueRow = { day: string; jumlah: number };

const chartConfig = {
    jumlah: {
        label: "Truk",
        color: "#FF7E6B",
    },
} satisfies ChartConfig;

interface Props extends ComponentProps<typeof Card> {
    data?: QueueRow[];
}

export function TruckQueueChart({ className, data, ...props }: Props) {
    const chartRows = data ?? [];

    const withData = chartRows.filter((r) => r.jumlah > 0);
    const firstVal = withData[0]?.jumlah ?? 0;
    const lastVal = withData.at(-1)?.jumlah ?? firstVal;
    const improvementPct = firstVal > 0 && withData.length > 1 ? ((firstVal - lastVal) / firstVal) * 100 : 0;

    return (
        <Card className={cn("shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card", className)} {...props}>
            <CardHeader className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                    <CardTitle>Antrean Menunggu Nota</CardTitle>
                    <Delta value={improvementPct} variant="badge">
                        <DeltaIcon variant="trend" />
                        <DeltaValue />
                    </Delta>
                </div>
                <CardDescription>Jumlah truk menunggu nota per hari, 7 hari terakhir.</CardDescription>
            </CardHeader>
            <CardContent>
                {chartRows.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
                        Belum ada data antrean.
                    </div>
                ) : (
                    <ChartContainer className="h-[300px] w-full" config={chartConfig}>
                        <AreaChart accessibilityLayer data={chartRows} margin={{ top: 24, left: 12, right: 12, bottom: 8 }}>
                            <defs>
                                <linearGradient id="fillJumlah" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-jumlah)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--color-jumlah)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid className="stroke-border/50" vertical={false} strokeDasharray="4 4" />
                            <XAxis
                                axisLine={false}
                                dataKey="day"
                                interval={0}
                                tickFormatter={(v) => String(v).slice(0, 3)}
                                tickLine={false}
                                tickMargin={12}
                            />
                            <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
                            <Area
                                activeDot={{ r: 6, fill: "var(--color-jumlah)", stroke: "var(--background)", strokeWidth: 2 }}
                                dataKey="jumlah"
                                fill="url(#fillJumlah)"
                                fillOpacity={1}
                                stroke="var(--color-jumlah)"
                                strokeWidth={3}
                                type="monotone"
                            >
                                <LabelList
                                    className="fill-foreground/80 font-medium"
                                    dataKey="jumlah"
                                    fontSize={12}
                                    formatter={(label: any) => {
                                        const n = Number(label);
                                        return Number.isFinite(n) ? String(n) : String(label ?? "");
                                    }}
                                    offset={12}
                                    position="top"
                                />
                            </Area>
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
