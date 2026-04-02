"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface ProductImageViewerProps {
  productName: string;
  featuredImage?: string | null;
  gallery?: string[];
}

export function ProductImageViewer({
  productName,
  featuredImage,
  gallery = [],
}: ProductImageViewerProps) {
  // Build images array: featured first, then gallery
  const allImages = [
    featuredImage || null,
    ...gallery,
  ].filter(Boolean) as string[];

  const hasRealImages = allImages.length > 0;

  // Generate placeholder "images" if no real images
  const placeholderCount = 4;
  const displayImages = hasRealImages
    ? allImages
    : Array.from({ length: placeholderCount }, (_, i) => `placeholder-${i}`);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = displayImages[activeIndex] || displayImages[0];

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % displayImages.length);
  }, [displayImages.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  }, [displayImages.length]);

  const isPlaceholder = !hasRealImages || activeImage?.startsWith("placeholder-");

  return (
    <>
      <div>
        {/* Main image */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="relative w-full aspect-square rounded-xl bg-gradient-to-br from-muted/50 to-muted border overflow-hidden cursor-zoom-in group"
        >
          {isPlaceholder ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="h-24 w-24 mx-auto rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <span className="text-primary font-bold text-5xl">M</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Productafbeelding binnenkort
                </p>
              </div>
            </div>
          ) : (
            <Image
              src={activeImage}
              alt={productName}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}

          {/* Zoom icon overlay */}
          <div className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
            </svg>
          </div>

          {/* Navigation arrows on main image */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          {/* Image counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
              {activeIndex + 1} / {displayImages.length}
            </div>
          )}
        </button>

        {/* Thumbnail row */}
        {displayImages.length > 1 && (
          <div className="grid grid-cols-4 gap-3 mt-3">
            {displayImages.slice(0, 4).map((img, i) => {
              const isActive = activeIndex === i;
              const isThumbPlaceholder = !hasRealImages || img.startsWith("placeholder-");
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`aspect-square rounded-lg border-2 overflow-hidden flex items-center justify-center transition-all ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-transparent bg-muted/30 hover:border-primary/30"
                  }`}
                >
                  {isThumbPlaceholder ? (
                    <span className={`font-bold text-lg ${isActive ? "text-primary" : "text-primary/40"}`}>M</span>
                  ) : (
                    <Image
                      src={img}
                      alt={`${productName} ${i + 1}`}
                      width={120}
                      height={120}
                      className="object-contain w-full h-full p-1"
                    />
                  )}
                </button>
              );
            })}
            {/* Show remaining count if more than 4 */}
            {displayImages.length > 4 && (
              <button
                onClick={() => setActiveIndex(4)}
                className="aspect-square rounded-lg border bg-muted/30 flex items-center justify-center hover:border-primary/30 transition-all"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  +{displayImages.length - 4}
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          {/* Lightbox image */}
          <div
            className="relative w-[90vw] h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isPlaceholder ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-40 w-40 mx-auto rounded-3xl bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold text-8xl">M</span>
                  </div>
                  <p className="text-white/60 text-lg">Productafbeelding binnenkort</p>
                </div>
              </div>
            ) : (
              <Image
                src={activeImage}
                alt={productName}
                fill
                className="object-contain"
                sizes="90vw"
                quality={90}
              />
            )}
          </div>

          {/* Counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
              {activeIndex + 1} / {displayImages.length}
            </div>
          )}

          {/* Thumbnail strip at bottom */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {displayImages.map((img, i) => {
                const isThumbPlaceholder = !hasRealImages || img.startsWith("placeholder-");
                return (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    className={`h-14 w-14 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center ${
                      activeIndex === i
                        ? "border-white bg-white/20"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    {isThumbPlaceholder ? (
                      <span className={`font-bold text-sm ${activeIndex === i ? "text-white" : "text-white/40"}`}>M</span>
                    ) : (
                      <Image
                        src={img}
                        alt={`${productName} ${i + 1}`}
                        width={56}
                        height={56}
                        className="object-contain w-full h-full p-0.5"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
