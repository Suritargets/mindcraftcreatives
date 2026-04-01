"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageUpload, SliderUpload } from "@/components/admin/image-upload";
import { TagCloud } from "@/components/admin/tag-cloud";

const portfolioTagSuggestions = [
  "Logo", "Huisstijl", "Drukwerk", "Merchandise", "Festival", "Wrap", "Verpakking",
  "Social Media", "Campagne", "LED", "Gevel", "Branding", "Print", "Digitaal",
];

type MediaType = "foto" | "slider" | "video";

const portfolioCategories = ["branding", "evenement", "signage", "verpakking", "digitaal", "drukwerk"];

// Collapsible section component
function CollapsibleCard({
  title,
  badge,
  defaultOpen = true,
  variant = "default",
  children,
}: {
  title: string;
  badge?: string;
  defaultOpen?: boolean;
  variant?: "default" | "danger" | "sidebar";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className={variant === "danger" ? "border-destructive/30" : ""}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between text-left transition-colors ${
          open
            ? variant === "sidebar" ? "p-4" : "p-5"
            : variant === "sidebar" ? "px-4 py-2.5" : "px-5 py-3"
        } hover:bg-muted/20 rounded-lg`}
      >
        <div className="flex items-center gap-2">
          <h3 className={
            variant === "sidebar"
              ? "text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              : "text-sm font-semibold text-foreground"
          }>
            {title}
          </h3>
          {badge && (
            <Badge variant="secondary" className="text-[10px]">{badge}</Badge>
          )}
        </div>
        <svg
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={variant === "sidebar" ? "px-4 pb-4" : "px-5 pb-5"}>
          {children}
        </div>
      </div>
    </Card>
  );
}

export default function PortfolioNewPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("branding");
  const [mediaType, setMediaType] = useState<MediaType>("foto");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState<"gepubliceerd" | "concept">("concept");
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [fotoImage, setFotoImage] = useState<string | null>(null);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!title.trim()) return;
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/admin/portfolio");
    }, 1000);
  }

  const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/portfolio")} className="text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nieuw Portfolio Project</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Voeg een nieuw project toe aan het portfolio.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-brand-green font-medium">Opgeslagen</span>}
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/portfolio")}>Annuleren</Button>
          <Button size="sm" onClick={handleSave} disabled={!title.trim()} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Opslaan
          </Button>
        </div>
      </div>

      {/* 80/20 Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Left Column - Main Content */}
        <div className="space-y-4">
          {/* General Info */}
          <CollapsibleCard title="Algemene Informatie">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Project Titel</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bijv. Rebranding Bedrijf X" className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Korte Beschrijving</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Een korte samenvatting van het project..." className="text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Uitgebreide Beschrijving</label>
                <Textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={5} placeholder="Gedetailleerde beschrijving van het project, werkzaamheden, resultaten..." className="text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Klant / Opdrachtgever</label>
                  <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Bedrijfsnaam" className="h-10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Datum (YYYY-MM)</label>
                  <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2024-08" className="h-10 font-mono text-sm" />
                </div>
              </div>
            </div>
          </CollapsibleCard>

          {/* Media */}
          <CollapsibleCard title="Media" badge={mediaType === "foto" ? "Foto" : mediaType === "slider" ? "Slider" : "Video"}>
            <div className="space-y-4">
              {/* Media Type Selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Media Type</label>
                <div className="flex gap-2">
                  {(["foto", "slider", "video"] as MediaType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setMediaType(type)}
                      className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium border transition-colors ${
                        mediaType === type
                          ? "bg-primary text-white border-primary"
                          : "bg-background text-muted-foreground border-border hover:bg-muted"
                      }`}
                    >
                      {type === "foto" ? "Enkele Foto" : type === "slider" ? "Foto Slider" : "Video"}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {mediaType === "video" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">YouTube / Video URL</label>
                    <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="h-10 font-mono text-xs" />
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
                    <label className="block text-sm font-medium text-foreground mb-1.5">Cover Afbeelding</label>
                    <ImageUpload value={coverImage} onChange={setCoverImage} height="h-32" label="Upload cover afbeelding" />
                  </div>
                </div>
              )}

              {mediaType === "foto" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Project Foto</label>
                  <ImageUpload value={fotoImage} onChange={setFotoImage} height="h-48" label="Upload project foto" />
                </div>
              )}

              {mediaType === "slider" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Slider Afbeeldingen</label>
                  <SliderUpload values={sliderImages} onChange={setSliderImages} />
                </div>
              )}
            </div>
          </CollapsibleCard>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-3">
          {/* Status */}
          <CollapsibleCard title="Status" variant="sidebar">
            <div className="flex gap-2">
              {(["gepubliceerd", "concept"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium border transition-colors ${
                    status === s
                      ? s === "gepubliceerd"
                        ? "bg-brand-green/10 text-brand-green border-brand-green/30"
                        : "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {s === "gepubliceerd" ? "Live" : "Concept"}
                </button>
              ))}
            </div>
          </CollapsibleCard>

          {/* Category */}
          <CollapsibleCard title="Categorie" variant="sidebar">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-9 rounded-md border bg-background px-3 text-sm text-foreground"
            >
              {portfolioCategories.map((cat) => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </CollapsibleCard>

          {/* Tags */}
          <CollapsibleCard title="Tags" badge={tags.length > 0 ? `${tags.length}` : undefined} variant="sidebar">
            <TagCloud values={tags} onChange={setTags} suggestions={portfolioTagSuggestions} placeholder="Nieuwe tag toevoegen..." />
          </CollapsibleCard>

          {/* Featured Image */}
          <CollapsibleCard title="Featured Image" variant="sidebar">
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} height="h-32" compact label="Upload featured image" />
          </CollapsibleCard>

          {/* SEO & Meta */}
          <CollapsibleCard title="SEO & Meta" variant="sidebar" defaultOpen={false}>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-muted-foreground mb-1">Meta Titel</label>
                <Input value={title} readOnly className="h-8 text-xs" />
              </div>
              <div>
                <label className="block text-[10px] text-muted-foreground mb-1">Meta Beschrijving</label>
                <Textarea value={description} readOnly rows={2} className="text-xs" />
              </div>
              {slug && (
                <div>
                  <label className="block text-[10px] text-muted-foreground mb-1">Slug</label>
                  <Input value={slug} readOnly className="h-8 text-xs font-mono" />
                </div>
              )}
            </div>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}
