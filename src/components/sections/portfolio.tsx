import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const portfolioItems = [
  {
    title: "Sticker Print - Duncan's Gold",
    category: "Stickers",
    color: "bg-brand-yellow/10 text-brand-yellow",
    bgColor: "bg-gradient-to-br from-primary/5 to-primary/10",
  },
  {
    title: "Bedrijfslogo Ontwerp",
    category: "Branding",
    color: "bg-brand-green/10 text-brand-green",
    bgColor: "bg-gradient-to-br from-brand-green/5 to-brand-green/10",
  },
  {
    title: "Banner & Signage",
    category: "Signage",
    color: "bg-brand-teal/10 text-brand-teal",
    bgColor: "bg-gradient-to-br from-brand-teal/5 to-brand-teal/10",
  },
  {
    title: "Social Media Campagne",
    category: "Digital",
    color: "bg-primary/10 text-primary",
    bgColor: "bg-gradient-to-br from-primary/5 to-brand-yellow/5",
  },
  {
    title: "Flyer & Brochure Design",
    category: "Print",
    color: "bg-brand-yellow/10 text-brand-yellow",
    bgColor: "bg-gradient-to-br from-brand-yellow/5 to-brand-yellow/10",
  },
  {
    title: "Visitekaartjes Drukwerk",
    category: "Print",
    color: "bg-brand-green/10 text-brand-green",
    bgColor: "bg-gradient-to-br from-brand-green/5 to-brand-teal/5",
  },
];

export function PortfolioSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card
              key={item.title}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Placeholder for project image */}
              <div
                className={`aspect-[4/3] ${item.bgColor} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="text-center p-6">
                  <div className="h-16 w-16 mx-auto rounded-xl bg-white/80 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-primary font-bold text-2xl">M</span>
                  </div>
                  <p className="text-sm font-medium text-foreground/60">
                    Afbeelding binnenkort
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-foreground">
                    {item.title}
                  </h3>
                  <Badge variant="outline" className={`text-[10px] ${item.color} border-0`}>
                    {item.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
