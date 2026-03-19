"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { KudoImage } from "@/libs/kudos/types";

interface ImageGalleryProps {
  images: KudoImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeLightbox();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="relative w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-lg overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
          >
            <Image
              src={image.imageUrl}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={images[lightboxIndex].imageUrl}
              alt=""
              width={800}
              height={600}
              className="object-contain max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </>
  );
}
