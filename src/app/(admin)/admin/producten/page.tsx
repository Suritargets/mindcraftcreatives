import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import ProductenClient from "./producten-client";
import type { ProductItem, CategoryOption } from "./producten-client";

export default async function ProductenPage() {
  const [rawProducts, rawCategories] = await Promise.all([
    getProducts(),
    getCategories("PRODUCT" as const),
  ]);

  const statusMap: Record<string, "actief" | "concept" | "gearchiveerd"> = {
    ACTIEF: "actief",
    CONCEPT: "concept",
    GEARCHIVEERD: "gearchiveerd",
  };

  const products: ProductItem[] = rawProducts.map((p: typeof rawProducts[number]) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    categoryId: p.categoryId,
    categoryName: p.category?.name ?? "—",
    subcategory: p.subcategory ?? null,
    minOrder: p.minOrder,
    status: statusMap[p.status] ?? "actief",
    specsCount: p.specs?.length ?? 0,
  }));

  const categories: CategoryOption[] = rawCategories.map((c: typeof rawCategories[number]) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return <ProductenClient products={products} categories={categories} />;
}
