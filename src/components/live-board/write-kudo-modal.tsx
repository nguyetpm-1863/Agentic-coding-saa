"use client";

import { useState, useRef, useEffect, useCallback, useReducer } from "react";
import { useEditor, EditorContent, ReactRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";
import { createClient } from "@/libs/supabase/client";
import { getTranslations } from "@/libs/i18n/translations";
import { HashtagSelector } from "@/components/live-board/hashtag-selector";
import { AddLinkBox } from "@/components/live-board/addlink-box";
import { PREDEFINED_HASHTAGS } from "@/libs/constants/hashtags";
import { MentionList, fetchMentionUsers } from "@/components/live-board/mention-suggestion";
import type { MentionListRef } from "@/components/live-board/mention-suggestion";

interface WriteKudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  locale: string;
  initialRecipientId?: string;
  initialRecipientName?: string;
}

interface FormState {
  recipientId: string;
  recipientName: string;
  title: string;
  content: string;
  hashtags: string[];
  isAnonymous: boolean;
  anonymousName: string;
  images: ImageUpload[];
  errors: Record<string, string>;
  isDirty: boolean;
  isSubmitting: boolean;
  serverError: string;
}

interface ImageUpload {
  id: string;
  file: File;
  previewUrl: string;
  storageUrl?: string;
  status: "uploading" | "done" | "error";
}

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: string | string[] | boolean }
  | { type: "SET_HASHTAGS"; value: string[] }
  | { type: "SET_IMAGES"; value: ImageUpload[] }
  | { type: "SET_CONTENT"; value: string }
  | { type: "SET_ERROR"; field: string; value: string }
  | { type: "CLEAR_ERROR"; field: string }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "SET_SERVER_ERROR"; value: string }
  | { type: "RESET" };

const initialState: FormState = {
  recipientId: "",
  recipientName: "",
  title: "",
  content: "",
  hashtags: [],
  isAnonymous: false,
  anonymousName: "",
  images: [],
  errors: {},
  isDirty: false,
  isSubmitting: false,
  serverError: "",
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        isDirty: true,
        errors: { ...state.errors, [action.field]: "" },
        serverError: "",
      };
    case "SET_HASHTAGS":
      return {
        ...state,
        hashtags: action.value,
        isDirty: true,
        errors: { ...state.errors, hashtags: "" },
        serverError: "",
      };
    case "SET_IMAGES":
      return {
        ...state,
        images: action.value,
        isDirty: true,
        serverError: "",
      };
    case "SET_CONTENT":
      return {
        ...state,
        content: action.value,
        isDirty: true,
        errors: { ...state.errors, content: "" },
        serverError: "",
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.value },
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "SET_SERVER_ERROR":
      return { ...state, serverError: action.value, isSubmitting: false };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

