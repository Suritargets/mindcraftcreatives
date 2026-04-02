"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageUpload, SliderUpload } from "@/components/admin/image-upload";
import { TagCloud } from "@/components/admin/tag-cloud";
import { CollapsibleCard } from "@/components/admin/collapsible-card";
import { createPortfolioItem } from "@/lib/actions/portfolio";

const portfolioTagSuggestions = [
  "Logo", "Huisstijl", "Drukwerk", "Merchandise", "Festival", "Wrap", "Verpakking",
  "Social Media", "Campagne", "LED", "Gevel", "Branding", "Print", "Digitaal",
];

type MediaType = "FOTO" | "SLIDER" | "VIDEO";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
}

export default function PortfolioNewClient({
  categories,
}: {
  categories: CategoryData[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [mediaType, setMediaType] = useState<MediaType>("FOTO");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState<"GEPUBLICEERD" | "CONCEPT">("CONCEPT");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  // Image helpers per media type
  const fotoImage = mediaType === "FOTO" ? (images[0] || null) : null;
  const sliderImages = mediaType === "SLIDER" ? images : [];
  const coverImage = mediaType === "VIDEO" ? (images[0] || null) : null;

  function setFotoImage(val: string | null) {
    setImages(val ? [val] : []);
  }

  function setSliderImages(vals: string[]) {
    setImages(vals);
  }

  function setCoverImage(val: string | null) {
    setImages(val ? [val] : []);
  }

  function handleSave() {
    if (!title.trim()) return;
    startTransition(async () => {
      await createPortfolioItem({
        title,
        slug,
        description,
        longDescription,
        client,
        date,
        categoryId,
        mediaType,
        videoUrl: mediaType === "VIDEO" ? videoUrl : undefined,
        images,
        status,
        tags,
        metaTitle,
        metaDescription,
      });
      router.push("/admin/portfolio");
    });
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/portfolio")}
            className="h-9 w-9 rounded-md border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nieuw Portfolio Project</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Voeg een nieuw project toe aan het portfolio.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/portfolio")}>
            Annuleren
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isPending || !title.trim()} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {isPending ? "Opslaan..." : "Opslaan"}
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">

        {/* ===== LEFT COLUMN ===== */}
        <div className="space-y-3">
          <CollapsibleCard title="Algemene Informatie" defaultOpen={true}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Project Titel</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bijv. Rebranding Bedrijf X" className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Korte Beschrijving</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Een korte samenvatting van het project..." className="text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Uitgebreide Beschrijving</label>
                <Textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={4} placeholder="Gedetailleerde beschrijving van het project, werkzaamheden, resultaten..." className="text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Klant / Opdrachtgever</label>
                  <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Bedrijfsnaam" className="h-9" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Datum (YYYY-MM)</label>
                  <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2024-08" className="h-9 font-mono text-sm" />
                </div>
              </div>
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Media" badge={mediaType === "FOTO" ? "Foto" : mediaType === "SLIDER" ? "Slider" : "Video"} defaultOpen={true}>
            <div className="space-y-3">
              {/* Media Type Selector */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Media Type</label>
                <div className="flex gap-2">
                  {(["FOTO", "SLIDER", "VIDEO"] as MediaType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setMediaType(type)}
                      className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium border transition-colors ${
                        mediaType === type
                          ? "bg-primary text-white border-primary"
                          : "bg-background text-muted-foreground border-border hover:bg-muted"
                      }`}
                    >
                      {type === "FOTO" ? "Enkele Foto" : type === "SLIDER" ? "Foto Slider" : "Video"}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {mediaType === "VIDEO" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">YouTube / Video URL</label>
                    <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="h-9 font-mono text-xs" />
                    {videoUrl && (
                      <div className="mt-3 aspect-video bg-muted rounded-lg flex items-center justify-center border">
                        <div className="text-center">
                          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                            <svg className="h-7 w-7 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Video bekijken</a>
                        </div>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Cover Afbeelding</label>
                    <ImageUpload value={coverImage} onChange={setCoverImage} height="h-32" label="Upload cover afbeelding" />
                  </div>
                </div>
              )}

              {mediaType === "FOTO" && (
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Project Foto</label>
                  <ImageUpload value={fotoImage} onChange={setFotoImage} height="h-48" label="Upload project foto" />
                </div>
              )}

              {mediaType === "SLIDER" && (
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Slider Afbeeldingen</label>
                  <SliderUpload values={sliderImages} onChange={setSliderImages} />
                </div>
              )}
            </div>
          </CollapsibleCard>
        </div>

        {/* ===== RIGHT COLUMN (sidebar) ===== */}
        <div className="space-y-3">
          <CollapsibleCard title="Status" variant="sidebar" defaultOpen={true}>
            <div className="flex gap-2">
              {(["GEPUBLICEERD", "CONCEPT"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium border transition-colors ${
                    status === s
                      ? s === "GEPUBLICEERD"
                        ? "bg-brand-green/10 text-brand-green border-brand-green/30"
                        : "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {s === "GEPUBLICEERD" ? "Live" : "Concept"}
                </button>
              ))}
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

          <CollapsibleCard title="Tags" variant="sidebar" badge={tags.length > 0 ? `${tags.length}` : undefined} defaultOpen={true}>
            <TagCloud values={tags} onChange={setTags} suggestions={portfolioTagSuggestions} placeholder="Nieuwe tag toevoegen..." />
          </CollapsibleCard>

          <CollapsibleCard title="SEO & Meta" variant="sidebar" defaultOpen={false}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Slug</label>
                <Input value={slug} readOnly className="h-8 text-xs font-mono" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Meta Titel</label>
                <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={title} className="h-8 text-xs" />
                <div className="mt-1 flex justify-end">
                  <span className={`text-[10px] ${metaTitle.length > 60 ? "text-destructive" : "text-muted-foreground/50"}`}>
                    {metaTitle.length}/60
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Meta Beschrijving</label>
                <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder={description} rows={3} className="text-xs" />
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
                  <p className="text-sm text-primary font-medium truncate">{metaTitle || title || "Pagina titel"}</p>
                  <p className="text-[11px] text-brand-green truncate mt-0.5">mindcraftcreatives.com/portfolio/{slug}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{metaDescription || description || "Beschrijving..."}</p>
                </div>
              </div>
            </div>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}
