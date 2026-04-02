import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getSettings } from "@/lib/actions/settings";

const defaultStats = [
  { value: "100+", label: "Projecten" },
  { value: "50+", label: "Tevreden Klanten" },
  { value: "5+", label: "Jaar Ervaring" },
  { value: "24u", label: "Snelle Levering" },
];

export async function AboutSection() {
  const settings = await getSettings("about");

  const title = settings.about_title || "Wij Zijn Mindcraft Creatives";
  const text1 = settings.about_text1 || "Gevestigd in Paramaribo, Suriname, zijn wij een creatief bureau dat gepassioneerd is over design en drukwerk. Wij helpen bedrijven om zich te onderscheiden met opvallende visuele communicatie.";
  const text2 = settings.about_text2 || "Van logo ontwerp en complete huisstijlen tot sticker prints en grote signage projecten — wij leveren kwaliteit met aandacht voor detail en snelle doorlooptijden.";
  const aboutImage = settings.about_image || "";

  const stats = [
    { value: settings.stat1_value || defaultStats[0].value, label: settings.stat1_label || defaultStats[0].label },
    { value: settings.stat2_value || defaultStats[1].value, label: settings.stat2_label || defaultStats[1].label },
    { value: settings.stat3_value || defaultStats[2].value, label: settings.stat3_label || defaultStats[2].label },
    { value: settings.stat4_value || defaultStats[3].value, label: settings.stat4_label || defaultStats[3].label },
  ];

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
              {title.includes("Mindcraft") ? (
                <>
                  {title.split("Mindcraft")[0]}
                  <span className="text-primary">Mindcraft{title.split("Mindcraft")[1]}</span>
                </>
              ) : (
                title
              )}
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {text1}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {text2}
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

          {/* Right: image or placeholder */}
          <div className="relative">
            {aboutImage ? (
              <div className="aspect-square rounded-2xl overflow-hidden border border-primary/10 shadow-lg">
                <Image
                  src={aboutImage}
                  alt={title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
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
                </div>
              </div>
            )}
            <div className="absolute -z-10 -bottom-4 -right-4 h-full w-full rounded-2xl bg-primary/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
