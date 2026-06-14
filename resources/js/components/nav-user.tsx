"use client";

import { Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, LogOutIcon } from "lucide-react";

export function NavUser() {
	const { auth } = usePage<SharedData>().props;
	const user = auth.user;
    // Fallback avatar if no actual avatar
    const avatar = user.avatar || `https://avatar.vercel.sh/${user.name.replace(/\s+/g, '')}`;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="size-8">
					<AvatarImage src={avatar} />
					<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuItem className="flex items-center justify-start gap-2">
					<DropdownMenuLabel className="flex items-center gap-3">
						<Avatar className="size-10">
							<AvatarImage src={avatar} />
							<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<span className="font-medium text-foreground">{user.name}</span>{" "}
							<br />
							<div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground text-xs">
								{user.email}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
                        <Link href="/settings/profile" className="w-full cursor-pointer">
						    <UserIcon />
						    Profil
                        </Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuGroup>
					<DropdownMenuItem
						className="w-full cursor-pointer"
						variant="destructive"
                        asChild
					>
                        <Link href="/logout" method="post" as="button" className="w-full cursor-pointer">
						    <LogOutIcon />
						    Keluar
                        </Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
