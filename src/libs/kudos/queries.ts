import { createClient } from "@/libs/supabase/server";
import type {
  KudoWithDetails,
  KudosFeedResponse,
  HighlightKudo,
  HighlightsResponse,
  SpotlightData,
  SpotlightNode,
  SpotlightEdge,
  UserStats,
  Hashtag,
  KudoImage,
  UserProfile,
} from "./types";

/** Shared Supabase select string for kudos with all relations */
const KUDOS_SELECT = `
  id,
  message,
  title,
  badge,
  created_at,
  sender:user_profiles!kudos_sender_id_fkey(id, name, avatar_url, department_id, department_code, hero_badge),
  receiver:user_profiles!kudos_receiver_id_fkey(id, name, avatar_url, department_id, department_code, hero_badge),
  kudo_hashtags(hashtag:hashtags(id, key, display_text_vi, display_text_en)),
  kudo_images(id, image_url, position),
  kudo_likes(count)
` as const;

const FALLBACK_PROFILE: UserProfile = {
  id: "",
  name: "Unknown",
  avatarUrl: null,
  departmentId: null,
  departmentCode: null,
  heroBadge: null,
};

function mapUserProfile(row: Record<string, unknown>): UserProfile {
  return {
    id: row.id as string,
    name: row.name as string,
    avatarUrl: (row.avatar_url as string) ?? null,
    departmentId: (row.department_id as string) ?? null,
    departmentCode: (row.department_code as string) ?? null,
    heroBadge: (row.hero_badge as string) ?? null,
  };
}

function mapHashtag(row: Record<string, unknown>): Hashtag {
  return {
    id: row.id as string,
    key: row.key as string,
    displayTextVi: row.display_text_vi as string,
    displayTextEn: row.display_text_en as string,
  };
}

/** Unwrap Supabase row that may be a single object or array (FK join) */
function unwrapRelation(data: unknown): Record<string, unknown> | null {
  if (Array.isArray(data)) return (data[0] as Record<string, unknown>) ?? null;
  return (data as Record<string, unknown>) ?? null;
}

/** Map a raw kudo row (from Supabase) into a typed KudoWithDetails */
function mapKudoRow(
  kudo: Record<string, unknown>,
  likedKudoIds: Set<string>
): KudoWithDetails {
  const senderData = unwrapRelation(kudo.sender);
  const receiverData = unwrapRelation(kudo.receiver);

  const hashtags = ((kudo.kudo_hashtags ?? []) as Array<Record<string, unknown>>)
    .map((kh) => {
      const ht = kh.hashtag as Record<string, unknown> | null;
      return ht ? mapHashtag(ht) : null;
    })
    .filter(Boolean) as Hashtag[];

  const images: KudoImage[] = ((kudo.kudo_images ?? []) as Array<Record<string, unknown>>)
    .map((img) => ({
      id: img.id as string,
      imageUrl: img.image_url as string,
      position: img.position as number,
    }))
    .sort((a, b) => a.position - b.position);

  const kudoLikes = kudo.kudo_likes as Array<{ count: number }> | null;
  const likeCount =
    Array.isArray(kudoLikes) && kudoLikes.length > 0
      ? kudoLikes[0].count
      : 0;

  const kudoId = kudo.id as string;

  return {
    id: kudoId,
    message: kudo.message as string,
    title: (kudo.title as string) ?? null,
    badge: (kudo.badge as string) ?? null,
    createdAt: kudo.created_at as string,
    sender: senderData ? mapUserProfile(senderData) : FALLBACK_PROFILE,
    receiver: receiverData ? mapUserProfile(receiverData) : FALLBACK_PROFILE,
    hashtags,
    images,
    likeCount,
    isLikedByUser: likedKudoIds.has(kudoId),
  };
}

/** Check if a kudo row contains a specific hashtag ID */
function kudoHasHashtag(kudo: Record<string, unknown>, hashtagId: string): boolean {
  const kh = kudo.kudo_hashtags as unknown as Array<{ hashtag: Record<string, unknown> | Record<string, unknown>[] | null }> | null;
  return (kh ?? []).some((h) => {
    const ht = unwrapRelation(h.hashtag as unknown);
    return ht?.id === hashtagId;
  });
}

