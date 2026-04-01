import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const stats = [
  { value: "100+", label: "Projecten" },
  { value: "50+", label: "Tevreden Klanten" },
  { value: "5+", label: "Jaar Ervaring" },
  { value: "24u", label: "Snelle Levering" },
];

export function AboutSection() {
  return (
    <section id="over-ons" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <div>
            <Badge variant="secondary" className="mb-4">
              Over Ons
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Wij Zijn{" "}
              <span className="text-primary">Mindcraft Creatives</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Gevestigd in Paramaribo, Suriname, zijn wij een creatief bureau dat
              gepassioneerd is over design en drukwerk. Wij helpen bedrijven om
              zich te onderscheiden met opvallende visuele communicatie.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Van logo ontwerp en complete huisstijlen tot sticker prints en
              grote signage projecten — wij leveren kwaliteit met aandacht voor
              detail en snelle doorlooptijden.
            </p>

            <Separator className="my-8" />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-24 w-24 mx-auto rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-bold text-5xl">M</span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">MINDCRAFT</p>
                  <p className="text-xs font-semibold tracking-widest text-primary">
                    CREATIVES
                  </p>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-brand-yellow" />
                  <div className="h-3 w-3 rounded-full bg-brand-green" />
                  <div className="h-3 w-3 rounded-full bg-brand-teal" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Logo wordt hier geplaatst
                </p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-4 -right-4 h-full w-full rounded-2xl bg-primary/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
