import type { KudoWithDetails } from "@/libs/kudos/types";
import { KudoCardHeader } from "./kudo-card-header";
import { KudoCardBody } from "./kudo-card-body";
import { KudoCardActions } from "./kudo-card-actions";

interface KudoCardProps {
  kudo: KudoWithDetails;
  locale?: string;
  showDetailLink?: boolean;
  onHashtagClick?: (hashtagId: string) => void;
}

export function KudoCard({ kudo, locale = "vi", showDetailLink = true, onHashtagClick }: KudoCardProps) {
  return (
    <article className="w-full rounded-2xl bg-[#FFF8E1] border-4 border-[#FFEA9E] p-6 pb-4 flex flex-col gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.20)]">
      <KudoCardHeader
        sender={kudo.sender}
        receiver={kudo.receiver}
      />
      <KudoCardBody
        message={kudo.message}
        title={kudo.title}
        hashtags={kudo.hashtags}
        images={kudo.images}
        timestamp={kudo.createdAt}
        locale={locale}
        onHashtagClick={onHashtagClick}
      />
      <KudoCardActions
        kudoId={kudo.id}
        likeCount={kudo.likeCount}
        isLikedByUser={kudo.isLikedByUser}
        locale={locale}
        showDetailLink={showDetailLink}
      />
    </article>
  );
}
