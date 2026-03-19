"use client";

import Image from "next/image";
import { getTranslations } from "@/libs/i18n/translations";
import { RecognitionInput } from "./recognition-input";
import { SearchBar } from "./search-bar";

interface HeroBannerProps {
  locale?: string;
  onSelectRecipient?: (recipientId: string, recipientName: string) => void;
}

export function HeroBanner({
  locale = "vi",
  onSelectRecipient,
}: HeroBannerProps) {
  const t = getTranslations(locale);

  return (
    <section
      className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[512px] overflow-hidden pt-20"
      style={{
        backgroundImage: "url('/images/kudos/Keyvisual.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark fallback behind image */}
      <div className="absolute inset-0 -z-10 bg-[#00101A]" />

      {/* Gradient overlay (25deg angle per Figma) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(25.44deg, #00101A 14.74%, rgba(0, 19, 32, 0) 47.8%)",
        }}
      />

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] z-0 bg-gradient-to-b from-transparent to-[#00101A]" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-start px-4 pt-8 pb-8 md:px-12 md:pt-12 md:pb-16 lg:px-20 lg:pt-[96px] xl:px-36">
        <h1 className="font-[family-name:var(--font-montserrat)] text-[24px] md:text-[32px] lg:text-[36px] font-bold text-[#FFEA9E] leading-[32px] md:leading-[40px] lg:leading-[44px] text-left">
          {t["kudos.live_board.hero_title"]}
        </h1>

        {/* KUDOS Logo */}
        <Image
          src="/images/homepage/kudos.png"
          alt="Sun* KUDOS"
          width={300}
          height={80}
          className="mt-4 h-[48px] md:h-[64px] lg:h-[80px] w-auto"
        />

        {/* Input row */}
        <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mt-16">
          <RecognitionInput
            locale={locale}
            onSelectRecipient={onSelectRecipient}
          />
          <SearchBar locale={locale} />
        </div>
      </div>
    </section>
  );
}
