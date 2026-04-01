"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const portfolioData: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  client: string;
  date: string;
  services: string[];
}> = {
  pf1: { title: "Rebranding Fernandes Groep", description: "Complete merkidentiteit vernieuwing inclusief logo, huisstijl en drukwerk.", longDescription: "Fernandes Groep wilde een moderne uitstraling die hun groei en innovatie weerspiegelt. We hebben een volledig nieuw logo, kleurenpalet, en huisstijl ontwikkeld. Het project omvatte ook visitekaartjes, briefpapier, enveloppen en een brand guideline document. Het resultaat is een tijdloos en professioneel merk dat de waarden van het bedrijf perfect vertegenwoordigt.", category: "branding", tags: ["Logo", "Huisstijl", "Drukwerk"], client: "Fernandes Groep N.V.", date: "Augustus 2024", services: ["Logo Ontwerp", "Huisstijl Ontwikkeling", "Visitekaartjes", "Briefpapier", "Brand Guidelines"] },
  pf2: { title: "Event Merchandise SuriPop", description: "T-shirts, banners en promotional items voor SuriPop festival.", longDescription: "Voor het jaarlijkse SuriPop muziekfestival hebben we een complete merchandise lijn ontworpen en geproduceerd. Dit omvatte event T-shirts in 5 kleuren, grote banners voor het podium, VIP badges, en promotional flyers. Elk item werd zorgvuldig ontworpen om de energie en sfeer van het festival over te brengen.", category: "evenement", tags: ["Festival", "Merchandise", "T-shirts"], client: "SuriPop Foundation", date: "Juni 2024", services: ["T-shirt Design", "Banner Productie", "VIP Badges", "Flyers", "Merchandise"] },
  pf3: { title: "Voertuig Wrap - Taxi Fleet", description: "Volledige voertuigbelettering voor 15 taxi's in Paramaribo.", longDescription: "Een grootschalig project voor een taxibedrijf in Paramaribo. Alle 15 voertuigen zijn voorzien van full-wrap belettering met het nieuwe bedrijfslogo en contactgegevens. Het ontwerp is opvallend en professioneel, en zorgt ervoor dat het merk dagelijks door duizenden mensen wordt gezien.", category: "signage", tags: ["Voertuig", "Wrap", "Fleet"], client: "Paramaribo Taxi Service", date: "April 2024", services: ["Ontwerp", "Full Wrap", "Installatie", "Fleet Branding"] },
  pf4: { title: "Packaging Design - SuriSpice", description: "Verpakkingsontwerp voor nieuwe kruidenlijn.", longDescription: "SuriSpice lanceerde een nieuwe lijn van Surinaamse kruiden voor de internationale markt. We ontwierpen de volledige verpakkingslijn met authentieke Surinaamse elementen en moderne typografie. Het resultaat is een aantrekkelijke verpakking die opvalt in het schap en de kwaliteit van het product weerspiegelt.", category: "verpakking", tags: ["Verpakking", "Food", "Export"], client: "SuriSpice B.V.", date: "Maart 2024", services: ["Verpakkingsontwerp", "Label Design", "Productfotografie", "Mockups"] },
  pf5: { title: "Gevelreclame Restaurant Javaans", description: "LED gevelreclame en raambelettering.", longDescription: "Voor Restaurant Javaans hebben we een opvallende LED gevelreclame ontworpen en geinstalleerd, aangevuld met stijlvolle raambelettering die het Javaanse thema weerspiegelt. De verlichte letters zijn zichtbaar vanuit de hele straat en trekken voorbijgangers aan.", category: "signage", tags: ["LED", "Gevel", "Restaurant"], client: "Restaurant Javaans", date: "Januari 2024", services: ["LED Gevelreclame", "Raambelettering", "Ontwerp", "Installatie"] },
  pf6: { title: "Social Media Campagne TeleSur", description: "Maandelijkse social media content creatie.", longDescription: "Een doorlopend project voor TeleSur waarbij we maandelijks social media content creeren voor Facebook, Instagram en TikTok. De campagne focust op het bereiken van een jonger publiek met dynamische en visueel aantrekkelijke content die de diensten van TeleSur onder de aandacht brengt.", category: "digitaal", tags: ["Social Media", "Campagne", "Content"], client: "TeleSur N.V.", date: "September 2024", services: ["Content Creatie", "Social Media Design", "Advertenties", "Strategie"] },
  pf7: { title: "Visitekaartjes & Briefpapier KKF", description: "Zakelijk drukwerk ontwerp en productie voor KKF.", longDescription: "Professioneel zakelijk drukwerk ontworpen en geproduceerd voor de Kamer van Koophandel en Fabrieken. Visitekaartjes, briefpapier en enveloppen in een consistente huisstijl met luxe afwerking.", category: "drukwerk", tags: ["Visitekaartjes", "Briefpapier", "Zakelijk"], client: "KKF", date: "November 2023", services: ["Visitekaartjes", "Briefpapier", "Enveloppen", "Offsetdruk"] },
  pf8: { title: "Roll-Up Banners CBvS", description: "Dubbelzijdige roll-up banners voor evenementen en beurzen.", longDescription: "Ontwerp en productie van dubbelzijdige roll-up banners voor de Centrale Bank van Suriname. De banners worden gebruikt op evenementen, beurzen en in het hoofdkantoor. Hoge resolutie print op premium materiaal.", category: "signage", tags: ["Banners", "Roll-Up", "Evenement"], client: "CBvS", date: "Oktober 2023", services: ["Banner Ontwerp", "Groot Formaat Print", "Roll-Up Systeem"] },
};

