"use client";

import { categoryIconMap } from "@/components/icons/category-icons";

export interface QuickCategory {
  name: string;
  slug: string;
  icon: string;
  customImage?: string;
}

interface IconCategoriesProps {
  quickCategories: QuickCategory[];
  activeFilter: string | null;
  onFilter: (slug: string | null) => void;
  mobileCols?: number;
  desktopCols?: number;
}

const mobileGridMap: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const desktopGridMap: Record<number, string> = {
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};

export function IconCategories({ quickCategories, activeFilter, onFilter, mobileCols = 3, desktopCols = 4 }: IconCategoriesProps) {
  const mobileClass = mobileGridMap[mobileCols] || "grid-cols-3";
  const desktopClass = desktopGridMap[desktopCols] || "sm:grid-cols-4";

  return (
    <section className="py-3 md:py-5 bg-muted/30 border-b">
      <div className="container mx-auto px-2 md:px-6">
        <div className={`grid ${mobileClass} ${desktopClass} gap-1.5 md:gap-3`}>
          {quickCategories.slice(0, 12).map((item) => {
            const isActive = activeFilter === item.slug;
            const Icon = item.icon ? categoryIconMap[item.icon] : null;

            return (
              <button
                key={item.slug}
                onClick={() => onFilter(isActive ? null : item.slug)}
                className={`flex flex-col items-center gap-1 md:gap-2 px-1 py-2 md:px-3 md:py-4 rounded-lg md:rounded-xl transition-all ${
                  isActive
                    ? "bg-primary/10 border-2 border-primary/30 text-primary shadow-sm"
                    : "bg-white border-2 border-transparent hover:border-border hover:shadow-md text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="h-10 w-10 md:h-16 md:w-16 flex items-center justify-center">
                  {Icon ? (
                    <Icon className="h-9 w-9 md:h-14 md:w-14" />
                  ) : (
                    <svg className="h-9 w-9 md:h-14 md:w-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="32" cy="32" r="22" />
                      <path d="M24 32h16M32 24v16" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[10px] md:text-sm font-semibold leading-tight text-center line-clamp-1">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
