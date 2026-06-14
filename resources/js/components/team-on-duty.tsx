"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, useState } from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusIndicator } from "@/components/indicator";
import { EllipsisIcon, MessageSquareIcon, MapPinIcon } from "lucide-react";

type Operator = {
	id: string;
	name: string;
	status: "Aktif" | "Istirahat";
	role: string;
	image?: string;
};

const INITIAL_OPERATORS: readonly Operator[] = [
	{
		id: "budi",
		name: "Budi Santoso",
		status: "Aktif",
		role: "Operator Timbangan 1",
		image: "https://avatar.vercel.sh/budisantoso",
	},
	{
		id: "ahmad",
		name: "Ahmad Riyadi",
		status: "Aktif",
		role: "Mandor Panen",
		image: "https://avatar.vercel.sh/ahmadriyadi",
	},
	{
		id: "siti",
		name: "Siti Aminah",
		status: "Istirahat",
		role: "Admin Logistik",
		image: "https://avatar.vercel.sh/sitiaminah",
	},
	{
		id: "joko",
		name: "Joko Anwar",
		status: "Aktif",
		role: "Operator Sortir",
		image: "https://avatar.vercel.sh/jokoanwar",
	},
];

function getInitials(name: string) {
	return name
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
}

export function OperatorOnDuty({
	className,
	...props
}: ComponentProps<typeof Card>) {
	const [operators, setOperators] = useState<Operator[]>(() => [
		...INITIAL_OPERATORS,
	]);

	return (
		<Card className={cn("shadow-sm hover:shadow-md transition-all duration-200 border-[#E4E4E7] rounded-[20px] bg-white", className)} {...props}>
			<CardHeader className="border-b border-[#E4E4E7]">
				<CardTitle>Operator Bertugas</CardTitle>
				<CardDescription>Petugas lapangan dan timbangan aktif</CardDescription>
			</CardHeader>
			<CardContent className="p-0">
				<ul className="flex flex-col divide-y divide-[#E4E4E7]">
					{operators.map((t) => (
						<li
							className="flex items-center gap-2 p-3 sm:gap-3 hover:bg-[#F8FAFC]"
							key={t.id}
						>
							<Avatar className="size-8">
								<AvatarImage alt={t.name} src={t.image} />
								<AvatarFallback>{getInitials(t.name)}</AvatarFallback>
							</Avatar>
							<div className="min-w-0 flex-1 pr-1">
								<p className="truncate font-medium text-[#18181B] text-sm leading-snug">
									{t.name}
								</p>
								<p className="flex items-center gap-2 text-[10px] text-[#71717A] leading-snug">
									<span className="flex shrink-0 items-center gap-1">
										<StatusIndicator
											color={t.status === "Aktif" ? "emerald" : "amber"}
											pulse={t.status === "Aktif"}
										/>
										{t.status}
									</span>
									<span className="inline-flex size-1 rounded-full bg-[#71717A]" />
									<span className="truncate">{t.role}</span>
								</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										aria-label={`Aksi untuk ${t.name}`}
										size="icon-xs"
										variant="ghost"
									>
										<EllipsisIcon className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="min-w-52">
									<DropdownMenuLabel className="font-normal text-[#71717A] text-xs">
										{t.name}
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="gap-2 cursor-pointer">
										<MessageSquareIcon className="size-4 opacity-70" />
										Kirim Pesan
									</DropdownMenuItem>
									<DropdownMenuItem className="gap-2 cursor-pointer">
										<MapPinIcon className="size-4 opacity-70" />
										Tugaskan ke Area Lain
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
