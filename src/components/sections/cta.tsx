import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-white/[0.02]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Klaar Om Uw Project Te Starten?
        </h2>
        <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">
          Neem vandaag nog contact met ons op voor een vrijblijvende offerte.
          Wij denken graag met u mee!
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center h-11 rounded-md px-8 bg-white text-primary font-semibold text-base shadow-lg hover:bg-white/90 transition-colors"
          >
            Neem Contact Op
          </Link>
          <a
            href="https://wa.me/5978581854"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 rounded-md px-8 border border-white/30 bg-transparent text-white font-semibold text-base hover:bg-white/10 transition-colors"
          >
            WhatsApp Ons
          </a>
        </div>
      </div>
    </section>
  );
}
