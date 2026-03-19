"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/libs/supabase/client";

function isValidRedirectPath(path: string): boolean {
	return (
		path.startsWith("/") &&
		!path.startsWith("//") &&
		!path.includes("://")
	);
}

function CallbackHandler() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) return;
		hasRun.current = true;

		const code = searchParams.get("code");
		const next = searchParams.get("next");
		const authError = searchParams.get("error");
		const errorDescription = searchParams.get("error_description");

		const redirectTo = next && isValidRedirectPath(next) ? next : "/";

		if (authError) {
			router.replace(
				`/login?error=auth_callback_failed&detail=${encodeURIComponent(errorDescription ?? authError)}`
			);
			return;
		}

		if (!code) {
			router.replace("/login?error=auth_callback_failed");
			return;
		}

		const supabase = createClient();
		supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
			if (error) {
				router.replace(
					`/login?error=auth_callback_failed&detail=${encodeURIComponent(error.message)}`
				);
			} else {
				router.replace(redirectTo);
			}
		});
	}, [router, searchParams]);

	return null;
}

export default function AuthCallbackPage() {
	return (
		<div className="min-h-screen bg-[#00101A] flex items-center justify-center">
			<Suspense>
				<CallbackHandler />
			</Suspense>
			<span className="w-8 h-8 border-3 border-[#FFEA9E] border-t-transparent rounded-full animate-spin" />
		</div>
	);
}
