"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type AnimationState = "idle" | "opening" | "revealed";

interface SecretBoxProps {
  isOpen: boolean;
  onClose: () => void;
  initialCount?: number;
  onOpenBox?: () => Promise<{
    badgeType: string;
    badgeDisplayName: string;
    badgeImageUrl: string;
    remainingCount: number;
  }>;
}

export function SecretBox({
  isOpen,
  onClose,
  initialCount = 0,
  onOpenBox,
}: SecretBoxProps) {
  const [animationState, setAnimationState] = useState<AnimationState>("idle");
  const [unopenedCount, setUnopenedCount] = useState(initialCount);
  const [revealedBadge, setRevealedBadge] = useState<{
    badgeType: string;
    badgeDisplayName: string;
    badgeImageUrl: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setUnopenedCount(initialCount);
      setAnimationState("idle");
      setRevealedBadge(null);
      setError(null);
      setIsClosing(false);
    }
  }, [isOpen, initialCount]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (animationState === "opening") return;
        e.preventDefault();
        handleClose();
      }
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, animationState]);

  const handleClose = useCallback(() => {
    if (animationState === "opening") return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      previousFocusRef.current?.focus();
    }, 200);
  }, [animationState, onClose]);

  const handleBoxClick = useCallback(async () => {
    if (animationState !== "idle" || unopenedCount <= 0) return;

    setAnimationState("opening");
    setError(null);

    const animationDelay = new Promise<void>((resolve) =>
      setTimeout(resolve, 1000)
    );

    try {
      if (onOpenBox) {
        const [, result] = await Promise.all([animationDelay, onOpenBox()]);
        setRevealedBadge({
          badgeType: result.badgeType,
          badgeDisplayName: result.badgeDisplayName,
          badgeImageUrl: result.badgeImageUrl,
        });
        setUnopenedCount(result.remainingCount);
      } else {
        // Demo mode: just animate
        await animationDelay;
        setRevealedBadge({
          badgeType: "demo",
          badgeDisplayName: "Demo Badge",
          badgeImageUrl: "/images/secret-box/badges/stay-gold.webp",
        });
        setUnopenedCount((prev) => Math.max(0, prev - 1));
      }
      setAnimationState("revealed");
    } catch {
      await animationDelay;
      setError("Da xay ra loi. Vui long thu lai.");
      setAnimationState("idle");
    }
  }, [animationState, unopenedCount, onOpenBox]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && animationState !== "opening") {
        handleClose();
      }
    },
    [animationState, handleClose]
  );

  const handleReset = useCallback(() => {
    setAnimationState("idle");
    setRevealedBadge(null);
  }, []);

  if (!isOpen && !isClosing) return null;

  const paddedCount = String(unopenedCount).padStart(2, "0");
  const isDisabled = unopenedCount <= 0;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center ${
        isClosing ? "animate-modal-overlay-out" : "animate-modal-overlay-in"
      }`}
      style={{ backgroundColor: "rgba(0, 16, 26, 0.80)" }}
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-box-title"
        className={`relative w-[calc(100%-32px)] max-w-[652px] bg-[#00101A] rounded-[13px] p-4 md:p-6 flex flex-col items-center gap-4 md:gap-[22px] z-50 ${
          isClosing ? "animate-modal-slide-out" : "animate-modal-slide-in"
        }`}
        style={{ transform: "translate(-50%, -50%)", position: "fixed", top: "50%", left: "50%" }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={animationState === "opening"}
          aria-label="Close"
          className="absolute top-2 right-2 md:top-0 md:right-0 min-w-[44px] min-h-[44px] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
            <path d="M14.25 4.75L4.75 14.25M4.75 4.75l9.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Title */}
        <h2
          id="secret-box-title"
          className="font-[family-name:var(--font-montserrat)] text-xl md:text-[25px] font-bold leading-tight text-[#FFEA9E] text-center"
        >
          KHAM PHA SECRET BOX CUA BAN
        </h2>

        {/* Divider */}
        <div className="w-full max-w-[626px] h-px bg-[#2E3940]" />

        {/* Instruction text */}
        {unopenedCount > 0 && animationState !== "revealed" && (
          <p className="font-[family-name:var(--font-montserrat)] text-[13px] font-bold text-white text-center tracking-[0.4px] transition-opacity duration-200">
            Click vao box de mo
          </p>
        )}

        {/* Box / Badge area */}
        <div className="relative flex items-center justify-center w-full max-w-[557px] aspect-square">
          {animationState === "revealed" && revealedBadge ? (
            // Badge reveal
            <div className="flex flex-col items-center gap-4 animate-badge-reveal">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-[#1a1a2e] border border-[#FFEA9E]/30 flex items-center justify-center overflow-hidden">
                <div className="text-6xl md:text-8xl">🏆</div>
              </div>
              <p className="font-[family-name:var(--font-montserrat)] text-xl md:text-2xl font-bold text-[#FFEA9E] text-center">
                {revealedBadge.badgeDisplayName}
              </p>
              {unopenedCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-2 px-6 py-3 bg-[#FFEA9E] rounded-lg font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] cursor-pointer transition-colors duration-150 hover:bg-[#FFE080]"
                >
                  Mo tiep
                </button>
              )}
            </div>
          ) : (
            // Gift box
            <>
              {/* Glow overlay */}
              <div
                className={`absolute inset-0 pointer-events-none rounded-full ${
                  animationState === "opening" ? "animate-glow-pulse" : ""
                }`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,234,158,0.15) 0%, transparent 70%)",
                  opacity: animationState === "opening" ? 1 : 0.4,
                }}
              />

              <button
                type="button"
                onClick={handleBoxClick}
                disabled={isDisabled || animationState === "opening"}
                role="button"
                aria-label={
                  isDisabled
                    ? "Khong con secret box de mo"
                    : "Mo secret box"
                }
                aria-disabled={isDisabled}
                className={`relative z-10 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl border-2 border-[#FFEA9E]/40 bg-[#1a1a2e] flex items-center justify-center transition-all duration-200 ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : animationState === "opening"
                      ? "animate-box-shake cursor-wait"
                      : "cursor-pointer hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                } focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2`}
              >
                <span className="text-5xl md:text-7xl lg:text-8xl select-none">🎁</span>
              </button>
            </>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            aria-live="polite"
            className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#CF1322] text-center"
          >
            {error}
          </p>
        )}

        {/* Divider */}
        <div className="w-full max-w-[626px] h-px bg-[#2E3940]" />

        {/* Unopened count */}
        <div className="flex items-center gap-1.5" aria-live="polite">
          <span
            className="font-[family-name:var(--font-montserrat)] text-2xl md:text-[29px] font-bold leading-[35px] text-[#FFEA9E]"
            aria-label={`${paddedCount} Unopened secret boxes`}
          >
            {paddedCount}
          </span>
          <span className="font-[family-name:var(--font-montserrat)] text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white">
            Secretbox chua mo
          </span>
        </div>
      </div>
    </div>
  );
}
