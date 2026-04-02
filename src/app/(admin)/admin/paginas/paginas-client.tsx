"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { updateSettings } from "@/lib/actions/settings";

type PageSection = {
  id: string;
  page: string;
  section: string;
  fields: { key: string; label: string; type: "text" | "textarea" | "url"; value: string }[];
};

const defaultSections: PageSection[] = [
  {
    id: "hero",
    page: "Home",
    section: "Hero",
    fields: [
      { key: "title", label: "Titel", type: "text", value: "Uw Merk, Onze Creativiteit" },
      { key: "subtitle", label: "Ondertitel", type: "textarea", value: "Van concept tot realisatie — custom promotional products, drukwerk en branding voor bedrijven in Suriname." },
      { key: "cta_primary", label: "Primaire knop tekst", type: "text", value: "Offerte Aanvragen" },
      { key: "cta_secondary", label: "Secundaire knop tekst", type: "text", value: "Bekijk Catalogus" },
    ],
  },
  {
    id: "about",
    page: "Home",
    section: "Over Ons",
    fields: [
      { key: "title", label: "Titel", type: "text", value: "Over Mindcraft Creatives" },
      { key: "description", label: "Beschrijving", type: "textarea", value: "Wij zijn een creatief bureau gevestigd in Paramaribo, Suriname. Met passie voor design en oog voor detail helpen wij bedrijven hun merk tot leven te brengen." },
      { key: "stat1_value", label: "Statistiek 1 - Waarde", type: "text", value: "500+" },
      { key: "stat1_label", label: "Statistiek 1 - Label", type: "text", value: "Projecten Afgerond" },
      { key: "stat2_value", label: "Statistiek 2 - Waarde", type: "text", value: "200+" },
      { key: "stat2_label", label: "Statistiek 2 - Label", type: "text", value: "Tevreden Klanten" },
      { key: "stat3_value", label: "Statistiek 3 - Waarde", type: "text", value: "5+" },
      { key: "stat3_label", label: "Statistiek 3 - Label", type: "text", value: "Jaar Ervaring" },
    ],
  },
  {
    id: "services",
    page: "Home",
    section: "Diensten",
    fields: [
      { key: "title", label: "Sectie titel", type: "text", value: "Onze Diensten" },
      { key: "subtitle", label: "Ondertitel", type: "textarea", value: "Van ontwerp tot productie — wij bieden een compleet pakket creatieve diensten." },
    ],
  },
  {
    id: "cta",
    page: "Home",
    section: "Call to Action",
    fields: [
      { key: "title", label: "Titel", type: "text", value: "Klaar om uw merk naar een hoger niveau te tillen?" },
      { key: "subtitle", label: "Ondertitel", type: "textarea", value: "Neem vandaag nog contact met ons op voor een vrijblijvende offerte." },
      { key: "cta_text", label: "Knop tekst", type: "text", value: "Neem Contact Op" },
      { key: "phone_text", label: "Telefoon tekst", type: "text", value: "Of bel direct: +597 8000000" },
    ],
  },
  {
    id: "contact",
    page: "Home",
    section: "Contact",
    fields: [
      { key: "title", label: "Sectie titel", type: "text", value: "Neem Contact Op" },
      { key: "subtitle", label: "Ondertitel", type: "textarea", value: "Heeft u een vraag of wilt u een offerte? Vul het formulier in of neem direct contact met ons op." },
      { key: "email", label: "Email adres", type: "text", value: "info@mindcraftcreatives.com" },
      { key: "phone", label: "Telefoonnummer", type: "text", value: "+597 8000000" },
      { key: "address", label: "Adres", type: "text", value: "Paramaribo, Suriname" },
      { key: "whatsapp", label: "WhatsApp nummer", type: "text", value: "5978581854" },
    ],
  },
  {
    id: "footer",
    page: "Globaal",
    section: "Footer",
    fields: [
      { key: "tagline", label: "Tagline", type: "textarea", value: "Uw creatieve partner voor grafisch ontwerp, drukwerk en branding in Suriname." },
      { key: "facebook", label: "Facebook URL", type: "url", value: "https://www.facebook.com/mindcraftcreatives" },
      { key: "whatsapp", label: "WhatsApp nummer", type: "text", value: "5978581854" },
      { key: "website", label: "Website URL", type: "url", value: "https://www.mindcraftcreatives.com" },
    ],
  },
  {
    id: "seo",
    page: "Globaal",
    section: "SEO & Meta",
    fields: [
      { key: "site_title", label: "Website titel", type: "text", value: "Mindcraft Creatives | Creative Agency Suriname" },
      { key: "site_description", label: "Meta beschrijving", type: "textarea", value: "Mindcraft Creatives - Uw creatieve partner in Paramaribo, Suriname. Grafisch ontwerp, drukwerk, stickers, signage en meer." },
      { key: "keywords", label: "Keywords (komma-gescheiden)", type: "textarea", value: "grafisch ontwerp, drukwerk, stickers, signage, Suriname, Paramaribo, branding, creative agency" },
    ],
  },
];

