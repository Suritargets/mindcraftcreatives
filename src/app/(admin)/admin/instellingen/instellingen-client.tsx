"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateSettings } from "@/lib/actions/settings";
import { categoryIconMap } from "@/components/icons/category-icons";

export default function InstellingenClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function updateField(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    startTransition(async () => {
      await updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
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
        {/* Website Instellingen */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground">Website</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Algemene website configuratie.</p>
          </div>
          <Separator />
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Home pagina</label>
              <p className="text-xs text-muted-foreground mb-2">Welke pagina wordt getoond als startpagina en wanneer op het logo wordt geklikt.</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateField("homepage", "home")}
                  className={`flex-1 flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    (settings.homepage || "catalogus") === "home"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                    (settings.homepage || "catalogus") === "home" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Home</p>
                    <p className="text-xs text-muted-foreground">Hero, diensten, portfolio</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => updateField("homepage", "catalogus")}
                  className={`flex-1 flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    (settings.homepage || "catalogus") === "catalogus"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                    (settings.homepage || "catalogus") === "catalogus" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Catalogus</p>
                    <p className="text-xs text-muted-foreground">Producten direct tonen</p>
                  </div>
                </button>
              </div>
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Bedrijfsnaam</label>
                <Input
                  value={settings.bedrijfsnaam || ""}
                  onChange={(e) => updateField("bedrijfsnaam", e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Handelsnaam</label>
                <Input
                  value={settings.handelsnaam || ""}
                  onChange={(e) => updateField("handelsnaam", e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Adres</label>
              <Input
                value={settings.adres || ""}
                onChange={(e) => updateField("adres", e.target.value)}
                className="h-10"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <Input
                  value={settings.email || ""}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Telefoon</label>
                <Input
                  value={settings.telefoon || ""}
                  onChange={(e) => updateField("telefoon", e.target.value)}
                  className="h-10"
                />
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
              <Input
                value={settings.facebook_url || ""}
                onChange={(e) => updateField("facebook_url", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Instagram URL</label>
              <Input
                value={settings.instagram_url || ""}
                onChange={(e) => updateField("instagram_url", e.target.value)}
                placeholder="https://www.instagram.com/..."
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">WhatsApp Nummer</label>
              <Input
                value={settings.whatsapp_nummer || ""}
                onChange={(e) => updateField("whatsapp_nummer", e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </Card>

        {/* Over Ons sectie */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground">Over Ons Sectie</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Tekst en cijfers op de &quot;Wat Wij Doen&quot; pagina.</p>
          </div>
          <Separator />
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Titel</label>
              <Input
                value={settings.about_title || "Wij Zijn Mindcraft Creatives"}
                onChange={(e) => updateField("about_title", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tekst (alinea 1)</label>
              <Textarea
                value={settings.about_text1 || "Gevestigd in Paramaribo, Suriname, zijn wij een creatief bureau dat gepassioneerd is over design en drukwerk. Wij helpen bedrijven om zich te onderscheiden met opvallende visuele communicatie."}
                onChange={(e) => updateField("about_text1", e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tekst (alinea 2)</label>
              <Textarea
                value={settings.about_text2 || "Van logo ontwerp en complete huisstijlen tot sticker prints en grote signage projecten — wij leveren kwaliteit met aandacht voor detail en snelle doorlooptijden."}
                onChange={(e) => updateField("about_text2", e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Afbeelding URL</label>
              <Input
                value={settings.about_image || ""}
                onChange={(e) => updateField("about_image", e.target.value)}
                placeholder="/logo.jpeg of https://..."
                className="h-10"
              />
              <p className="text-xs text-muted-foreground mt-1">Afbeelding rechts naast de tekst. Laat leeg voor het standaard logo.</p>
            </div>
            <Separator />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Statistieken</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Stat 1 — Waarde</label>
                <Input value={settings.stat1_value || "100+"} onChange={(e) => updateField("stat1_value", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Stat 1 — Label</label>
                <Input value={settings.stat1_label || "Projecten"} onChange={(e) => updateField("stat1_label", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Stat 2 — Waarde</label>
                <Input value={settings.stat2_value || "50+"} onChange={(e) => updateField("stat2_value", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Stat 2 — Label</label>
                <Input value={settings.stat2_label || "Tevreden Klanten"} onChange={(e) => updateField("stat2_label", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Stat 3 — Waarde</label>
                <Input value={settings.stat3_value || "5+"} onChange={(e) => updateField("stat3_value", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Stat 3 — Label</label>
                <Input value={settings.stat3_label || "Jaar Ervaring"} onChange={(e) => updateField("stat3_label", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Stat 4 — Waarde</label>
                <Input value={settings.stat4_value || "24u"} onChange={(e) => updateField("stat4_value", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Stat 4 — Label</label>
                <Input value={settings.stat4_label || "Snelle Levering"} onChange={(e) => updateField("stat4_label", e.target.value)} className="h-9" />
              </div>
            </div>
          </div>
        </Card>

        {/* Catalogus Hero */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground">Catalogus Hero</h3>
            <p className="text-xs text-muted-foreground mt-0.5">De grote banner bovenaan de catalogus pagina.</p>
          </div>
          <Separator />
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Badge tekst</label>
              <Input
                value={settings.catalog_hero_badge || "Promotie Materiaal"}
                onChange={(e) => updateField("catalog_hero_badge", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Titel</label>
              <Input
                value={settings.catalog_hero_title || "Promotioneel Materiaal Catalogus"}
                onChange={(e) => updateField("catalog_hero_title", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Ondertitel</label>
              <Textarea
                value={settings.catalog_hero_subtitle || "Ontdek onze collectie promotionele producten. Alles is volledig aan te passen met uw logo en huisstijl."}
                onChange={(e) => updateField("catalog_hero_subtitle", e.target.value)}
                rows={2}
              />
            </div>
            <Separator />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Achtergrond afbeelding</p>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Afbeelding URL</label>
              <Input
                value={settings.catalog_hero_image || ""}
                onChange={(e) => updateField("catalog_hero_image", e.target.value)}
                placeholder="https://... of /afbeelding.jpg"
                className="h-10"
              />
              <p className="text-xs text-muted-foreground mt-1">Laat leeg voor een effen rode achtergrond. Voeg een URL toe voor een achtergrondafbeelding met overlay effect.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Overlay sterkte: <span className="text-primary font-bold">{settings.catalog_hero_overlay || "60"}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={settings.catalog_hero_overlay || "60"}
                onChange={(e) => updateField("catalog_hero_overlay", e.target.value)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>0% — Alleen afbeelding</span>
                <span>100% — Alleen kleur</span>
              </div>
            </div>
            {/* Preview */}
            {settings.catalog_hero_image && (
              <div className="relative rounded-lg overflow-hidden h-24">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${settings.catalog_hero_image})` }}
                />
                <div
                  className="absolute inset-0 bg-primary"
                  style={{ opacity: parseInt(settings.catalog_hero_overlay || "60", 10) / 100 }}
                />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <p className="text-white font-semibold text-sm">Preview</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Catalogus Iconen */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground">Catalogus Iconen</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Beheer welke categorie-iconen getoond worden bovenaan de catalogus pagina. Max 12 iconen.
            </p>
          </div>
          <Separator />
          <div className="p-5 space-y-4">
            {(() => {
              const availableIcons = [
                { key: "pen", label: "Pen" },
                { key: "notebook", label: "Notitieboek" },
                { key: "bag", label: "Tas" },
                { key: "bottle", label: "Fles" },
                { key: "backpack", label: "Rugzak" },
                { key: "umbrella", label: "Paraplu" },
                { key: "mug", label: "Mok (Travel)" },
                { key: "ceramicmug", label: "Mok (Keramisch)" },
                { key: "tshirt", label: "T-Shirt" },
                { key: "keychain", label: "Sleutelhanger" },
                { key: "coolerbag", label: "Koeltas" },
                { key: "hoodie", label: "Hoodie" },
                { key: "apron", label: "Schort" },
                { key: "gadget", label: "Gadget" },
                { key: "banner", label: "Banner" },
                { key: "idea", label: "Idee" },
                { key: "custom", label: "Custom afbeelding" },
              ];

              // Parse current icons from settings (JSON string)
              let currentIcons: { name: string; slug: string; icon: string; customImage?: string }[] = [];
              try {
                currentIcons = JSON.parse(settings.catalog_icons || "[]");
              } catch { /* ignore */ }

              // Ensure 12 slots
              while (currentIcons.length < 12) {
                currentIcons.push({ name: "", slug: "", icon: "pen", customImage: "" });
              }

              function updateIcon(index: number, field: string, value: string) {
                const updated = [...currentIcons];
                updated[index] = { ...updated[index], [field]: value };
                updateField("catalog_icons", JSON.stringify(updated));
              }

              function moveIcon(index: number, direction: -1 | 1) {
                const newIndex = index + direction;
                if (newIndex < 0 || newIndex >= currentIcons.length) return;
                const updated = [...currentIcons];
                [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
                updateField("catalog_icons", JSON.stringify(updated));
              }

              return (
                <div className="space-y-3">
                  {currentIcons.slice(0, 12).map((item, index) => {
                    const IconComponent = item.icon && item.icon !== "custom" ? categoryIconMap[item.icon] : null;
                    const isCustom = item.icon === "custom";

                    return (
                      <div key={index} className="rounded-lg border bg-muted/20 overflow-hidden">
                        <div className="flex items-center gap-3 p-3">
                          {/* Icon preview */}
                          <div className="h-12 w-12 rounded-lg border bg-white flex items-center justify-center shrink-0">
                            {isCustom && item.customImage ? (
                              <img src={item.customImage} alt="" className="h-10 w-10 object-contain" />
                            ) : IconComponent ? (
                              <IconComponent className="h-9 w-9 text-muted-foreground" />
                            ) : (
                              <span className="text-xs text-muted-foreground">?</span>
                            )}
                          </div>

                          {/* Position number */}
                          <span className="text-xs font-bold text-muted-foreground w-4 text-center shrink-0">{index + 1}</span>

                          {/* Move buttons */}
                          <div className="flex flex-col gap-0.5 shrink-0">
                            <button type="button" onClick={() => moveIcon(index, -1)} disabled={index === 0} className="h-5 w-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>
                            </button>
                            <button type="button" onClick={() => moveIcon(index, 1)} disabled={index >= 11} className="h-5 w-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                            </button>
                          </div>

                          {/* Icon selector */}
                          <select
                            value={item.icon || "pen"}
                            onChange={(e) => updateIcon(index, "icon", e.target.value)}
                            className="h-9 w-36 rounded-md border bg-background px-2 text-xs shrink-0"
                          >
                            {availableIcons.map((ic) => (
                              <option key={ic.key} value={ic.key}>{ic.label}</option>
                            ))}
                          </select>

                          {/* Name */}
                          <Input
                            value={item.name}
                            onChange={(e) => updateIcon(index, "name", e.target.value)}
                            placeholder="Weergavenaam"
                            className="h-9 text-sm flex-1"
                          />

                          {/* Slug */}
                          <Input
                            value={item.slug}
                            onChange={(e) => updateIcon(index, "slug", e.target.value)}
                            placeholder="slug"
                            className="h-9 text-sm w-32"
                          />

                          {/* Clear button */}
                          <button type="button" onClick={() => updateIcon(index, "name", "")} className="h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0" title="Leegmaken">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                          </button>
                        </div>

                        {/* Custom image URL input (only shown when "custom" is selected) */}
                        {isCustom && (
                          <div className="px-3 pb-3 pt-0">
                            <div className="flex items-center gap-2 p-2 rounded-md bg-muted/40 border border-dashed">
                              <svg className="h-4 w-4 text-muted-foreground shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                              </svg>
                              <Input
                                value={item.customImage || ""}
                                onChange={(e) => updateIcon(index, "customImage", e.target.value)}
                                placeholder="Afbeelding URL (bijv. /icons/mijn-icon.png)"
                                className="h-8 text-xs flex-1 border-0 bg-transparent p-0 focus-visible:ring-0"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <Separator className="my-4" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Layout</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Mobile — kolommen per rij</label>
                      <select
                        value={settings.catalog_icons_mobile_cols || "3"}
                        onChange={(e) => updateField("catalog_icons_mobile_cols", e.target.value)}
                        className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                      >
                        <option value="2">2 per rij</option>
                        <option value="3">3 per rij</option>
                        <option value="4">4 per rij</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Desktop — kolommen per rij</label>
                      <select
                        value={settings.catalog_icons_desktop_cols || "4"}
                        onChange={(e) => updateField("catalog_icons_desktop_cols", e.target.value)}
                        className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                      >
                        <option value="3">3 per rij</option>
                        <option value="4">4 per rij</option>
                        <option value="5">5 per rij</option>
                        <option value="6">6 per rij</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Laat de naam leeg om een slot te verbergen. De slug moet overeenkomen met een bestaande subcategorie slug.
                  </p>
                </div>
              );
            })()}
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
              <Input
                value={settings.offerte_email || ""}
                onChange={(e) => updateField("offerte_email", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Standaard levertijd tekst</label>
              <Input
                value={settings.levertijd_tekst || ""}
                onChange={(e) => updateField("levertijd_tekst", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Betalingsvoorwaarden tekst</label>
              <Input
                value={settings.betalingsvoorwaarden || ""}
                onChange={(e) => updateField("betalingsvoorwaarden", e.target.value)}
                className="h-10"
              />
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
          <Button onClick={handleSave} disabled={isPending} className="gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {isPending ? "Opslaan..." : "Opslaan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
