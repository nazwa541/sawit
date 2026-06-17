"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, useId, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    formatChartAxisTick,
    formatChartTooltipDate,
    parseIsoCalendarDate,
} from "@/components/formater";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";

type PeriodDays = 7 | 30 | 60;

type VolumeRow = { date: string; ton: number };

const chartConfig = {
    ton: {
        label: "Produksi (Ton)",
        color: "#FF7E6B",
    },
} satisfies ChartConfig;

interface Props extends ComponentProps<typeof Card> {
    data: VolumeRow[];
}

export function ProductionVolumeChart({ className, data, ...props }: Props) {
    const chartUid = useId().replace(/:/g, "");
    const idAreaGradient = `prod-vol-area-grad-${chartUid}`;
    const [periodDays, setPeriodDays] = useState<PeriodDays>(30);

    const chartRows = useMemo(() => {
        if (!data || data.length === 0) return [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - periodDays);
        return data.filter((item) => parseIsoCalendarDate(item.date) >= startDate);
    }, [periodDays, data]);

    const growthPctNum = useMemo(() => {
        const withData = chartRows.filter((r) => r.ton > 0);
        const first = withData[0];
        const last = withData.at(-1);
        if (!first || !last || first === last) return 0;
        return ((last.ton - first.ton) / first.ton) * 100;
    }, [chartRows]);

    const xAxisMinTickGap = periodDays <= 7 ? undefined : periodDays >= 60 ? 20 : 28;

    return (
        <Card className={cn("shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card md:col-span-2 lg:col-span-3", className)} {...props}>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <CardTitle>Produksi Panen (Ton)</CardTitle>
                        <Delta value={growthPctNum} variant="badge">
                            <DeltaIcon variant="trend" />
                            <DeltaValue />
                        </Delta>
                    </div>
                    <CardDescription>Total tonase panen harian.</CardDescription>
                </div>
                <Select onValueChange={(v) => setPeriodDays(Number(v) as PeriodDays)} value={String(periodDays)}>
                    <SelectTrigger aria-label="Rentang waktu produksi" className="w-full min-w-36 sm:w-fit" size="sm">
                        <SelectValue placeholder="Range" />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value="7">7 Hari Terakhir</SelectItem>
                        <SelectItem value="30">30 Hari Terakhir</SelectItem>
                        <SelectItem value="60">60 Hari Terakhir</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {chartRows.length === 0 ? (
                    <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                        Belum ada data produksi.
                    </div>
                ) : (
                    <ChartContainer className="aspect-22/8 w-full" config={chartConfig}>
                        <AreaChart accessibilityLayer data={chartRows} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
                            <defs>
                                <linearGradient id={idAreaGradient} x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-ton)" stopOpacity={0.45} />
                                    <stop offset="55%" stopColor="var(--color-ton)" stopOpacity={0.12} />
                                    <stop offset="100%" stopColor="var(--color-ton)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid className="stroke-border" vertical={false} />
                            <XAxis
                                axisLine={false}
                                dataKey="date"
                                interval={periodDays <= 7 ? 0 : "preserveStartEnd"}
                                minTickGap={xAxisMinTickGap}
                                tickFormatter={(value) => formatChartAxisTick(String(value), periodDays)}
                                tickLine={false}
                                tickMargin={8}
                            />
                            <YAxis axisLine={false} tick={{ className: "tabular-nums" }} tickLine={false} tickMargin={8} width={36} />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="min-w-34"
                                        indicator="line"
                                        labelFormatter={(_, payload) => {
                                            const row = payload?.[0]?.payload as VolumeRow | undefined;
                                            if (!row?.date) return "";
                                            return formatChartTooltipDate(row.date, "long");
                                        }}
                                    />
                                }
                                cursor={false}
                            />
                            <Area
                                dataKey="ton"
                                dot={false}
                                fill={`url(#${idAreaGradient})`}
                                stroke="var(--color-ton)"
                                strokeWidth={2}
                                type="natural"
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
