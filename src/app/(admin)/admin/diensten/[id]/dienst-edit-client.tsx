"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/admin/image-upload";
import { TagCloud } from "@/components/admin/tag-cloud";
import { CollapsibleCard } from "@/components/admin/collapsible-card";
import { updateService, deleteService } from "@/lib/actions/services";

interface ServiceData {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  categoryId: string;
  status: string;
  features: string[];
  featuredImage: string;
  gallery: string[];
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

interface CategoryData {
  id: string;
  name: string;
  slug: string;
}

const dienstenTagSuggestions = [
  "Populair", "Nieuw", "Premium", "Snelle Levering", "Op Maat", "Eco-vriendelijk",
  "Zakelijk", "Evenement", "Retail", "Horeca", "Overheid",
];

export default function DienstEditClient({
  service,
  categories,
}: {
  service: ServiceData;
  categories: CategoryData[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(service.name);
  const [slug, setSlug] = useState(service.slug);
  const [description, setDescription] = useState(service.description);
  const [longDescription, setLongDescription] = useState(service.longDescription);
  const [icon, setIcon] = useState(service.icon);
  const [categoryId, setCategoryId] = useState(service.categoryId);
  const [status, setStatus] = useState(service.status);
  const [features, setFeatures] = useState<string[]>(service.features);
  const [featuredImage, setFeaturedImage] = useState<string | null>(service.featuredImage || null);
  const [selectedTags, setSelectedTags] = useState<string[]>(service.tags);
  const [metaTitle, setMetaTitle] = useState(service.metaTitle);
  const [metaDescription, setMetaDescription] = useState(service.metaDescription);
  const [saved, setSaved] = useState(false);

  function addFeature() { setFeatures([...features, ""]); }
  function removeFeature(i: number) { setFeatures(features.filter((_, idx) => idx !== i)); }
  function updateFeature(i: number, v: string) { setFeatures(features.map((f, idx) => (idx === i ? v : f))); }

  function handleSave() {
    startTransition(async () => {
      await updateService(service.id, {
        name,
        slug,
        description,
        longDescription,
        icon,
        categoryId,
        status: status as "ACTIEF" | "CONCEPT" | "GEARCHIVEERD",
        features: features.filter(Boolean),
        featuredImage: featuredImage || null,
        tags: selectedTags,
        metaTitle,
        metaDescription,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function handleDelete() {
    if (!confirm("Weet je zeker dat je deze dienst wilt verwijderen?")) return;
    startTransition(async () => {
      await deleteService(service.id);
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
            <h1 className="text-2xl font-bold text-foreground">Dienst Bewerken</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {service.name} · <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{service.slug}</code>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-brand-green font-medium flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Opgeslagen
            </span>
          )}
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/diensten")}>
            Annuleren
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isPending} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {isPending ? "Opslaan..." : "Opslaan"}
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
                <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Beschrijving</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Uitgebreide Beschrijving</label>
                <Textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={5} className="text-sm" />
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
                <p className="text-sm text-muted-foreground py-2 text-center">Geen features.</p>
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

          <CollapsibleCard title="Gevarenzone" variant="danger" defaultOpen={false}>
            <p className="text-xs text-muted-foreground mb-2">Het verwijderen van een dienst is permanent en kan niet ongedaan worden gemaakt.</p>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending} className="gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Dienst Verwijderen
            </Button>
          </CollapsibleCard>
        </div>

        {/* Right sidebar */}
        <div className="space-y-3">
          <CollapsibleCard title="Status" variant="sidebar" defaultOpen={true}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Meta Titel</label>
                <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="h-8 text-xs" />
                <div className="mt-1 flex justify-end">
                  <span className={`text-[10px] ${metaTitle.length > 60 ? "text-destructive" : "text-muted-foreground/50"}`}>
                    {metaTitle.length}/60
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Meta Beschrijving</label>
                <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} className="text-xs" />
                <div className="mt-1 flex justify-end">
                  <span className={`text-[10px] ${metaDescription.length > 160 ? "text-destructive" : "text-muted-foreground/50"}`}>
                    {metaDescription.length}/160
                  </span>
                </div>
              </div>
              <Separator className="my-1" />
              <div>
                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Google Preview</span>
                <div className="mt-2 p-3 rounded-md bg-muted/30 border">
                  <p className="text-sm text-primary font-medium truncate">{metaTitle || name}</p>
                  <p className="text-[11px] text-brand-green truncate mt-0.5">mindcraftcreatives.com/diensten/{slug}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{metaDescription || description}</p>
                </div>
              </div>
            </div>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}
