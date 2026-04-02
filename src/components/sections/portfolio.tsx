import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getPublicPortfolioItems } from "@/lib/actions/portfolio";
import { PortfolioSlider } from "./portfolio-slider";

export async function PortfolioSection() {
  const items = await getPublicPortfolioItems();

  const sliderItems = items.map((item: typeof items[number]) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    categoryName: item.category?.name ?? "",
  }));

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Ons Recente Werk
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Een selectie van projecten waar wij trots op zijn. Van sticker prints
            tot complete merkidentiteiten.
          </p>
        </div>

        <PortfolioSlider items={sliderItems} />

        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Bekijk alle projecten
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
