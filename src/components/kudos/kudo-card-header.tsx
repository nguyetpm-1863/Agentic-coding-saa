import Image from "next/image";
import type { UserProfile } from "@/libs/kudos/types";

interface KudoCardHeaderProps {
  sender: UserProfile;
  receiver: UserProfile;
  badge?: string | null;
}

const HERO_BADGE_CONFIG: Record<string, {
  colorClass: string;
  image: string;
  count: string;
  description: string;
}> = {
  "New Hero": {
    colorClass: "bg-[#4CAF50] text-white",
    image: "/images/kudos/new.png",
    count: "Có 1-4 người gửi Kudos cho bạn",
    description: "Hành trình lan tỏa điều tốt đẹp bắt đầu – những lời cảm ơn và ghi nhận đầu tiên đã tìm đến bạn.",
  },
  "Rising Hero": {
    colorClass: "bg-[#2196F3] text-white",
    image: "/images/kudos/rising.png",
    count: "Có 5-9 người gửi Kudos cho bạn",
    description: "Hình ảnh bạn đang lớn dần trong trái tim đồng đội bằng sự tử tế và cống hiến của mình.",
  },
  "Super Hero": {
    colorClass: "bg-[#F44336] text-white",
    image: "/images/kudos/super.png",
    count: "Có 10–20 người gửi Kudos cho bạn",
    description: "Bạn đã trở thành biểu tượng được tin tưởng và yêu quý, người luôn sẵn sàng hỗ trợ và được nhiều đồng đội nhớ đến.",
  },
  "Legend Hero": {
    colorClass: "bg-[#FFEA9E] text-[#00101A]",
    image: "/images/kudos/legend.png",
    count: "Có hơn 20 người gửi Kudos cho bạn",
    description: "Bạn đã trở thành huyền thoại – người để lại dấu ấn khó quên trong tập thể bằng trái tim và hành động của mình.",
  },
};

function HeroBadge({ badge }: { badge: string }) {
  const config = HERO_BADGE_CONFIG[badge];
  const colorClass = config?.colorClass ?? "bg-[#4CAF50] text-white";
  const [prefix, suffix] = badge.split(" ");

  return (
    <span className="relative group">
      {config ? (
        <Image
          src={config.image}
          alt={badge}
          width={109}
          height={40}
          className="cursor-help object-contain"
        />
      ) : (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full font-[family-name:var(--font-montserrat)] text-[10px] font-bold leading-[14px] cursor-help ${colorClass}`}
        >
          {badge}
        </span>
      )}
      {config && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] p-4 rounded-2xl bg-[#00101A] text-white opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-10 shadow-lg">
          {/* Badge image + title */}
          <span className="flex items-center gap-2 mb-2">
            <Image src={config.image} alt={badge} width={40} height={40} className="shrink-0" />
            <span className="font-[family-name:var(--font-montserrat)]">
              <span className="text-sm font-bold">{prefix}</span>{" "}
              <span className="text-2xl font-bold">{suffix}</span>
            </span>
          </span>
          {/* Count */}
          <span className="block font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5">
            {config.count}
          </span>
          {/* Description */}
          <span className="block font-[family-name:var(--font-montserrat)] text-sm font-normal leading-5 text-white/80 italic mt-0.5">
            {config.description}
          </span>
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-[#00101A]" />
        </span>
      )}
    </span>
  );
}

function UserAvatar({
  user,
  size = 48,
}: {
  user: UserProfile;
  size?: number;
}) {
  if (user.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl}
        alt={user.name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="rounded-full bg-[#FFEA9E]/30 flex items-center justify-center text-[#00101A] font-[family-name:var(--font-montserrat)] text-sm font-bold shrink-0"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}

function UserInfo({ user }: { user: UserProfile }) {
  return (
    <div className="flex flex-col items-center">
      <UserAvatar user={user} />
      <span className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] leading-6 tracking-[0.15px] mt-1 text-center">
        {user.name}
      </span>
      <div className="flex items-center gap-1">
        {user.departmentCode && (
          <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-[#999] leading-5">
            {user.departmentCode}
          </span>
        )}
        {user.heroBadge && <HeroBadge badge={user.heroBadge} />}
      </div>
    </div>
  );
}

export function KudoCardHeader({
  sender,
  receiver,
}: KudoCardHeaderProps) {
  return (
    <div className="flex items-center justify-center gap-6 w-full">
      <UserInfo user={sender} />

      {/* Play/triangle arrow */}
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
          d="M8 5V19L19 12L8 5Z"
          fill="#00101A"
        />
      </svg>

      <UserInfo user={receiver} />
    </div>
  );
}