interface UserResult {
  id: string;
  name: string;
  avatarUrl: string | null;
  department: string | null;
}

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export function WriteKudoModal({
  isOpen,
  onClose,
  onSuccess,
  locale,
  initialRecipientId,
  initialRecipientName,
}: WriteKudoModalProps) {
  const t = getTranslations(locale);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isClosing, setIsClosing] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [recipientSearch, setRecipientSearch] = useState("");
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill recipient when modal opens with initial values
  useEffect(() => {
    if (isOpen && initialRecipientId && initialRecipientName) {
      dispatch({ type: "SET_FIELD", field: "recipientId", value: initialRecipientId });
      dispatch({ type: "SET_FIELD", field: "recipientName", value: initialRecipientName });
      setRecipientSearch(initialRecipientName);
    }
  }, [isOpen, initialRecipientId, initialRecipientName]);

  // Tiptap editor
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        blockquote: {
          HTMLAttributes: { class: "border-l-4 border-[#998C5F] pl-4 italic" },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
      Placeholder.configure({
        placeholder: t["kudo.content_placeholder"],
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention-highlight",
        },
        suggestion: {
          items: async ({ query }) => {
            return fetchMentionUsers(query);
          },
          render: () => {
            let component: ReactRenderer<MentionListRef> | null = null;
            let popup: HTMLDivElement | null = null;

            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });

                popup = document.createElement("div");
                popup.style.position = "fixed";
                popup.style.zIndex = "9999";
                document.body.appendChild(popup);

                popup.appendChild(component.element);

                const clientRect = props.clientRect?.();
                if (clientRect && popup) {
                  popup.style.left = `${clientRect.left}px`;
                  popup.style.top = `${clientRect.bottom + 4}px`;
                }
              },
              onUpdate: (props) => {
                component?.updateProps(props);

                const clientRect = props.clientRect?.();
                if (clientRect && popup) {
                  popup.style.left = `${clientRect.left}px`;
                  popup.style.top = `${clientRect.bottom + 4}px`;
                }
              },
              onKeyDown: (props) => {
                if (props.event.key === "Escape") {
                  popup?.remove();
                  component?.destroy();
                  return true;
                }
                return component?.ref?.onKeyDown(props) ?? false;
              },
              onExit: () => {
                popup?.remove();
                component?.destroy();
              },
            };
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none w-full min-h-[120px] h-[200px] px-6 py-4 outline-none font-[family-name:var(--font-montserrat)] text-base text-[#00101A] overflow-y-auto",
      },
    },
    onUpdate: ({ editor: e }) => {
      const html = e.getHTML();
      const isEmpty = e.isEmpty;
      dispatch({ type: "SET_CONTENT", value: isEmpty ? "" : html });
      setCharCount(e.state.doc.textContent.length);
    },
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      dispatch({ type: "RESET" });
      setRecipientSearch("");
      setSearchResults([]);
      setShowSearchDropdown(false);
      setIsClosing(false);
      editor?.commands.clearContent();
      setCharCount(0);
    }
  }, [isOpen, editor]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || showLinkDialog) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseAttempt();
        return;
      }
      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'input, textarea, button, select, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, showLinkDialog, state.isDirty]);

  const handleCloseAttempt = useCallback(() => {
    if (state.isSubmitting) return;
    if (state.isDirty) {
      const confirmed = window.confirm(t["kudo.discard_confirm"]);
      if (!confirmed) return;
    }
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      previousFocusRef.current?.focus();
    }, 200);
  }, [state.isDirty, state.isSubmitting, onClose, t]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleCloseAttempt();
      }
    },
    [handleCloseAttempt]
  );

  // Recipient search - queries user_profiles table
  const handleRecipientSearchChange = useCallback(
    (value: string) => {
      setRecipientSearch(value);
      dispatch({ type: "SET_FIELD", field: "recipientId", value: "" });
      dispatch({ type: "SET_FIELD", field: "recipientName", value: "" });

      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

      if (value.trim().length < 2) {
        setSearchResults([]);
        setShowSearchDropdown(false);
        return;
      }

      setIsSearching(true);
      setShowSearchDropdown(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("user_profiles")
            .select("id, name, avatar_url, departments(name)")
            .ilike("name", `%${value}%`)
            .limit(10);

          if (error) throw error;

          setSearchResults(
            (data || []).map((u) => {
              const dept = u.departments as { name: string } | { name: string }[] | null;
              const deptName = Array.isArray(dept) ? dept[0]?.name : dept?.name;
              return {
                id: u.id as string,
                name: u.name as string,
                avatarUrl: u.avatar_url as string | null,
                department: (deptName as string) ?? null,
              };
            })
          );
        } catch {
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    },
    []
  );

  const handleSelectRecipient = useCallback((user: UserResult) => {
    dispatch({ type: "SET_FIELD", field: "recipientId", value: user.id });
    dispatch({ type: "SET_FIELD", field: "recipientName", value: user.name });
    setRecipientSearch(user.name);
    setShowSearchDropdown(false);
  }, []);

  // Validation
  const validateField = useCallback(
    (field: string) => {
      switch (field) {
        case "recipientId":
          if (!state.recipientId) {
            dispatch({ type: "SET_ERROR", field: "recipientId", value: t["kudo.error_recipient"] });
          }
          break;
        case "title":
          if (!state.title.trim()) {
            dispatch({ type: "SET_ERROR", field: "title", value: t["kudo.error_badge"] });
          }
          break;
        case "content":
          if (!state.content.trim()) {
            dispatch({ type: "SET_ERROR", field: "content", value: t["kudo.error_content"] });
          }
          break;
        case "hashtags":
          if (state.hashtags.length === 0) {
            dispatch({ type: "SET_ERROR", field: "hashtags", value: t["kudo.error_hashtag"] });
          }
          break;
      }
    },
    [state.recipientId, state.title, state.content, state.hashtags, t]
  );

  const hasUploadingImages = state.images.some((i) => i.status === "uploading");
  const canSubmit =
    state.recipientId &&
    state.title.trim() &&
    state.content.trim() &&
    state.hashtags.length > 0 &&
    (!state.isAnonymous || state.anonymousName.trim()) &&
    !state.isSubmitting &&
    !hasUploadingImages;

  // Image upload
  const handleImageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const remaining = MAX_IMAGES - state.images.length;
      const filesToAdd = Array.from(files).slice(0, remaining);

      const newImages: ImageUpload[] = filesToAdd
        .filter((f) => ACCEPTED_IMAGE_TYPES.includes(f.type) && f.size <= MAX_IMAGE_SIZE)
        .map((f) => ({
          id: crypto.randomUUID(),
          file: f,
          previewUrl: URL.createObjectURL(f),
          status: "uploading" as const,
        }));

      if (newImages.length === 0) return;

      const updated = [...state.images, ...newImages];
      dispatch({ type: "SET_IMAGES", value: updated });

      // Upload each image to Supabase Storage
      const supabase = createClient();
      for (const img of newImages) {
        try {
          const ext = img.file.name.split(".").pop() || "jpg";
          const path = `kudos/${crypto.randomUUID()}.${ext}`;
          const { error } = await supabase.storage
            .from("kudo-images")
            .upload(path, img.file, { contentType: img.file.type });

          if (error) throw error;

          const { data: urlData } = supabase.storage
            .from("kudo-images")
            .getPublicUrl(path);

          dispatch({
            type: "SET_IMAGES",
            value: updated.map((i) =>
              i.id === img.id
                ? { ...i, storageUrl: urlData.publicUrl, status: "done" as const }
                : i
            ),
          });
        } catch {
          dispatch({
            type: "SET_IMAGES",
            value: updated.map((i) =>
              i.id === img.id ? { ...i, status: "error" as const } : i
            ),
          });
        }
      }

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [state.images]
  );

  const handleRemoveImage = useCallback(
    (id: string) => {
      const img = state.images.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      dispatch({
        type: "SET_IMAGES",
        value: state.images.filter((i) => i.id !== id),
      });
    },
    [state.images]
  );

  const handleSubmit = useCallback(async () => {
    validateField("recipientId");
    validateField("title");
    validateField("content");
    validateField("hashtags");

    if (!canSubmit) return;

    dispatch({ type: "SET_SUBMITTING", value: true });

    try {
      const { createKudo } = await import("@/libs/actions/kudo");
      const imageUrls = state.images
        .filter((i) => i.status === "done" && i.storageUrl)
        .map((i) => i.storageUrl as string);

      const result = await createKudo({
        recipientId: state.recipientId,
        title: state.title.trim(),
        content: state.content.trim(),
        hashtags: state.hashtags,
        isAnonymous: state.isAnonymous,
        anonymousName: state.isAnonymous ? state.anonymousName.trim() || undefined : undefined,
        imageUrls,
      });

      if (result.success) {
        onSuccess();
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(false);
          onClose();
          previousFocusRef.current?.focus();
        }, 200);
      } else {
        dispatch({ type: "SET_SERVER_ERROR", value: result.error });
      }
    } catch {
      dispatch({ type: "SET_SERVER_ERROR", value: t["kudo.submit_error"] });
    }
  }, [canSubmit, state, validateField, onSuccess, onClose, t]);

  // Toolbar link dialog
  const handleLinkSave = useCallback(
    (data: { text: string; url: string }) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: data.url })
        .insertContent(data.text)
        .run();
      setShowLinkDialog(false);
    },
    [editor]
  );

  // Get localized hashtag display text
  const getHashtagDisplayText = useCallback(
    (tagId: string) => {
      const hashtag = PREDEFINED_HASHTAGS.find((h) => h.id === tagId);
      if (!hashtag) return tagId;
      const key = `hashtag.${hashtag.key}` as keyof ReturnType<typeof getTranslations>;
      return t[key] || hashtag.displayText;
    },
    [t]
  );

  if (!isOpen && !isClosing) return null;

  const isEditorError = !!state.errors.content;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 ${
          isClosing ? "animate-modal-overlay-out" : "animate-modal-overlay-in"
        }`}
        style={{ backgroundColor: "rgba(0, 16, 26, 0.80)" }}
        onClick={handleOverlayClick}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kudo-modal-title"
        className={`fixed z-50 w-screen h-screen md:w-[90vw] md:max-w-[752px] md:h-auto md:max-h-[90vh] lg:w-[752px] bg-[#FFF8E1] rounded-none md:rounded-3xl p-4 md:p-6 lg:p-10 overflow-x-hidden overflow-y-auto flex flex-col gap-6 lg:gap-8 ${
          isClosing ? "animate-modal-slide-out" : "animate-modal-slide-in"
        }`}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Title */}
        <h2
          id="kudo-modal-title"
          className="font-[family-name:var(--font-montserrat)] text-2xl md:text-[28px] lg:text-[32px] font-bold text-[#00101A] text-center leading-tight lg:leading-10"
        >
          {t["kudo.modal_title"]}
        </h2>

        {/* Server error */}
        {state.serverError && (
          <div
            aria-live="polite"
            className="p-3 bg-red-50 border border-[#CF1322] rounded-lg text-[#CF1322] font-[family-name:var(--font-montserrat)] text-sm font-medium text-center"
          >
            {state.serverError}
          </div>
        )}

        {/* Recipient search */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
            <label
              htmlFor="kudo-recipient"
              className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#00101A] lg:shrink-0"
            >
              {t["kudo.recipient_label"]}{" "}
              <span className="text-[#CF1322] text-base font-bold">*</span>
            </label>
            <div className="relative flex-1">
              <input
                id="kudo-recipient"
                type="text"
                value={recipientSearch}
                onChange={(e) => handleRecipientSearchChange(e.target.value)}
                onBlur={() => {
                  setTimeout(() => setShowSearchDropdown(false), 200);
                  validateField("recipientId");
                }}
                placeholder={t["kudo.recipient_placeholder"]}
                aria-required="true"
                aria-describedby={state.errors.recipientId ? "recipient-error" : undefined}
                role="combobox"
                aria-controls="recipient-search-results"
                aria-expanded={showSearchDropdown}
                aria-autocomplete="list"
                disabled={state.isSubmitting}
                className={`w-full h-14 px-6 py-4 border rounded-lg bg-white font-[family-name:var(--font-montserrat)] text-base text-[#00101A] placeholder:text-[#999] outline-none transition-colors duration-150 disabled:opacity-50 ${
                  state.errors.recipientId
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
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Search dropdown */}
              {showSearchDropdown && (
                <div
                  id="recipient-search-results"
                  role="listbox"
                  className="absolute top-full left-0 right-0 mt-1 z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg max-h-[240px] overflow-y-auto shadow-lg p-1.5 animate-dropdown-open dropdown-scrollbar"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center h-12 text-[#999] font-[family-name:var(--font-montserrat)] text-sm">
                      {t["kudo.sending"].replace("...", "")}...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="flex items-center justify-center h-12 text-[#999] font-[family-name:var(--font-montserrat)] text-sm">
                      {t["kudo.no_results"]}
                    </div>
                  ) : (
                    searchResults.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        role="option"
                        aria-selected={user.id === state.recipientId}
                        onClick={() => handleSelectRecipient(user)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-[var(--dropdown-item-radius)] text-left transition-colors duration-150 ease-in-out cursor-pointer ${
                          user.id === state.recipientId
                            ? "bg-[var(--dropdown-item-selected-bg)] [text-shadow:var(--dropdown-gold-glow)]"
                            : "hover:bg-[var(--dropdown-item-hover-bg)]"
                        }`}
                      >
                        {user.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={user.avatarUrl}
                            alt=""
                            className="w-8 h-8 rounded-full shrink-0 object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#FFEA9E] flex items-center justify-center shrink-0 font-[family-name:var(--font-montserrat)] text-sm font-bold text-[#00101A]">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-white">
                            {user.name}
                          </span>
                          {user.department && (
                            <span className="font-[family-name:var(--font-montserrat)] text-xs text-[#999]">
                              {user.department}
                            </span>
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          {state.errors.recipientId && (
            <p
              id="recipient-error"
              className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#CF1322]"
            >
              {state.errors.recipientId}
            </p>
          )}
        </div>

        {/* Badge/Title field */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
            <label
              htmlFor="kudo-title"
              className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#00101A] lg:shrink-0"
            >
              {t["kudo.badge_label"]}{" "}
              <span className="text-[#CF1322] text-base font-bold">*</span>
            </label>
            <input
              id="kudo-title"
              type="text"
              value={state.title}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "title", value: e.target.value })
              }
              onBlur={() => validateField("title")}
              placeholder={t["kudo.badge_placeholder"]}
              maxLength={200}
              aria-required="true"
              aria-describedby={state.errors.title ? "title-error" : "title-helper"}
              disabled={state.isSubmitting}
              className={`flex-1 w-full h-14 px-6 py-4 border rounded-lg bg-white font-[family-name:var(--font-montserrat)] text-base text-[#00101A] placeholder:text-[#999] outline-none transition-colors duration-150 disabled:opacity-50 ${
                state.errors.title
                  ? "border-2 border-[#CF1322]"
                  : "border-[#998C5F] focus:border-2 focus:border-[#FFEA9E]"
              }`}
            />
          </div>
          {state.errors.title && (
            <p
              id="title-error"
              className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#CF1322]"
            >
              {state.errors.title}
            </p>
          )}
          <p
            id="title-helper"
            className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#999] tracking-[0.15px] leading-6"
          >
            {t["kudo.badge_helper"]}
          </p>
        </div>

        {/* Rich text editor with toolbar */}
        <div className="flex flex-col gap-1">
          <label className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#00101A]">
            {t["kudo.content_label"]}{" "}
            <span className="text-[#CF1322] text-base font-bold">*</span>
          </label>

          {/* Toolbar + Editor block */}
          <div>
            {/* C_Toolbar */}
            <div className="flex items-center h-10 w-full">
              <ToolbarButton
                icon="bold"
                label={t["kudo.toolbar_bold"]}
                isActive={editor?.isActive("bold") ?? false}
                onClick={() => editor?.chain().focus().toggleBold().run()}
                disabled={state.isSubmitting}
                className="rounded-tl-lg"
              />
              <ToolbarButton
                icon="italic"
                label={t["kudo.toolbar_italic"]}
                isActive={editor?.isActive("italic") ?? false}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                disabled={state.isSubmitting}
              />
              <ToolbarButton
                icon="strikethrough"
                label={t["kudo.toolbar_strikethrough"]}
                isActive={editor?.isActive("strike") ?? false}
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                disabled={state.isSubmitting}
              />
              <ToolbarButton
                icon="numbered-list"
                label={t["kudo.toolbar_numbered_list"]}
                isActive={editor?.isActive("orderedList") ?? false}
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                disabled={state.isSubmitting}
              />
              <ToolbarButton
                icon="link"
                label={t["kudo.toolbar_link"]}
                isActive={editor?.isActive("link") ?? false}
                onClick={() => setShowLinkDialog(true)}
                disabled={state.isSubmitting}
              />
              <ToolbarButton
                icon="quote"
                label={t["kudo.toolbar_quote"]}
                isActive={editor?.isActive("blockquote") ?? false}
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                disabled={state.isSubmitting}
              />
              {/* Community standards link */}
              <a
                href="/community-standards"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-10 px-4 py-2.5 border border-[#998C5F] flex items-center justify-center font-[family-name:var(--font-montserrat)] text-base font-bold text-[#E46060] underline tracking-[0.15px] leading-6 rounded-tr-lg hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-150 cursor-pointer"
              >
                {t["kudo.community_standards"]}
              </a>
            </div>

            {/* D_Editor */}
            <div
              className={`w-full border rounded-b-lg bg-white transition-colors duration-150 ${
                isEditorError
                  ? "border-2 border-[#CF1322]"
                  : "border-[#998C5F] focus-within:border-2 focus-within:border-[#FFEA9E]"
              }`}
            >
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Character counter */}
          <p className="text-right font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#999] tracking-[0.15px]">
            {charCount.toLocaleString()}/1.000
          </p>

          {/* D.1 Mention hint */}
          <p className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] tracking-[0.5px] leading-6 mt-1">
            {t["kudo.content_mention_hint"]}
          </p>

          {state.errors.content && (
            <p
              id="content-error"
              className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#CF1322]"
            >
              {state.errors.content}
            </p>
          )}
        </div>

        {/* Hashtag section */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row lg:items-start gap-2 lg:gap-4">
            <label className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#00101A] lg:shrink-0">
              {t["kudo.hashtag_label"]}{" "}
              <span className="text-[#CF1322] text-base font-bold">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {/* Selected hashtag chips - white bg, gray border */}
              {state.hashtags.map((tagId) => (
                <span
                  key={tagId}
                  className="inline-flex items-center gap-1 h-12 px-3 bg-white border border-[#998C5F] rounded-lg font-[family-name:var(--font-montserrat)] text-sm font-bold text-[#00101A] transition-opacity duration-150"
                >
                  {getHashtagDisplayText(tagId)}
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "SET_HASHTAGS",
                        value: state.hashtags.filter((id) => id !== tagId),
                      })
                    }
                    aria-label={`Remove: ${getHashtagDisplayText(tagId)}`}
                    disabled={state.isSubmitting}
                    className="ml-0.5 w-5 h-5 flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] transition-colors duration-150 cursor-pointer disabled:opacity-50"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </span>
              ))}
              {/* Hide add button when 5 hashtags selected */}
              {state.hashtags.length < 5 && (
                <HashtagSelector
                  hashtags={PREDEFINED_HASHTAGS}
                  selected={state.hashtags}
                  onChange={(selected) => dispatch({ type: "SET_HASHTAGS", value: selected })}
                  maxSelections={5}
                  locale={locale}
                />
              )}
            </div>
          </div>
          {state.errors.hashtags && (
            <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#CF1322]">
              {state.errors.hashtags}
            </p>
          )}
        </div>

        {/* Image section */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
          <label className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#00101A] lg:shrink-0">
            {t["kudo.image_label"]}
          </label>
          <div className="flex flex-wrap items-center gap-3">
            {/* Image thumbnails - square with visible delete button */}
            {state.images.map((img, idx) => (
              <div
                key={img.id}
                className="relative w-20 h-20 lg:w-24 lg:h-24"
              >
                <div className="w-full h-full rounded-lg border border-[#998C5F] bg-white overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.previewUrl}
                    alt={`Upload ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {img.status === "uploading" && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-lg">
                      <svg className="animate-spin h-5 w-5 text-[#998C5F]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  aria-label={`Remove image ${idx + 1}`}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#D4271D] flex items-center justify-center cursor-pointer hover:bg-[#B8221A] hover:scale-110 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#D4271D] focus-visible:outline-offset-2 shadow-md"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M9 3L3 9M3 3l6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}

            {/* + Image button - hide when 5 images */}
            {state.images.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={state.isSubmitting}
                className="flex items-center gap-1 h-12 px-2 py-1 border border-[#998C5F] rounded-lg bg-white font-[family-name:var(--font-montserrat)] text-[11px] font-bold text-[#999] tracking-[0.5px] cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,234,158,0.15)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[#999]">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="flex flex-col items-start leading-tight">
                  <span>{t["kudo.image_add"]}</span>
                  <span>{t["kudo.image_max"]}</span>
                </span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              multiple
              onChange={handleImageSelect}
              className="hidden"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Anonymous toggle */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 lg:gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={state.isAnonymous}
                  onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: "isAnonymous", value: e.target.checked })
                  }
                  disabled={state.isSubmitting}
                  className="sr-only peer"
                />
                <div className="w-7 h-7 border-2 border-[#998C5F] rounded-lg bg-white peer-checked:border-[#998C5F] peer-focus-visible:outline-2 peer-focus-visible:outline-[#FFEA9E] peer-focus-visible:outline-offset-2 peer-hover:border-[#998C5F] transition-colors duration-150 flex items-center justify-center p-0.5">
                  {state.isAnonymous && (
                    <div className="w-full h-full rounded bg-[#998C5F]" />
                  )}
                </div>
              </div>
              <span className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#999]">
                {t["kudo.anonymous_label"]}
              </span>
            </label>
          </div>
          {state.isAnonymous && (
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
              <label
                htmlFor="kudo-anonymous-name"
                className="font-[family-name:var(--font-montserrat)] text-lg md:text-[22px] font-bold text-[#00101A] lg:shrink-0"
              >
                {t["kudo.anonymous_nickname_label"]}{" "}
                <span className="text-[#CF1322] text-base font-bold">*</span>
              </label>
              <input
                id="kudo-anonymous-name"
                type="text"
                value={state.anonymousName}
                onChange={(e) =>
                  dispatch({ type: "SET_FIELD", field: "anonymousName", value: e.target.value })
                }
                onBlur={() => {
                  if (state.isAnonymous && !state.anonymousName.trim()) {
                    dispatch({ type: "SET_ERROR", field: "anonymousName", value: t["kudo.error_anonymous_name"] });
                  }
                }}
                placeholder={t["kudo.anonymous_name_placeholder"]}
                maxLength={50}
                aria-required="true"
                aria-describedby={state.errors.anonymousName ? "anonymous-name-error" : undefined}
                disabled={state.isSubmitting}
                className={`flex-1 w-full h-14 px-6 py-4 border rounded-lg bg-white font-[family-name:var(--font-montserrat)] text-base text-[#00101A] placeholder:text-[#999] outline-none transition-colors duration-150 disabled:opacity-50 ${
                  state.errors.anonymousName
                    ? "border-2 border-[#CF1322]"
                    : "border-[#998C5F] focus:border-2 focus:border-[#FFEA9E]"
                }`}
              />
            </div>
          )}
          {state.errors.anonymousName && (
            <p
              id="anonymous-name-error"
              className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#CF1322]"
            >
              {state.errors.anonymousName}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-auto pt-4">
          <button
            type="button"
            onClick={handleCloseAttempt}
            disabled={state.isSubmitting}
            className="flex items-center justify-center gap-2 min-h-[48px] md:h-[60px] px-10 py-4 border border-[#998C5F] rounded bg-[rgba(255,234,158,0.10)] font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] tracking-[0.15px] cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,234,158,0.20)] active:bg-[rgba(255,234,158,0.30)] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {t["kudo.cancel"]}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`flex-1 flex items-center justify-center gap-2 min-h-[48px] md:h-[60px] bg-[#FFEA9E] rounded-lg font-[family-name:var(--font-montserrat)] text-base md:text-[22px] font-bold text-[#00101A] transition-colors duration-150 ${
              canSubmit
                ? "cursor-pointer hover:bg-[#FFE080] active:bg-[#FFD760]"
                : "opacity-50 cursor-not-allowed"
            } focus-visible:outline-2 focus-visible:outline-[#998C5F] focus-visible:outline-offset-2`}
          >
            {state.isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t["kudo.sending"]}
              </>
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t["kudo.send"]}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add Link Dialog (toolbar-triggered) */}
      <AddLinkBox
        isOpen={showLinkDialog}
        locale={locale}
        onSave={handleLinkSave}
        onCancel={() => setShowLinkDialog(false)}
      />
    </>
  );
}

