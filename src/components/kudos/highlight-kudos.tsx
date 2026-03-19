"use client";

import { useState, useTransition, useEffect, useCallback, useRef } from "react";
import type { HighlightKudo } from "@/libs/kudos/types";
import type { Hashtag } from "@/types/hashtag";
import type { Department } from "@/types/department";
import { fetchHighlightKudosAction } from "@/libs/kudos/actions";
import { getTranslations } from "@/libs/i18n/translations";
import { KudosFilters } from "./kudos-filters";
import { HighlightCarousel } from "./highlight-carousel";

interface HighlightKudosProps {
  initialHighlights: HighlightKudo[];
  initialPage: number;
  initialTotalPages: number;
  hashtags: Hashtag[];
  departments: Department[];
  locale?: string;
  hashtagLabel?: string;
  departmentLabel?: string;
}

export function HighlightKudos({
  initialHighlights,
  initialPage: _initialPage,
  initialTotalPages: _initialTotalPages,
  hashtags,
  departments,
  locale = "vi",
  hashtagLabel,
  departmentLabel,
}: HighlightKudosProps) {
  const t = getTranslations(locale);
  const [highlights, setHighlights] = useState(initialHighlights);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  void _initialPage;
  void _initialTotalPages;

  const skipNextFilterEvent = useRef(false);

  // Sync state when server re-renders with fresh data (e.g. after router.refresh())
  useEffect(() => {
    setHighlights(initialHighlights);
  }, [initialHighlights]);

  const fetchHighlights = useCallback(
    (hashtagId: string | null, departmentId: string | null) => {
      startTransition(async () => {
        const result = await fetchHighlightKudosAction(
          1,
          hashtagId ?? undefined,
          departmentId ?? undefined
        );
        setHighlights(result.items);
      });
    },
    []
  );

  // Listen for hashtag filter events from the feed
  useEffect(() => {
    function handleHashtagChangeFromFeed(e: Event) {
      if (skipNextFilterEvent.current) {
        skipNextFilterEvent.current = false;
        return;
      }
      const hashtagId = (e as CustomEvent<string>).detail;
      setSelectedHashtag(hashtagId);
      fetchHighlights(hashtagId, selectedDepartment);
    }
    window.addEventListener("kudos:filter-hashtag", handleHashtagChangeFromFeed);
    return () => {
      window.removeEventListener("kudos:filter-hashtag", handleHashtagChangeFromFeed);
    };
  }, [fetchHighlights, selectedDepartment]);

  function handleHashtagChange(hashtagId: string | null) {
    setSelectedHashtag(hashtagId);
    fetchHighlights(hashtagId, selectedDepartment);
  }

  function handleDepartmentChange(departmentId: string | null) {
    setSelectedDepartment(departmentId);
    fetchHighlights(selectedHashtag, departmentId);
  }

  return (
    <section className="w-full px-4 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 xl:px-36 xl:py-16">
      {/* Sun* Annual Awards 2025 subtitle + full-width divider */}
      <p className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-white leading-8 mb-2">
        {t["kudos.live_board.highlight_subtitle"]}
      </p>
      <div className="h-px bg-[#2E3940] w-full mb-4" />

      {/* HIGHLIGHT KUDOS title + filters on the same row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="font-[family-name:var(--font-montserrat)] text-[32px] font-bold text-[#FFEA9E] leading-10 tracking-[-0.25px]">
          {t["kudos.live_board.highlight_title"]}
        </h2>

        <KudosFilters
          hashtags={hashtags}
          departments={departments}
          selectedHashtag={selectedHashtag}
          selectedDepartment={selectedDepartment}
          onHashtagChange={handleHashtagChange}
          onDepartmentChange={handleDepartmentChange}
          hashtagLabel={hashtagLabel}
          departmentLabel={departmentLabel}
        />
      </div>

      <div className={isPending ? "opacity-50 transition-opacity" : ""}>
        <HighlightCarousel
          highlights={highlights}
          locale={locale}
          onHashtagClick={(hashtagId) => {
            handleHashtagChange(hashtagId);
            skipNextFilterEvent.current = true;
            window.dispatchEvent(new CustomEvent("kudos:filter-hashtag", { detail: hashtagId }));
          }}
        />
      </div>
    </section>
  );
}
