export interface KudoFormData {
  recipientId: string;
  recipientName: string;
  title: string;
  content: string;
  hashtags: string[];
  link: string;
  isAnonymous: boolean;
  anonymousName: string;
}

export interface UserSearchResult {
  id: string;
  name: string;
  avatarUrl: string | null;
  department: string | null;
}

export interface CreateKudoInput {
  recipientId: string;
  title: string;
  content: string;
  hashtags: string[];
  link?: string;
  isAnonymous: boolean;
  anonymousName?: string;
  imageUrls?: string[];
}

export type CreateKudoResult =
  | { success: true; kudoId: string }
  | { success: false; error: string };
