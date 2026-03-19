"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { useDropdown } from "@/hooks/use-dropdown";
import { getTranslations } from "@/libs/i18n/translations";
import type { Hashtag } from "@/types/hashtag";

interface HashtagSelectorProps {
  hashtags: Hashtag[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
  locale: string;
}

export function HashtagSelector({
  hashtags,
  selected,
  onChange,
  maxSelections = 5,
  locale,
}: HashtagSelectorProps) {
  const t = getTranslations(locale);
  const listRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");

  const handleSelect = useCallback(
    (index: number) => {
      const sortedHashtags = getSortedHashtags(hashtags, selected);
      const hashtag = sortedHashtags[index];
      if (!hashtag) return;

      const isSelected = selected.includes(hashtag.id);
      if (isSelected) {
        const next = selected.filter((id) => id !== hashtag.id);
        onChange(next);
        setAnnouncement(`${next.length} / ${maxSelections}`);
      } else {
        if (selected.length >= maxSelections) return;
        const next = [...selected, hashtag.id];
        onChange(next);
        setAnnouncement(`${next.length} / ${maxSelections}`);
      }
    },
    [hashtags, selected, onChange, maxSelections]
  );

  const {
    isOpen,
    isClosing,
    activeIndex,
    containerRef,
    triggerProps,
    listProps,
    getItemProps,
  } = useDropdown({
    itemCount: hashtags.length,
    onSelect: handleSelect,
    role: "listbox",
  });

  const showDropdown = isOpen || isClosing;

  // Focus active item when navigating with keyboard
  useEffect(() => {
    if (!isOpen || activeIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll('[role="option"]');
    const item = items[activeIndex] as HTMLElement | undefined;
    item?.focus();
  }, [activeIndex, isOpen]);

  const atLimit = selected.length >= maxSelections;

  const sortedHashtags = getSortedHashtags(hashtags, selected);

  // Get localized display text for a hashtag
  const getDisplayText = useCallback(
    (hashtag: Hashtag) => {
      const key = `hashtag.${hashtag.key}` as keyof ReturnType<typeof getTranslations>;
      return t[key] || hashtag.displayText;
    },
    [t]
  );

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        {...triggerProps}
        disabled={false}
        className="flex items-center gap-1 h-12 px-2 py-1 border border-[#998C5F] rounded-lg bg-white font-[family-name:var(--font-montserrat)] text-[11px] font-bold text-[#999] tracking-[0.5px] cursor-pointer transition-colors duration-150 hover:bg-[#F5F5F5] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-[#999]"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="flex flex-col items-start leading-tight">
          <span>{t["hashtag.trigger_label"]}</span>
          <span>{t["hashtag.max_note"]}</span>
        </span>
      </button>

      {showDropdown && (
        <div
          ref={listRef}
          {...listProps}
          aria-multiselectable="true"
          aria-label={t["hashtag.trigger_label"]}
          className={`absolute top-[calc(100%+4px)] left-0 z-60 w-[280px] md:w-[318px] bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 max-h-[60vh] md:max-h-[400px] overflow-y-auto dropdown-scrollbar ${
            isOpen && !isClosing
              ? "animate-dropdown-open"
              : "animate-dropdown-close"
          }`}
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}
        >
          {hashtags.length === 0 ? (
            <div className="flex items-center justify-center h-10 font-[family-name:var(--font-montserrat)] text-sm font-medium text-white/60">
              {t["hashtag.empty_list"]}
            </div>
          ) : (
            sortedHashtags.map((hashtag, index) => {
              const isSelected = selected.includes(hashtag.id);
              const isDisabled = !isSelected && atLimit;
              const isActive = index === activeIndex;

              return (
                <div
                  key={hashtag.id}
                  {...getItemProps(index, { selected: isSelected })}
                  aria-disabled={isDisabled || undefined}
                  onClick={isDisabled ? undefined : () => handleSelect(index)}
                  className={`h-10 md:h-11 px-4 rounded flex items-center justify-between font-[family-name:var(--font-montserrat)] text-base font-bold tracking-[0.15px] transition-all duration-150 ease-in-out ${
                    isDisabled
                      ? "text-white/40 cursor-not-allowed"
                      : isSelected
                        ? "text-white bg-[rgba(255,234,158,0.20)] cursor-pointer hover:bg-[rgba(255,234,158,0.30)]"
                        : isActive
                          ? "text-white bg-[rgba(255,255,255,0.05)] cursor-pointer"
                          : "text-white bg-transparent cursor-pointer hover:bg-[rgba(255,255,255,0.05)]"
                  } focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-[-2px]`}
                >
                  <span>{getDisplayText(hashtag)}</span>
                  {isSelected && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-150 ease-out"
                    >
                      <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                      <path
                        d="M7 12l3.5 3.5L17 9"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Screen reader announcement */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}

function getSortedHashtags(hashtags: Hashtag[], selected: string[]): Hashtag[] {
  const selectedSet = new Set(selected);
  const selectedItems = hashtags.filter((h) => selectedSet.has(h.id));
  const unselectedItems = hashtags.filter((h) => !selectedSet.has(h.id));
  return [...selectedItems, ...unselectedItems];
}
