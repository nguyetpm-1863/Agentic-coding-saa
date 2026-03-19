"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { searchUsers } from "@/libs/kudos/actions";
import { getTranslations } from "@/libs/i18n/translations";

interface SearchResult {
  id: string;
  name: string;
  avatarUrl: string | null;
  department: string | null;
}

interface RecognitionInputProps {
  locale?: string;
  onSelectRecipient?: (recipientId: string, recipientName: string) => void;
}

export function RecognitionInput({ locale = "vi", onSelectRecipient }: RecognitionInputProps) {
  const t = getTranslations(locale);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchUsers(query);
        setResults(data);
        setHighlightedIndex(-1);
        setIsOpen(true);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleContainerClick() {
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || results.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < results.length) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  }

  function handleSelect(user: SearchResult) {
    onSelectRecipient?.(user.id, user.name);
    setQuery("");
    setResults([]);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full flex-1">
      <div
        onClick={handleContainerClick}
        className="relative w-full h-11 md:h-14 lg:h-[72px] rounded-[68px] bg-[rgba(255,234,158,0.10)] border border-[#998C5F] px-4 py-3 lg:py-6 flex items-center gap-2 cursor-text transition-all duration-150 hover:bg-[rgba(255,234,158,0.15)] hover:border-[#FFEA9E] focus-within:border-[#FFEA9E] focus-within:shadow-[0_0_0_2px_rgba(255,234,158,0.2)]"
      >
        {/* Pen icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M17 3L21 7L8 20H4V16L17 3Z"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={t["kudos.live_board.recognition_placeholder"]}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="recognition-results"
          aria-activedescendant={highlightedIndex >= 0 ? `recognition-option-${highlightedIndex}` : undefined}
          className="flex-1 bg-transparent border-none outline-none font-[family-name:var(--font-montserrat)] text-base font-bold text-white leading-6 tracking-[0.15px] placeholder:text-white"
        />
      </div>

      {isOpen && (
        <div
          id="recognition-results"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#00101A] border border-white/15 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <span className="font-[family-name:var(--font-montserrat)] text-sm text-white/50">
                Searching...
              </span>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center">
              <span className="font-[family-name:var(--font-montserrat)] text-sm text-white/50">
                {t["kudos.live_board.no_results"]}
              </span>
            </div>
          ) : (
            results.map((user, index) => (
              <button
                key={user.id}
                id={`recognition-option-${index}`}
                type="button"
                role="option"
                aria-selected={index === highlightedIndex}
                onClick={() => handleSelect(user)}
                className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 min-h-[44px] ${index === highlightedIndex ? "bg-white/[0.12]" : "hover:bg-white/[0.08]"}`}
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-8 h-8"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#FFEA9E]/20 flex items-center justify-center text-[#FFEA9E] text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col items-start">
                  <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-white">
                    {user.name}
                  </span>
                  {user.department && (
                    <span className="font-[family-name:var(--font-montserrat)] text-xs text-white/50">
                      {user.department}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
