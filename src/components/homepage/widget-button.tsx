"use client";

import Link from "next/link";

interface WidgetButtonProps {
	href: string;
	label: string;
}

export default function WidgetButton({ href, label }: WidgetButtonProps) {
	return (
		<Link
			href={href}
			aria-label={label}
			className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#FFEA9E] shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] text-[#00101A] transition-transform duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M12 5V19M5 12H19"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</Link>
	);
}
