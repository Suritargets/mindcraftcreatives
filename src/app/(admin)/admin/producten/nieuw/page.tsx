import { getCategories } from "@/lib/actions/categories";
import ProductNewClient from "./product-new-client";

export default async function NieuwProductPage() {
  const categories = await getCategories("PRODUCT" as const);

  const serializedCategories = categories.map((c: typeof categories[number]) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    children: c.children.map((sub: typeof c.children[number]) => ({
      id: sub.id,
      name: sub.name,
      slug: sub.slug,
    })),
  }));

  return <ProductNewClient categories={serializedCategories} />;
}
