import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { AboutSection } from "@/components/sections/about";
import { CTASection } from "@/components/sections/cta";
import { ContactSection } from "@/components/sections/contact";

export default function WatWijDoenPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
