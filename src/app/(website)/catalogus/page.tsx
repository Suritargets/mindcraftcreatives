import { getPublicProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import CatalogusClient from "./catalogus-client";

// Curated quick-access icon categories (popular subcategories for icon row)
const quickCategories = [
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
  { name: "Schorten", slug: "schorten", icon: "apron" },
  { name: "Power Banks", slug: "power-banks", icon: "gadget" },
  { name: "Promo Ideeën", slug: "promo-ideeen", icon: "idea" },
];

export default async function CatalogusPage() {
  const [rawProducts, rawCategories] = await Promise.all([
    getPublicProducts(),
    getCategories("PRODUCT" as const),
  ]);

  // Map products to client format
  const products = rawProducts.map((p) => ({
    slug: p.slug,
    name: p.name,
    categorySlug: p.category?.slug ?? "",
    subcategory: p.subcategory,
    description: p.description,
    minOrder: p.minOrder,
  }));

  // Map categories with subcategories to client format
  const categories = rawCategories.map((c) => ({
    name: c.name,
    slug: c.slug,
    icon: c.icon ?? "folder",
    subcategories: c.children.map((sub) => ({
      name: sub.name,
      slug: sub.slug,
    })),
  }));

  return (
    <CatalogusClient
      products={products}
      categories={categories}
      quickCategories={quickCategories}
    />
  );
}
