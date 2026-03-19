"use client";

import { useState, useCallback, useEffect } from "react";
import type { HighlightKudo } from "@/libs/kudos/types";
import { getTranslations } from "@/libs/i18n/translations";
import { KudoCard } from "./kudo-card";

interface HighlightCarouselProps {
  highlights: HighlightKudo[];
  locale?: string;
  onHashtagClick?: (hashtagId: string) => void;
}

export function HighlightCarousel({
  highlights,
  locale = "vi",
  onHashtagClick,
}: HighlightCarouselProps) {
  const t = getTranslations(locale);
  const total = highlights.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [highlights]);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index < 0 || index >= total) return;
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, total]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") goPrev();
    else if (e.key === "ArrowRight") goNext();
  }

  if (total === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="font-[family-name:var(--font-montserrat)] text-base text-white/60">
          {t["kudos.live_board.no_results"]}
        </p>
      </div>
    );
  }

  // Center card ~45%, side cards show partially
  const cardWidthPercent = 45;
  const sideWidthPercent = (100 - cardWidthPercent) / 2;
  const gapPx = 24;

  return (
    <div
      className="flex flex-col gap-8"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Highlight kudos carousel"
    >
      <div className="relative flex items-center gap-4">
        {/* Left carousel arrow */}
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex <= 0}
          aria-label="Previous"
          className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-white/10 items-center justify-center text-white cursor-pointer transition-colors duration-150 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed z-20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Slider viewport with fade edges */}
        <div className="flex-1 overflow-hidden relative">
          {/* Left fade gradient */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #00101A 50%, rgba(255, 255, 255, 0) 100%)" }}
          />
          {/* Right fade gradient */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, #00101A 50%, rgba(255, 255, 255, 0) 100%)" }}
          />

          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: `${gapPx}px`,
              transform: `translateX(calc(-${activeIndex} * (${cardWidthPercent}% + ${gapPx}px) + ${sideWidthPercent}% - ${gapPx / 2}px))`,
            }}
          >
            {highlights.map((highlight, index) => {
              const isCenter = index === activeIndex;
              const isAdjacent = Math.abs(index - activeIndex) === 1;
              return (
                <div
                  key={highlight.id}
                  className="shrink-0 transition-all duration-500 ease-in-out origin-center"
                  style={{
                    width: `${cardWidthPercent}%`,
                    opacity: isCenter ? 1 : isAdjacent ? 0.7 : 0.4,
                  }}
                >
                  <KudoCard kudo={highlight.kudo} locale={locale} onHashtagClick={onHashtagClick} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right carousel arrow */}
        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex >= total - 1}
          aria-label="Next"
          className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-white/10 items-center justify-center text-white cursor-pointer transition-colors duration-150 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed z-20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Pagination */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex <= 0}
            aria-label="Previous"
            className="w-12 h-12 flex items-center justify-center text-white/60 cursor-pointer hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="font-[family-name:var(--font-montserrat)] text-center">
            <span className="text-[32px] font-bold text-[#FFEA9E] leading-10">{activeIndex + 1}</span>
            <span className="text-base font-medium text-white/60">/{total}</span>
          </p>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex >= total - 1}
            aria-label="Next"
            className="w-12 h-12 flex items-center justify-center text-white/60 cursor-pointer hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
