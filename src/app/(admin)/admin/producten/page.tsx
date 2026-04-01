"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products, categories } from "@/lib/catalog-data";
import { ImportExportToolbar } from "@/components/admin/import-export";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 15;

export default function ProductenPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === "all" || p.category === catFilter;
      return matchSearch && matchCat;
    });
  }, [search, catFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Producten</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} producten in de catalogus</p>
        </div>
        <div className="flex items-center gap-2">
          <ImportExportToolbar
            exportData={products.map((p) => ({ id: p.id, naam: p.name, categorie: p.category, subcategorie: p.subcategory, beschrijving: p.description, minBestelling: p.minOrder }))}
            exportFilename="mindcraft-producten"
            exportColumns={[
              { key: "id", label: "ID" },
              { key: "naam", label: "Naam" },
              { key: "categorie", label: "Categorie" },
              { key: "subcategorie", label: "Subcategorie" },
              { key: "beschrijving", label: "Beschrijving" },
              { key: "minBestelling", label: "Min. Bestelling" },
            ]}
            onImport={(data) => console.log("Import:", data)}
            expectedImportColumns={["Naam", "Categorie"]}
          />
          <Link href="/admin/producten/nieuw">
            <Button className="gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nieuw Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Input
            placeholder="Zoek producten..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 h-9"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
          className="h-9 rounded-md border bg-background px-3 text-sm text-foreground"
        >
          <option value="all">Alle Categorieën</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Product</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Categorie</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Subcategorie</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Min. Bestelling</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Specs</th>
                <th className="w-10 px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((product, i) => {
                const cat = categories.find((c) => c.slug === product.category);
                const sub = cat?.subcategories.find((s) => s.slug === product.subcategory);
                const hasSpecs = product.specs && product.specs.length > 0;
                return (
                  <tr
                    key={product.id}
                    onClick={() => router.push(`/admin/producten/${product.id}`)}
                    className={`border-b last:border-0 cursor-pointer transition-colors ${i % 2 === 0 ? "hover:bg-muted/20" : "bg-muted/10 hover:bg-muted/20"}`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-xs">M</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[300px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-sm text-foreground">{cat?.name || "—"}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-sm text-muted-foreground">{sub?.name || product.subcategory}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-sm text-foreground">{product.minOrder}</span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant="secondary" className="text-[10px] bg-brand-green/10 text-brand-green border-0">Actief</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={hasSpecs ? "default" : "outline"} className={`text-[10px] ${hasSpecs ? "bg-primary" : ""}`}>
                        {hasSpecs ? `${product.specs!.length} specs` : "Geen"}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground text-sm">Geen producten gevonden.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Separator />
        <div className="px-5 py-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {filtered.length === 0 ? "0" : `${(page - 1) * PAGE_SIZE + 1}-${Math.min(page * PAGE_SIZE, filtered.length)}`} van {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground mr-2">Pagina {page} van {totalPages || 1}</span>
            <button onClick={() => setPage(1)} disabled={page === 1} className="h-8 w-8 rounded-md border flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed text-xs">«</button>
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="h-8 w-8 rounded-md border flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed text-xs">‹</button>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages || totalPages === 0} className="h-8 w-8 rounded-md border flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed text-xs">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages || totalPages === 0} className="h-8 w-8 rounded-md border flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed text-xs">»</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