export default function PortfolioDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const item = portfolioData[id];

  if (!item) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Project niet gevonden</h1>
            <p className="text-muted-foreground mb-6">Dit portfolio item bestaat niet.</p>
            <Link href="/portfolio">
              <Button>Terug naar Portfolio</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Get adjacent projects for navigation
  const ids = Object.keys(portfolioData);
  const currentIdx = ids.indexOf(id);
  const prevId = currentIdx > 0 ? ids[currentIdx - 1] : null;
  const nextId = currentIdx < ids.length - 1 ? ids[currentIdx + 1] : null;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto px-4 md:px-6 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              <Link href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              <span className="text-foreground font-medium truncate">{item.title}</span>
            </div>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="aspect-[21/9] max-h-[500px] bg-gradient-to-br from-primary/10 to-brand-teal/10 flex items-center justify-center rounded-b-2xl overflow-hidden">
              <svg className="h-20 w-20 text-muted-foreground/15" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
              {/* Main content */}
              <div>
                <Badge className="capitalize mb-4 border-0 bg-primary/10 text-primary">{item.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{item.title}</h1>
                <p className="text-lg text-muted-foreground mb-8">{item.description}</p>

                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground/80 leading-relaxed">{item.longDescription}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="rounded-xl border p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Project Details</h3>
                  <Separator />
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Klant</p>
                      <p className="text-sm font-medium text-foreground">{item.client}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Datum</p>
                      <p className="text-sm font-medium text-foreground">{item.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Categorie</p>
                      <p className="text-sm font-medium text-foreground capitalize">{item.category}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Diensten</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.services.map((s) => (
                        <span key={s} className="px-2 py-1 rounded-md bg-muted text-[10px] font-medium text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-xl border p-5 bg-primary/5 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Geinteresseerd?</h3>
                  <p className="text-xs text-muted-foreground">Wilt u een soortgelijk project? Neem contact met ons op voor een vrijblijvende offerte.</p>
                  <Link href="#contact" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors w-full justify-center">
                    Offerte Aanvragen
                  </Link>
                </div>
              </div>
            </div>

            {/* Project navigation */}
            <Separator className="my-12" />
            <div className="flex items-center justify-between">
              {prevId ? (
                <Link href={`/portfolio/${prevId}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Vorig Project
                </Link>
              ) : <div />}
              <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Alle Projecten
              </Link>
              {nextId ? (
                <Link href={`/portfolio/${nextId}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Volgend Project
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
