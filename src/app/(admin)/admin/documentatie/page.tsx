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
    id: "dashboard",
    title: "Dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    items: [
      {
        title: "Overzicht van uw website",
        description: "Het Dashboard is de startpagina van het admin paneel. Hier ziet u in een oogopslag hoe uw website ervoor staat.",
        steps: [
          "Producten: het totaal aantal producten en hoeveel er nog als 'concept' staan",
          "Categorieen: hoeveel hoofd- en subcategorieen u heeft aangemaakt",
          "Diensten: het totaal aantal diensten en concept-diensten",
          "Portfolio: hoeveel portfolio projecten er online staan",
          "Offertes: het aantal offerte aanvragen van klanten",
          "Klik op een kaart om direct naar dat onderdeel te gaan",
        ],
      },
      {
        title: "Snel navigeren",
        description: "Gebruik het linker menu om snel naar elk onderdeel te gaan. Het Dashboard geeft u altijd een actueel totaaloverzicht.",
      },
    ],
  },
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
        description: "Ga naar Producten in het linkermenu en klik op de knop 'Nieuw Product'.",
        steps: [
          "Vul de product naam en beschrijving in",
          "Selecteer een categorie en subcategorie in de rechter kolom",
          "Voeg specificaties toe zoals materiaal, maten en kleuren",
          "Kies bedrukkingsmethoden en voordelen",
          "Upload een featured image (hoofdafbeelding) en galerij foto's",
          "Stel tags in voor filtering (bijv. Populair, Nieuw, Bestseller)",
          "Klik op 'Opslaan' om het product aan te maken",
        ],
      },
      {
        title: "Product bewerken",
        description: "Klik op een product in de productenlijst om het te openen. Alle velden zijn aanpasbaar.",
        steps: [
          "Klik op het product dat u wilt bewerken",
          "Pas de gewenste velden aan (naam, beschrijving, prijs, etc.)",
          "Upload nieuwe afbeeldingen of verwijder bestaande foto's",
          "Klik op 'Opslaan' om uw wijzigingen op te slaan",
        ],
      },
      {
        title: "Product status",
        description: "Elk product heeft een status die bepaalt of het zichtbaar is op de website.",
        steps: [
          "Actief: het product is zichtbaar op de website voor bezoekers",
          "Concept: het product is nog in bewerking en niet zichtbaar",
          "Gearchiveerd: het product is verborgen maar niet verwijderd",
          "U kunt de status wijzigen via het statusveld bij het bewerken",
        ],
      },
      {
        title: "Producten importeren via CSV",
        description: "U kunt meerdere producten tegelijk toevoegen door een CSV bestand te uploaden. Dit is handig als u veel producten heeft.",
        steps: [
          "Ga naar de Producten pagina en klik op 'Import CSV'",
          "Download eerst het voorbeeld CSV bestand om het juiste formaat te zien",
          "Vul het CSV bestand in met uw productgegevens (naam, beschrijving, categorie, etc.)",
          "Upload het ingevulde CSV bestand",
          "Het systeem controleert het bestand en toont een voorbeeld",
          "Bevestig de import om alle producten toe te voegen",
        ],
      },
      {
        title: "Producten exporteren naar CSV",
        description: "Download al uw producten als CSV bestand, handig voor back-ups of om in Excel te bewerken.",
        steps: [
          "Ga naar de Producten pagina",
          "Klik op de 'Export CSV' knop",
          "Er wordt een CSV bestand gedownload met alle productgegevens",
          "U kunt dit bestand openen in Excel of Google Sheets",
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
        description: "Ga naar Diensten in het linkermenu en klik op 'Nieuwe Dienst' om een nieuwe dienst aan te maken.",
        steps: [
          "Vul de naam van de dienst in",
          "Schrijf een duidelijke beschrijving van wat de dienst inhoudt",
          "Voeg kenmerken/features toe die de dienst beschrijven",
          "Selecteer de juiste dienst categorie",
          "Upload een representatieve afbeelding",
          "Klik op 'Opslaan' om de dienst te publiceren",
        ],
      },
      {
        title: "Dienst bewerken of verwijderen",
        description: "Klik op een dienst in de lijst om deze te bewerken. U kunt alle velden aanpassen of de dienst verwijderen.",
        steps: [
          "Open de dienst door erop te klikken",
          "Wijzig de naam, beschrijving, kenmerken of afbeelding",
          "Klik op 'Opslaan' om de wijzigingen door te voeren",
          "Gebruik de verwijder-knop om een dienst permanent te verwijderen",
        ],
      },
      {
        title: "Dienst categorieën",
        description: "Diensten worden georganiseerd in categorieën zodat bezoekers makkelijk kunnen vinden wat ze zoeken. Beheer deze via Categorieën > Dienst Categorieën tab.",
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
        description: "Laat uw beste werk zien aan potentiele klanten. Voeg projecten toe met foto's, een slider of video.",
        steps: [
          "Ga naar Portfolio > klik op 'Nieuw Project'",
          "Vul de titel in en de naam van de klant",
          "Schrijf een beschrijving van het project",
          "Kies het media type: Foto, Slider of Video",
          "Bij Foto: upload een enkele afbeelding van het project",
          "Bij Slider: voeg meerdere afbeeldingen toe als carrousel",
          "Bij Video: plak een YouTube URL en upload een cover afbeelding",
          "Stel de categorie, tags en status in",
          "Klik op 'Opslaan'",
        ],
      },
      {
        title: "Mediatypen uitgelegd",
        description: "Elk portfolio project gebruikt een van de drie mediatypen. Kies het type dat het beste bij uw project past.",
        steps: [
          "Foto: een enkele project afbeelding, ideaal voor eenvoudige projecten",
          "Slider: meerdere foto's in een carrousel, perfect voor projecten met meerdere hoeken of stappen",
          "Video: een YouTube link met optionele cover afbeelding, ideaal voor animaties of proces-video's",
        ],
      },
      {
        title: "Portfolio bewerken",
        description: "Open een bestaand project om het te bewerken. U kunt de tekst, afbeeldingen en categorie aanpassen.",
        steps: [
          "Klik op het project in de lijst",
          "Wijzig de gewenste velden",
          "Voeg nieuwe afbeeldingen toe of verwijder bestaande",
          "Klik op 'Opslaan' om de wijzigingen door te voeren",
        ],
      },
    ],
  },
  {
    id: "categorieen",
    title: "Categorieën",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
      </svg>
    ),
    items: [
      {
        title: "Product categorieën",
        description: "Organiseer uw producten in logische groepen zodat klanten snel kunnen vinden wat ze zoeken.",
        steps: [
          "Ga naar Categorieën > Product Categorieën tab",
          "Klik op 'Nieuwe Categorie' om een hoofdcategorie toe te voegen",
          "Klik op een bestaande categorie om subcategorieën te bekijken en toe te voegen",
          "Geef elke categorie een duidelijke naam en optioneel een beschrijving",
          "Voorbeeld: Hoofdcategorie 'Kleding' met subcategorieën 'T-shirts', 'Polo's', 'Caps'",
        ],
      },
      {
        title: "Dienst categorieën",
        description: "Aparte categorieën voor diensten, herkenbaar aan een teal kleur in het systeem.",
        steps: [
          "Ga naar Categorieën > Dienst Categorieën tab",
          "Voeg categorieën toe die bij uw dienstverlening passen",
          "Voorbeeld: 'Zeefdruk', 'Borduurwerk', 'Digitale Print'",
        ],
      },
      {
        title: "Portfolio categorieën",
        description: "Categoriseer uw portfolio projecten zodat bezoekers kunnen filteren op type werk.",
        steps: [
          "Ga naar Categorieën > Portfolio Categorieën tab",
          "Voeg categorieën toe voor de soorten werk die u doet",
          "Voorbeeld: 'Signage', 'Bedrijfskleding', 'Promotiemateriaal'",
        ],
      },
      {
        title: "Subcategorieën",
        description: "Subcategorieën geven extra structuur binnen een hoofdcategorie. Ze verschijnen als filter op de website.",
        steps: [
          "Open een hoofdcategorie door erop te klikken",
          "Klik op 'Subcategorie Toevoegen'",
          "Geef de subcategorie een naam",
          "Subcategorieën verschijnen automatisch als filteroptie op de website",
        ],
      },
    ],
  },
  {
    id: "menu",
    title: "Menu Beheer",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
    items: [
      {
        title: "Hoofdmenu aanpassen",
        description: "Het hoofdmenu is de navigatiebalk bovenaan uw website. Hier bepaalt u welke pagina's bezoekers kunnen bereiken.",
        steps: [
          "Ga naar Menu in het linkermenu",
          "U ziet het Hoofdmenu (header navigatie) bovenaan",
          "Klik op 'Item Toevoegen' om een nieuw menu-item toe te voegen",
          "Vul het label in (de tekst die bezoekers zien) en de URL (het webadres)",
          "Versleep items of gebruik de pijltjes om de volgorde aan te passen",
          "Klik op het potlood-icoon om een item te bewerken",
          "Klik op het prullenbak-icoon om een item te verwijderen",
        ],
      },
      {
        title: "Footer menu aanpassen",
        description: "Het footer menu verschijnt onderaan elke pagina van uw website. Vaak worden hier links geplaatst zoals 'Over Ons', 'Contact' of 'Privacybeleid'.",
        steps: [
          "Scroll naar het Footer Menu gedeelte op de Menu pagina",
          "Voeg items toe op dezelfde manier als het hoofdmenu",
          "Het footer menu is ideaal voor secundaire pagina's en juridische links",
          "Tip: houd het footer menu beknopt, maximaal 5-6 links",
        ],
      },
      {
        title: "Tips voor menu-indeling",
        description: "Een goed georganiseerd menu helpt bezoekers sneller vinden wat ze zoeken.",
        steps: [
          "Houd het hoofdmenu kort: 4-6 items is ideaal",
          "Gebruik duidelijke labels die iedereen begrijpt",
          "Plaats de belangrijkste pagina's (Producten, Diensten) vooraan",
          "Minder belangrijke pagina's (Privacy, Voorwaarden) horen in het footer menu",
        ],
      },
    ],
  },
  {
    id: "paginas",
    title: "Pagina's",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    items: [
      {
        title: "Homepage instellingen",
        description: "Bepaal wat bezoekers als eerste zien wanneer ze uw website bezoeken.",
        steps: [
          "Ga naar Pagina's in het linkermenu",
          "Hier kunt u de homepage secties configureren",
          "Stel de hero banner in met titel, ondertitel en achtergrondafbeelding",
          "Kies welke secties zichtbaar zijn op de homepage (bijv. uitgelichte producten, diensten, portfolio)",
          "Pas de teksten aan voor elke sectie",
          "Klik op 'Opslaan' om de wijzigingen door te voeren",
        ],
      },
      {
        title: "Pagina secties beheren",
        description: "De homepage bestaat uit meerdere secties die u apart kunt configureren.",
        steps: [
          "Hero Banner: de grote afbeelding bovenaan met titel en call-to-action knop",
          "Uitgelichte Producten: een selectie van uw beste producten",
          "Diensten Overzicht: een samenvatting van uw diensten",
          "Portfolio Showcase: uw meest recente of beste portfolio items",
          "Over Ons: korte introductie van uw bedrijf",
          "Call to Action: een opvallende sectie die bezoekers aanspoort om contact op te nemen",
        ],
      },
    ],
  },
  {
    id: "uiterlijk",
    title: "Uiterlijk",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
      </svg>
    ),
    items: [
      {
        title: "Kleuren aanpassen",
        description: "Pas de kleuren van uw website aan zodat deze overeenkomen met uw huisstijl.",
        steps: [
          "Ga naar Uiterlijk (Appearance) in het linkermenu",
          "Klik op het Kleuren tabblad",
          "Kies uw primaire kleur: dit is de hoofdkleur van uw website (knoppen, links, accenten)",
          "Kies uw accent kleur: deze wordt gebruikt voor hover-effecten en secundaire elementen",
          "Gebruik de kleurenkiezer of vul een hex-code in (bijv. #E53E3E voor rood)",
          "Klik op 'Opslaan' om de kleuren toe te passen",
        ],
      },
      {
        title: "Logo en favicon",
        description: "Upload uw bedrijfslogo en favicon (het kleine icoontje in het browsertabblad).",
        steps: [
          "Ga naar het Logo tabblad onder Uiterlijk",
          "Upload uw logo afbeelding (PNG of SVG aanbevolen, transparante achtergrond)",
          "Upload een favicon (klein vierkant icoontje, 32x32 of 64x64 pixels)",
          "Het logo verschijnt in de header van uw website",
          "De favicon verschijnt in het browsertabblad naast uw paginatitel",
        ],
      },
      {
        title: "Typografie (lettertypen)",
        description: "Kies de lettertypen voor koppen en lopende tekst op uw website.",
        steps: [
          "Ga naar het Typografie tabblad",
          "Kies een heading font: dit wordt gebruikt voor titels en koppen",
          "Kies een body font: dit wordt gebruikt voor lopende tekst en beschrijvingen",
          "Het voorbeeld toont direct hoe het eruitziet",
          "Tip: kies leesbare fonts, vermijd te speelse lettertypen voor zakelijk gebruik",
        ],
      },
      {
        title: "Layout instellingen",
        description: "Bepaal de opbouw van de header en footer van uw website.",
        steps: [
          "Kies een header stijl (de bovenste balk met logo en menu)",
          "Stel het aantal footer kolommen in",
          "Deze instellingen beinvloeden de gehele website",
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
        description: "Wanneer een klant via uw website een offerte aanvraagt, verschijnt deze automatisch in het Offertes overzicht.",
        steps: [
          "Ga naar Offertes in het linkermenu",
          "U ziet een lijst van alle offerte aanvragen",
          "Elke aanvraag toont de naam van de klant, de producten en het aantal",
          "Klik op een offerte om de volledige details te bekijken",
        ],
      },
      {
        title: "Offerte status beheren",
        description: "Houd bij welke offertes u al heeft behandeld door de status aan te passen.",
        steps: [
          "Nieuw: de offerte is net binnengekomen en nog niet bekeken",
          "In behandeling: u bent bezig met het opstellen van een offerte",
          "Beantwoord: u heeft de klant een offerte gestuurd",
          "Wijzig de status door op de offerte te klikken en de nieuwe status te kiezen",
          "Tip: controleer dagelijks of er nieuwe offerte aanvragen zijn",
        ],
      },
      {
        title: "Reageren op offertes",
        description: "Het systeem toont alle informatie die u nodig heeft om een offerte op te stellen.",
        steps: [
          "Bekijk welke producten/diensten de klant wilt",
          "Noteer de gevraagde hoeveelheden en specificaties",
          "Gebruik de contactgegevens van de klant om per e-mail of telefoon te reageren",
          "Vergeet niet de status te wijzigen naar 'Beantwoord' wanneer u klaar bent",
        ],
      },
    ],
  },
  {
    id: "media",
    title: "Media Bibliotheek",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    ),
    items: [
      {
        title: "Bestanden uploaden",
        description: "De Media bibliotheek is de centrale plek voor al uw bestanden: afbeeldingen, documenten en video's.",
        steps: [
          "Ga naar Media in het linkermenu",
          "Klik op 'Bestand Uploaden' of sleep bestanden naar het upload vlak",
          "Ondersteunde formaten: afbeeldingen (JPG, PNG, WebP), documenten (PDF) en video's (MP4)",
          "Maximale bestandsgrootte: 5MB per bestand voor afbeeldingen",
          "Na het uploaden verschijnt het bestand in de mediabibliotheek",
        ],
      },
      {
        title: "Bestanden beheren",
        description: "Zoek, filter en organiseer uw bestanden in de media bibliotheek.",
        steps: [
          "Gebruik de zoekbalk om bestanden op naam te vinden",
          "Filter op type: Afbeeldingen, Documenten of Video's",
          "Klik op een bestand om de details te bekijken (afmetingen, grootte, datum)",
          "Gebruik de verwijder-knop om een bestand permanent te verwijderen",
          "Let op: een verwijderd bestand kan niet worden teruggehaald",
        ],
      },
      {
        title: "Afbeeldingen in producten en portfolio",
        description: "Wanneer u afbeeldingen toevoegt aan producten of portfolio items, worden deze automatisch in de media bibliotheek opgeslagen.",
        steps: [
          "Klik op het upload vlak met de stippellijn bij een product of portfolio item",
          "Selecteer een afbeelding (PNG, JPG, WebP tot 5MB)",
          "De afbeelding wordt direct als voorbeeld getoond",
          "Hover over een afbeelding voor opties: vervangen of verwijderen",
          "Bij producten kunt u meerdere galerij afbeeldingen uploaden via het + icoon",
        ],
      },
    ],
  },
  {
    id: "widgets",
    title: "Widgets",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
      </svg>
    ),
    items: [
      {
        title: "Wat zijn widgets?",
        description: "Widgets zijn extra elementen die u kunt in- en uitschakelen op uw website. Ze voegen functionaliteit toe zonder dat u code hoeft te schrijven.",
      },
      {
        title: "WhatsApp Chat Button",
        description: "Een drijvende WhatsApp knop rechtsonder op uw website. Bezoekers kunnen direct met u chatten.",
        steps: [
          "Schakel de widget in met de toggle",
          "Vul uw WhatsApp telefoonnummer in (met landcode, bijv. +597...)",
          "Optioneel: stel een standaard berichtje in",
          "De groene WhatsApp knop verschijnt automatisch op alle pagina's",
        ],
      },
      {
        title: "CTA Banner",
        description: "Een opvallende call-to-action balk, vaak in de footer, die bezoekers aanspoort om actie te ondernemen.",
        steps: [
          "Schakel de CTA Banner aan",
          "Vul de titel en ondertitel in",
          "Stel de knoptekst en link in (bijv. 'Vraag Offerte Aan' naar uw contactpagina)",
          "De banner verschijnt automatisch boven de footer",
        ],
      },
      {
        title: "Nieuwsbrief aanmeldformulier",
        description: "Een formulier waar bezoekers zich kunnen aanmelden voor uw nieuwsbrief.",
        steps: [
          "Schakel de Nieuwsbrief widget aan",
          "Het aanmeldformulier verschijnt op de ingestelde locatie",
          "Bezoekers vullen hun e-mailadres in en klikken op 'Aanmelden'",
        ],
      },
      {
        title: "Social Media Links",
        description: "Toon iconen van uw social media kanalen in de footer van de website.",
        steps: [
          "Schakel Social Media Links aan",
          "Vul de URLs in van uw Facebook, Instagram, LinkedIn, etc.",
          "De iconen verschijnen automatisch in de footer",
          "Bezoekers kunnen erop klikken om direct naar uw profiel te gaan",
        ],
      },
      {
        title: "Cookie Melding",
        description: "Een popup die bezoekers informeert over het gebruik van cookies op uw website.",
        steps: [
          "Schakel de Cookie Melding aan",
          "Pas de tekst aan naar uw wens",
          "De melding verschijnt eenmalig voor nieuwe bezoekers",
          "Na acceptatie wordt de melding niet meer getoond",
        ],
      },
    ],
  },
  {
    id: "commercieel",
    title: "Commercieel",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.75.75 0 0 1-1.025-.275l-.059-.1a20.733 20.733 0 0 1-1.39-3.216m3.55-6.093a20.867 20.867 0 0 1-1.39 3.216l-.059.1a.75.75 0 0 1-1.025.275l-.657-.38c-.524-.301-.71-.962-.463-1.511.4-.891.732-1.82.985-2.783m8.18 0a20.362 20.362 0 0 0-.498-3.59A2.25 2.25 0 0 0 15.002 6h-.32a2.25 2.25 0 0 0-2.169 1.658 20.37 20.37 0 0 0-.498 3.59m5.156 0H12.015m5.156 0a20.198 20.198 0 0 1-.155 3.252m-5 0a20.198 20.198 0 0 0 .155-3.252" />
      </svg>
    ),
    items: [
      {
        title: "Wat zijn commerciele gebieden?",
        description: "Commerciele gebieden zijn promotionele zones op uw website waar u aanbiedingen, acties of reclame kunt tonen.",
      },
      {
        title: "Banner",
        description: "Een grote promotiebanner, bijvoorbeeld op de homepage. Ideaal voor seizoensaanbiedingen of nieuwe producten.",
        steps: [
          "Ga naar Commercieel in het linkermenu",
          "Klik op de Banner zone",
          "Vul de inhoud in: titel, beschrijving en afbeelding",
          "Voeg een link toe naar de gewenste pagina",
          "Schakel de banner aan of uit met de toggle",
        ],
      },
      {
        title: "Popup",
        description: "Een promotionele popup die verschijnt wanneer bezoekers uw website bezoeken.",
        steps: [
          "Configureer de popup inhoud en afbeelding",
          "Stel in naar welke pagina de popup linkt",
          "Schakel de popup aan of uit",
          "Tip: gebruik popups spaarzaam, te veel popups kunnen bezoekers irriteren",
        ],
      },
      {
        title: "Inline promotie",
        description: "Promotie-elementen die verschijnen binnen productpagina's, tussen de producten.",
        steps: [
          "Ideaal voor cross-selling of gerelateerde aanbiedingen",
          "Stel de inhoud en link in",
          "Verschijnt automatisch op de ingestelde locatie",
        ],
      },
      {
        title: "Sidebar promotie",
        description: "Promotie-elementen in de zijbalk van uw website.",
        steps: [
          "Configureer de inhoud voor de zijbalk",
          "Voeg een afbeelding en link toe",
          "Ideaal voor langlopende acties of aankondigingen",
          "Schakel aan of uit met de toggle",
        ],
      },
    ],
  },
  {
    id: "csv",
    title: "CSV Import/Export",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    items: [
      {
        title: "Wat is CSV?",
        description: "CSV staat voor 'Comma-Separated Values'. Het is een eenvoudig bestandsformaat dat u kunt openen en bewerken in Excel of Google Sheets. Het is de makkelijkste manier om veel producten tegelijk toe te voegen.",
      },
      {
        title: "Producten exporteren",
        description: "Download al uw bestaande producten als CSV bestand.",
        steps: [
          "Ga naar Producten in het linkermenu",
          "Klik op de 'Export CSV' knop (het download-icoon)",
          "Er wordt automatisch een CSV bestand gedownload",
          "Open het bestand in Excel of Google Sheets om het te bekijken",
          "Dit bestand kunt u ook gebruiken als back-up",
        ],
      },
      {
        title: "Demo CSV downloaden",
        description: "Download een voorbeeld CSV bestand om te zien hoe het formaat eruitziet voordat u uw eigen data invult.",
        steps: [
          "Ga naar Producten > klik op 'Import CSV'",
          "Klik op 'Download Voorbeeld' om het demo CSV bestand te downloaden",
          "Open het bestand in Excel of Google Sheets",
          "U ziet de kolomnamen (naam, beschrijving, categorie, etc.)",
          "Vul uw eigen productgegevens in onder de kolomnamen",
          "Sla het bestand op als CSV (niet als .xlsx!)",
        ],
      },
      {
        title: "CSV importeren - stap voor stap",
        description: "Zo voegt u meerdere producten tegelijk toe via een CSV bestand.",
        steps: [
          "Stap 1: Download het voorbeeld CSV bestand (zie hierboven)",
          "Stap 2: Open het bestand in Excel of Google Sheets",
          "Stap 3: Vul elke rij in met productgegevens (een product per rij)",
          "Stap 4: Sla op als CSV bestand (Bestand > Opslaan als > CSV)",
          "Stap 5: Ga naar Producten > klik op 'Import CSV'",
          "Stap 6: Selecteer uw CSV bestand",
          "Stap 7: Het systeem toont een voorbeeld van de data",
          "Stap 8: Controleer of alles er goed uitziet en bevestig de import",
        ],
      },
      {
        title: "Veelgemaakte fouten bij CSV import",
        description: "Voorkom problemen bij het importeren door op deze punten te letten.",
        steps: [
          "Sla het bestand op als .csv, NIET als .xlsx of .xls",
          "Gebruik komma's of puntkomma's als scheidingsteken (afhankelijk van uw regio-instellingen)",
          "Zorg dat de kolomnamen exact overeenkomen met het voorbeeld",
          "Laat geen verplichte velden leeg (naam is altijd verplicht)",
          "Speciale tekens en accenten zijn toegestaan",
          "Bij meerdere waarden (bijv. tags) scheidt u ze met een puntkomma (;)",
        ],
      },
    ],
  },
];

export default function DocumentatiePage() {
  const [activeSection, setActiveSection] = useState("dashboard");
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
