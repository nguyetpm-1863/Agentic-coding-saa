"use client";

import { useCallback } from "react";
import Image from "next/image";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/libs/i18n/translations";
import { useDropdown } from "@/hooks/use-dropdown";

const LOCALE_LABELS: Record<string, string> = {
	vi: "VN",
	en: "EN",
};

const LOCALE_FLAGS: Record<string, string> = {
	vi: "/images/login/flag-vn.svg",
	en: "/images/login/flag-en.svg",
};

export function LanguageSelector({ currentLocale }: { currentLocale: string }) {
	const locale = SUPPORTED_LOCALES.includes(currentLocale)
		? currentLocale
		: DEFAULT_LOCALE;

	const selectLocale = useCallback((index: number) => {
		const newLocale = SUPPORTED_LOCALES[index];
		document.cookie = `locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
		window.location.reload();
	}, []);

	const {
		isOpen,
		isClosing,
		activeIndex,
		containerRef,
		triggerProps,
		listProps,
		getItemProps,
	} = useDropdown({
		itemCount: SUPPORTED_LOCALES.length,
		onSelect: selectLocale,
		role: "listbox",
	});

	const showDropdown = isOpen || isClosing;

	return (
		<div ref={containerRef} className="relative">
			<button
				type="button"
				{...triggerProps}
				aria-controls="language-listbox"
				aria-label="Select language"
				className="flex items-center gap-0.5 rounded px-4 h-14 min-w-[80px] md:min-w-[108px] cursor-pointer font-[family-name:var(--font-montserrat)] text-base font-bold text-white transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 aria-expanded:bg-white/[0.12]"
			>
				<Image
					src={LOCALE_FLAGS[locale] ?? LOCALE_FLAGS.vi}
					alt=""
					width={24}
					height={24}
					className="w-6 h-6"
				/>
				<span>{LOCALE_LABELS[locale] ?? locale.toUpperCase()}</span>
				<Image
					src="/images/login/chevron-down.svg"
					alt=""
					width={24}
					height={24}
					className={`w-6 h-6 transition-transform duration-150 ${isOpen && !isClosing ? "rotate-180" : ""}`}
				/>
			</button>

			{showDropdown && (
				<ul
					id="language-listbox"
					{...listProps}
					aria-label="Languages"
					className={`absolute top-full right-0 mt-1 z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg p-1.5 flex flex-col ${isOpen && !isClosing ? "animate-dropdown-open" : "animate-dropdown-close"}`}
				>
					{SUPPORTED_LOCALES.map((loc, index) => {
						const isSelected = loc === locale;
						const isActive = index === activeIndex;
						return (
							<li
								key={loc}
								{...getItemProps(index, { selected: isSelected })}
								className={`flex items-center gap-2 px-4 h-14 rounded cursor-pointer text-white font-[family-name:var(--font-montserrat)] text-base font-bold tracking-[0.15px] leading-6 transition-colors duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-[var(--dropdown-focus-ring)] focus-visible:outline-offset-2 ${
									isSelected
										? "bg-[var(--dropdown-item-selected-bg)] [text-shadow:var(--dropdown-gold-glow)]"
										: isActive
											? "bg-[var(--dropdown-item-hover-bg)]"
											: "bg-transparent hover:bg-[var(--dropdown-item-hover-bg)]"
								}`}
							>
								<Image
									src={LOCALE_FLAGS[loc] ?? LOCALE_FLAGS.vi}
									alt=""
									width={24}
									height={24}
									className="w-6 h-6"
								/>
								<span>{LOCALE_LABELS[loc] ?? loc.toUpperCase()}</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
