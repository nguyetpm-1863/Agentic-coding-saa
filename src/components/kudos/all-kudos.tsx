import { getTranslations } from "@/libs/i18n/translations";
import type {
  KudoWithDetails,
  UserStats,
  SpotlightReceiver,
} from "@/libs/kudos/types";
import { KudosFeed } from "./kudos-feed";
import { StatsSidebar } from "./stats-sidebar";

interface AllKudosProps {
  initialKudos: KudoWithDetails[];
  initialCursor: string | null;
  initialHasMore: boolean;
  stats: UserStats;
  topReceivers: SpotlightReceiver[];
  locale?: string;
}

export function AllKudos({
  initialKudos,
  initialCursor,
  initialHasMore,
  stats,
  topReceivers,
  locale = "vi",
}: AllKudosProps) {
  const t = getTranslations(locale);

  return (
    <section className="w-full px-4 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 xl:px-36 xl:py-16">
      {/* Sun* Annual Awards 2025 subtitle + full-width divider */}
      <p className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-white leading-8 mb-2">
        {t["kudos.live_board.spotlight_subtitle"]}
      </p>
      <div className="h-px bg-[#2E3940] w-full mb-4" />

      <h2 className="font-[family-name:var(--font-montserrat)] text-[32px] font-bold text-[#FFEA9E] leading-10 tracking-[-0.25px] mb-6">
        {t["kudos.live_board.all_kudos_title"]}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Feed */}
        <div className="flex-1 min-w-0">
          <KudosFeed
            initialKudos={initialKudos}
            initialCursor={initialCursor}
            initialHasMore={initialHasMore}
            locale={locale}
          />
        </div>

        {/* Stats Sidebar + Leaderboard — sticky together, leaderboard scrolls if too tall */}
        <div className="order-first lg:order-last shrink-0 lg:sticky lg:top-[100px] lg:max-h-[calc(100vh-120px)] flex flex-col gap-6">
          <StatsSidebar stats={stats} locale={locale} />
          <TopSunnersLeaderboard receivers={topReceivers} locale={locale} />
        </div>
      </div>
    </section>
  );
}

const AVATAR_BORDER_COLORS = [
  "#F44336",
  "#4CAF50",
  "#FFEA9E",
  "#2196F3",
  "#E91E63",
  "#9C27B0",
  "#FF9800",
  "#00BCD4",
  "#673AB7",
  "#3F51B5",
];

function TopSunnersLeaderboard({
  receivers,
  locale = "vi",
}: {
  receivers: SpotlightReceiver[];
  locale?: string;
}) {
  const t = getTranslations(locale);

  if (receivers.length === 0) return null;

  return (
    <div className="w-full lg:w-[422px] rounded-[17px] bg-[#00070C] border border-[#998C5F] p-6 flex flex-col gap-3 min-h-0 overflow-y-auto">
      <h3 className="font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-[#FFEA9E] text-center leading-7 px-8">
        {receivers.length} {t["kudos.live_board.spotlight_top_receivers"]}
      </h3>
      <div className="flex flex-col gap-3">
        {receivers.map((receiver, index) => (
          <div key={receiver.id} className="flex items-center gap-3">
            {receiver.avatarUrl ? (
              <img
                src={receiver.avatarUrl}
                alt={receiver.name}
                className="w-16 h-16 rounded-full object-cover shrink-0"
                style={{
                  border: `3px solid ${AVATAR_BORDER_COLORS[index % AVATAR_BORDER_COLORS.length]}`,
                }}
              />
            ) : (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 font-[family-name:var(--font-montserrat)] text-sm font-bold text-white"
                style={{
                  border: `3px solid ${AVATAR_BORDER_COLORS[index % AVATAR_BORDER_COLORS.length]}`,
                  backgroundColor:
                    AVATAR_BORDER_COLORS[index % AVATAR_BORDER_COLORS.length] +
                    "33",
                }}
              >
                {receiver.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-[#FFEA9E] truncate leading-7">
                {receiver.name}
              </span>
              <span className="font-[family-name:var(--font-montserrat)] text-base font-bold text-white/60 leading-6 tracking-[0.15px]">
                {t["kudos.live_board.spotlight_received_ticket"]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
