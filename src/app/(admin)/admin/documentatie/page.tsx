"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type DocSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: {
    title: string;
    description: string;
    steps?: string[];
  }[];
};

const docs: DocSection[] = [
  {
    id: "producten",
    title: "Producten Beheer",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25" />
      </svg>
    ),
    items: [
      {
        title: "Nieuw product toevoegen",
        description: "Ga naar Producten > klik op 'Nieuw Product'.",
        steps: [
          "Vul de product naam en beschrijving in",
          "Selecteer categorie en subcategorie in de rechter kolom",
          "Voeg specificaties toe (materiaal, maten, kleuren)",
          "Kies bedrukkingsmethoden en voordelen",
          "Upload een featured image en galerij foto's",
          "Stel tags in voor filtering",
          "Klik op 'Opslaan'",
        ],
      },
      {
        title: "Product bewerken",
        description: "Klik op een product in de lijst om het te bewerken. Alle velden zijn aanpasbaar.",
        steps: [
          "Klik op het product in de productenlijst",
          "Pas de gewenste velden aan",
          "Upload nieuwe afbeeldingen of verwijder bestaande",
          "Klik op 'Opslaan' om wijzigingen op te slaan",
        ],
      },
      {
        title: "Product status",
        description: "Producten kunnen de status 'Actief', 'Concept' of 'Gearchiveerd' hebben.",
        steps: [
          "Actief: zichtbaar op de website",
          "Concept: niet zichtbaar, in bewerking",
          "Gearchiveerd: verborgen maar niet verwijderd",
        ],
      },
    ],
  },
  {
    id: "diensten",
    title: "Diensten Beheer",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437" />
      </svg>
    ),
    items: [
      {
        title: "Dienst toevoegen",
        description: "Ga naar Diensten > klik op 'Nieuwe Dienst'.",
        steps: [
          "Vul de naam en beschrijving in",
          "Voeg kenmerken/features toe",
          "Selecteer de dienst categorie",
          "Upload een afbeelding",
          "Klik op 'Opslaan'",
        ],
      },
      {
        title: "Dienst categorieën",
        description: "Diensten worden georganiseerd in categorieën. Beheer deze via Categorieën > Dienst Categorieën tab.",
      },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio Beheer",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    ),
    items: [
      {
        title: "Portfolio project aanmaken",
        description: "Voeg werkvoorbeelden toe met foto, slider of video.",
        steps: [
          "Ga naar Portfolio > klik op 'Nieuw Project'",
          "Vul titel, klant en beschrijving in",
          "Kies het media type: Foto, Slider of Video",
          "Bij Foto: upload een enkele afbeelding",
          "Bij Slider: voeg meerdere afbeeldingen toe",
          "Bij Video: plak een YouTube URL + upload cover afbeelding",
          "Stel categorie, tags en status in",
          "Klik op 'Opslaan'",
        ],
      },
      {
        title: "Mediatypen",
        description: "Elk portfolio project heeft een mediatype.",
        steps: [
          "Foto: enkele project afbeelding",
          "Slider: meerdere foto's in een carrousel",
          "Video: YouTube link met optionele cover afbeelding",
        ],
      },
    ],
  },
  {
    id: "categorieen",
    title: "Categorieën & Tags",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
      </svg>
    ),
    items: [
      {
        title: "Product categorieën",
        description: "Beheer de hoofdcategorieën en subcategorieën voor producten.",
        steps: [
          "Ga naar Categorieën > Product Categorieën tab",
          "Klik op een categorie om subcategorieën te zien",
          "Voeg nieuwe categorieën of subcategorieën toe",
        ],
      },
      {
        title: "Dienst categorieën",
        description: "Aparte categorieën voor diensten, herkenbaar aan teal kleur.",
      },
      {
        title: "Tags",
        description: "Tags worden gebruikt voor extra filtering op producten (bijv. Populair, Nieuw, Bestseller).",
      },
    ],
  },
  {
    id: "website",
    title: "Website Instellingen",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
      </svg>
    ),
    items: [
      {
        title: "Appearance (Uiterlijk)",
        description: "Pas kleuren, lettertypen, logo en layout aan.",
        steps: [
          "Kleuren: wijzig primaire en accent kleur met kleurenkiezer",
          "Typografie: kies heading en body fonts",
          "Logo: upload logo afbeelding en favicon",
          "Layout: kies header stijl en footer kolommen",
        ],
      },
      {
        title: "Menu Beheer",
        description: "Beheer de navigatie van de website.",
        steps: [
          "Hoofdmenu: de bovenste navigatiebalk",
          "Footer menu: links in de footer",
          "Versleep of gebruik pijltjes om volgorde te wijzigen",
          "Voeg items toe met label en URL",
        ],
      },
      {
        title: "Widgets",
        description: "Beheer extra elementen op de website.",
        steps: [
          "WhatsApp Chat Button: drijvende chat knop",
          "CTA Banner: call-to-action in de footer",
          "Nieuwsbrief: aanmeldformulier",
          "Social Media Links: iconen in de footer",
          "Cookie Melding: popup voor cookies",
          "Schakel widgets aan/uit met de toggle",
        ],
      },
      {
        title: "Commercial Areas",
        description: "Beheer promotionele zones op de website.",
        steps: [
          "Banner: grote promotiebanner (bijv. homepage)",
          "Popup: promotionele popup op alle pagina's",
          "Inline: promotie binnen productpagina's",
          "Sidebar: promotie in de zijbalk",
          "Schakel zones aan/uit met de toggle",
        ],
      },
    ],
  },
  {
    id: "offertes",
    title: "Offertes",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    items: [
      {
        title: "Offerte aanvragen bekijken",
        description: "Klanten kunnen via de website offerte aanvragen indienen. Deze verschijnen in het Offertes overzicht.",
        steps: [
          "Bekijk de offerte details (klant, producten, hoeveelheid)",
          "Wijzig de status: Nieuw > In behandeling > Beantwoord",
          "Klik op een offerte voor details",
        ],
      },
    ],
  },
  {
    id: "uploads",
    title: "Afbeeldingen Uploaden",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    ),
    items: [
      {
        title: "Hoe uploaden werkt",
        description: "Klik op een upload zone of sleep een bestand erin (drag & drop).",
        steps: [
          "Klik op het upload vlak met de stippellijn",
          "Selecteer een afbeelding (PNG, JPG, WebP tot 5MB)",
          "De afbeelding wordt direct als preview getoond",
          "Hover over een geüploade afbeelding voor opties",
          "Klik het vervangen-icoon om een andere afbeelding te kiezen",
          "Klik het verwijder-icoon (rood) om de afbeelding te verwijderen",
        ],
      },
      {
        title: "Galerij afbeeldingen",
        description: "Bij producten kunt u meerdere galerij afbeeldingen uploaden.",
        steps: [
          "Klik op het + icoon in de galerij grid",
          "Selecteer een of meerdere afbeeldingen",
          "Verwijder individuele foto's via het X icoon",
        ],
      },
      {
        title: "Portfolio slider",
        description: "Portfolio projecten met het type 'Slider' tonen afbeeldingen als carrousel.",
        steps: [
          "Kies media type 'Foto Slider' bij het portfolio project",
          "Upload meerdere afbeeldingen via de 'Afbeelding toevoegen' knop",
          "Afbeeldingen worden weergegeven in volgorde van toevoeging",
          "Verwijder afbeeldingen via het X icoon",
        ],
      },
    ],
  },
];

export default function DocumentatiePage() {
  const [activeSection, setActiveSection] = useState("producten");
  const currentSection = docs.find((d) => d.id === activeSection);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documentatie</h1>
          <p className="text-sm text-muted-foreground mt-1">Handleidingen en uitleg voor het beheer van de website.</p>
        </div>
        <Badge variant="secondary" className="text-xs">{docs.length} secties</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar nav */}
        <div className="space-y-1">
          {docs.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                activeSection === section.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span className={activeSection === section.id ? "text-primary" : "text-muted-foreground/60"}>
                {section.icon}
              </span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {currentSection && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {currentSection.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">{currentSection.title}</h2>
                  <p className="text-xs text-muted-foreground">{currentSection.items.length} onderwerpen</p>
                </div>
              </div>

              {currentSection.items.map((item, idx) => (
                <Card key={idx}>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                        {item.steps && (
                          <>
                            <Separator className="mb-3" />
                            <ul className="space-y-2">
                              {item.steps.map((step, si) => (
                                <li key={si} className="flex items-start gap-2">
                                  <svg className="h-4 w-4 text-brand-green shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                  <span className="text-xs text-foreground/80">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
