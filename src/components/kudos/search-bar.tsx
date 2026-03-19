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

interface SearchBarProps {
  locale?: string;
}

export function SearchBar({ locale = "vi" }: SearchBarProps) {
  const t = getTranslations(locale);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div ref={containerRef} className="relative w-full md:w-[300px] lg:w-[381px]">
      <div className="relative">
        {/* Search icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L17 17"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={t["kudos.live_board.search_placeholder"]}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-results"
          className="w-full h-11 md:h-14 lg:h-[72px] rounded-[68px] bg-[rgba(255,234,158,0.10)] border border-[#998C5F] pl-12 lg:pl-14 pr-5 py-3 lg:py-6 font-[family-name:var(--font-montserrat)] text-base font-bold text-white leading-6 tracking-[0.15px] placeholder:text-white transition-all duration-150 focus:border-[#FFEA9E] focus:shadow-[0_0_0_2px_rgba(255,234,158,0.2)] focus:outline-none"
        />
      </div>

      {isOpen && (
        <div
          id="search-results"
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
            results.map((user) => (
              <button
                key={user.id}
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-white/[0.08] min-h-[44px]"
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
