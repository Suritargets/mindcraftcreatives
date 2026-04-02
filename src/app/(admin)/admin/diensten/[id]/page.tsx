"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/admin/image-upload";
import { TagCloud } from "@/components/admin/tag-cloud";
import { CollapsibleCard } from "@/components/admin/collapsible-card";

const dienstenTagSuggestions = [
  "Populair", "Nieuw", "Premium", "Snelle Levering", "Op Maat", "Eco-vriendelijk",
  "Zakelijk", "Evenement", "Retail", "Horeca", "Overheid",
];

const serviceCategories = [
  { slug: "ontwerp", name: "Ontwerp & Design" },
  { slug: "drukwerk", name: "Drukwerk & Productie" },
  { slug: "branding", name: "Branding & Marketing" },
  { slug: "signage", name: "Signage & Displays" },
  { slug: "digitaal", name: "Digitale Diensten" },
];

const demoServices = [
  { id: "s1", name: "Grafisch Ontwerp", category: "ontwerp", description: "Professioneel grafisch ontwerp voor al uw communicatie-uitingen.", status: "actief" as const, features: ["Logo ontwerp", "Visitekaartjes", "Flyers & Brochures"], shortDesc: "Van concept tot drukklare bestanden." },
  { id: "s2", name: "Logo Design", category: "ontwerp", description: "Unieke logo's die uw merk identiteit versterken.", status: "actief" as const, features: ["Concept ontwikkeling", "Variaties", "Stijlgids"], shortDesc: "Uw merk, uw identiteit." },
  { id: "s3", name: "Offsetdruk", category: "drukwerk", description: "Hoogwaardig offsetdrukwerk voor grote oplages.", status: "actief" as const, features: ["Visitekaartjes", "Brochures", "Posters"], shortDesc: "Scherpe prijzen, hoge kwaliteit." },
  { id: "s4", name: "Groot Formaat Print", category: "drukwerk", description: "Banners, roll-ups en groot formaat printwerk.", status: "actief" as const, features: ["Banners", "Roll-ups", "Posters"], shortDesc: "Denk groot, print groot." },
  { id: "s5", name: "Merk Identiteit", category: "branding", description: "Complete merkidentiteit ontwikkeling voor uw bedrijf.", status: "actief" as const, features: ["Stijlgids", "Merkstrategie", "Huisstijl"], shortDesc: "Bouw een sterk merk." },
  { id: "s6", name: "Verpakkingsontwerp", category: "branding", description: "Aantrekkelijke verpakkingen die opvallen in het schap.", status: "concept" as const, features: ["Product verpakking", "Label design", "Mockups"], shortDesc: "Opvallen in het schap." },
  { id: "s7", name: "Gevel Reclame", category: "signage", description: "Opvallende gevelreclame en lichtreclame.", status: "actief" as const, features: ["Lichtreclame", "Gevelletters", "Raambelettering"], shortDesc: "Zichtbaarheid op straat." },
  { id: "s8", name: "Voertuig Belettering", category: "signage", description: "Professionele voertuigbelettering en wraps.", status: "actief" as const, features: ["Auto wraps", "Belettering", "Ontwerp"], shortDesc: "Uw merk onderweg." },
  { id: "s9", name: "Social Media Design", category: "digitaal", description: "Visuele content voor uw social media kanalen.", status: "actief" as const, features: ["Post templates", "Story designs", "Advertenties"], shortDesc: "Consistente branding online." },
  { id: "s10", name: "Webdesign", category: "digitaal", description: "Moderne en responsieve websites.", status: "concept" as const, features: ["Website ontwerp", "Landing pages", "UI/UX"], shortDesc: "Uw digitale visitekaartje." },
];


export default function DienstEditPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  const original = demoServices.find((s) => s.id === serviceId);

  const [name, setName] = useState(original?.name || "");
  const [description, setDescription] = useState(original?.description || "");
  const [shortDesc, setShortDesc] = useState(original?.shortDesc || "");
  const [category, setCategory] = useState(original?.category || "");
  const [status, setStatus] = useState(original?.status || "actief");
  const [features, setFeatures] = useState<string[]>(original?.features || []);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function addFeature() { setFeatures([...features, ""]); }
  function removeFeature(i: number) { setFeatures(features.filter((_, idx) => idx !== i)); }
  function updateFeature(i: number, v: string) { setFeatures(features.map((f, idx) => (idx === i ? v : f))); }

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  if (!original) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-20">
          <h1 className="text-xl font-bold text-foreground mb-2">Dienst niet gevonden</h1>
          <p className="text-sm text-muted-foreground mb-6">De dienst met ID &quot;{serviceId}&quot; bestaat niet.</p>
          <Button onClick={() => router.push("/admin/diensten")}>Terug naar Diensten</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/diensten")} className="h-9 w-9 rounded-md border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dienst Bewerken</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{original.name} · <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{original.id}</code></p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-brand-green font-medium flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
              Opgeslagen
            </span>
          )}
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/diensten")}>Annuleren</Button>
          <Button size="sm" onClick={handleSave} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Opslaan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Left */}
        <div className="space-y-4">
          <CollapsibleCard title="Algemene Informatie" defaultOpen={true}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Dienstnaam</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Korte Beschrijving</label>
                <Input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="h-10" placeholder="Eén zin samenvatting" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Uitgebreide Beschrijving</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="text-sm" />
              </div>
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Features / Kenmerken" badge={features.length > 0 ? `${features.length}` : undefined} defaultOpen={true}>
            <div className="space-y-3">
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={addFeature} className="gap-1.5 text-xs">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  Feature Toevoegen
                </Button>
              </div>
              {features.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">Geen features.</p>
              ) : (
                <div className="space-y-2">
                  {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <Input value={feat} onChange={(e) => updateFeature(i, e.target.value)} placeholder="bijv. Logo ontwerp" className="h-9 text-sm flex-1" />
                      <button onClick={() => removeFeature(i)} className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Gevarenzone" variant="danger" defaultOpen={false}>
            <p className="text-xs text-muted-foreground mb-4">Het verwijderen van een dienst is permanent.</p>
            <Button variant="destructive" size="sm" className="gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
              Dienst Verwijderen
            </Button>
          </CollapsibleCard>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <CollapsibleCard title="Status" variant="sidebar" defaultOpen={true}>
            <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="w-full h-9 rounded-md border bg-background px-3 text-sm text-foreground">
              <option value="actief">Actief</option>
              <option value="concept">Concept</option>
              <option value="gearchiveerd">Gearchiveerd</option>
            </select>
            <div className="mt-3 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${status === "actief" ? "bg-brand-green" : status === "concept" ? "bg-brand-yellow" : "bg-muted-foreground"}`} />
              <span className="text-xs text-muted-foreground capitalize">{status}</span>
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Categorie" variant="sidebar" defaultOpen={true}>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-9 rounded-md border bg-background px-3 text-sm text-foreground">
              <option value="">Selecteer categorie</option>
              {serviceCategories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </CollapsibleCard>

          <CollapsibleCard title="Tags" variant="sidebar" badge={selectedTags.length > 0 ? `${selectedTags.length}` : undefined} defaultOpen={true}>
            <TagCloud values={selectedTags} onChange={setSelectedTags} suggestions={dienstenTagSuggestions} placeholder="Nieuwe tag toevoegen..." />
          </CollapsibleCard>

          <CollapsibleCard title="Afbeelding" variant="sidebar" defaultOpen={true}>
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} aspect="aspect-video" compact />
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}
