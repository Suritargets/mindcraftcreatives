"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { QuoteCartSheet } from "@/components/catalog/quote-cart-sheet";

export interface HeaderCategory {
  name: string;
  slug: string;
  subcategories: { name: string; slug: string }[];
}

export interface HeaderMenuItem {
  id: string;
  label: string;
  href: string;
  children?: HeaderMenuItem[];
}

const defaultMainMenu: HeaderMenuItem[] = [
  { id: "d1", label: "Catalogus", href: "/catalogus" },
  { id: "d2", label: "Wat Wij Doen", href: "/wat-wij-doen" },
  { id: "d3", label: "Portfolio", href: "/portfolio" },
];

export function Header({
  categories = [],
  logoHref = "/catalogus",
  mainMenu,
  footerMenu: _footerMenu,
}: {
  categories?: HeaderCategory[];
  logoHref?: string;
  mainMenu?: HeaderMenuItem[];
  footerMenu?: HeaderMenuItem[];
}) {
  const navItems = mainMenu && mainMenu.length > 0 ? mainMenu : defaultMainMenu;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close mega menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ===== TOP BAR (dark, announcement + social) ===== */}
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-9">
          <p className="text-xs text-background/70 truncate">
            Mindcraft Creatives — Uw creatieve partner voor promotioneel materiaal en drukwerk in Suriname.
          </p>
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://www.facebook.com/mindcraftcreatives"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/50 hover:text-background transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://wa.me/5978581854"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/50 hover:text-background transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
            <a
              href="mailto:info@mindcraftcreatives.com"
              className="text-background/50 hover:text-background transition-colors"
              aria-label="Email"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ===== LOGO BAR (logo + search) ===== */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 md:px-6 flex items-center justify-between h-12 md:h-14 gap-2 md:gap-4">
          {/* Logo */}
          <Link href={logoHref} className="shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Mindcraft Creatives"
              width={200}
              height={50}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Search bar (desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl items-center">
            <div className="relative w-full flex">
              <Input
                type="search"
                placeholder="Zoek producten..."
                className="rounded-r-none border-r-0 h-10"
              />
              <button className="h-10 px-4 bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors flex items-center justify-center shrink-0">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: contact + mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Contact
            </Link>

            {/* Quote cart */}
            <QuoteCartSheet />

            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <div className="flex flex-col gap-1 mt-8">
                  {/* Mobile search */}
                  <div className="px-1 mb-4">
                    <div className="relative flex">
                      <Input type="search" placeholder="Zoek producten..." className="rounded-r-none border-r-0 h-9" />
                      <button className="h-9 px-3 bg-primary text-white rounded-r-md">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {navItems.map((item: typeof navItems[number], index: number) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-3 text-base font-medium transition-colors rounded-md hover:bg-accent ${
                        index === 0
                          ? "text-primary hover:text-primary/80"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <Separator className="my-3" />
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Categorieën</p>
                  {categories.map((cat) => (
                    <Link key={cat.slug} href={`/catalogus?categorie=${cat.slug}`} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-foreground hover:text-primary transition-colors rounded-md hover:bg-accent">
                      {cat.name}
                    </Link>
                  ))}
                  <Separator className="my-3" />
                  <Button asChild className="w-full">
                    <Link href="#contact" onClick={() => setMobileOpen(false)}>Offerte Aanvragen</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ===== NAV BAR (Categories button + links) ===== */}
      <div className="hidden lg:block bg-white border-b" ref={triggerRef}>
        <div className="container mx-auto px-4 md:px-6 flex items-center">
          {/* Categories mega menu trigger */}
          <button
            onClick={() => setMegaOpen(!megaOpen)}
            className="flex items-center gap-2 h-11 px-5 bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shrink-0 rounded-none"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            Categorieën
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Nav links */}
          <nav className="flex items-center">
            {navItems.map((item: typeof navItems[number], index: number) => (
              <Link
                key={item.id}
                href={item.href}
                className={`h-11 px-5 flex items-center text-sm font-medium transition-colors ${
                  index === 0
                    ? "text-foreground hover:text-primary relative"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
                {index === 0 && (
                  <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ===== MEGA MENU DROPDOWN (full width) ===== */}
      {megaOpen && (
        <div className="hidden lg:block absolute left-0 right-0 z-50 bg-white border-b shadow-xl" ref={megaRef}>
          <div className="container mx-auto px-4 md:px-6 flex">
            {/* Left: category list */}
            <div className="w-64 shrink-0 border-r bg-muted/30 py-2">
              {categories.map((cat, i) => (
                <button
                  key={cat.slug}
                  onMouseEnter={() => setActiveCategory(i)}
                  className={`w-full flex items-center justify-between px-5 py-2.5 text-sm text-left transition-colors ${
                    activeCategory === i
                      ? "bg-primary/5 text-primary font-medium"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Link
                    href={`/catalogus?categorie=${cat.slug}`}
                    onClick={() => setMegaOpen(false)}
                    className="flex-1"
                  >
                    {cat.name}
                  </Link>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Right: subcategories (full remaining width) */}
            <div className="flex-1 py-6 px-8">
              <div className="grid grid-cols-3 gap-x-12 gap-y-1">
                {/* Group subcategories under category name */}
                {categories[activeCategory]?.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/catalogus?categorie=${categories[activeCategory].slug}&sub=${sub.slug}`}
                    onClick={() => setMegaOpen(false)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-1.5"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>

              <Separator className="my-5" />

              <div className="flex items-center justify-between">
                <Link
                  href={`/catalogus?categorie=${categories[activeCategory]?.slug}`}
                  onClick={() => setMegaOpen(false)}
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Bekijk alle {categories[activeCategory]?.name} →
                </Link>
                <Link
                  href="/catalogus"
                  onClick={() => setMegaOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Volledige catalogus bekijken
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
