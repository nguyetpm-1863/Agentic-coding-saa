import Image from "next/image";
import { getTranslations } from "@/libs/i18n/translations";
import type { SpotlightData } from "@/libs/kudos/types";

interface SpotlightBoardProps {
  data: SpotlightData;
  locale?: string;
}

export function SpotlightBoard({ data, locale = "vi" }: SpotlightBoardProps) {
  const t = getTranslations(locale);
  const formattedCount = new Intl.NumberFormat().format(data.totalKudos);

  return (
    <section className="w-full px-4 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 xl:px-36 xl:py-16">
      {/* Section header */}
      <div className="flex flex-col gap-2 mb-6">
        <p className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-white leading-8">
          {t["kudos.live_board.spotlight_subtitle"]}
        </p>
        <div className="h-px bg-[#2E3940] w-full" />
        <h2 className="font-[family-name:var(--font-montserrat)] text-[32px] font-bold text-[#FFEA9E] leading-10 tracking-[-0.25px]">
          {t["kudos.live_board.spotlight_title"]}
        </h2>
      </div>

      {/* Spotlight container */}
      <div
        className="relative rounded-[47px] border border-[#998C5F] overflow-hidden"
        style={{ minHeight: 548 }}
      >
        {/* Background layer 1: spotlight-bg.png */}
        <Image
          src="/images/kudos/spotlight-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Background layer 2: image-bg.png on top, opacity 0.3 */}
        <Image
          src="/images/kudos/image-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
        />

        {/* Content layer */}
        <div className="relative z-10 w-full h-full" style={{ minHeight: 548 }}>
          {/* Search input — top left */}
          <div className="absolute top-4 left-6 z-20">
            <div className="flex items-center gap-2 w-[200px] h-10 rounded-lg bg-white/[0.08] border border-white/[0.15] px-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                <path d="M20 20L16.5 16.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-[family-name:var(--font-montserrat)] text-sm text-white/50">
                {t["kudos.live_board.search_placeholder"]}
              </span>
            </div>
          </div>

          {/* Kudos counter — top center */}
          <div className="absolute top-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
            <p className="font-[family-name:var(--font-montserrat)] text-[48px] font-bold text-white leading-[56px] tracking-[-0.5px]">
              {formattedCount} KUDOS
            </p>
          </div>

          {/* Word cloud — scattered names */}
          <WordCloud nodes={data.nodes} />

          {/* Activity log — bottom left */}
          {data.latestKudo && (
            <div className="absolute bottom-4 left-6 z-20">
              <p className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-white/70 leading-5 tracking-[0.1px]">
                {data.latestKudo.timeAgo}{" "}
                <span className="text-white">{data.latestKudo.receiverName}</span>{" "}
                {t["kudos.live_board.spotlight_new_kudos"]}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Word cloud: scattered user names at a fixed small size per Figma spec.
 * font-size: 7.94px, font-weight: 700, line-height: 6.36px, letter-spacing: 0.21px
 * Positions use grid + jitter to ensure no overlap.
 */
function WordCloud({ nodes }: { nodes: SpotlightData["nodes"] }) {
  if (nodes.length === 0) return null;

  const sorted = [...nodes].sort((a, b) => b.kudosCount - a.kudosCount);
  const maxCount = Math.max(sorted[0]?.kudosCount ?? 1, 1);

  // Pre-compute positions using a simple seeded spread to avoid overlap
  const positions = computePositions(sorted.length);

  return (
    <div className="absolute inset-0 z-5">
      {sorted.map((node, index) => {
        const prominence = node.kudosCount / maxCount;
        const opacity = 0.4 + prominence * 0.6; // 0.4 to 1.0
        const pos = positions[index];

        return (
          <span
            key={node.id}
            className="absolute font-[family-name:var(--font-montserrat)] font-bold whitespace-nowrap text-center"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontSize: "7.94px",
              lineHeight: "6.36px",
              letterSpacing: "0.21px",
              color: `rgba(255, 255, 255, ${opacity})`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {node.name}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Compute non-overlapping positions spread across the container.
 * Uses a grid-based approach with jitter to appear random.
 */
function computePositions(count: number): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  // Create a grid that fits all nodes with padding from edges
  const cols = Math.ceil(Math.sqrt(count * 1.5));
  const rows = Math.ceil(count / cols);
  const cellW = 80 / cols; // 10% to 90% range
  const cellH = 70 / rows; // 15% to 85% range

  let idx = 0;
  for (let r = 0; r < rows && idx < count; r++) {
    for (let c = 0; c < cols && idx < count; c++) {
      // Base position + pseudo-random jitter based on index
      const jitterX = ((idx * 7 + 13) % 11) / 11 * cellW * 0.6 - cellW * 0.3;
      const jitterY = ((idx * 11 + 7) % 13) / 13 * cellH * 0.6 - cellH * 0.3;
      positions.push({
        x: 10 + c * cellW + cellW / 2 + jitterX,
        y: 18 + r * cellH + cellH / 2 + jitterY,
      });
      idx++;
    }
  }

  return positions;
}
