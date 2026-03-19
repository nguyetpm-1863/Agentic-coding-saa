"use client";

import { useCallback, useRef, useEffect } from "react";
import { useDropdown } from "@/hooks/use-dropdown";
import type { Hashtag } from "@/types/hashtag";

interface HashtagFilterDropdownProps {
  hashtags: Hashtag[];
  selectedHashtag: string | null;
  onSelect: (hashtag: string | null) => void;
  label?: string;
}

export function HashtagFilterDropdown({
  hashtags,
  selectedHashtag,
  onSelect,
  label = "Filter by hashtag",
}: HashtagFilterDropdownProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (index: number) => {
      const hashtag = hashtags[index];
      if (!hashtag) return;
      if (hashtag.id === selectedHashtag) {
        onSelect(null);
      } else {
        onSelect(hashtag.id);
      }
    },
    [hashtags, selectedHashtag, onSelect]
  );

  const {
    isOpen,
    isClosing,
    activeIndex,
    containerRef,
    triggerProps,
    listProps,
    getItemProps,
    close,
  } = useDropdown({
    itemCount: hashtags.length,
    onSelect: (index: number) => {
      handleSelect(index);
      close();
    },
    role: "listbox",
  });

  const showDropdown = isOpen || isClosing;

  const selectedLabel = selectedHashtag
    ? hashtags.find((h) => h.id === selectedHashtag)?.displayText
    : null;

  // Focus active item when navigating with keyboard
  useEffect(() => {
    if (!isOpen || activeIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll('[role="option"]');
    const item = items[activeIndex] as HTMLElement | undefined;
    item?.focus();
  }, [activeIndex, isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        {...triggerProps}
        aria-label={label}
        className="flex items-center gap-2 px-4 h-10 rounded-lg cursor-pointer bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] text-white font-[family-name:var(--font-montserrat)] text-sm font-bold tracking-[0.5px] transition-colors duration-150 hover:bg-[#FFEA9E]/10 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
      >
        <span>{selectedLabel ?? label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {showDropdown && (
        <div
          ref={listRef}
          {...listProps}
          aria-label={label}
          className={`absolute top-full left-0 mt-1 z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg p-1.5 flex flex-col overflow-y-auto max-h-[400px] dropdown-scrollbar ${
            isOpen && !isClosing
              ? "animate-dropdown-open"
              : "animate-dropdown-close"
          }`}
        >
          {hashtags.map((hashtag, index) => {
            const isSelected = hashtag.id === selectedHashtag;
            const isActive = index === activeIndex;
            return (
              <div
                key={hashtag.id}
                {...getItemProps(index, { selected: isSelected })}
                className={`h-14 px-4 rounded flex items-center cursor-pointer whitespace-nowrap font-[family-name:var(--font-montserrat)] text-base font-bold text-white tracking-[0.5px] leading-6 transition-colors duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 ${
                  isSelected
                    ? "bg-[#FFEA9E]/20 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
                    : isActive
                      ? "bg-[#FFEA9E]/10"
                      : "bg-transparent hover:bg-[#FFEA9E]/10"
                }`}
              >
                <span>{hashtag.displayText}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
