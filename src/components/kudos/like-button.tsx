"use client";

import { useState, useTransition } from "react";
import { toggleLike } from "@/libs/kudos/actions";

interface LikeButtonProps {
  kudoId: string;
  initialLiked: boolean;
  initialCount: number;
}

export function LikeButton({
  kudoId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();
  const [animating, setAnimating] = useState(false);

  const formattedCount = new Intl.NumberFormat().format(count);

  function handleClick() {
    // Optimistic update
    const prevLiked = liked;
    const prevCount = count;
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 200);

    startTransition(async () => {
      try {
        const result = await toggleLike(kudoId);
        setLiked(result.liked);
        setCount(result.likeCount);
        // Notify stats sidebar to refresh
        window.dispatchEvent(new CustomEvent("kudos:stats-changed"));
      } catch {
        // Revert on failure
        setLiked(prevLiked);
        setCount(prevCount);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className="flex items-center gap-1.5 cursor-pointer min-h-[44px] min-w-[44px] justify-center transition-transform duration-150"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-200 ease-out ${animating ? "scale-130" : "scale-100"}`}
      >
        {liked ? (
          <path
            d="M10 17.5L8.55 16.175C4.4 12.425 1.5 9.8 1.5 6.625C1.5 4.025 3.525 2 6.125 2C7.575 2 8.975 2.675 10 3.75C11.025 2.675 12.425 2 13.875 2C16.475 2 18.5 4.025 18.5 6.625C18.5 9.8 15.6 12.425 11.45 16.175L10 17.5Z"
            fill="#FF4D4D"
          />
        ) : (
          <path
            d="M10 17.5L8.55 16.175C4.4 12.425 1.5 9.8 1.5 6.625C1.5 4.025 3.525 2 6.125 2C7.575 2 8.975 2.675 10 3.75C11.025 2.675 12.425 2 13.875 2C16.475 2 18.5 4.025 18.5 6.625C18.5 9.8 15.6 12.425 11.45 16.175L10 17.5Z"
            stroke="rgba(0,16,26,0.30)"
            strokeWidth="1.5"
            fill="none"
          />
        )}
      </svg>
      <span className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[#00101A] leading-8">
        {formattedCount}
      </span>
    </button>
  );
}