export async function getKudosFeed(
  cursor?: string,
  pageSize = 10
): Promise<KudosFeedResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  let query = supabase
    .from("kudos")
    .select(KUDOS_SELECT)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(pageSize + 1);

  if (cursor) {
    const [cursorDate, cursorId] = cursor.split("|");
    query = query.or(
      `created_at.lt.${cursorDate},and(created_at.eq.${cursorDate},id.lt.${cursorId})`
    );
  }

  const { data: kudos, error } = await query;

  if (error) {
    console.error("Error fetching kudos feed:", error);
    return { items: [], nextCursor: null, hasMore: false };
  }

  const hasMore = (kudos?.length ?? 0) > pageSize;
  const items = (kudos ?? []).slice(0, pageSize);

  // Fetch user like status in batch
  const kudoIds = items.map((k) => k.id);
  let likedKudoIds: Set<string> = new Set();

  if (userId && kudoIds.length > 0) {
    const { data: likes } = await supabase
      .from("kudo_likes")
      .select("kudo_id")
      .eq("user_id", userId)
      .in("kudo_id", kudoIds);

    likedKudoIds = new Set((likes ?? []).map((l) => l.kudo_id));
  }

  const mappedItems = items.map((kudo) =>
    mapKudoRow(kudo as Record<string, unknown>, likedKudoIds)
  );

  const lastItem = mappedItems[mappedItems.length - 1];
  const nextCursor =
    hasMore && lastItem
      ? `${lastItem.createdAt}|${lastItem.id}`
      : null;

  return { items: mappedItems, nextCursor, hasMore };
}

export async function getHashtags(locale = "vi"): Promise<Hashtag[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hashtags")
    .select("id, key, display_text_vi, display_text_en")
    .order("key");

  if (error) {
    console.error("Error fetching hashtags:", error);
    return [];
  }

  void locale;

  return (data ?? []).map((h) => mapHashtag(h as Record<string, unknown>));
}

export async function getDepartments(): Promise<
  Array<{ id: string; name: string }>
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("departments")
    .select("id, name")
    .order("name");

  if (error) {
    console.error("Error fetching departments:", error);
    return [];
  }

  return (data ?? []).map((d) => ({
    id: d.id as string,
    name: d.name as string,
  }));
}

export async function getHighlightKudos(
  page = 1,
  pageSize = 3,
  hashtagId?: string,
  departmentId?: string
): Promise<HighlightsResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  // First try curated highlight_kudos table
  const { count: highlightCount } = await supabase
    .from("highlight_kudos")
    .select("*", { count: "exact", head: true });

  if ((highlightCount ?? 0) > 0) {
    return getHighlightFromCurated(supabase, userId, page, pageSize, hashtagId, departmentId);
  }

  // Fallback: get top kudos sorted by like count, then newest
  return getHighlightFromKudos(supabase, userId, page, pageSize, hashtagId, departmentId);
}

async function getHighlightFromCurated(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string | undefined,
  page: number,
  pageSize: number,
  hashtagId?: string,
  departmentId?: string
): Promise<HighlightsResponse> {
  const offset = (page - 1) * pageSize;

  // Get highlight kudo_ids first, then filter
  const highlightQuery = supabase
    .from("highlight_kudos")
    .select("kudo_id", { count: "exact" })
    .order("featured_at", { ascending: false });

  const { data: highlightRows, count: totalHighlights } = await highlightQuery;
  const allKudoIds = (highlightRows ?? []).map((h) => h.kudo_id as string);

  if (allKudoIds.length === 0) {
    return { items: [], currentPage: page, totalPages: 0 };
  }

  // Fetch full kudo data for these IDs
  let kudoQuery = supabase
    .from("kudos")
    .select(KUDOS_SELECT)
    .in("id", allKudoIds);

  if (departmentId) {
    kudoQuery = kudoQuery.eq("receiver_id", departmentId);
  }

  const { data: kudosData } = await kudoQuery;
  let filteredKudos = kudosData ?? [];

  // Filter by hashtag in-memory (nested PostgREST filters are unreliable)
  if (hashtagId) {
    filteredKudos = filteredKudos.filter((kudo) =>
      kudoHasHashtag(kudo as Record<string, unknown>, hashtagId)
    );
  }

  // Filter by department in-memory
  if (departmentId) {
    filteredKudos = filteredKudos.filter((kudo) => {
      const receiver = unwrapRelation(kudo.receiver as unknown);
      return receiver?.department_id === departmentId;
    });
  }

  const totalPages = Math.ceil(filteredKudos.length / pageSize);
  const pagedKudos = filteredKudos.slice(offset, offset + pageSize);

  return mapKudosToHighlights(supabase, userId, pagedKudos, page, totalPages, totalHighlights);
}

