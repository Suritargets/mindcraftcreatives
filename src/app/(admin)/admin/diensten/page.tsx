import { getServices } from "@/lib/actions/services";
import { getCategories } from "@/lib/actions/categories";
import { DienstenClient } from "./diensten-client";

export default async function DienstenPage() {
  const [services, categories] = await Promise.all([
    getServices(),
    getCategories("SERVICE"),
  ]);

  // Map to client-friendly format
  const serviceData = services.map((s: typeof services[number]) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    category: s.category.slug,
    categoryName: s.category.name,
    description: s.description,
    icon: s.icon,
    status: s.status.toLowerCase() as "actief" | "concept" | "gearchiveerd",
    features: s.features,
  }));

  const categoryData = categories.map((c: typeof categories[number]) => ({
    slug: c.slug,
    name: c.name,
  }));

  return <DienstenClient services={serviceData} categories={categoryData} />;
}
