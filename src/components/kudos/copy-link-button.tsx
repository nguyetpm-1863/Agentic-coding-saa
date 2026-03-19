"use client";

import { useState } from "react";
import Image from "next/image";
import { getTranslations } from "@/libs/i18n/translations";

interface CopyLinkButtonProps {
  kudoId: string;
  locale?: string;
}

export function CopyLinkButton({ kudoId, locale = "vi" }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const t = getTranslations(locale);

  async function handleCopy() {
    try {
      const url = `${window.location.origin}/kudos?kudo=${kudoId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`font-[family-name:var(--font-montserrat)] text-base font-bold leading-6 tracking-[0.15px] cursor-pointer transition-colors duration-150 min-h-[44px] min-w-[44px] flex items-center justify-center gap-1 ${
        copied ? "text-[#4CAF50]" : "text-[#00101A] hover:text-[#00101A]/80"
      }`}
    >
      {copied ? t["kudos.live_board.copied"] : t["kudos.live_board.copy_link"]}
      <Image src={copied ? "/images/kudos/link-green.svg" : "/images/kudos/link.png"} alt="" width={20} height={20} aria-hidden="true" />
    </button>
  );
}
