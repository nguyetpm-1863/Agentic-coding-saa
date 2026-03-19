import { Header } from "@/components/shared/header";
import { LanguageSelector } from "@/components/shared/language-selector";
import NavTabs from "@/components/homepage/nav-tabs";
import NotificationBell from "@/components/homepage/notification-bell";
import UserAvatar from "@/components/homepage/user-avatar";

interface HomeHeaderProps {
	currentLocale: string;
	navSections: Array<{ href: string; label: string }>;
	userAvatarUrl: string | null;
	userName: string;
	isAdmin?: boolean;
}

export default function HomeHeader({
	currentLocale,
	navSections,
	userAvatarUrl,
	userName,
	isAdmin,
}: HomeHeaderProps) {
	const navTabsSlot = <NavTabs sections={navSections} />;

	return (
		<Header navContent={navTabsSlot}>
			<div className="flex items-center gap-2">
				<NotificationBell />
				<LanguageSelector currentLocale={currentLocale} />
				<UserAvatar
					avatarUrl={userAvatarUrl}
					name={userName}
					isAdmin={isAdmin}
					currentPath="/"
				/>
			</div>
		</Header>
	);
}
