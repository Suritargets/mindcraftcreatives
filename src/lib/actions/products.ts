"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { and, asc, eq } from "drizzle-orm";
import { productSpecs, products, type Category, type Product, type ProductSpec } from "@/drizzle/schema";

type ProductWithRelations = Product & { category: Category; specs: ProductSpec[] };
type NormalizedProductSpec = Omit<ProductSpec, "values"> & { values: string[] };
type NormalizedProduct = Omit<ProductWithRelations, "gallery" | "printMethods" | "advantages" | "tags" | "specs"> & {
  gallery: string[];
  printMethods: string[];
  advantages: string[];
  tags: string[];
  specs: NormalizedProductSpec[];
};

function normalizeProduct(p: ProductWithRelations): NormalizedProduct {
  return {
    ...p,
    gallery: p.gallery ?? [],
    printMethods: p.printMethods ?? [],
    advantages: p.advantages ?? [],
    tags: p.tags ?? [],
    specs: p.specs.map((s) => ({ ...s, values: s.values ?? [] })),
  };
}

export async function getProducts() {
  const rows = await db.query.products.findMany({
    with: {
      category: true,
      specs: { orderBy: asc(productSpecs.sortOrder) },
    },
    orderBy: asc(products.sortOrder),
  });
  return rows.map(normalizeProduct);
}

export async function getProduct(id: string) {
  const row = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: true,
      specs: { orderBy: asc(productSpecs.sortOrder) },
    },
  });
  return row ? normalizeProduct(row) : row;
}

export async function getProductBySlug(slug: string) {
  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      category: true,
      specs: { orderBy: asc(productSpecs.sortOrder) },
    },
  });
  return row ? normalizeProduct(row) : row;
}

export async function createProduct(data: {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  minOrder: string;
  categoryId: string;
  subcategory?: string;
  status?: "ACTIEF" | "CONCEPT" | "GEARCHIVEERD";
  featuredImage?: string;
  gallery?: string[];
  printMethods?: string[];
  advantages?: string[];
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  specs?: { label: string; values: string[] }[];
}) {
  const { specs, ...productData } = data;

  const product = await db.transaction(async (tx) => {
    const [product] = await tx
      .insert(products)
      .values({
        ...productData,
        gallery: productData.gallery || [],
        printMethods: productData.printMethods || [],
        advantages: productData.advantages || [],
        tags: productData.tags || [],
        status: productData.status || "ACTIEF",
        updatedAt: new Date(),
      })
      .returning();

    if (specs?.length) {
      await tx.insert(productSpecs).values(
        specs.map((s, i) => ({
          productId: product.id,
          label: s.label,
          values: s.values,
          sortOrder: i,
        }))
      );
    }

    return product;
  });

  revalidatePath("/admin/producten");
  return product;
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    longDescription?: string;
    minOrder?: string;
    categoryId?: string;
    subcategory?: string;
    status?: "ACTIEF" | "CONCEPT" | "GEARCHIVEERD";
    featuredImage?: string | null;
    gallery?: string[];
    printMethods?: string[];
    advantages?: string[];
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
    specs?: { label: string; values: string[] }[];
  }
) {
  const { specs, ...productData } = data;

  // Update specs if provided (not transactional, matching prior behavior)
  if (specs) {
    await db.delete(productSpecs).where(eq(productSpecs.productId, id));
    if (specs.length) {
      await db.insert(productSpecs).values(
        specs.map((s, i) => ({
          productId: id,
          label: s.label,
          values: s.values,
          sortOrder: i,
        }))
      );
    }
  }

  const [product] = await db
    .update(products)
    .set({ ...productData, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning();

  revalidatePath("/admin/producten");
  revalidatePath(`/admin/producten/${id}`);
  return product;
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/producten");
}

// ─── Public queries (filtered by status) ───

export async function getPublicProducts() {
  const rows = await db.query.products.findMany({
    where: eq(products.status, "ACTIEF"),
    with: {
      category: true,
      specs: { orderBy: asc(productSpecs.sortOrder) },
    },
    orderBy: asc(products.sortOrder),
  });
  return rows.map(normalizeProduct);
}

export async function getPublicProductBySlug(slugOrId: string) {
  // Try slug first
  const bySlug = await db.query.products.findFirst({
    where: and(eq(products.slug, slugOrId), eq(products.status, "ACTIEF")),
    with: {
      category: true,
      specs: { orderBy: asc(productSpecs.sortOrder) },
    },
  });
  if (bySlug) return normalizeProduct(bySlug);

  // Fallback: try by ID (for old/admin links)
  const byId = await db.query.products.findFirst({
    where: and(eq(products.id, slugOrId), eq(products.status, "ACTIEF")),
    with: {
      category: true,
      specs: { orderBy: asc(productSpecs.sortOrder) },
    },
  });
  return byId ? normalizeProduct(byId) : byId;
}
