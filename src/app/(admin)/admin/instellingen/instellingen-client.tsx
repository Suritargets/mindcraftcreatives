"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateSettings } from "@/lib/actions/settings";

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
