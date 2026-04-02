"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageUpload, SliderUpload } from "@/components/admin/image-upload";
import { TagCloud } from "@/components/admin/tag-cloud";
import { CollapsibleCard } from "@/components/admin/collapsible-card";

const portfolioTagSuggestions = [
  "Logo", "Huisstijl", "Drukwerk", "Merchandise", "Festival", "Wrap", "Verpakking",
  "Social Media", "Campagne", "LED", "Gevel", "Branding", "Print", "Digitaal",
];

type MediaType = "foto" | "slider" | "video";

const portfolioCategories = ["branding", "evenement", "signage", "verpakking", "digitaal", "drukwerk"];

const demoPortfolio: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  mediaType: MediaType;
  videoUrl?: string;
  images: string[];
  status: "gepubliceerd" | "concept";
  client: string;
  date: string;
  tags: string[];
}> = {
  pf1: { title: "Rebranding Fernandes Groep", description: "Complete merkidentiteit vernieuwing inclusief logo, huisstijl en drukwerk.", longDescription: "Fernandes Groep wilde een moderne uitstraling die hun groei en innovatie weerspiegelt. We hebben een volledig nieuw logo, kleurenpalet, en huisstijl ontwikkeld. Het project omvatte ook visitekaartjes, briefpapier, enveloppen en een brand guideline document.", category: "branding", mediaType: "slider", images: ["/placeholder-1.jpg", "/placeholder-2.jpg", "/placeholder-3.jpg"], status: "gepubliceerd", client: "Fernandes Groep N.V.", date: "2024-08", tags: ["Logo", "Huisstijl", "Drukwerk"] },
  pf2: { title: "Event Merchandise SuriPop", description: "T-shirts, banners en promotional items voor SuriPop festival.", longDescription: "Voor het jaarlijkse SuriPop muziekfestival hebben we een complete merchandise lijn ontworpen en geproduceerd. Dit omvatte event T-shirts in 5 kleuren, grote banners voor het podium, VIP badges, en promotional flyers.", category: "evenement", mediaType: "foto", images: ["/placeholder-1.jpg"], status: "gepubliceerd", client: "SuriPop Foundation", date: "2024-06", tags: ["Festival", "Merchandise", "T-shirts"] },
  pf3: { title: "Voertuig Wrap - Taxi Fleet", description: "Volledige voertuigbelettering voor 15 taxi's in Paramaribo.", longDescription: "Een grootschalig project voor een taxibedrijf in Paramaribo. Alle 15 voertuigen zijn voorzien van full-wrap belettering met het nieuwe bedrijfslogo en contactgegevens. Het ontwerp is opvallend en professioneel.", category: "signage", mediaType: "video", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", images: ["/placeholder-1.jpg"], status: "gepubliceerd", client: "Paramaribo Taxi Service", date: "2024-04", tags: ["Voertuig", "Wrap", "Fleet"] },
  pf4: { title: "Packaging Design - SuriSpice", description: "Verpakkingsontwerp voor nieuwe kruidenlijn.", longDescription: "SuriSpice lanceerde een nieuwe lijn van Surinaamse kruiden voor de internationale markt. We ontwierpen de volledige verpakkingslijn met authentieke Surinaamse elementen en moderne typografie.", category: "verpakking", mediaType: "slider", images: ["/placeholder-1.jpg", "/placeholder-2.jpg"], status: "concept", client: "SuriSpice B.V.", date: "2024-03", tags: ["Verpakking", "Food", "Export"] },
  pf5: { title: "Gevelreclame Restaurant Javaans", description: "LED gevelreclame en raambelettering.", longDescription: "Voor Restaurant Javaans hebben we een opvallende LED gevelreclame ontworpen en geïnstalleerd, aangevuld met stijlvolle raambelettering die het Javaanse thema weerspiegelt.", category: "signage", mediaType: "foto", images: ["/placeholder-1.jpg"], status: "gepubliceerd", client: "Restaurant Javaans", date: "2024-01", tags: ["LED", "Gevel", "Restaurant"] },
  pf6: { title: "Social Media Campagne TeleSur", description: "Maandelijkse social media content creatie.", longDescription: "Een doorlopend project voor TeleSur waarbij we maandelijks social media content creëren voor Facebook, Instagram en TikTok. De campagne focust op het bereiken van een jonger publiek.", category: "digitaal", mediaType: "video", videoUrl: "https://www.youtube.com/watch?v=example", images: ["/placeholder-1.jpg"], status: "gepubliceerd", client: "TeleSur N.V.", date: "2024-09", tags: ["Social Media", "Campagne", "Content"] },
};


export default function PortfolioEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const item = demoPortfolio[id];

  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [longDescription, setLongDescription] = useState(item?.longDescription || "");
  const [category, setCategory] = useState(item?.category || "branding");
  const [mediaType, setMediaType] = useState<MediaType>(item?.mediaType || "foto");
  const [videoUrl, setVideoUrl] = useState(item?.videoUrl || "");
  const [status, setStatus] = useState(item?.status || "concept");
  const [client, setClient] = useState(item?.client || "");
  const [date, setDate] = useState(item?.date || "");
  const [tags, setTags] = useState<string[]>(item?.tags || []);
  const [fotoImage, setFotoImage] = useState<string | null>(null);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!item) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground mb-4">Portfolio project niet gevonden.</p>
          <Button variant="outline" onClick={() => router.push("/admin/portfolio")}>Terug naar Portfolio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/portfolio")} className="text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{item.title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Portfolio project bewerken</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-brand-green font-medium">Opgeslagen</span>}
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/portfolio")}>Annuleren</Button>
          <Button size="sm" onClick={handleSave} className="gap-1.5">
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
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Korte Beschrijving</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Uitgebreide Beschrijving</label>
                <Textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={5} className="text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Klant / Opdrachtgever</label>
                  <Input value={client} onChange={(e) => setClient(e.target.value)} className="h-10" />
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

              {/* Conditional media fields */}
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

          {/* Danger Zone */}
          <CollapsibleCard title="Gevarenzone" variant="danger" defaultOpen={false}>
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Let op: deze acties zijn onomkeerbaar.</p>
              <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <div>
                  <p className="text-sm font-medium text-foreground">Project Verwijderen</p>
                  <p className="text-xs text-muted-foreground">Dit project wordt permanent verwijderd.</p>
                </div>
                <Button variant="destructive" size="sm">Verwijderen</Button>
              </div>
            </div>
          </CollapsibleCard>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-3">
          {/* Status */}
          <CollapsibleCard title="Status" variant="sidebar">
            <div className="space-y-3">
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
                <Input defaultValue={title} className="h-8 text-xs" />
              </div>
              <div>
                <label className="block text-[10px] text-muted-foreground mb-1">Meta Beschrijving</label>
                <Textarea defaultValue={description} rows={2} className="text-xs" />
              </div>
              <div>
                <label className="block text-[10px] text-muted-foreground mb-1">Slug</label>
                <Input defaultValue={title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")} className="h-8 text-xs font-mono" />
              </div>
            </div>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}
