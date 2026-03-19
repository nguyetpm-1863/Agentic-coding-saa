"use client";

import Image from "next/image";
import { ProfileDropdown } from "@/components/shared/profile-dropdown";

interface UserAvatarProps {
	avatarUrl: string | null;
	name: string;
	isAdmin?: boolean;
	currentPath: string;
}

export default function UserAvatar({
	avatarUrl,
	name,
	isAdmin,
	currentPath,
}: UserAvatarProps) {
	const avatarTrigger = avatarUrl ? (
		<Image
			src={avatarUrl}
			alt={name}
			width={40}
			height={40}
			className="w-10 h-10 rounded-full object-cover"
		/>
	) : undefined;

	return (
		<ProfileDropdown
			isAdmin={isAdmin}
			currentPath={currentPath}
			triggerContent={avatarTrigger}
		/>
	);
}
