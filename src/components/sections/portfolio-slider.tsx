"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const colorSchemes = [
  { color: "bg-brand-yellow/10 text-brand-yellow", bgColor: "bg-gradient-to-br from-primary/5 to-primary/10" },
  { color: "bg-brand-green/10 text-brand-green", bgColor: "bg-gradient-to-br from-brand-green/5 to-brand-green/10" },
  { color: "bg-brand-teal/10 text-brand-teal", bgColor: "bg-gradient-to-br from-brand-teal/5 to-brand-teal/10" },
  { color: "bg-primary/10 text-primary", bgColor: "bg-gradient-to-br from-primary/5 to-brand-yellow/5" },
  { color: "bg-brand-yellow/10 text-brand-yellow", bgColor: "bg-gradient-to-br from-brand-yellow/5 to-brand-yellow/10" },
  { color: "bg-brand-green/10 text-brand-green", bgColor: "bg-gradient-to-br from-brand-green/5 to-brand-teal/5" },
];

export interface PortfolioSliderItem {
  id: string;
  slug: string;
  title: string;
  categoryName: string;
}

interface PortfolioSliderProps {
  items: PortfolioSliderItem[];
}

export function PortfolioSlider({ items }: PortfolioSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // How many visible at once per breakpoint (we use CSS to hide extras)
  // On mobile: 1, md: 2, lg: 3
  const visibleDesktop = 3;
  const maxIndex = Math.max(0, items.length - visibleDesktop);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <div className="relative">
      {/* Navigation arrows */}
      {items.length > visibleDesktop && (
        <>
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="absolute -left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Slider track */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex} * (100% / 3 + 8px)))`,
          }}
        >
          {items.map((item, index) => {
            const scheme = colorSchemes[index % colorSchemes.length];
            return (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0"
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <div
                    className={`aspect-[4/3] ${scheme.bgColor} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="text-center p-6">
                      <div className="h-16 w-16 mx-auto rounded-xl bg-white/80 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-primary font-bold text-2xl">M</span>
                      </div>
                      <p className="text-sm font-medium text-foreground/60">
                        Afbeelding binnenkort
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-foreground">
                        {item.title}
                      </h3>
                      <Badge variant="outline" className={`text-[10px] ${scheme.color} border-0 shrink-0`}>
                        {item.categoryName}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Dots indicator */}
      {items.length > visibleDesktop && (
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-primary/20 hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
