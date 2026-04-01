"use client";

import { useState, useMemo } from "react";
import { categories, products, quickCategories } from "@/lib/catalog-data";
import { IconCategories } from "@/components/catalog/icon-categories";
import { ProductGrid } from "@/components/catalog/product-grid";
import { SidebarFilter } from "@/components/catalog/sidebar-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CatalogusPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [iconFilter, setIconFilter] = useState<string | null>(null);

  // Filter products based on category, subcategory, or icon filter
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Icon filter maps to subcategory slug
    if (iconFilter) {
      filtered = filtered.filter((p) => p.subcategory === iconFilter);
      return filtered;
    }

    if (activeCategory) {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    if (activeSubcategory) {
      filtered = filtered.filter((p) => p.subcategory === activeSubcategory);
    }
    return filtered;
  }, [activeCategory, activeSubcategory, iconFilter]);

  // Get active filter label
  const activeLabel = useMemo(() => {
    if (iconFilter) {
      const qCat = quickCategories.find((c) => c.slug === iconFilter);
      return qCat?.name || null;
    }
    if (activeSubcategory) {
      const cat = categories.find((c) => c.slug === activeCategory);
      const sub = cat?.subcategories.find((s) => s.slug === activeSubcategory);
      return sub?.name || null;
    }
    if (activeCategory) {
      const cat = categories.find((c) => c.slug === activeCategory);
      return cat?.name || null;
    }
    return null;
  }, [activeCategory, activeSubcategory, iconFilter]);

  function handleIconFilter(slug: string | null) {
    setIconFilter(slug);
    if (slug) {
      // Clear sidebar filters when using icon filter
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  }

  function handleCategoryChange(slug: string | null) {
    setActiveCategory(slug);
    setIconFilter(null); // Clear icon filter when using sidebar
  }

  function handleSubcategoryChange(slug: string | null) {
    setActiveSubcategory(slug);
    setIconFilter(null);
  }

  return (
    <div>
      {/* Page header */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge className="bg-white/20 text-white border-white/20 mb-4">
            Promotie Materiaal
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Promotioneel Materiaal Catalogus
          </h1>
          <p className="mt-3 text-white/70 max-w-lg mx-auto">
            Ontdek onze collectie promotionele producten. Alles is volledig aan
            te passen met uw logo en huisstijl.
          </p>
        </div>
      </section>

      {/* Icon category row */}
      <IconCategories activeFilter={iconFilter} onFilter={handleIconFilter} />

      {/* Main content: sidebar + product grid */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar (desktop) */}
          <div className="hidden lg:block w-64 shrink-0">
            <SidebarFilter
              activeCategory={activeCategory}
              activeSubcategory={activeSubcategory}
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubcategoryChange}
            />
          </div>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  {activeLabel || "Alle Producten"}
                </h2>
                <Badge variant="secondary" className="text-xs">
                  {filteredProducts.length} items
                </Badge>
              </div>
              {(activeCategory || activeSubcategory || iconFilter) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveCategory(null);
                    setActiveSubcategory(null);
                    setIconFilter(null);
                  }}
                  className="text-xs text-muted-foreground"
                >
                  Wis filters ✕
                </Button>
              )}
            </div>

            {/* Product grid */}
            <ProductGrid products={filteredProducts} />

            {/* CTA below products */}
            <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/10 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Product Niet Gevonden?
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                Wij kunnen vrijwel elk promotioneel product leveren. Neem
                contact op voor een maatwerkofferte.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center h-10 rounded-md px-6 bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Offerte Aanvragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
