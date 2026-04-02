"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImportExportToolbar } from "@/components/admin/import-export";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Service = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  description: string;
  icon: string;
  status: "actief" | "concept" | "gearchiveerd";
  features: string[];
};

type Category = {
  slug: string;
  name: string;
};

const exampleDiensten: Record<string, string>[] = [
  { Naam: "Grafisch Ontwerp", Categorie: "Ontwerp & Design", Beschrijving: "Professioneel grafisch ontwerp voor communicatie-uitingen", Status: "actief" },
  { Naam: "Logo Design", Categorie: "Ontwerp & Design", Beschrijving: "Unieke logo's die uw merk identiteit versterken", Status: "actief" },
  { Naam: "Offsetdruk", Categorie: "Drukwerk & Productie", Beschrijving: "Hoogwaardig offsetdrukwerk voor grote oplages", Status: "actief" },
  { Naam: "Groot Formaat Print", Categorie: "Drukwerk & Productie", Beschrijving: "Banners, roll-ups en groot formaat printwerk", Status: "actief" },
  { Naam: "Merk Identiteit", Categorie: "Branding & Marketing", Beschrijving: "Complete merkidentiteit ontwikkeling", Status: "actief" },
  { Naam: "Verpakkingsontwerp", Categorie: "Branding & Marketing", Beschrijving: "Aantrekkelijke verpakkingen die opvallen", Status: "concept" },
  { Naam: "Gevel Reclame", Categorie: "Signage & Displays", Beschrijving: "Opvallende gevelreclame en lichtreclame", Status: "actief" },
  { Naam: "Voertuig Belettering", Categorie: "Signage & Displays", Beschrijving: "Professionele voertuigbelettering en wraps", Status: "actief" },
];

export function DienstenClient({ services, categories }: { services: Service[]; categories: Category[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchSearch =
        search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === "all" || s.category === catFilter;
      return matchSearch && matchCat;
    });
  }, [search, catFilter, services]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Diensten</h1>
          <p className="text-sm text-muted-foreground mt-1">{services.length} diensten in het overzicht</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <ImportExportToolbar
            exportData={services.map((s) => ({ id: s.id, naam: s.name, categorie: s.categoryName, beschrijving: s.description, status: s.status, features: s.features }))}
            exportFilename="mindcraft-diensten"
            exportColumns={[
              { key: "id", label: "ID" },
              { key: "naam", label: "Naam" },
              { key: "categorie", label: "Categorie" },
              { key: "beschrijving", label: "Beschrijving" },
              { key: "status", label: "Status" },
              { key: "features", label: "Features" },
            ]}
            onImport={(data) => console.log("Import:", data)}
            expectedImportColumns={["Naam", "Categorie"]}
            exampleData={exampleDiensten}
            exampleFilename="mindcraft-diensten-voorbeeld"
          />
          <Link href="/admin/diensten/nieuw" className="w-full sm:w-auto">
            <Button className="gap-1.5 w-full sm:w-auto">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nieuwe Dienst
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
            placeholder="Zoek diensten..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
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
        <div className="overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 sm:px-5 py-3">Dienst</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell w-[160px]">Categorie</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden sm:table-cell w-[100px]">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden lg:table-cell w-[110px]">Features</th>
                <th className="w-10 px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((service, i) => (
                <tr
                  key={service.id}
                  onClick={() => router.push(`/admin/diensten/${service.id}`)}
                  className={`border-b last:border-0 cursor-pointer transition-colors ${i % 2 === 0 ? "hover:bg-muted/20" : "bg-muted/10 hover:bg-muted/20"}`}
                >
                  <td className="px-4 sm:px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{service.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{service.description}</p>
                        <div className="flex items-center gap-2 mt-1 sm:hidden">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] border-0 ${
                              service.status === "actief"
                                ? "bg-brand-green/10 text-brand-green"
                                : service.status === "concept"
                                ? "bg-brand-yellow/10 text-brand-yellow"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="text-sm text-foreground">{service.categoryName}</span>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] border-0 ${
                        service.status === "actief"
                          ? "bg-brand-green/10 text-brand-green"
                          : service.status === "concept"
                          ? "bg-brand-yellow/10 text-brand-yellow"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <Badge variant="outline" className="text-[10px]">
                      {service.features.length} features
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground text-sm">Geen diensten gevonden.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
