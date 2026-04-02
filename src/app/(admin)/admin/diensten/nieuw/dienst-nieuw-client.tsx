"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { TagCloud } from "@/components/admin/tag-cloud";
import { CollapsibleCard } from "@/components/admin/collapsible-card";
import { createService } from "@/lib/actions/services";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
}

const dienstenTagSuggestions = [
  "Populair", "Nieuw", "Premium", "Snelle Levering", "Op Maat", "Eco-vriendelijk",
  "Zakelijk", "Evenement", "Retail", "Horeca", "Overheid",
];

export default function DienstNieuwClient({
  categories,
}: {
  categories: CategoryData[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<"ACTIEF" | "CONCEPT" | "GEARCHIVEERD">("CONCEPT");
  const [features, setFeatures] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function addFeature() { setFeatures([...features, ""]); }
  function removeFeature(i: number) { setFeatures(features.filter((_, idx) => idx !== i)); }
  function updateFeature(i: number, v: string) { setFeatures(features.map((f, idx) => (idx === i ? v : f))); }

  function generateSlug(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function handleNameChange(value: string) {
    setName(value);
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value));
    }
  }

  function handleSave() {
    if (!name || !categoryId) return;
    startTransition(async () => {
      await createService({
        name,
        slug: slug || generateSlug(name),
        description,
        longDescription,
        icon,
        categoryId,
        status,
        features: features.filter(Boolean),
        featuredImage: featuredImage || undefined,
        tags: selectedTags,
      });
      router.push("/admin/diensten");
    });
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/diensten")}
            className="h-9 w-9 rounded-md border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nieuwe Dienst</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Voeg een nieuwe dienst toe.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/diensten")}>
            Annuleren
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isPending || !name || !categoryId} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {isPending ? "Aanmaken..." : "Dienst Aanmaken"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
        {/* Left */}
        <div className="space-y-3">
          <CollapsibleCard title="Algemene Informatie" defaultOpen={true}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Dienstnaam</label>
                <Input value={name} onChange={(e) => handleNameChange(e.target.value)} className="h-9" placeholder="bijv. Grafisch Ontwerp" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Beschrijving</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="text-sm" placeholder="Korte beschrijving van de dienst" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Uitgebreide Beschrijving</label>
                <Textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={5} className="text-sm" placeholder="Beschrijf de dienst in detail..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Icoon</label>
                <Input value={icon} onChange={(e) => setIcon(e.target.value)} className="h-9 max-w-[200px]" placeholder="bijv. palette" />
              </div>
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Features / Kenmerken" badge={features.length > 0 ? `${features.length}` : undefined} defaultOpen={true}>
            <div className="space-y-2">
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); addFeature(); }} className="gap-1.5 text-xs h-7">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Feature Toevoegen
                </Button>
              </div>
              {features.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2 text-center">Geen features. Voeg kenmerken toe die bij deze dienst horen.</p>
              ) : (
                <div className="space-y-2">
                  {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <Input value={feat} onChange={(e) => updateFeature(i, e.target.value)} placeholder="bijv. Logo ontwerp" className="h-9 text-sm flex-1" />
                      <button onClick={() => removeFeature(i)} className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CollapsibleCard>
        </div>

        {/* Right sidebar */}
        <div className="space-y-3">
          <CollapsibleCard title="Status" variant="sidebar" defaultOpen={true}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="w-full h-8 rounded-md border bg-background px-3 text-sm text-foreground"
            >
              <option value="ACTIEF">Actief</option>
              <option value="CONCEPT">Concept</option>
              <option value="GEARCHIVEERD">Gearchiveerd</option>
            </select>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full ${status === "ACTIEF" ? "bg-brand-green" : status === "CONCEPT" ? "bg-brand-yellow" : "bg-muted-foreground"}`} />
              <span className="text-[11px] text-muted-foreground">{status}</span>
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Categorie" variant="sidebar" defaultOpen={true}>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full h-8 rounded-md border bg-background px-3 text-sm text-foreground"
            >
              <option value="">Selecteer categorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {!categoryId && (
              <p className="text-[11px] text-destructive mt-1">Categorie is verplicht</p>
            )}
          </CollapsibleCard>

          <CollapsibleCard title="Tags" variant="sidebar" badge={selectedTags.length > 0 ? `${selectedTags.length}` : undefined} defaultOpen={true}>
            <TagCloud values={selectedTags} onChange={setSelectedTags} suggestions={dienstenTagSuggestions} placeholder="Nieuwe tag toevoegen..." />
          </CollapsibleCard>

          <CollapsibleCard title="Afbeelding" variant="sidebar" defaultOpen={true}>
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} aspect="aspect-video" compact />
          </CollapsibleCard>

          <CollapsibleCard title="SEO & Meta" variant="sidebar" defaultOpen={false}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Slug</label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="h-8 text-xs font-mono" />
              </div>
            </div>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}
