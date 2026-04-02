"use client";

import { Separator } from "@/components/ui/separator";

export interface FilterCategory {
  name: string;
  slug: string;
  subcategories: { name: string; slug: string }[];
}

interface SidebarFilterProps {
  categories: FilterCategory[];
  activeCategory: string | null;
  activeSubcategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  onSubcategoryChange: (slug: string | null) => void;
}

export function SidebarFilter({
  categories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: SidebarFilterProps) {
  const activeCat = categories.find((c) => c.slug === activeCategory);

  return (
    <aside className="w-full">
      <div className="sticky top-36">
        <h3 className="font-bold text-sm uppercase tracking-wider text-foreground mb-3">
          Categorieën
        </h3>
        <nav className="space-y-0.5">
          <button
            onClick={() => {
              onCategoryChange(null);
              onSubcategoryChange(null);
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              activeCategory === null
                ? "bg-primary text-white font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Alle Producten
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                onCategoryChange(cat.slug === activeCategory ? null : cat.slug);
                onSubcategoryChange(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                activeCategory === cat.slug
                  ? "bg-primary text-white font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Subcategories */}
        {activeCat && (
          <>
            <Separator className="my-4" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-foreground mb-3">
              {activeCat.name}
            </h3>
            <nav className="space-y-0.5">
              <button
                onClick={() => onSubcategoryChange(null)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSubcategory === null
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Alles in {activeCat.name}
              </button>
              {activeCat.subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() =>
                    onSubcategoryChange(
                      sub.slug === activeSubcategory ? null : sub.slug
                    )
                  }
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSubcategory === sub.slug
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </nav>
          </>
        )}
      </div>
    </aside>
  );
}
