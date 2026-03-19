"use server";

import { createClient } from "@/libs/supabase/server";
import { getKudosFeed, getHighlightKudos, getUserStats } from "./queries";
import type { KudosFeedResponse, HighlightsResponse, UserStats } from "./types";

export async function toggleLike(
  kudoId: string
): Promise<{ liked: boolean; likeCount: number }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from("kudo_likes")
    .select("id")
    .eq("kudo_id", kudoId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    // Unlike
    await supabase
      .from("kudo_likes")
      .delete()
      .eq("kudo_id", kudoId)
      .eq("user_id", user.id);
  } else {
    // Like
    await supabase
      .from("kudo_likes")
      .insert({ kudo_id: kudoId, user_id: user.id });
  }

  // Get updated count
  const { count } = await supabase
    .from("kudo_likes")
    .select("*", { count: "exact", head: true })
    .eq("kudo_id", kudoId);

  return {
    liked: !existing,
    likeCount: count ?? 0,
  };
}

export async function fetchMoreKudos(
  cursor: string
): Promise<KudosFeedResponse> {
  return getKudosFeed(cursor, 10);
}

export async function fetchHighlightKudosAction(
  page: number,
  hashtagId?: string,
  departmentId?: string
): Promise<HighlightsResponse> {
  return getHighlightKudos(page, 50, hashtagId, departmentId);
}

export async function openSecretBox(): Promise<{
  id: string;
  reward: string | null;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Find an unopened box
  const { data: box } = await supabase
    .from("secret_boxes")
    .select("id, reward")
    .eq("user_id", user.id)
    .eq("is_opened", false)
    .limit(1)
    .maybeSingle();

  if (!box) {
    return null;
  }

  // Open it
  await supabase
    .from("secret_boxes")
    .update({ is_opened: true })
    .eq("id", box.id);

  return { id: box.id, reward: box.reward };
}

export async function fetchUserStats(): Promise<UserStats> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return getUserStats(user.id);
}

export async function searchUsers(
  query: string
): Promise<
  Array<{ id: string; name: string; avatarUrl: string | null; department: string | null }>
> {
  if (query.length < 2 || query.length > 100) {
    return [];
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const sanitizedQuery = query.replace(/[%_]/g, "\\$&");

  const { data, error } = await supabase
    .from("user_profiles")
    .select(
      `
      id,
      name,
      avatar_url,
      department:departments(name)
    `
    )
    .ilike("name", `%${sanitizedQuery}%`)
    .limit(10);

  if (error) {
    console.error("Error searching users:", error);
    return [];
  }

  return (data ?? []).map((u) => {
    const dept = Array.isArray(u.department)
      ? u.department[0]
      : u.department;
    return {
      id: u.id as string,
      name: u.name as string,
      avatarUrl: (u.avatar_url as string) ?? null,
      department: (dept as { name: string } | null)?.name ?? null,
    };
  });
}
