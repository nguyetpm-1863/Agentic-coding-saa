"use client";

import { HashtagFilterDropdown } from "@/components/live-board/hashtag-filter-dropdown";
import { DepartmentFilterDropdown } from "@/components/live-board/department-filter-dropdown";
import type { Hashtag } from "@/types/hashtag";
import type { Department } from "@/types/department";

interface KudosFiltersProps {
  hashtags: Hashtag[];
  departments: Department[];
  selectedHashtag: string | null;
  selectedDepartment: string | null;
  onHashtagChange: (hashtagId: string | null) => void;
  onDepartmentChange: (departmentId: string | null) => void;
  hashtagLabel?: string;
  departmentLabel?: string;
}

export function KudosFilters({
  hashtags,
  departments,
  selectedHashtag,
  selectedDepartment,
  onHashtagChange,
  onDepartmentChange,
  hashtagLabel = "Filter by hashtag",
  departmentLabel = "Filter by department",
}: KudosFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <HashtagFilterDropdown
        hashtags={hashtags}
        selectedHashtag={selectedHashtag}
        onSelect={onHashtagChange}
        label={hashtagLabel}
      />
      <DepartmentFilterDropdown
        departments={departments}
        selectedDepartment={selectedDepartment}
        onSelect={onDepartmentChange}
        label={departmentLabel}
      />
    </div>
  );
}
