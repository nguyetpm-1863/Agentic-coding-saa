"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import CountdownUnit from "@/components/countdown/countdown-unit";

interface CountdownTimerProps {
	durationSeconds: number;
	translations: {
		hours: string;
		minutes: string;
		seconds: string;
	};
}

export default function CountdownTimer({
	durationSeconds,
	translations,
}: CountdownTimerProps) {
	const router = useRouter();
	const [remaining, setRemaining] = useState(durationSeconds);

	const hours = Math.floor(remaining / 3600);
	const minutes = Math.floor((remaining % 3600) / 60);
	const seconds = remaining % 60;

	const handleExpired = useCallback(() => {
		router.push("/login");
	}, [router]);

	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// Redirect once remaining hits 0
	useEffect(() => {
		if (remaining === 0) {
			handleExpired();
		}
	}, [remaining, handleExpired]);

	return (
		<div
			role="timer"
			aria-live="polite"
			aria-label={`${hours} ${translations.hours}, ${minutes} ${translations.minutes}, ${seconds} ${translations.seconds}`}
			className="flex gap-6 md:gap-10 lg:gap-12 xl:gap-[60px] items-center"
		>
			<CountdownUnit value={hours} label={translations.hours} />
			<CountdownUnit value={minutes} label={translations.minutes} />
			<CountdownUnit value={seconds} label={translations.seconds} />
		</div>
	);
}
