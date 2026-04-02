import { getPublicProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { getSettings } from "@/lib/actions/settings";
import CatalogusClient from "./catalogus-client";

// Fallback icons if nothing configured in settings
const defaultQuickCategories = [
  { name: "Pennen", slug: "pennen", icon: "pen" },
  { name: "Notitieboeken", slug: "notitieboeken", icon: "notebook" },
  { name: "Tote Bags", slug: "tote-bags", icon: "bag" },
  { name: "Waterflessen", slug: "waterflessen", icon: "bottle" },
  { name: "Rugzakken", slug: "rugzakken", icon: "backpack" },
  { name: "Paraplu's", slug: "paraplu", icon: "umbrella" },
  { name: "Travel Mugs", slug: "travel-mugs", icon: "mug" },
  { name: "Mokken", slug: "keramische-mokken", icon: "ceramicmug" },
  { name: "T-Shirts", slug: "t-shirts", icon: "tshirt" },
  { name: "Sleutelhangers", slug: "acryl-sleutelhangers", icon: "keychain" },
  { name: "Koeltassen", slug: "koeltassen", icon: "coolerbag" },
  { name: "Hoodies", slug: "hoodies", icon: "hoodie" },
];

export default async function CatalogusPage() {
  const [rawProducts, rawCategories, settings] = await Promise.all([
    getPublicProducts(),
    getCategories("PRODUCT" as const),
    getSettings("general"),
  ]);

  // Load quick categories from settings, fallback to defaults
  let quickCategories = defaultQuickCategories;
  try {
    const parsed = JSON.parse(settings.catalog_icons || "[]");
    const filtered = parsed.filter((i: { name: string }) => i.name?.trim());
    if (filtered.length > 0) quickCategories = filtered;
  } catch { /* use defaults */ }

  const mobileCols = parseInt(settings.catalog_icons_mobile_cols || "3", 10);
  const desktopCols = parseInt(settings.catalog_icons_desktop_cols || "4", 10);

  // Map products to client format
  const products = rawProducts.map((p: typeof rawProducts[number]) => ({
    slug: p.slug,
    name: p.name,
    categorySlug: p.category?.slug ?? "",
    subcategory: p.subcategory,
    description: p.description,
    minOrder: p.minOrder,
  }));

  // Map categories with subcategories to client format
  const categories = rawCategories.map((c: typeof rawCategories[number]) => ({
    name: c.name,
    slug: c.slug,
    icon: c.icon ?? "folder",
    subcategories: c.children.map((sub: typeof c.children[number]) => ({
      name: sub.name,
      slug: sub.slug,
    })),
  }));

  return (
    <CatalogusClient
      products={products}
      categories={categories}
      quickCategories={quickCategories}
      mobileCols={mobileCols}
      desktopCols={desktopCols}
      heroBadge={settings.catalog_hero_badge || "Promotie Materiaal"}
      heroTitle={settings.catalog_hero_title || "Promotioneel Materiaal Catalogus"}
      heroSubtitle={settings.catalog_hero_subtitle || "Ontdek onze collectie promotionele producten. Alles is volledig aan te passen met uw logo en huisstijl."}
      heroImage={settings.catalog_hero_image || ""}
      heroOverlayOpacity={parseInt(settings.catalog_hero_overlay || "60", 10)}
    />
  );
}
