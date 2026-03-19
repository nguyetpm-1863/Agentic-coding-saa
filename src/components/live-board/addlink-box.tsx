"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { validateUrl } from "@/libs/validation/url";
import { getTranslations } from "@/libs/i18n/translations";

interface AddLinkBoxProps {
  isOpen: boolean;
  initialText?: string;
  locale: string;
  onSave: (data: { text: string; url: string }) => void;
  onCancel: () => void;
}

export function AddLinkBox({
  isOpen,
  initialText = "",
  locale,
  onSave,
  onCancel,
}: AddLinkBoxProps) {
  const t = getTranslations(locale);
  const [text, setText] = useState(initialText);
  const [url, setUrl] = useState("");
  const [textError, setTextError] = useState("");
  const [urlError, setUrlError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Reset form state when dialog opens
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setText(initialText);
      setUrl("");
      setTextError("");
      setUrlError("");
      setTimeout(() => textInputRef.current?.focus(), 50);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen, initialText]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialog!.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])'
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

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  const handleSave = useCallback(() => {
    let hasError = false;
    setTextError("");
    setUrlError("");

    const trimmedText = text.trim();
    if (!trimmedText || trimmedText.length < 1 || trimmedText.length > 100) {
      setTextError(t["addlink.error_text_required"]);
      hasError = true;
    }

    const urlResult = validateUrl(url);
    if (!urlResult.valid) {
      setUrlError(t["addlink.error_url_invalid"]);
      hasError = true;
    }

    if (hasError) return;

    onSave({ text: trimmedText, url });
  }, [text, url, onSave, t]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCancel();
      }
    },
    [onCancel]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,16,26,0.80)] z-[60] flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="addlink-dialog-title"
        className="w-[calc(100vw-32px)] md:w-[90vw] md:max-w-[752px] lg:w-[752px] min-h-[388px] bg-[#FFF8E1] rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-10 z-[60] flex flex-col gap-6 md:gap-8"
      >
        <h2
          id="addlink-dialog-title"
          className="text-center font-[family-name:var(--font-montserrat)] text-2xl md:text-[28px] lg:text-[32px] font-bold text-[#00101A]"
        >
          {t["addlink.title"]}
        </h2>

        {/* Text field */}
        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
          <label
            htmlFor="addlink-text"
            className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#00101A] md:w-[120px] shrink-0"
          >
            {t["addlink.text_label"]}
          </label>
          <div className="flex-1 flex flex-col gap-1">
            <input
              ref={textInputRef}
              id="addlink-text"
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (textError) setTextError("");
              }}
              aria-required="true"
              aria-describedby={textError ? "addlink-text-error" : undefined}
              className={`w-full h-14 px-6 py-4 border rounded-lg bg-white font-[family-name:var(--font-montserrat)] text-base text-[#00101A] outline-none transition-colors duration-150 ${
                textError
                  ? "border-2 border-[#CF1322]"
                  : "border-[#998C5F] focus:border-2 focus:border-[#FFEA9E]"
              }`}
            />
            {textError && (
              <p
                id="addlink-text-error"
                aria-live="polite"
                className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#CF1322]"
              >
                {textError}
              </p>
            )}
          </div>
        </div>

        {/* URL field */}
        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
          <label
            htmlFor="addlink-url"
            className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#00101A] md:w-[120px] shrink-0"
          >
            {t["addlink.url_label"]}
          </label>
          <div className="flex-1 flex flex-col gap-1">
            <div className="relative">
              <input
                id="addlink-url"
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError("");
                }}
                placeholder="https://"
                aria-required="true"
                aria-describedby={urlError ? "addlink-url-error" : undefined}
                className={`w-full h-14 px-6 py-4 pr-12 border rounded-lg bg-white font-[family-name:var(--font-montserrat)] text-base text-[#00101A] outline-none transition-colors duration-150 ${
                  urlError
                    ? "border-2 border-[#CF1322]"
                    : "border-[#998C5F] focus:border-2 focus:border-[#FFEA9E]"
                }`}
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#998C5F]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {urlError && (
              <p
                id="addlink-url-error"
                aria-live="polite"
                className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#CF1322]"
              >
                {urlError}
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-auto">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 min-h-[48px] px-10 py-4 border border-[#998C5F] rounded bg-[rgba(255,234,158,0.10)] font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,234,158,0.20)] active:bg-[rgba(255,234,158,0.30)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {t["addlink.cancel"]}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 min-h-[48px] md:h-[60px] bg-[#FFEA9E] rounded-lg font-[family-name:var(--font-montserrat)] text-base md:text-[22px] font-bold text-[#00101A] cursor-pointer transition-colors duration-150 hover:bg-[#FFE080] active:bg-[#FFD760]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t["addlink.save"]}
          </button>
        </div>
      </div>
    </div>
  );
}
