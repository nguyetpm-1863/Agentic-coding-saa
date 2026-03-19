"use server";

import { createClient } from "@/libs/supabase/server";
import type { CreateKudoInput, CreateKudoResult } from "@/types/kudo";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function sanitizeHtml(html: string): string {
  const allowedTags = ["p", "strong", "em", "s", "ol", "li", "a", "blockquote", "span", "br"];
  return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tag) => {
    if (allowedTags.includes(tag.toLowerCase())) {
      return match;
    }
    return "";
  });
}

// Map frontend hashtag IDs (e.g. "toan-dien") to DB keys (e.g. "toan_dien")
function hashtagIdToKey(id: string): string {
  return id.replace(/-/g, "_");
}

export async function createKudo(input: CreateKudoInput): Promise<CreateKudoResult> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  // Validate recipientId
  if (!input.recipientId || input.recipientId === user.id) {
    return { success: false, error: "Invalid recipient" };
  }

  // Validate title
  const title = input.title?.trim();
  if (!title || title.length < 1 || title.length > 200) {
    return { success: false, error: "Title must be 1-200 characters" };
  }

  // Validate and sanitize content
  const sanitizedContent = sanitizeHtml(input.content || "");
  const strippedContent = stripHtml(sanitizedContent);
  if (!strippedContent || strippedContent.length < 1 || strippedContent.length > 2000) {
    return { success: false, error: "Content must be 1-2000 characters" };
  }

  // Validate hashtags
  if (!input.hashtags || input.hashtags.length < 1 || input.hashtags.length > 5) {
    return { success: false, error: "Select 1-5 hashtags" };
  }
  for (const tag of input.hashtags) {
    if (!tag || tag.length < 1 || tag.length > 50) {
      return { success: false, error: "Invalid hashtag" };
    }
  }

  // Validate optional link
  if (input.link) {
    try {
      const url = new URL(input.link);
      if (!["http:", "https:"].includes(url.protocol)) {
        return { success: false, error: "Invalid link URL" };
      }
    } catch {
      return { success: false, error: "Invalid link URL" };
    }
  }

  // Ensure sender has a user_profiles record (Google SSO users may not have one yet)
  const { data: existingProfile } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!existingProfile) {
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        id: user.id,
        name: user.user_metadata?.full_name ?? user.email ?? "User",
        avatar_url: user.user_metadata?.avatar_url ?? null,
      });
    if (profileError) {
      console.error("Failed to create user profile:", profileError);
      return { success: false, error: "Failed to create user profile" };
    }
  }

  // Convert frontend hashtag IDs to DB keys and look up real DB UUIDs
  const hashtagKeys = input.hashtags.map(hashtagIdToKey);
  const { data: hashtagRows } = await supabase
    .from("hashtags")
    .select("id, key")
    .in("key", hashtagKeys);

  const { data, error } = await supabase
    .from("kudos")
    .insert({
      sender_id: user.id,
      receiver_id: input.recipientId,
      message: sanitizedContent,
      badge: title,
      title,
      hashtags: input.hashtags,
      is_anonymous: input.isAnonymous ?? false,
      anonymous_name: input.isAnonymous ? input.anonymousName?.trim() || null : null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to create kudo:", error);
    return { success: false, error: "Failed to create kudo" };
  }

  // Insert into kudo_hashtags junction table for query joins
  if (hashtagRows && hashtagRows.length > 0) {
    const junctionRows = hashtagRows.map((h) => ({
      kudo_id: data.id,
      hashtag_id: h.id,
    }));
    const { error: junctionError } = await supabase
      .from("kudo_hashtags")
      .insert(junctionRows);
    if (junctionError) {
      console.error("Failed to insert kudo_hashtags:", junctionError);
    }
  }

  // Insert image URLs if provided
  if (input.imageUrls && input.imageUrls.length > 0) {
    const imageRows = input.imageUrls.slice(0, 5).map((url, index) => ({
      kudo_id: data.id,
      image_url: url,
      position: index,
    }));
    const { error: imgError } = await supabase.from("kudo_images").insert(imageRows);
    if (imgError) {
      console.error("Failed to insert kudo images:", imgError);
    }
  }

  return { success: true, kudoId: data.id };
}
