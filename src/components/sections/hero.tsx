import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Diagonal background shape */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-white/5" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-white/5" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 py-20 md:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Accent dots */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-yellow" />
            <div className="h-2.5 w-2.5 rounded-full bg-brand-green" />
            <div className="h-2.5 w-2.5 rounded-full bg-brand-teal" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Creatief Ontwerp
            <br />
            <span className="text-white/80">Dat Indruk Maakt</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl mx-auto">
            Van grafisch ontwerp tot drukwerk en signage — wij brengen uw visie
            tot leven met opvallende en professionele creaties.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center h-11 rounded-md px-8 bg-white text-primary font-semibold text-base shadow-lg hover:bg-white/90 transition-colors"
            >
              Offerte Aanvragen
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center h-11 rounded-md px-8 border border-white/30 bg-transparent text-white font-semibold text-base hover:bg-white/10 transition-colors"
            >
              Bekijk Ons Werk
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