function buildSectionsFromSettings(
  settings: Record<string, string>
): PageSection[] {
  return defaultSections.map((section) => {
    const settingKey = `page_${section.page}_${section.id}`;
    const stored = settings[settingKey];
    if (!stored) return section;

    try {
      const savedFields: Record<string, string> = JSON.parse(stored);
      return {
        ...section,
        fields: section.fields.map((f) => ({
          ...f,
          value: savedFields[f.key] !== undefined ? savedFields[f.key] : f.value,
        })),
      };
    } catch {
      return section;
    }
  });
}

export default function PaginasClient({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const [sections, setSections] = useState(() =>
    buildSectionsFromSettings(initialSettings)
  );
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const [saved, setSaved] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFieldChange(sectionId: string, fieldKey: string, value: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              fields: s.fields.map((f) =>
                f.key === fieldKey ? { ...f, value } : f
              ),
            }
          : s
      )
    );
  }

  function handleSave(sectionId: string) {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    const fieldsObj: Record<string, string> = {};
    for (const f of section.fields) {
      fieldsObj[f.key] = f.value;
    }

    const settingKey = `page_${section.page}_${section.id}`;

    startTransition(async () => {
      await updateSettings(
        { [settingKey]: JSON.stringify(fieldsObj) },
        "pages"
      );
      setSaved(sectionId);
      setTimeout(() => setSaved(null), 2000);
    });
  }

  // Group by page
  const pages = Array.from(new Set(sections.map((s) => s.page)));

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pagina&apos;s & Content</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Beheer alle teksten en content van de website.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Website Bekijken
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Section list sidebar */}
        <div className="lg:col-span-4">
          <Card>
            <div className="p-3">
              <h3 className="text-xs font-semibold text-foreground mb-2">Secties</h3>
            </div>
            <Separator />
            <div className="p-2">
              {pages.map((page) => (
                <div key={page}>
                  <div className="px-3 pt-2 pb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      {page}
                    </span>
                  </div>
                  {sections
                    .filter((s) => s.page === page)
                    .map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${
                          activeSection === section.id
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="text-xs font-medium">{section.section}</span>
                        <Badge
                          variant={activeSection === section.id ? "secondary" : "outline"}
                          className="text-[9px]"
                        >
                          {section.fields.length} velden
                        </Badge>
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Editor */}
        <div className="lg:col-span-8">
          {activeSection ? (
            (() => {
              const section = sections.find((s) => s.id === activeSection);
              if (!section) return null;
              return (
                <Card>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{section.section}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {section.page} · {section.fields.length} bewerkbare velden
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {saved === section.id && (
                        <span className="text-xs text-brand-green font-medium flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Opgeslagen
                        </span>
                      )}
                      <Button
                        onClick={() => handleSave(section.id)}
                        size="sm"
                        disabled={isPending}
                        className="gap-1.5"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {isPending ? "Opslaan..." : "Opslaan"}
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 space-y-3">
                    {section.fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          {field.label}
                        </label>
                        {field.type === "textarea" ? (
                          <Textarea
                            value={field.value}
                            onChange={(e) => handleFieldChange(section.id, field.key, e.target.value)}
                            rows={3}
                            className="text-sm"
                          />
                        ) : (
                          <Input
                            type={field.type === "url" ? "url" : "text"}
                            value={field.value}
                            onChange={(e) => handleFieldChange(section.id, field.key, e.target.value)}
                            className="h-9"
                          />
                        )}
                        {field.type === "url" && field.value && (
                          <a
                            href={field.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline mt-1 inline-block"
                          >
                            Open link →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })()
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="h-12 w-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
                  <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-foreground">Selecteer een sectie</p>
                <p className="text-xs text-muted-foreground mt-1">Kies een sectie links om de content te bewerken.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
