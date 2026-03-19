import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

const PUBLIC_ROUTES = ["/login", "/auth/callback", "/countdown"];

function isPublicRoute(pathname: string): boolean {
	return PUBLIC_ROUTES.some(
		(route) => pathname === route || pathname.startsWith(`${route}/`)
	);
}

export async function middleware(request: NextRequest) {
	const { supabase, supabaseResponse } = createClient(request);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { pathname } = request.nextUrl;

	// Redirect authenticated users away from /login and /countdown
	if (user && (pathname === "/login" || pathname === "/countdown")) {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		url.search = "";
		return NextResponse.redirect(url);
	}

	// Auto-create user_profiles for authenticated users (e.g. Google SSO first login)
	// Skip if cookie flag already set to avoid DB hit on every request
	if (user && !request.cookies.get("profile_ensured")) {
		const { data: existingProfile } = await supabase
			.from("user_profiles")
			.select("id")
			.eq("id", user.id)
			.maybeSingle();

		if (!existingProfile) {
			// Try to merge with a seed/old profile that has the same email (e.g. after db reset + re-login)
			// This preserves all seed data (kudos, likes, highlights) by reassigning FK references
			const userEmail = user.email;
			let merged = false;

			if (userEmail) {
				const { data: mergeResult } = await supabase.rpc(
					"merge_profile_by_email",
					{
						p_new_user_id: user.id,
						p_email: userEmail,
						p_name:
							user.user_metadata?.full_name ?? user.email ?? "User",
						p_avatar_url: user.user_metadata?.avatar_url ?? null,
					}
				);
				merged = mergeResult === true;
			}

			if (!merged) {
				await supabase.from("user_profiles").insert({
					id: user.id,
					name: user.user_metadata?.full_name ?? user.email ?? "User",
					email: user.email ?? null,
					avatar_url: user.user_metadata?.avatar_url ?? null,
				});
			}
		} else {
			// Sync avatar and name from Google SSO metadata on each session
			const googleAvatar = user.user_metadata?.avatar_url;
			const googleName = user.user_metadata?.full_name;
			if (googleAvatar || googleName) {
				const updates: Record<string, string> = {};
				if (googleAvatar) updates.avatar_url = googleAvatar;
				if (googleName) updates.name = googleName;
				await supabase
					.from("user_profiles")
					.update(updates)
					.eq("id", user.id);
			}
		}

		supabaseResponse.cookies.set("profile_ensured", "1", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7, // 7 days
		});
	}

	// Redirect unauthenticated users from protected routes to /countdown (entry point)
	if (!user && !isPublicRoute(pathname)) {
		const url = request.nextUrl.clone();
		url.pathname = "/countdown";
		url.searchParams.set("next", pathname);
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|favicon.svg|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
