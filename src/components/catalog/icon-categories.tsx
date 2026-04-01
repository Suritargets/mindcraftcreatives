"use client";

import { quickCategories } from "@/lib/catalog-data";
import { categoryIconMap } from "@/components/icons/category-icons";

interface IconCategoriesProps {
  activeFilter: string | null;
  onFilter: (slug: string | null) => void;
}

export function IconCategories({ activeFilter, onFilter }: IconCategoriesProps) {
  const allItems = [
    { slug: null as string | null, name: "Alles", icon: null },
    ...quickCategories.map((c) => ({ slug: c.slug as string | null, name: c.name, icon: c.icon })),
  ];

  return (
    <section className="py-6 bg-muted/30 border-b">
      <div className="container mx-auto px-4 md:px-6">
        {/* Grid: wraps into 2 rows on desktop, 3-4 rows on mobile */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-8 gap-2">
          {allItems.map((item) => {
            const isActive = activeFilter === item.slug;
            const Icon = item.icon ? categoryIconMap[item.icon] : null;

            return (
              <button
                key={item.slug ?? "all"}
                onClick={() => onFilter(isActive && item.slug !== null ? null : item.slug)}
                className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary/10 border border-primary/20 text-primary"
                    : "bg-white border border-transparent hover:border-border hover:shadow-sm text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="h-10 w-10 flex items-center justify-center">
                  {Icon ? (
                    <Icon className="h-9 w-9" />
                  ) : (
                    <svg className="h-9 w-9" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="8" y="8" width="20" height="20" rx="3" />
                      <rect x="36" y="8" width="20" height="20" rx="3" />
                      <rect x="8" y="36" width="20" height="20" rx="3" />
                      <rect x="36" y="36" width="20" height="20" rx="3" />
                    </svg>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium leading-tight text-center line-clamp-1">
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
