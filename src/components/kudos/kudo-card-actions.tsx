"use client";

import Link from "next/link";
import { LikeButton } from "./like-button";
import { CopyLinkButton } from "./copy-link-button";

interface KudoCardActionsProps {
  kudoId: string;
  likeCount: number;
  isLikedByUser: boolean;
  locale?: string;
  showDetailLink?: boolean;
}

export function KudoCardActions({
  kudoId,
  likeCount,
  isLikedByUser,
  locale = "vi",
  showDetailLink = true,
}: KudoCardActionsProps) {
  return (
    <div className="flex items-center justify-between pt-2">
      <LikeButton
        kudoId={kudoId}
        initialLiked={isLikedByUser}
        initialCount={likeCount}
      />
      <div className="flex items-center gap-3">
        <CopyLinkButton kudoId={kudoId} locale={locale} />
        {showDetailLink && (
          <Link
            href={`/kudos/${kudoId}`}
            className="flex items-center gap-1 font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] leading-6 tracking-[0.15px] hover:underline"
          >
            Xem chi tiết
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