async function getHighlightFromKudos(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string | undefined,
  page: number,
  pageSize: number,
  hashtagId?: string,
  departmentId?: string
): Promise<HighlightsResponse> {
  const offset = (page - 1) * pageSize;

  // Query kudos directly — sort by like count desc, then newest
  let query = supabase
    .from("kudos")
    .select(KUDOS_SELECT, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (departmentId) {
    query = query.eq("receiver_id", departmentId);
  }

  const { data: kudosData, count, error } = await query;

  if (error) {
    console.error("Error fetching highlight kudos fallback:", error);
    return { items: [], currentPage: page, totalPages: 0 };
  }

  let filteredKudos = kudosData ?? [];

  // Filter by hashtag in-memory
  if (hashtagId) {
    filteredKudos = filteredKudos.filter((kudo) =>
      kudoHasHashtag(kudo as Record<string, unknown>, hashtagId)
    );
  }

  const totalPages = Math.ceil((count ?? 0) / pageSize);

  return mapKudosToHighlights(supabase, userId, filteredKudos, page, totalPages, count);
}

async function mapKudosToHighlights(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string | undefined,
  kudosData: Record<string, unknown>[],
  page: number,
  totalPages: number,
  _totalCount: number | null
): Promise<HighlightsResponse> {
  const kudoIds = kudosData.map((k) => k.id as string).filter(Boolean);

  let likedKudoIds: Set<string> = new Set();
  if (userId && kudoIds.length > 0) {
    const { data: likes } = await supabase
      .from("kudo_likes")
      .select("kudo_id")
      .eq("user_id", userId)
      .in("kudo_id", kudoIds);
    likedKudoIds = new Set((likes ?? []).map((l) => l.kudo_id));
  }

  const items: HighlightKudo[] = kudosData.map((kudo) => {
    const kudoId = kudo.id as string;
    return {
      id: kudoId,
      kudoId,
      campaign: null,
      featuredAt: kudo.created_at as string,
      kudo: mapKudoRow(kudo, likedKudoIds),
    };
  });

  return { items, currentPage: page, totalPages };
}

export async function getSpotlightData(): Promise<SpotlightData> {
  const supabase = await createClient();

  // Run independent queries in parallel
  const [
    { count: totalKudos },
    { data: senderCounts },
    { data: edgeData },
    { data: latestKudoData },
  ] = await Promise.all([
    supabase.from("kudos").select("*", { count: "exact", head: true }),
    supabase.rpc("get_top_kudos_users", { limit_count: 50 }),
    supabase
      .from("kudos")
      .select("sender_id, receiver_id")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("kudos")
      .select("created_at, receiver:user_profiles!kudos_receiver_id_fkey(name)")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  // If RPC not available, fallback to simple query
  const nodeMap = new Map<string, { count: number; profile: UserProfile }>();
  // Track received kudos separately for top receivers list
  const receivedMap = new Map<string, { count: number; profile: UserProfile }>();

  if (!senderCounts) {
    const { data: recentKudos } = await supabase
      .from("kudos")
      .select(
        `
        sender_id,
        receiver_id,
        sender:user_profiles!kudos_sender_id_fkey(id, name, avatar_url, department_id, department_code, hero_badge),
        receiver:user_profiles!kudos_receiver_id_fkey(id, name, avatar_url, department_id, department_code, hero_badge)
      `
      )
      .order("created_at", { ascending: false })
      .limit(200);

    for (const kudo of recentKudos ?? []) {
      const senderData = unwrapRelation(kudo.sender as unknown);
      const receiverData = unwrapRelation(kudo.receiver as unknown);

      if (senderData) {
        const sender = mapUserProfile(senderData);
        const existing = nodeMap.get(sender.id);
        nodeMap.set(sender.id, {
          count: (existing?.count ?? 0) + 1,
          profile: sender,
        });
      }
      if (receiverData) {
        const receiver = mapUserProfile(receiverData);
        const existing = nodeMap.get(receiver.id);
        nodeMap.set(receiver.id, {
          count: (existing?.count ?? 0) + 1,
          profile: receiver,
        });
        // Track received kudos
        const existingReceived = receivedMap.get(receiver.id);
        receivedMap.set(receiver.id, {
          count: (existingReceived?.count ?? 0) + 1,
          profile: receiver,
        });
      }
    }
  }

  const edgeMap = new Map<string, number>();
  for (const edge of edgeData ?? []) {
    const key = `${edge.sender_id}|${edge.receiver_id}`;
    edgeMap.set(key, (edgeMap.get(key) ?? 0) + 1);
  }

  // Compute node positions — limit to 20 for cleaner graph
  const sortedNodes = Array.from(nodeMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 20);

  const maxCount = Math.max(...sortedNodes.map(([, v]) => v.count), 1);
  const minRadius = 8;
  const maxRadius = 18;

  const viewWidth = 800;
  const viewHeight = 400;
  const centerX = viewWidth / 2;
  const centerY = viewHeight / 2;

  const nodes: SpotlightNode[] = sortedNodes.map(
    ([, { count, profile }], index) => {
      const angle = (2 * Math.PI * index) / sortedNodes.length;
      const ringRadius = 100 + (index % 3) * 50;
      const x = centerX + ringRadius * Math.cos(angle);
      const y = centerY + ringRadius * Math.sin(angle);
      const radius =
        minRadius + ((count / maxCount) * (maxRadius - minRadius));

      return {
        id: profile.id,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        kudosCount: count,
        x: Math.round(x),
        y: Math.round(y),
        radius: Math.round(radius * 10) / 10,
      };
    }
  );

  const nodeIdSet = new Set(nodes.map((n) => n.id));
  const edges: SpotlightEdge[] = [];
  for (const [key, weight] of edgeMap.entries()) {
    const [sourceId, targetId] = key.split("|");
    if (nodeIdSet.has(sourceId) && nodeIdSet.has(targetId)) {
      edges.push({ sourceId, targetId, weight });
    }
  }

  // Top 10 receivers by received kudos count
  const topReceivers = Array.from(receivedMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(({ count, profile }) => ({
      id: profile.id,
      name: profile.name,
      avatarUrl: profile.avatarUrl,
      kudosCount: count,
    }));

  // Process latest kudo notification (already fetched in parallel above)
  let latestKudo = null;
  if (latestKudoData) {
    const receiverData = unwrapRelation(latestKudoData.receiver as unknown);
    const receiverName = (receiverData?.name as string) ?? "Unknown";
    const createdAt = new Date(latestKudoData.created_at);
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const timeAgo = diffMin < 1 ? "vừa xong" : diffMin < 60 ? `${diffMin} phút trước` : `${Math.floor(diffMin / 60)} giờ trước`;
    latestKudo = { receiverName, timeAgo };
  }

  return {
    totalKudos: totalKudos ?? 0,
    nodes,
    edges,
    topReceivers,
    latestKudo,
  };
}

export async function getUserStats(userId: string): Promise<UserStats> {
  const supabase = await createClient();

  const [receivedResult, sentResult, boxesResult, heartsResult] =
    await Promise.all([
      supabase
        .from("kudos")
        .select("*", { count: "exact", head: true })
        .eq("receiver_id", userId),
      supabase
        .from("kudos")
        .select("*", { count: "exact", head: true })
        .eq("sender_id", userId),
      supabase.from("secret_boxes").select("is_opened").eq("user_id", userId),
      supabase
        .from("kudo_likes")
        .select("kudos!inner(receiver_id)", { count: "exact", head: true })
        .eq("kudos.receiver_id", userId),
    ]);

  const boxes = boxesResult.data ?? [];
  let secretBoxesOpened = 0;
  let secretBoxesUnopened = 0;
  for (const b of boxes) {
    if (b.is_opened) secretBoxesOpened++;
    else secretBoxesUnopened++;
  }

  return {
    kudosReceived: receivedResult.count ?? 0,
    kudosSent: sentResult.count ?? 0,
    totalHearts: heartsResult.count ?? 0,
    secretBoxesOpened,
    secretBoxesUnopened,
  };
}
