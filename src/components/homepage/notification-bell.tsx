"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/libs/supabase/client";

export default function NotificationBell() {
	const [hasUnread, setHasUnread] = useState(false);

	const checkUnread = useCallback(async () => {
		const supabase = createClient();
		const { count } = await supabase
			.from("notifications")
			.select("*", { count: "exact", head: true })
			.eq("read", false);

		setHasUnread((count ?? 0) > 0);
	}, []);

	useEffect(() => {
		checkUnread();
	}, [checkUnread]);

	return (
		<button
			type="button"
			aria-label={hasUnread ? "Notifications (unread)" : "Notifications"}
			className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-white transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
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
					d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9Z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M13.73 21a2 2 0 0 1-3.46 0"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			{hasUnread && (
				<span
					aria-hidden="true"
					className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[rgba(212,39,29,1)] border-2 border-[#00101A]"
				/>
			)}
		</button>
	);
}
