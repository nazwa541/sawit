import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ArrowRightIcon } from "lucide-react";
import type { PemilikDashboardProps } from "@/pages/Pemilik/Dashboard";

interface Props extends ComponentProps<typeof Card> {
    pengirimanTerbaru: PemilikDashboardProps['pengirimanTerbaru'];
}

function statusColor(status: string) {
    if (status === "selesai") return { bg: "bg-[#E5E6F4] dark:bg-indigo-500/20", icon: "text-[#2B2E6B] dark:text-indigo-300" };
    if (status === "menunggu_nota") return { bg: "bg-[#FEF3C7] dark:bg-amber-500/20", icon: "text-[#B45309] dark:text-amber-400" };
    return { bg: "bg-[#DBEAFE] dark:bg-blue-500/20", icon: "text-[#1D4ED8] dark:text-blue-400" };
}

function statusText(status: string) {
    if (status === "selesai") return "selesai pengiriman";
    if (status === "menunggu_nota") return "menunggu nota timbangan";
    return "sedang dalam perjalanan";
}

export function FactoryActivity({ className, pengirimanTerbaru, ...props }: Props) {
    return (
        <Card className={cn("gap-0 shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card", className)} {...props}>
            <CardHeader className="border-b border-border">
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Log pengiriman terbaru.</CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                <ul className="flex flex-col divide-y divide-border">
                    {pengirimanTerbaru.length === 0 ? (
                        <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                            Belum ada aktivitas.
                        </li>
                    ) : pengirimanTerbaru.map((item) => {
                        const color = statusColor(item.status);
                        return (
                            <li className="flex h-16 items-center gap-3 px-4 hover:bg-muted/50" key={item.id}>
                                <span className="flex shrink-0 items-center justify-center">
                                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", color.bg)}>
                                        <Truck className={cn("h-4 w-4", color.icon)} />
                                    </div>
                                </span>
                                <div className="min-w-0 flex-1 space-y-1">
                                    <p className="line-clamp-2 text-card-foreground font-medium text-sm leading-snug">
                                        Truk <span className="uppercase font-semibold">{item.noTruk}</span> ({item.supir}) {statusText(item.status)}
                                    </p>
                                    <p className="text-muted-foreground text-xs tabular-nums">{item.waktu}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
            <div className="flex items-center justify-center border-t border-border py-2">
                <Button asChild size="sm" variant="ghost" className="text-[#FF7E6B] dark:text-[#FF9485] hover:text-[#F0654F] dark:hover:text-[#FF9485] hover:bg-[#FFE7E2] dark:hover:bg-[#FF7E6B]/20">
                    <a href="/pengiriman">
                        Lihat Semua
                        <ArrowRightIcon aria-hidden="true" className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
        </Card>
    );
}
