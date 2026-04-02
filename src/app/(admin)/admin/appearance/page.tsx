"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/admin/image-upload";

export default function AppearancePage() {
  const [primaryColor, setPrimaryColor] = useState("#8B1A1A");
  const [accentColor, setAccentColor] = useState("#2D6A4F");
  const [fontBody, setFontBody] = useState("Inter");
  const [fontHeading, setFontHeading] = useState("Inter");
  const [logoText, setLogoText] = useState("Mindcraft Creatives");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [faviconImage, setFaviconImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appearance</h1>
          <p className="text-sm text-muted-foreground mt-1">Pas het uiterlijk van de website aan.</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-brand-green font-medium">Opgeslagen</span>}
          <Button size="sm" onClick={handleSave} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Opslaan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colors */}
        <Card>
          <div className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Kleuren</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Primaire kleur</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 w-10 rounded-md border cursor-pointer" />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 font-mono text-sm flex-1" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Accent kleur</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-10 w-10 rounded-md border cursor-pointer" />
                  <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-10 font-mono text-sm flex-1" />
                </div>
              </div>
              <Separator />
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Preview</label>
                <div className="flex gap-3 flex-wrap">
                  <div className="h-16 w-16 rounded-lg" style={{ backgroundColor: primaryColor }} />
                  <div className="h-16 w-16 rounded-lg" style={{ backgroundColor: accentColor }} />
                  <div className="h-16 w-16 rounded-lg bg-foreground" />
                  <div className="h-16 w-16 rounded-lg bg-muted border" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card>
          <div className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Typografie</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Heading Font</label>
                <select value={fontHeading} onChange={(e) => setFontHeading(e.target.value)} className="w-full h-10 rounded-md border bg-background px-3 text-sm text-foreground">
                  <option>Inter</option><option>Poppins</option><option>Montserrat</option><option>Playfair Display</option><option>Raleway</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Body Font</label>
                <select value={fontBody} onChange={(e) => setFontBody(e.target.value)} className="w-full h-10 rounded-md border bg-background px-3 text-sm text-foreground">
                  <option>Inter</option><option>Open Sans</option><option>Lato</option><option>Roboto</option><option>Nunito</option>
                </select>
              </div>
              <Separator />
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Preview</label>
                <div className="p-4 rounded-lg border bg-muted/20">
                  <p className="text-lg font-bold mb-1" style={{ fontFamily: fontHeading }}>Heading voorbeeld</p>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: fontBody }}>Dit is een voorbeeld van body tekst met het geselecteerde lettertype.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Logo */}
        <Card>
          <div className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Logo & Branding</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Logo Tekst</label>
                <Input value={logoText} onChange={(e) => setLogoText(e.target.value)} className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Logo Afbeelding</label>
                <ImageUpload value={logoImage} onChange={setLogoImage} height="h-24" label="Upload logo" hint="PNG of SVG, transparante achtergrond aanbevolen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Favicon</label>
                <div className="w-16">
                  <ImageUpload value={faviconImage} onChange={setFaviconImage} aspect="aspect-square" compact label="Upload" hint="" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Layout */}
        <Card>
          <div className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Layout</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Header Stijl</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Vast", "Sticky"].map((style) => (
                    <button key={style} className="px-3 py-3 rounded-md border text-xs font-medium hover:bg-muted transition-colors">{style}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Footer Kolommen</label>
                <select className="w-full h-10 rounded-md border bg-background px-3 text-sm text-foreground">
                  <option>3 kolommen</option><option>4 kolommen</option><option>2 kolommen</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
