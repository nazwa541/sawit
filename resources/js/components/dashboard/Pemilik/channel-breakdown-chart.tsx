"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
} from "@/components/ui/chart";

type PieRow = { status: string; label: string; jumlah: number };

const chartConfig = {
    jumlah:        { label: "Jumlah" },
    selesai:       { label: "Selesai",          color: "#2B2E6B"},
    menunggu_nota: { label: "Menunggu Nota",     color: "#EAB308" },
    perjalanan:    { label: "Perjalanan",        color: "#3B82F6" },
} satisfies ChartConfig;

const LEGEND_ITEMS = [
    { key: "selesai",       label: "Selesai",       color: "#2B2E6B" },
    { key: "menunggu_nota", label: "Menunggu Nota", color: "#EAB308" },
    { key: "perjalanan",    label: "Perjalanan",    color: "#3B82F6" },
];

interface Props extends ComponentProps<typeof Card> {
    data: PieRow[];
}

export function StatusPieChart({ className, data, ...props }: Props) {
    const total = data.reduce((sum, d) => sum + d.jumlah, 0);

    const chartData = data.map((d) => ({
        ...d,
        fill: `var(--color-${d.status})`,
        persen: total > 0 ? Math.round((d.jumlah / total) * 100) : 0,
    }));

    return (
        <Card className={cn("flex flex-col shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card", className)} {...props}>
            <CardHeader className="items-center space-y-1 pb-0 sm:items-start">
                <CardTitle>Distribusi Status</CardTitle>
                <CardDescription>Semua pengiriman berdasarkan status</CardDescription>
            </CardHeader>
            <CardContent className="my-auto">
                {total === 0 ? (
                    <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                        Belum ada data pengiriman.
                    </div>
                ) : (
                    <>
                    <ChartContainer className="mx-auto aspect-square max-h-64 w-full" config={chartConfig}>
                        <PieChart accessibilityLayer>
                            <Pie
                                cornerRadius={6}
                                data={chartData}
                                dataKey="jumlah"
                                innerRadius={20}
                                nameKey="status"
                                outerRadius="90%"
                                stroke="var(--card)"
                                strokeWidth={3}
                            >
                                <LabelList
                                    className="fill-background font-medium"
                                    dataKey="persen"
                                    fill="currentColor"
                                    fontWeight={500}
                                    formatter={(v: number) => v > 0 ? `${v}%` : ""}
                                    position="inside"
                                    stroke="none"
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                    {/* Custom legend kecil */}
                    <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
                        {LEGEND_ITEMS.map((item) => (
                            <div key={item.key} className="flex items-center gap-1.5">
                                <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-xs text-muted-foreground">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
