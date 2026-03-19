"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavTabsProps {
	sections: Array<{ href: string; label: string }>;
}

export default function NavTabs({ sections }: NavTabsProps) {
	const pathname = usePathname();

	return (
		<nav aria-label="Page sections" className="flex items-center gap-8 lg:gap-[60px]">
			{sections.map((section) => {
				const isActive = pathname === section.href;
				return (
					<Link
						key={section.href}
						href={section.href}
						aria-current={isActive ? "page" : undefined}
						className={`font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 tracking-[0.1px] transition-all duration-150 pb-1 ${
							isActive
								? "text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
								: "text-white hover:text-[#FFEA9E] border-b border-transparent"
						}`}
					>
						{section.label}
					</Link>
				);
			})}
		</nav>
	);
}
