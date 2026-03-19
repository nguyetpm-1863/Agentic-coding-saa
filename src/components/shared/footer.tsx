"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer({
	copyright = "Bản quyền thuộc về Sun* © 2025",
	navLinks,
}: {
	copyright?: string;
	navLinks?: Array<{ label: string; href: string }>;
}) {
	const pathname = usePathname();

	return (
		<footer className="w-full px-4 md:px-12 lg:px-20 xl:px-[90px] py-6 md:py-10 border-t border-[#2E3940]">
			<div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
				<Link href="/" className="shrink-0">
					<Image
						src="/images/login/saa-logo.png"
						alt="Sun* Annual Awards 2025"
						width={52}
						height={48}
						className="w-[40px] h-[37px] lg:w-[52px] lg:h-[48px]"
					/>
				</Link>

				{navLinks && navLinks.length > 0 && (
					<nav className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 xl:gap-10">
						{navLinks.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href}
									href={link.href}
									aria-current={isActive ? "page" : undefined}
									className={`text-sm md:text-base font-[family-name:var(--font-montserrat)] font-bold leading-6 tracking-[0.15px] py-2 min-h-[44px] flex items-center transition-all duration-150 ease-in-out ${
										isActive
											? "text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
											: "text-white hover:text-[#FFEA9E] hover:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
									}`}
								>
									{link.label}
								</Link>
							);
						})}
					</nav>
				)}

				<p className="font-[family-name:var(--font-montserrat-alternates)] text-sm md:text-base font-bold text-white whitespace-nowrap">
					{copyright}
				</p>
			</div>
		</footer>
	);
}
