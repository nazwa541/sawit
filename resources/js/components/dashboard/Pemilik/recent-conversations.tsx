import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { ArrowRightIcon } from "lucide-react";
import type { PemilikDashboardProps } from "@/pages/Pemilik/Dashboard";

type Status = "perjalanan" | "menunggu_nota" | "selesai";

function statusBadgeStyle(status: string) {
    if (status === "perjalanan") return "badge-info";
    if (status === "menunggu_nota") return "badge-warning";
    if (status === "selesai") return "badge-success";
    return "badge-ghost";
}

function statusLabel(status: string): string {
    if (status === "perjalanan") return "Perjalanan";
    if (status === "menunggu_nota") return "Nota";
    if (status === "selesai") return "Selesai";
    return status;
}

interface Props extends ComponentProps<"div"> {
    rows: PemilikDashboardProps['pengirimanTerbaru'];
}

export function RecentDeliveries({ className, rows, ...props }: Props) {
    return (
        <div
            data-theme="light"
            className={cn(
                "rounded-[20px] border border-base-300 bg-base-100 shadow-sm hover:shadow-md transition-all duration-200",
                className
            )}
            {...props}
        >
            {/* Header */}
            <div className="border-b border-base-300 px-6 py-4">
                <h3 className="text-lg font-semibold text-base-content">Pengiriman Terakhir</h3>
                <p className="text-sm text-base-content/70">{rows.length} pengiriman terbaru</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra table-pin-rows">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No Truk</th>
                            <th className="hidden sm:table-cell">Supir</th>
                            <th>Blok Asal</th>
                            <th className="text-right">Waktu</th>
                            <th className="pr-6 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center text-base-content/50 py-8">
                                    Belum ada data pengiriman.
                                </td>
                            </tr>
                        ) : (
                            rows.map((r, index) => (
                                <tr key={r.id} className={cn("hover:bg-base-200/50", index % 2 === 0 ? "bg-base-200" : "")}>
                                    <td className="max-w-36 truncate font-medium text-base-content uppercase tracking-wider">
                                        {r.noTruk}
                                    </td>
                                    <td className="hidden max-w-32 sm:table-cell text-base-content">
                                        {r.supir}
                                    </td>
                                    <td className="text-base-content">{r.blok}</td>
                                    <td className="text-right text-base-content/60 text-sm">{r.waktu}</td>
                                    <td className="pr-6 text-right">
                                        <span className={cn("badge", statusBadgeStyle(r.status))}>
                                            {statusLabel(r.status)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer - Lihat Semua */}
            <div className="flex justify-center border-t border-base-300 py-3">
                <a
                    href="/pengiriman"
                    className="btn btn-ghost btn-sm text-[#FF7E6B] dark:text-[#FF9485] hover:text-[#F0654F] dark:hover:text-[#FF9485] hover:bg-[#FFE7E2] dark:hover:bg-[#FF7E6B]/20"
                >
                    Lihat semua pengiriman
                    <ArrowRightIcon aria-hidden="true" className="ml-2 h-4 w-4" />
                </a>
            </div>
        </div>
    );
}
