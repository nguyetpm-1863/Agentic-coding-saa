export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string | null;
  departmentId: string | null;
  departmentCode: string | null;
  heroBadge: string | null;
}

export interface Hashtag {
  id: string;
  key: string;
  displayTextVi: string;
  displayTextEn: string;
}

export interface KudoImage {
  id: string;
  imageUrl: string;
  position: number;
}

export interface KudoWithDetails {
  id: string;
  message: string;
  title: string | null;
  badge: string | null;
  createdAt: string;
  sender: UserProfile;
  receiver: UserProfile;
  hashtags: Hashtag[];
  images: KudoImage[];
  likeCount: number;
  isLikedByUser: boolean;
}

export interface KudosFeedResponse {
  items: KudoWithDetails[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface HighlightKudo {
  id: string;
  kudoId: string;
  campaign: string | null;
  featuredAt: string;
  kudo: KudoWithDetails;
}

export interface HighlightsResponse {
  items: HighlightKudo[];
  currentPage: number;
  totalPages: number;
}

export interface SpotlightNode {
  id: string;
  name: string;
  avatarUrl: string | null;
  kudosCount: number;
  x: number;
  y: number;
  radius: number;
}

export interface SpotlightEdge {
  sourceId: string;
  targetId: string;
  weight: number;
}

export interface SpotlightReceiver {
  id: string;
  name: string;
  avatarUrl: string | null;
  kudosCount: number;
}

export interface LatestKudoNotification {
  receiverName: string;
  timeAgo: string;
}

export interface SpotlightData {
  totalKudos: number;
  nodes: SpotlightNode[];
  edges: SpotlightEdge[];
  topReceivers: SpotlightReceiver[];
  latestKudo: LatestKudoNotification | null;
}

export interface UserStats {
  kudosReceived: number;
  kudosSent: number;
  totalHearts: number;
  secretBoxesOpened: number;
  secretBoxesUnopened: number;
}

export interface SecretBox {
  id: string;
  isOpened: boolean;
  reward: string | null;
}