// --- Toolbar Button Component ---

interface ToolbarButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

function ToolbarButton({ icon, label, isActive, onClick, disabled, className = "" }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={isActive}
      className={`h-10 px-4 py-2.5 border border-[#998C5F] flex items-center justify-center transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        isActive
          ? "bg-[rgba(255,234,158,0.20)]"
          : "bg-transparent hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.10)]"
      } focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-[-2px] ${className}`}
    >
      <ToolbarIcon name={icon} />
    </button>
  );
}

function ToolbarIcon({ name }: { name: string }) {
  const size = 24;
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const, "aria-hidden": true as const };

  switch (name) {
    case "bold":
      return (
        <svg {...props}>
          <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "italic":
      return (
        <svg {...props}>
          <line x1="19" y1="4" x2="10" y2="4" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="20" x2="5" y2="20" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="4" x2="9" y2="20" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "strikethrough":
      return (
        <svg {...props}>
          <path d="M16 4H9a3 3 0 100 6h6a3 3 0 010 6H7" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="4" y1="12" x2="20" y2="12" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "numbered-list":
      return (
        <svg {...props}>
          <line x1="10" y1="6" x2="21" y2="6" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="12" x2="21" y2="12" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="18" x2="21" y2="18" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
          <text x="3" y="7" fontSize="8" fontWeight="bold" fill="#00101A" fontFamily="sans-serif">1</text>
          <text x="3" y="13" fontSize="8" fontWeight="bold" fill="#00101A" fontFamily="sans-serif">2</text>
          <text x="3" y="19" fontSize="8" fontWeight="bold" fill="#00101A" fontFamily="sans-serif">3</text>
        </svg>
      );
    case "link":
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "quote":
      return (
        <svg {...props}>
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
