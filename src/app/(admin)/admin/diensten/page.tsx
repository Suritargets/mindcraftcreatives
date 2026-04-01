"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImportExportToolbar } from "@/components/admin/import-export";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Demo services data
export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  status: "actief" | "concept" | "gearchiveerd";
  features: string[];
};

const serviceCategories = [
  { slug: "ontwerp", name: "Ontwerp & Design" },
  { slug: "drukwerk", name: "Drukwerk & Productie" },
  { slug: "branding", name: "Branding & Marketing" },
  { slug: "signage", name: "Signage & Displays" },
  { slug: "digitaal", name: "Digitale Diensten" },
];

const demoServices: Service[] = [
  { id: "s1", name: "Grafisch Ontwerp", category: "ontwerp", description: "Professioneel grafisch ontwerp voor al uw communicatie-uitingen.", icon: "pen", status: "actief", features: ["Logo ontwerp", "Visitekaartjes", "Flyers & Brochures"] },
  { id: "s2", name: "Logo Design", category: "ontwerp", description: "Unieke logo's die uw merk identiteit versterken.", icon: "star", status: "actief", features: ["Concept ontwikkeling", "Variaties", "Stijlgids"] },
  { id: "s3", name: "Offsetdruk", category: "drukwerk", description: "Hoogwaardig offsetdrukwerk voor grote oplages.", icon: "printer", status: "actief", features: ["Visitekaartjes", "Brochures", "Posters"] },
  { id: "s4", name: "Groot Formaat Print", category: "drukwerk", description: "Banners, roll-ups en groot formaat printwerk.", icon: "image", status: "actief", features: ["Banners", "Roll-ups", "Posters"] },
  { id: "s5", name: "Merk Identiteit", category: "branding", description: "Complete merkidentiteit ontwikkeling voor uw bedrijf.", icon: "badge", status: "actief", features: ["Stijlgids", "Merkstrategie", "Huisstijl"] },
  { id: "s6", name: "Verpakkingsontwerp", category: "branding", description: "Aantrekkelijke verpakkingen die opvallen in het schap.", icon: "box", status: "concept", features: ["Product verpakking", "Label design", "Mockups"] },
  { id: "s7", name: "Gevel Reclame", category: "signage", description: "Opvallende gevelreclame en lichtreclame.", icon: "building", status: "actief", features: ["Lichtreclame", "Gevelletters", "Raambelettering"] },
  { id: "s8", name: "Voertuig Belettering", category: "signage", description: "Professionele voertuigbelettering en wraps.", icon: "truck", status: "actief", features: ["Auto wraps", "Belettering", "Ontwerp"] },
  { id: "s9", name: "Social Media Design", category: "digitaal", description: "Visuele content voor uw social media kanalen.", icon: "phone", status: "actief", features: ["Post templates", "Story designs", "Advertenties"] },
  { id: "s10", name: "Webdesign", category: "digitaal", description: "Moderne en responsieve websites.", icon: "globe", status: "concept", features: ["Website ontwerp", "Landing pages", "UI/UX"] },
];

export default function DienstenPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [services] = useState(demoServices);

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Diensten</h1>
          <p className="text-sm text-muted-foreground mt-1">{services.length} diensten in het overzicht</p>
        </div>
        <div className="flex items-center gap-2">
          <ImportExportToolbar
            exportData={services.map((s) => ({ id: s.id, naam: s.name, categorie: s.category, beschrijving: s.description, status: s.status, features: s.features }))}
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
          />
          <Link href="/admin/diensten/nieuw">
            <Button className="gap-1.5">
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
          {serviceCategories.map((cat) => (
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
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Dienst</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Categorie</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Features</th>
                <th className="w-10 px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((service, i) => {
                const cat = serviceCategories.find((c) => c.slug === service.category);
                return (
                  <tr
                    key={service.id}
                    onClick={() => router.push(`/admin/diensten/${service.id}`)}
                    className={`border-b last:border-0 cursor-pointer transition-colors ${i % 2 === 0 ? "hover:bg-muted/20" : "bg-muted/10 hover:bg-muted/20"}`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{service.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[300px]">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-sm text-foreground">{cat?.name || "—"}</span>
                    </td>
                    <td className="px-5 py-3">
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
                    <td className="px-5 py-3">
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
                );
              })}
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
