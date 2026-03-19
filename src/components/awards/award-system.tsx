"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AwardSidebar from "@/components/awards/award-sidebar";
import AwardCard from "@/components/awards/award-card";
import type { AwardData, AwardCardTranslations } from "@/components/awards/award-card";

interface AwardSystemProps {
	awards: AwardData[];
	translations: AwardCardTranslations;
}

export default function AwardSystem({ awards, translations }: AwardSystemProps) {
	const [activeAward, setActiveAward] = useState(awards[0]?.slug ?? "");
	const isScrollingRef = useRef(false);

	useEffect(() => {
		if (awards.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (isScrollingRef.current) return;

				for (const entry of entries) {
					if (entry.isIntersecting) {
						const slug = entry.target.id;
						if (slug) {
							setActiveAward(slug);
						}
					}
				}
			},
			{
				threshold: 0.5,
				rootMargin: "-80px 0px 0px 0px",
			}
		);

		const elements = awards.map((a) => document.getElementById(a.slug)).filter(Boolean);
		elements.forEach((el) => observer.observe(el!));

		return () => observer.disconnect();
	}, [awards]);

	const handleAwardClick = useCallback(
		(slug: string) => {
			const el = document.getElementById(slug);
			if (!el) return;

			isScrollingRef.current = true;
			setActiveAward(slug);
			el.scrollIntoView({ behavior: "smooth" });

			setTimeout(() => {
				isScrollingRef.current = false;
			}, 800);
		},
		[]
	);

	const sidebarAwards = awards.map((a) => ({
		slug: a.slug,
		name: a.name,
	}));

	// Mobile horizontal tabs
	const mobileTabsRef = useRef<HTMLDivElement>(null);

	return (
		<div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-20">
			{/* Mobile/Tablet horizontal tabs */}
			<div
				ref={mobileTabsRef}
				className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
				role="navigation"
				aria-label="Award categories"
			>
				{sidebarAwards.map((award) => {
					const isActive = activeAward === award.slug;
					return (
						<button
							key={award.slug}
							type="button"
							onClick={() => handleAwardClick(award.slug)}
							className={`shrink-0 px-4 py-3 rounded text-sm font-bold whitespace-nowrap transition-all duration-150 min-h-[44px] ${
								isActive
									? "text-[#FFEA9E] bg-[rgba(255,234,158,0.10)] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
									: "text-white hover:text-[#FFEA9E]"
							}`}
						>
							{award.name}
						</button>
					);
				})}
			</div>

			{/* Desktop sidebar */}
			<AwardSidebar
				awards={sidebarAwards}
				activeAward={activeAward}
				onAwardClick={handleAwardClick}
			/>

			{/* Cards area */}
			<div className="flex-1 flex flex-col gap-12 xl:gap-20">
				{awards.map((award, index) => (
					<AwardCard
						key={award.id}
						award={award}
						translations={translations}
						isLast={index === awards.length - 1}
						priority={index < 2}
						index={index}
					/>
				))}
			</div>
		</div>
	);
}
