"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { UserStats } from "@/libs/kudos/types";
import { fetchUserStats } from "@/libs/kudos/actions";
import { getTranslations } from "@/libs/i18n/translations";
import { SecretBoxButton } from "./secret-box-button";

interface StatsSidebarProps {
  stats: UserStats;
  locale?: string;
}

function StatRow({
  label,
  value,
  labelIcon,
}: {
  label: string;
  value: number;
  labelIcon?: string;
}) {
  const formatted = new Intl.NumberFormat().format(value);
  return (
    <div className="flex items-center justify-between">
      <span className="font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-white leading-7 flex items-center gap-1">
        {label}
        {labelIcon && (
          <Image src={labelIcon} alt="" width={24} height={24} aria-hidden="true" />
        )}
      </span>
      <span className="font-[family-name:var(--font-montserrat)] text-[32px] font-bold text-[#FFEA9E] leading-10">
        {formatted}
      </span>
    </div>
  );
}

export function StatsSidebar({ stats, locale = "vi" }: StatsSidebarProps) {
  const t = getTranslations(locale);
  const [currentStats, setCurrentStats] = useState(stats);

  // Sync when server re-renders with fresh data
  useEffect(() => {
    setCurrentStats(stats);
  }, [stats]);

  // Re-fetch stats when a like/unlike or other stat-changing event occurs
  const refreshStats = useCallback(() => {
    fetchUserStats()
      .then((fresh) => setCurrentStats(fresh))
      .catch(() => {/* keep current stats on error */});
  }, []);

  useEffect(() => {
    window.addEventListener("kudos:stats-changed", refreshStats);
    return () => window.removeEventListener("kudos:stats-changed", refreshStats);
  }, [refreshStats]);

  return (
    <aside className="w-full lg:w-[422px] rounded-[17px] bg-[#00070C] border border-[#998C5F] p-6 flex flex-col gap-2.5 shrink-0">
      <StatRow
        label={t["kudos.live_board.stats_received"]}
        value={currentStats.kudosReceived}
      />
      <StatRow
        label={t["kudos.live_board.stats_sent"]}
        value={currentStats.kudosSent}
      />
      <StatRow
        label={t["kudos.live_board.heart_total"]}
        value={currentStats.totalHearts}
        labelIcon="/images/kudos/x2.png"
      />

      <div className="border-t border-[#2E3940]" />

      <StatRow
        label={t["kudos.live_board.stats_boxes_opened"]}
        value={currentStats.secretBoxesOpened}
      />
      <StatRow
        label={t["kudos.live_board.stats_boxes_unopened"]}
        value={currentStats.secretBoxesUnopened}
      />

      <SecretBoxButton
        hasUnopened={currentStats.secretBoxesUnopened > 0}
        locale={locale}
      />
    </aside>
  );
}
