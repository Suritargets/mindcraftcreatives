"use client";

import { useState, useMemo } from "react";
import { IconCategories } from "@/components/catalog/icon-categories";
import { ProductGrid } from "@/components/catalog/product-grid";
import { SidebarFilter } from "@/components/catalog/sidebar-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { CatalogProduct } from "@/components/catalog/product-grid";
import type { FilterCategory } from "@/components/catalog/sidebar-filter";
import type { QuickCategory } from "@/components/catalog/icon-categories";

interface CatalogusClientProps {
  products: CatalogProduct[];
  categories: FilterCategory[];
  quickCategories: QuickCategory[];
  mobileCols?: number;
  desktopCols?: number;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroOverlayOpacity?: number;
}

export default function CatalogusClient({
  products,
  categories,
  quickCategories,
  mobileCols = 3,
  desktopCols = 4,
  heroBadge = "Promotie Materiaal",
  heroTitle = "Promotioneel Materiaal Catalogus",
  heroSubtitle = "Ontdek onze collectie promotionele producten. Alles is volledig aan te passen met uw logo en huisstijl.",
  heroImage = "",
  heroOverlayOpacity = 60,
}: CatalogusClientProps) {
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
      filtered = filtered.filter((p) => p.categorySlug === activeCategory);
    }
    if (activeSubcategory) {
      filtered = filtered.filter((p) => p.subcategory === activeSubcategory);
    }
    return filtered;
  }, [products, activeCategory, activeSubcategory, iconFilter]);

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
  }, [categories, quickCategories, activeCategory, activeSubcategory, iconFilter]);

  function handleIconFilter(slug: string | null) {
    setIconFilter(slug);
    if (slug) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  }

  function handleCategoryChange(slug: string | null) {
    setActiveCategory(slug);
    setIconFilter(null);
  }

  function handleSubcategoryChange(slug: string | null) {
    setActiveSubcategory(slug);
    setIconFilter(null);
  }

  return (
    <div>
      {/* Page header */}
      <section className="relative bg-primary py-12 md:py-16 overflow-hidden">
        {/* Background image layer */}
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-primary"
          style={{ opacity: heroImage ? heroOverlayOpacity / 100 : 1 }}
        />
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <Badge className="bg-white/20 text-white border-white/20 mb-4">
            {heroBadge}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {heroTitle}
          </h1>
          <p className="mt-3 text-white/70 max-w-lg mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Icon category row */}
      <IconCategories
        quickCategories={quickCategories}
        activeFilter={iconFilter}
        onFilter={handleIconFilter}
        mobileCols={mobileCols}
        desktopCols={desktopCols}
      />

      {/* Main content: sidebar + product grid */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar (desktop) */}
          <div className="hidden lg:block w-64 shrink-0">
            <SidebarFilter
              categories={categories}
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
