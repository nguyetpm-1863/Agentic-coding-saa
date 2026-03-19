"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import type { KudoWithDetails } from "@/libs/kudos/types";
import { fetchMoreKudos } from "@/libs/kudos/actions";
import { getTranslations } from "@/libs/i18n/translations";
import { KudoCard } from "./kudo-card";

interface KudosFeedProps {
  initialKudos: KudoWithDetails[];
  initialCursor: string | null;
  initialHasMore: boolean;
  locale?: string;
}

function KudoCardSkeleton() {
  return (
    <div className="w-full rounded-xl bg-white/[0.05] border border-white/[0.08] p-4 lg:p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10" />
        <div className="w-24 h-4 rounded bg-white/10" />
        <div className="w-4 h-4 rounded bg-white/10" />
        <div className="w-10 h-10 rounded-full bg-white/10" />
        <div className="w-24 h-4 rounded bg-white/10" />
      </div>
      <div className="space-y-2">
        <div className="w-full h-4 rounded bg-white/10" />
        <div className="w-3/4 h-4 rounded bg-white/10" />
      </div>
      <div className="flex gap-2">
        <div className="w-16 h-6 rounded-full bg-white/10" />
        <div className="w-16 h-6 rounded-full bg-white/10" />
      </div>
      <div className="flex justify-between">
        <div className="w-16 h-5 rounded bg-white/10" />
        <div className="w-16 h-5 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function KudosFeed({
  initialKudos,
  initialCursor,
  initialHasMore,
  locale = "vi",
}: KudosFeedProps) {
  const t = getTranslations(locale);

  const handleHashtagClick = useCallback((hashtagId: string) => {
    window.dispatchEvent(new CustomEvent("kudos:filter-hashtag", { detail: hashtagId }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [kudos, setKudos] = useState(initialKudos);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();

  // Sync state when server re-renders with fresh data (e.g. after router.refresh())
  useEffect(() => {
    setKudos(initialKudos);
    setCursor(initialCursor);
    setHasMore(initialHasMore);
  }, [initialKudos, initialCursor, initialHasMore]);

  function handleLoadMore() {
    if (!cursor || isPending) return;

    startTransition(async () => {
      const result = await fetchMoreKudos(cursor);
      setKudos((prev) => [...prev, ...result.items]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    });
  }

  if (kudos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="font-[family-name:var(--font-montserrat)] text-base text-white/60 leading-6">
          {t["kudos.live_board.empty_feed"]}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4" aria-live="polite">
      {kudos.map((kudo) => (
        <KudoCard key={kudo.id} kudo={kudo} locale={locale} showDetailLink={false} onHashtagClick={handleHashtagClick} />
      ))}

      {isPending && (
        <>
          <KudoCardSkeleton />
          <KudoCardSkeleton />
        </>
      )}

      {hasMore && !isPending && (
        <button
          type="button"
          onClick={handleLoadMore}
          className="w-full py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 font-[family-name:var(--font-montserrat)] text-sm font-medium hover:bg-white/[0.08] transition-colors duration-150 cursor-pointer min-h-[44px]"
        >
          {t["kudos.live_board.load_more"]}
        </button>
      )}
    </div>
  );
}
