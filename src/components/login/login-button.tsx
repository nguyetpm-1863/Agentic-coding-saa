"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@/libs/supabase/client";

const ERROR_MESSAGES: Record<string, string> = {
	auth_callback_failed: "Login failed. Please try again.",
	access_denied: "Access was denied. Please try again.",
};

function getErrorMessage(code: string | null): string | null {
	if (!code) return null;
	return ERROR_MESSAGES[code] ?? "An error occurred.";
}

export function LoginButton() {
	const searchParams = useSearchParams();
	const errorCode = searchParams.get("error");
	const errorDetail = searchParams.get("detail");
	const next = searchParams.get("next") ?? "/";

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(() => {
		const msg = getErrorMessage(errorCode);
		return errorDetail ? `${msg} (${errorDetail})` : msg;
	});

	// Auto-dismiss error after 5 seconds
	useEffect(() => {
		if (!error) return;
		const timer = setTimeout(() => setError(null), 5000);
		return () => clearTimeout(timer);
	}, [error]);

	const handleLogin = useCallback(async () => {
		if (isLoading) return;
		setIsLoading(true);
		setError(null);

		const supabase = createClient();
		const { error: oauthError } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
			},
		});

		if (oauthError) {
			setError(oauthError.message);
			setIsLoading(false);
		}
	}, [isLoading, next]);

	return (
		<div className="flex flex-col gap-4">
			<button
				onClick={handleLogin}
				disabled={isLoading}
				className="bg-[#FFEA9E] hover:bg-[#FFE07A] active:bg-[#FFD54F] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-[#00101A] font-[family-name:var(--font-montserrat)] text-base md:text-[22px] font-bold leading-7 md:leading-[28px] rounded-lg px-6 py-4 flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 ease-in-out hover:shadow-[0_4px_12px_rgba(255,234,158,0.3)] focus:outline-2 focus:outline-white focus:outline-offset-2 w-full md:w-[305px] h-[52px] md:h-[60px]"
			>
				{isLoading ? (
					<span className="w-6 h-6 border-2 border-[#00101A] border-t-transparent rounded-full animate-spin" />
				) : (
					<>
						<span>LOGIN With Google</span>
						<Image
							src="/images/login/google-icon.svg"
							alt="Google"
							width={24}
							height={24}
						/>
					</>
				)}
			</button>

			{error && (
				<div
					role="alert"
					aria-live="polite"
					className="bg-white/[0.08] rounded px-4 py-3 text-sm text-white"
				>
					{error}
				</div>
			)}
		</div>
	);
}
