import { getPublicPortfolioItems, getPublicPortfolioBySlug } from "@/lib/actions/portfolio";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  try {
    const items = await getPublicPortfolioItems();
    return items.map((item: typeof items[number]) => ({ id: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPublicPortfolioBySlug(id);
  if (!item) return { title: "Project niet gevonden" };
  return {
    title: item.metaTitle || `${item.title} | Mindcraft Creatives`,
    description: item.metaDescription || item.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPublicPortfolioBySlug(id);

  if (!item) {
    notFound();
  }

  // If accessed by ID instead of slug, redirect to canonical slug URL
  if (item.slug !== id) {
    redirect(`/portfolio/${item.slug}`);
  }

  // Get adjacent projects for navigation
  const allItems = await getPublicPortfolioItems();
  const currentIdx = allItems.findIndex((i: typeof allItems[number]) => i.slug === id);
  const prevItem = currentIdx > 0 ? allItems[currentIdx - 1] : null;
  const nextItem = currentIdx < allItems.length - 1 ? allItems[currentIdx + 1] : null;

  const tags = (item.tags as string[]) || [];

  return (
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
              <Badge className="capitalize mb-4 border-0 bg-primary/10 text-primary">
                {item.category?.name}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{item.title}</h1>
              <p className="text-lg text-muted-foreground mb-8">{item.description}</p>

              {item.longDescription && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground/80 leading-relaxed">{item.longDescription}</p>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8">
                  {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-xl border p-5 space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Project Details</h3>
                <Separator />
                <div className="space-y-3">
                  {item.client && (
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Klant</p>
                      <p className="text-sm font-medium text-foreground">{item.client}</p>
                    </div>
                  )}
                  {item.date && (
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Datum</p>
                      <p className="text-sm font-medium text-foreground">{item.date}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Categorie</p>
                    <p className="text-sm font-medium text-foreground capitalize">{item.category?.name}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl border p-5 bg-primary/5 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Geinteresseerd?</h3>
                <p className="text-xs text-muted-foreground">
                  Wilt u een soortgelijk project? Neem contact met ons op voor een vrijblijvende offerte.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors w-full justify-center"
                >
                  Offerte Aanvragen
                </Link>
              </div>
            </div>
          </div>

          {/* Project navigation */}
          <Separator className="my-12" />
          <div className="flex items-center justify-between">
            {prevItem ? (
              <Link href={`/portfolio/${prevItem.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Vorig Project
              </Link>
            ) : <div />}
            <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Alle Projecten
            </Link>
            {nextItem ? (
              <Link href={`/portfolio/${nextItem.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
  );
}
