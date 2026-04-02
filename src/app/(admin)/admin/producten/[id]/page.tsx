import { getProduct } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { notFound } from "next/navigation";
import ProductEditClient from "./product-edit-client";

export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories("PRODUCT" as const),
  ]);

  if (!product) {
    notFound();
  }

  // Serialize for client
  const serializedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    longDescription: product.longDescription || "",
    minOrder: product.minOrder,
    categoryId: product.categoryId,
    subcategory: product.subcategory || "",
    status: product.status,
    featuredImage: product.featuredImage || "",
    gallery: (product.gallery as string[]) || [],
    printMethods: (product.printMethods as string[]) || [],
    advantages: (product.advantages as string[]) || [],
    metaTitle: product.metaTitle || "",
    metaDescription: product.metaDescription || "",
    sortOrder: product.sortOrder,
    specs: product.specs.map((s: typeof product.specs[number]) => ({
      id: s.id,
      label: s.label,
      values: s.values as string[],
      sortOrder: s.sortOrder,
    })),
  };

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

  return (
    <ProductEditClient
      product={serializedProduct}
      categories={serializedCategories}
    />
  );
}
