"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type CommercialArea = {
  id: string;
  name: string;
  location: string;
  type: "banner" | "popup" | "inline" | "sidebar";
  content: string;
  linkUrl: string;
  enabled: boolean;
};

const defaultAreas: CommercialArea[] = [
  { id: "ca1", name: "Homepage Hero Banner", location: "Homepage - Boven", type: "banner", content: "Speciale aanbieding: 20% korting op alle T-shirts!", linkUrl: "/catalogus/kleding-hoofddeksels", enabled: true },
  { id: "ca2", name: "Catalogus Sidebar Promo", location: "Catalogus - Zijbalk", type: "sidebar", content: "Bulk bestelling? Vraag een offerte aan voor extra korting.", linkUrl: "/offerte", enabled: true },
  { id: "ca3", name: "Seizoen Popup", location: "Alle pagina's", type: "popup", content: "Kerst collectie nu beschikbaar! Bestel voor 1 december voor levering.", linkUrl: "/catalogus", enabled: false },
  { id: "ca4", name: "Product Pagina Upsell", location: "Product Detail - Onder", type: "inline", content: "Combineer met onze andere producten en bespaar!", linkUrl: "/catalogus", enabled: true },
];

export default function CommercialPage() {
  const [areas, setAreas] = useState(defaultAreas);
  const [editingId, setEditingId] = useState<string | null>(null);

  function toggleArea(id: string) {
    setAreas(areas.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a));
  }

  const typeColors: Record<string, string> = {
    banner: "bg-primary/10 text-primary",
    popup: "bg-brand-yellow/10 text-brand-yellow",
    inline: "bg-brand-green/10 text-brand-green",
    sidebar: "bg-brand-teal/10 text-brand-teal",
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Commercial Areas</h1>
          <p className="text-sm text-muted-foreground mt-1">Beheer promoties, banners en commerciële zones op de website.</p>
        </div>
        <Button className="gap-1.5">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Nieuwe Zone
        </Button>
      </div>

      <div className="space-y-4">
        {areas.map((area) => (
          <Card key={area.id} className={`transition-opacity ${!area.enabled ? "opacity-60" : ""}`}>
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${typeColors[area.type] || "bg-muted"}`}>
                  {area.type === "banner" ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                  ) : area.type === "popup" ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" /></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{area.name}</h3>
                    <Badge variant="outline" className="text-[10px] capitalize">{area.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{area.location}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1 truncate max-w-lg">{area.content}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className={`text-[10px] ${area.enabled ? "bg-brand-green/10 text-brand-green" : "bg-muted text-muted-foreground"}`}>
                  {area.enabled ? "Actief" : "Uit"}
                </Badge>
                <button
                  onClick={() => toggleArea(area.id)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${area.enabled ? "bg-brand-green" : "bg-muted-foreground/30"}`}
                >
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${area.enabled ? "left-[22px]" : "left-0.5"}`} />
                </button>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Bewerk</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
