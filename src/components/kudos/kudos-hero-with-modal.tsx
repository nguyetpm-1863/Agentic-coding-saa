"use client";

import { useState, useCallback } from "react";
import { HeroBanner } from "./hero-banner";
import { WriteKudoButton } from "@/components/live-board/write-kudo-button";

interface KudosHeroWithModalProps {
  locale: string;
}

export function KudosHeroWithModal({ locale }: KudosHeroWithModalProps) {
  const [selectedRecipient, setSelectedRecipient] = useState<{ id: string; name: string } | null>(null);

  const handleSelectRecipient = useCallback((recipientId: string, recipientName: string) => {
    setSelectedRecipient({ id: recipientId, name: recipientName });
  }, []);

  const handleOpenHandled = useCallback(() => {
    setSelectedRecipient(null);
  }, []);

  return (
    <>
      <HeroBanner locale={locale} onSelectRecipient={handleSelectRecipient} />
      <WriteKudoButton
        locale={locale}
        openWithRecipient={selectedRecipient}
        onOpenHandled={handleOpenHandled}
      />
    </>
  );
}
