"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type TabItem = {
  value: string;
  label: string;
  count?: number;
};

type ResponsiveTabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/**
 * Horizontal pill tabs on desktop, dropdown on mobile.
 */
export function ResponsiveTabs({ items, value, onChange, className }: ResponsiveTabsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeItem = items.find((i) => i.value === value) ?? items[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  return (
    <div className={cn("relative", className)}>
      {/* Mobile: dropdown */}
      <div ref={ref} className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <span className="flex items-center gap-2">
            {activeItem.label}
            {activeItem.count != null && (
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                {activeItem.count}
              </span>
            )}
          </span>
          <svg
            className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-full rounded-lg border bg-background shadow-lg py-1 animate-in fade-in-0 zoom-in-95 duration-150">
            {items.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors",
                  item.value === value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <span>{item.label}</span>
                {item.count != null && (
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
                    item.value === value
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: horizontal pills */}
      <div className="hidden md:flex gap-2 flex-wrap">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              item.value === value
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {item.label}
            {item.count != null && ` (${item.count})`}
          </button>
        ))}
      </div>
    </div>
  );
}
