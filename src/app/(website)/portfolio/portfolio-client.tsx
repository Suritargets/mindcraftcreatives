"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export interface PortfolioItemData {
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  tags: string[];
  client: string | null;
  date: string | null;
}

interface PortfolioCategoryData {
  slug: string;
  name: string;
}

interface PortfolioClientProps {
  items: PortfolioItemData[];
  categories: PortfolioCategoryData[];
}

export default function PortfolioClient({ items, categories }: PortfolioClientProps) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? items : items.filter((i) => i.categorySlug === filter);

  const allCategories = [{ slug: "all", name: "Alles" }, ...categories];

  return (
    <>
      {/* Hero */}
      <section className="bg-foreground text-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge className="bg-primary/20 text-primary border-0 mb-4">Ons Werk</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-background/60 max-w-xl mx-auto text-sm md:text-base">
            Ontdek onze recente projecten en zie hoe wij merken tot leven brengen met creatief ontwerp, drukwerk en signage.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setFilter(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat.slug
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="group">
                <div className="rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-all">
                  {/* Placeholder image */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-brand-teal/10 flex items-center justify-center">
                      <svg className="h-12 w-12 text-muted-foreground/20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                      </svg>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-background/90 text-foreground text-[10px] backdrop-blur-sm border-0 capitalize">
                        {item.categoryName}
                      </Badge>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium flex items-center gap-2">
                        Bekijk Project
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.client && `${item.client} · `}{item.date}
                    </p>
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Geen projecten gevonden in deze categorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Heeft u een project in gedachten?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
            Neem contact met ons op en ontdek wat Mindcraft Creatives voor u kan betekenen.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Offerte Aanvragen
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
