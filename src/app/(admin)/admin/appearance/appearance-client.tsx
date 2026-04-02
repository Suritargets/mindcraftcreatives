"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/admin/image-upload";
import { updateSettings } from "@/lib/actions/settings";

export default function AppearanceClient({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const [primaryColor, setPrimaryColor] = useState(initialSettings.appearance_primary_color || "#8B1A1A");
  const [accentColor, setAccentColor] = useState(initialSettings.appearance_accent_color || "#2D6A4F");
  const [fontBody, setFontBody] = useState(initialSettings.appearance_font_body || "Inter");
  const [fontHeading, setFontHeading] = useState(initialSettings.appearance_font_heading || "Inter");
  const [logoText, setLogoText] = useState(initialSettings.appearance_logo_text || "Mindcraft Creatives");
  const [logoImage, setLogoImage] = useState<string | null>(initialSettings.appearance_logo_image || null);
  const [faviconImage, setFaviconImage] = useState<string | null>(initialSettings.appearance_favicon_image || null);
  const [headerStyle, setHeaderStyle] = useState(initialSettings.appearance_header_style || "Vast");
  const [footerColumns, setFooterColumns] = useState(initialSettings.appearance_footer_columns || "3 kolommen");
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await updateSettings(
        {
          appearance_primary_color: primaryColor,
          appearance_accent_color: accentColor,
          appearance_font_body: fontBody,
          appearance_font_heading: fontHeading,
          appearance_logo_text: logoText,
          appearance_logo_image: logoImage || "",
          appearance_favicon_image: faviconImage || "",
          appearance_header_style: headerStyle,
          appearance_footer_columns: footerColumns,
        },
        "appearance"
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appearance</h1>
          <p className="text-xs text-muted-foreground mt-1">Pas het uiterlijk van de website aan.</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-brand-green font-medium">Opgeslagen</span>}
          <Button size="sm" onClick={handleSave} disabled={isPending} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            {isPending ? "Opslaan..." : "Opslaan"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Colors */}
        <Card>
          <div className="p-4">
            <h3 className="text-xs font-semibold text-foreground mb-3">Kleuren</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Primaire kleur</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-9 w-9 rounded-md border cursor-pointer" />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-9 font-mono text-xs flex-1" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Accent kleur</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-9 w-9 rounded-md border cursor-pointer" />
                  <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-9 font-mono text-xs flex-1" />
                </div>
              </div>
              <Separator />
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Preview</label>
                <div className="flex gap-3 flex-wrap">
                  <div className="h-14 w-14 rounded-lg" style={{ backgroundColor: primaryColor }} />
                  <div className="h-14 w-14 rounded-lg" style={{ backgroundColor: accentColor }} />
                  <div className="h-14 w-14 rounded-lg bg-foreground" />
                  <div className="h-14 w-14 rounded-lg bg-muted border" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card>
          <div className="p-4">
            <h3 className="text-xs font-semibold text-foreground mb-3">Typografie</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Heading Font</label>
                <select value={fontHeading} onChange={(e) => setFontHeading(e.target.value)} className="w-full h-9 rounded-md border bg-background px-3 text-xs text-foreground">
                  <option>Inter</option><option>Poppins</option><option>Montserrat</option><option>Playfair Display</option><option>Raleway</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Body Font</label>
                <select value={fontBody} onChange={(e) => setFontBody(e.target.value)} className="w-full h-9 rounded-md border bg-background px-3 text-xs text-foreground">
                  <option>Inter</option><option>Open Sans</option><option>Lato</option><option>Roboto</option><option>Nunito</option>
                </select>
              </div>
              <Separator />
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Preview</label>
                <div className="p-3 rounded-lg border bg-muted/20">
                  <p className="text-base font-bold mb-1" style={{ fontFamily: fontHeading }}>Heading voorbeeld</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: fontBody }}>Dit is een voorbeeld van body tekst met het geselecteerde lettertype.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Logo */}
        <Card>
          <div className="p-4">
            <h3 className="text-xs font-semibold text-foreground mb-3">Logo & Branding</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Logo Tekst</label>
                <Input value={logoText} onChange={(e) => setLogoText(e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Logo Afbeelding</label>
                <ImageUpload value={logoImage} onChange={setLogoImage} height="h-24" label="Upload logo" hint="PNG of SVG, transparante achtergrond aanbevolen" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Favicon</label>
                <div className="w-16">
                  <ImageUpload value={faviconImage} onChange={setFaviconImage} aspect="aspect-square" compact label="Upload" hint="" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Layout */}
        <Card>
          <div className="p-4">
            <h3 className="text-xs font-semibold text-foreground mb-3">Layout</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Header Stijl</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Vast", "Sticky"].map((style) => (
                    <button
                      key={style}
                      onClick={() => setHeaderStyle(style)}
                      className={`px-3 py-2.5 rounded-md border text-xs font-medium transition-colors ${
                        headerStyle === style
                          ? "bg-primary text-white border-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Footer Kolommen</label>
                <select
                  value={footerColumns}
                  onChange={(e) => setFooterColumns(e.target.value)}
                  className="w-full h-9 rounded-md border bg-background px-3 text-xs text-foreground"
                >
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
