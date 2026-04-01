"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainPageOptions = [
  { value: "home", label: "Home", description: "Standaard homepage met hero, diensten, portfolio en contact secties" },
  { value: "catalogus", label: "Catalogus", description: "Productcatalogus met categorieën en filters" },
];

export default function InstellingenPage() {
  const [saved, setSaved] = useState(false);
  const [mainPage, setMainPage] = useState("catalogus");

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 lg:p-8 max-w-[800px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Instellingen</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Algemene website instellingen en configuratie.
        </p>
      </div>

      <div className="space-y-6">
        {/* Hoofdpagina */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground">Hoofdpagina</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Kies welke pagina bezoekers als eerste zien wanneer ze de website bezoeken.
            </p>
          </div>
          <Separator />
          <div className="p-5 space-y-3">
            {mainPageOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  mainPage === option.value
                    ? "border-brand-green bg-brand-green/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <input
                  type="radio"
                  name="mainPage"
                  value={option.value}
                  checked={mainPage === option.value}
                  onChange={(e) => setMainPage(e.target.value)}
                  className="mt-0.5 accent-brand-green"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">{option.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Bedrijfsgegevens */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground">Bedrijfsgegevens</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Basisinformatie van uw bedrijf.</p>
          </div>
          <Separator />
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Bedrijfsnaam</label>
                <Input defaultValue="Mindcraft Creatives" className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Handelsnaam</label>
                <Input defaultValue="Mindcraft Creatives" className="h-10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Adres</label>
              <Input defaultValue="Paramaribo, Suriname" className="h-10" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <Input defaultValue="info@mindcraftcreatives.com" className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Telefoon</label>
                <Input defaultValue="+597 8000000" className="h-10" />
              </div>
            </div>
          </div>
        </Card>

        {/* Social Media */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground">Social Media</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Links naar social media kanalen.</p>
          </div>
          <Separator />
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Facebook URL</label>
              <Input defaultValue="https://www.facebook.com/mindcraftcreatives" className="h-10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Instagram URL</label>
              <Input placeholder="https://www.instagram.com/..." className="h-10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">WhatsApp Nummer</label>
              <Input defaultValue="5978581854" className="h-10" />
            </div>
          </div>
        </Card>

        {/* Offerte instellingen */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground">Offerte Instellingen</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Configuratie voor offerte aanvragen.</p>
          </div>
          <Separator />
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Offerte email ontvanger</label>
              <Input defaultValue="info@mindcraftcreatives.com" className="h-10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Standaard levertijd tekst</label>
              <Input defaultValue="7-14 werkdagen" className="h-10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Betalingsvoorwaarden tekst</label>
              <Input defaultValue="50% aanbetaling, 50% bij levering" className="h-10" />
            </div>
          </div>
        </Card>

        {/* Save */}
        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-sm text-brand-green font-medium flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Instellingen opgeslagen
            </span>
          )}
          <Button onClick={handleSave} className="gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Opslaan
          </Button>
        </div>
      </div>
    </div>
  );
}
