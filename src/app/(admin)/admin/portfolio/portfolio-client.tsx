"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImportExportToolbar } from "@/components/admin/import-export";
import { ResponsiveTabs } from "@/components/admin/responsive-tabs";
import { deletePortfolioItem, updatePortfolioItem } from "@/lib/actions/portfolio";

type MediaType = "foto" | "slider" | "video";

type PortfolioItemClient = {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  mediaType: MediaType;
  videoUrl?: string | null;
  images: string[];
  status: "gepubliceerd" | "concept";
};

type CategoryClient = {
  id: string;
  name: string;
  slug: string;
};

type PortfolioClientProps = {
  items: PortfolioItemClient[];
  categories: CategoryClient[];
};

export default function PortfolioClient({ items: initialItems, categories }: PortfolioClientProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [catFilter, setCatFilter] = useState("all");

  const filtered = catFilter === "all" ? items : items.filter((i) => i.category === catFilter);

  async function handleDelete(id: string) {
    setItems(items.filter((i) => i.id !== id));
    try {
      await deletePortfolioItem(id);
      router.refresh();
    } catch {
      setItems(initialItems);
    }
  }

  async function toggleStatus(id: string) {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const newStatus = item.status === "gepubliceerd" ? "concept" as const : "gepubliceerd" as const;
    setItems(items.map((i) => i.id === id ? { ...i, status: newStatus } : i));
    try {
      await updatePortfolioItem(id, {
        status: newStatus === "gepubliceerd" ? "GEPUBLICEERD" : "CONCEPT",
      });
      router.refresh();
    } catch {
      setItems(initialItems);
    }
  }

  // Build unique category slugs that exist in the items
  const usedCategories = categories.filter((cat) =>
    items.some((i) => i.category === cat.slug)
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} projecten · Beheer uw werkvoorbeelden</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <ImportExportToolbar
            exportData={items.map((i) => ({ id: i.id, titel: i.title, beschrijving: i.description, categorie: i.category, mediaType: i.mediaType, status: i.status }))}
            exportFilename="mindcraft-portfolio"
            exportColumns={[
              { key: "id", label: "ID" },
              { key: "titel", label: "Titel" },
              { key: "beschrijving", label: "Beschrijving" },
              { key: "categorie", label: "Categorie" },
              { key: "mediaType", label: "Media Type" },
              { key: "status", label: "Status" },
            ]}
            onImport={(data) => console.log("Import:", data)}
            expectedImportColumns={["Titel", "Categorie"]}
          />
          <Button onClick={() => router.push("/admin/portfolio/nieuw")} className="gap-1.5 w-full sm:w-auto">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nieuw Project
          </Button>
        </div>
      </div>

      {/* Filter */}
      <ResponsiveTabs
        className="mb-4"
        value={catFilter}
        onChange={setCatFilter}
        items={[
          { value: "all", label: "Alles", count: items.length },
          ...usedCategories.map((cat) => ({
            value: cat.slug,
            label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
            count: items.filter((i) => i.category === cat.slug).length,
          })),
        ]}
      />

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden group cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all"
            onClick={() => router.push(`/admin/portfolio/${item.id}`)}
          >
            {/* Media preview */}
            <div className="aspect-video bg-muted relative">
              <div className="h-full w-full flex items-center justify-center">
                {item.mediaType === "video" ? (
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Video</span>
                  </div>
                ) : item.mediaType === "slider" ? (
                  <div className="text-center">
                    <div className="flex gap-1 justify-center mb-2">
                      {item.images.map((_, idx) => (
                        <div key={idx} className="h-1.5 w-6 rounded-full bg-muted-foreground/20" />
                      ))}
                    </div>
                    <svg className="h-10 w-10 text-muted-foreground/30 mx-auto" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                    <span className="text-[10px] text-muted-foreground">{item.images.length} slides</span>
                  </div>
                ) : (
                  <svg className="h-10 w-10 text-muted-foreground/30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                )}
              </div>
              {/* Media type badge */}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-[10px] bg-background/80 backdrop-blur-sm">
                  {item.mediaType === "foto" ? "Foto" : item.mediaType === "slider" ? "Slider" : "Video"}
                </Badge>
              </div>
              {/* Status badge */}
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className={`text-[10px] ${
                    item.status === "gepubliceerd"
                      ? "bg-brand-green/80 text-white backdrop-blur-sm"
                      : "bg-brand-yellow/80 text-white backdrop-blur-sm"
                  }`}
                >
                  {item.status === "gepubliceerd" ? "Live" : "Concept"}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] capitalize">{item.category}</Badge>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleStatus(item.id); }}
                    className="text-[10px] text-muted-foreground hover:text-foreground px-2 py-1 rounded transition-colors"
                  >
                    {item.status === "gepubliceerd" ? "Verberg" : "Publiceer"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push(`/admin/portfolio/${item.id}`); }}
                    className="text-[10px] text-muted-foreground hover:text-foreground px-2 py-1 rounded transition-colors"
                  >
                    Bewerk
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                    className="text-[10px] text-muted-foreground hover:text-destructive px-2 py-1 rounded transition-colors"
                  >
                    Verwijder
                  </button>
                </div>
              </div>
              {item.mediaType === "video" && item.videoUrl && (
                <div className="mt-2 pt-2 border-t">
                  <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Video bekijken
                  </a>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground">Geen portfolio items gevonden.</p>
        </div>
      )}
    </div>
  );
}
