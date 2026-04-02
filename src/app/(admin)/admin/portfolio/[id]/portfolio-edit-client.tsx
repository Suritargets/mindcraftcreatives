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
import { updatePortfolioItem, deletePortfolioItem } from "@/lib/actions/portfolio";

const portfolioTagSuggestions = [
  "Logo", "Huisstijl", "Drukwerk", "Merchandise", "Festival", "Wrap", "Verpakking",
  "Social Media", "Campagne", "LED", "Gevel", "Branding", "Print", "Digitaal",
];

type MediaType = "FOTO" | "SLIDER" | "VIDEO";

interface PortfolioItemData {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  client: string;
  date: string;
  categoryId: string;
  mediaType: MediaType;
  videoUrl: string;
  images: string[];
  status: "GEPUBLICEERD" | "CONCEPT";
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

interface CategoryData {
  id: string;
  name: string;
  slug: string;
}

export default function PortfolioEditClient({
  item,
  categories,
}: {
  item: PortfolioItemData;
  categories: CategoryData[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form state
  const [title, setTitle] = useState(item.title);
  const [slug, setSlug] = useState(item.slug);
  const [description, setDescription] = useState(item.description);
  const [longDescription, setLongDescription] = useState(item.longDescription);
  const [client, setClient] = useState(item.client);
  const [date, setDate] = useState(item.date);
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [mediaType, setMediaType] = useState<MediaType>(item.mediaType);
  const [videoUrl, setVideoUrl] = useState(item.videoUrl);
  const [status, setStatus] = useState(item.status);
  const [tags, setTags] = useState<string[]>(item.tags);
  const [images, setImages] = useState<string[]>(item.images);
  const [metaTitle, setMetaTitle] = useState(item.metaTitle);
  const [metaDescription, setMetaDescription] = useState(item.metaDescription);
  const [saved, setSaved] = useState(false);

  // For foto mode, use first image; for slider, use all images
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
    startTransition(async () => {
      await updatePortfolioItem(item.id, {
        title,
        slug,
        description,
        longDescription,
        client,
        date,
        categoryId,
        mediaType,
        videoUrl: mediaType === "VIDEO" ? videoUrl : null,
        images,
        status,
        tags,
        metaTitle,
        metaDescription,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function handleDelete() {
    if (!confirm("Weet je zeker dat je dit project wilt verwijderen?")) return;
    startTransition(async () => {
      await deletePortfolioItem(item.id);
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
            <h1 className="text-2xl font-bold text-foreground">Project Bewerken</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {item.title} · <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{item.slug}</code>
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
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/portfolio")}>
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

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">

        {/* ===== LEFT COLUMN ===== */}
        <div className="space-y-3">
          <CollapsibleCard title="Algemene Informatie" defaultOpen={true}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Project Titel</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Korte Beschrijving</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Uitgebreide Beschrijving</label>
                <Textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={4} className="text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Klant / Opdrachtgever</label>
                  <Input value={client} onChange={(e) => setClient(e.target.value)} className="h-9" />
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

          <CollapsibleCard title="Gevarenzone" variant="danger" defaultOpen={false}>
            <p className="text-xs text-muted-foreground mb-2">Het verwijderen van een project is permanent en kan niet ongedaan worden gemaakt.</p>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending} className="gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Project Verwijderen
            </Button>
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
                  <p className="text-sm text-primary font-medium truncate">{metaTitle || title}</p>
                  <p className="text-[11px] text-brand-green truncate mt-0.5">mindcraftcreatives.com/portfolio/{slug}</p>
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
