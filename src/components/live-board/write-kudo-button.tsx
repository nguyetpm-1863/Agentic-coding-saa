"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WriteKudoModal } from "@/components/live-board/write-kudo-modal";

interface WriteKudoButtonProps {
  locale: string;
  openWithRecipient?: { id: string; name: string } | null;
  onOpenHandled?: () => void;
}

export function WriteKudoButton({ locale, openWithRecipient, onOpenHandled }: WriteKudoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Auto-open modal when recipient is provided externally
  useEffect(() => {
    if (openWithRecipient) {
      setIsOpen(true);
      onOpenHandled?.();
    }
  }, [openWithRecipient, onOpenHandled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Write a Kudo"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#FFEA9E] text-[#00101A] flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-150 hover:bg-[#FFE580] active:bg-[#FFD84D] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M17 3L21 7L8 20H4V16L17 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <WriteKudoModal
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
        locale={locale}
        initialRecipientId={openWithRecipient?.id}
        initialRecipientName={openWithRecipient?.name}
      />
    </>
  );
}
