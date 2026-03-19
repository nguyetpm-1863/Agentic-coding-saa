import Image from "next/image";
import { useCallback, useRef } from "react";

interface SidebarAward {
	slug: string;
	name: string;
}

interface AwardSidebarProps {
	awards: SidebarAward[];
	activeAward: string;
	onAwardClick: (slug: string) => void;
}

export default function AwardSidebar({ awards, activeAward, onAwardClick }: AwardSidebarProps) {
	const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			let nextIndex: number | null = null;

			if (e.key === "ArrowDown") {
				e.preventDefault();
				nextIndex = index < awards.length - 1 ? index + 1 : 0;
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				nextIndex = index > 0 ? index - 1 : awards.length - 1;
			} else if (e.key === "Enter") {
				e.preventDefault();
				onAwardClick(awards[index].slug);
				return;
			}

			if (nextIndex !== null) {
				itemRefs.current[nextIndex]?.focus();
			}
		},
		[awards, onAwardClick]
	);

	return (
		<nav
			aria-label="Award categories"
			className="hidden lg:flex flex-col gap-4 lg:w-[160px] xl:w-[178px] sticky top-20 self-start max-h-[calc(100vh-80px)] overflow-y-auto"
		>
			{awards.map((award, index) => {
				const isActive = activeAward === award.slug;
				return (
					<button
						key={award.slug}
						ref={(el) => { itemRefs.current[index] = el; }}
						type="button"
						onClick={() => onAwardClick(award.slug)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						className={`flex items-center gap-1 p-4 text-left cursor-pointer transition-all duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 ${
							isActive
								? "text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
								: "text-white rounded hover:text-[#FFEA9E] hover:[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
						}`}
					>
						<Image
							src="/images/awards/icon-target.svg"
							alt=""
							width={24}
							height={24}
							className="w-6 h-6 shrink-0"
						/>
						<span className="font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 tracking-[0.25px]">
							{award.name}
						</span>
					</button>
				);
			})}
		</nav>
	);
}
