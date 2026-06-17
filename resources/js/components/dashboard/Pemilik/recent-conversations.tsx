import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRightIcon } from "lucide-react";
import type { PemilikDashboardProps } from "@/pages/Pemilik/Dashboard";

type Status = "perjalanan" | "menunggu_nota" | "selesai";

function statusBadgeStyle(status: string) {
    if (status === "perjalanan") return "bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#DBEAFE] dark:bg-blue-500/20 dark:text-blue-400";
    if (status === "menunggu_nota") return "bg-[#FEF3C7] text-[#B45309] hover:bg-[#FEF3C7] dark:bg-amber-500/20 dark:text-amber-400";
    if (status === "selesai") return "bg-[#E5E6F4] text-[#2B2E6B] hover:bg-[#E5E6F4] dark:bg-indigo-500/20 dark:text-indigo-300";
    return "";
}

function statusLabel(status: string): string {
    if (status === "perjalanan") return "Perjalanan";
    if (status === "menunggu_nota") return "Nota";
    if (status === "selesai") return "Selesai";
    return status;
}

interface Props extends ComponentProps<typeof Card> {
    rows: PemilikDashboardProps['pengirimanTerbaru'];
}

export function RecentDeliveries({ className, rows, ...props }: Props) {
    return (
        <Card
            className={cn("gap-0 shadow-sm hover:shadow-md transition-all duration-200 border-border rounded-[20px] bg-card md:col-span-2 lg:col-span-3", className)}
            {...props}
        >
            <CardHeader className="border-b border-border">
                <CardTitle>Pengiriman Terakhir</CardTitle>
                <CardDescription>{rows.length} pengiriman terbaru</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent bg-muted/50">
                            <TableHead className="pl-6 text-muted-foreground font-medium">No Truk</TableHead>
                            <TableHead className="hidden sm:table-cell text-muted-foreground font-medium">Supir</TableHead>
                            <TableHead className="text-muted-foreground font-medium">Blok Asal</TableHead>
                            <TableHead className="text-right text-muted-foreground font-medium">Waktu</TableHead>
                            <TableHead className="pr-6 text-right text-muted-foreground font-medium">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                    Belum ada data pengiriman.
                                </TableCell>
                            </TableRow>
                        ) : rows.map((r) => (
                            <TableRow className="h-14 hover:bg-muted/50 border-b-border" key={r.id}>
                                <TableCell className="max-w-36 truncate pl-6 font-medium text-card-foreground uppercase tracking-wider">
                                    {r.noTruk}
                                </TableCell>
                                <TableCell className="hidden max-w-32 sm:table-cell text-card-foreground">
                                    {r.supir}
                                </TableCell>
                                <TableCell className="text-card-foreground">{r.blok}</TableCell>
                                <TableCell className="text-right text-muted-foreground text-sm">{r.waktu}</TableCell>
                                <TableCell className="pr-6 text-right">
                                    <Badge className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium border-none shadow-none whitespace-nowrap", statusBadgeStyle(r.status))}>
                                        {statusLabel(r.status)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-center border-t border-border py-3">
                    <Button asChild size="sm" variant="ghost" className="text-[#FF7E6B] dark:text-[#FF9485] hover:text-[#F0654F] dark:hover:text-[#FF9485] hover:bg-[#FFE7E2] dark:hover:bg-[#FF7E6B]/20">
                        <a href="/pengiriman">
                            Lihat semua pengiriman
                            <ArrowRightIcon aria-hidden="true" className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
