"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import { createClient } from "@/libs/supabase/client";

interface MentionUser {
  id: string;
  name: string;
  avatarUrl: string | null;
  department: string | null;
}

export interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

interface MentionListProps {
  items: MentionUser[];
  command: (item: { id: string; label: string }) => void;
}

export const MentionList = forwardRef<MentionListRef, MentionListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    const selectItem = useCallback(
      (index: number) => {
        const item = items[index];
        if (item) {
          command({ id: item.id, label: item.name });
        }
      },
      [items, command]
    );

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          setSelectedIndex((prev) =>
            prev <= 0 ? items.length - 1 : prev - 1
          );
          return true;
        }
        if (event.key === "ArrowDown") {
          setSelectedIndex((prev) =>
            prev >= items.length - 1 ? 0 : prev + 1
          );
          return true;
        }
        if (event.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) {
      return null;
    }

    return (
      <div className="bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg shadow-lg max-h-[240px] overflow-y-auto w-[280px] p-1.5 animate-dropdown-open dropdown-scrollbar">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => selectItem(index)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--dropdown-item-radius)] text-left transition-colors duration-150 ease-in-out cursor-pointer ${
              index === selectedIndex
                ? "bg-[var(--dropdown-item-selected-bg)] [text-shadow:var(--dropdown-gold-glow)]"
                : "hover:bg-[var(--dropdown-item-hover-bg)]"
            }`}
          >
            {item.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.avatarUrl}
                alt=""
                className="w-8 h-8 rounded-full shrink-0 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#FFEA9E] flex items-center justify-center shrink-0 font-[family-name:var(--font-montserrat)] text-sm font-bold text-[#00101A]">
                {item.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-white truncate">
                {item.name}
              </span>
              {item.department && (
                <span className="font-[family-name:var(--font-montserrat)] text-xs text-[#999] truncate">
                  {item.department}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  }
);

MentionList.displayName = "MentionList";

export async function fetchMentionUsers(query: string): Promise<MentionUser[]> {
  if (query.length < 1) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("id, name, avatar_url, departments(name)")
    .ilike("name", `%${query}%`)
    .limit(8);

  if (error || !data) return [];

  return data.map((u) => {
    const dept = u.departments as
      | { name: string }
      | { name: string }[]
      | null;
    const deptName = Array.isArray(dept) ? dept[0]?.name : dept?.name;
    return {
      id: u.id as string,
      name: u.name as string,
      avatarUrl: u.avatar_url as string | null,
      department: (deptName as string) ?? null,
    };
  });
}
