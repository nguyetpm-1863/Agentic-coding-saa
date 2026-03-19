import Link from "next/link";
import Image from "next/image";

export function Header({
	children,
	navContent,
	centerContent,
	className,
}: {
	children?: React.ReactNode;
	navContent?: React.ReactNode;
	centerContent?: React.ReactNode;
	className?: string;
}) {
	return (
		<header className={className ?? "fixed top-0 w-full h-20 bg-[#101417]/80 px-4 md:px-12 lg:px-20 xl:px-36 py-3 flex items-center justify-between z-50"}>
			<div className="flex items-center gap-8 lg:gap-16">
				<Link href="/">
					<Image
						src="/images/login/saa-logo.png"
						alt="Sun Annual Awards 2025"
						width={52}
						height={48}
						className="w-[40px] h-[36px] md:w-[52px] md:h-[48px]"
					/>
				</Link>
				{navContent && (
					<div className="hidden md:flex items-center">
						{navContent}
					</div>
				)}
			</div>
			{centerContent && (
				<div className="hidden md:flex items-center">
					{centerContent}
				</div>
			)}
			<div className="flex items-center">
				{children}
			</div>
		</header>
	);
}
