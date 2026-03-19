import type { Hashtag, KudoImage } from "@/libs/kudos/types";
import { ImageGallery } from "./image-gallery";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

interface KudoCardBodyProps {
  message: string;
  title?: string | null;
  hashtags: Hashtag[];
  images: KudoImage[];
  timestamp: string;
  locale?: string;
  onHashtagClick?: (hashtagId: string) => void;
}

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const dateStr = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return `${hours}:${minutes} - ${dateStr}`;
}

export function KudoCardBody({
  message,
  title,
  hashtags,
  images,
  timestamp,
  locale = "vi",
  onHashtagClick,
}: KudoCardBodyProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Gold divider before timestamp */}
      <div className="h-px bg-[#FFEA9E] w-full" />

      {/* Timestamp */}
      <p className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#999] leading-6 tracking-[0.5px] text-left">
        {formatTimestamp(timestamp)}
      </p>

      {/* Badge title */}
      {title && (
        <p className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] leading-6 text-center">
          {title}
        </p>
      )}

      {/* Message */}
      <div
        className="w-full rounded-xl border border-[#FFEA9E] px-6 py-4"
        style={{ background: "rgba(255, 234, 158, 0.4)" }}
      >
        <p
          className="font-[family-name:var(--font-montserrat)] text-xl font-bold text-[#00101A] leading-8 line-clamp-4"
          style={{ minHeight: "calc(4 * 2rem)" }}
        >
          {stripHtml(message)}
        </p>
      </div>

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1 line-clamp-1 overflow-hidden">
          {hashtags.map((hashtag) => (
            <button
              key={hashtag.id}
              type="button"
              onClick={() => onHashtagClick?.(hashtag.id)}
              className={`font-[family-name:var(--font-montserrat)] text-base font-bold text-[#D4271D] leading-6 tracking-[0.5px] ${onHashtagClick ? "cursor-pointer hover:underline" : "cursor-default"}`}
            >
              {locale === "en"
                ? hashtag.displayTextEn
                : hashtag.displayTextVi}
            </button>
          ))}
        </div>
      )}

      {images.length > 0 && <ImageGallery images={images} />}

      {/* Gold divider after hashtags */}
      <div className="h-px bg-[#FFEA9E] w-full" />
    </div>
  );
}
