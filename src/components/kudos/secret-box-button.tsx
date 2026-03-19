"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { openSecretBox } from "@/libs/kudos/actions";
import { getTranslations } from "@/libs/i18n/translations";

interface SecretBoxButtonProps {
  hasUnopened: boolean;
  locale?: string;
}

export function SecretBoxButton({ hasUnopened, locale = "vi" }: SecretBoxButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const t = getTranslations(locale);

  function handleClick() {
    startTransition(async () => {
      try {
        const box = await openSecretBox();
        if (box) {
          setResult(box.reward ?? t["secretbox.success_title"]);
          setTimeout(() => setResult(null), 3000);
        }
      } catch {
        // Handle error silently
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={!hasUnopened || isPending}
        className="w-full h-[60px] rounded-lg bg-[#FFEA9E] text-[#00101A] font-[family-name:var(--font-montserrat)] text-[22px] font-bold leading-7 cursor-pointer transition-colors duration-150 hover:bg-[#FFE580] active:bg-[#FFD84D] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 flex items-center justify-center gap-2"
      >
        {isPending ? "..." : (
          <>
            {t["kudos.live_board.open_secret_box"]}
            <Image src="/images/kudos/gift.png" alt="" width={28} height={28} aria-hidden="true" />
          </>
        )}
      </button>
      {result && (
        <p className="text-center font-[family-name:var(--font-montserrat)] text-sm text-[#FFEA9E] animate-fade-in">
          {result}
        </p>
      )}
    </div>
  );
}
