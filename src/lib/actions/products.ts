"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  const products = await db.product.findMany({
    include: {
      category: true,
      specs: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });
  return products;
}

export async function getProduct(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      category: true,
      specs: { orderBy: { sortOrder: "asc" } },
    },
  });
  return product;
}

export async function getProductBySlug(slug: string) {
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      specs: { orderBy: { sortOrder: "asc" } },
    },
  });
  return product;
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

  const product = await db.product.create({
    data: {
      ...productData,
      gallery: productData.gallery || [],
      printMethods: productData.printMethods || [],
      advantages: productData.advantages || [],
      tags: productData.tags || [],
      status: productData.status || "ACTIEF",
      specs: specs
        ? {
            create: specs.map((s, i) => ({
              label: s.label,
              values: s.values,
              sortOrder: i,
            })),
          }
        : undefined,
    },
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

  // Update specs if provided
  if (specs) {
    await db.productSpec.deleteMany({ where: { productId: id } });
    await db.productSpec.createMany({
      data: specs.map((s, i) => ({
        productId: id,
        label: s.label,
        values: s.values,
        sortOrder: i,
      })),
    });
  }

  const product = await db.product.update({
    where: { id },
    data: productData,
  });

  revalidatePath("/admin/producten");
  revalidatePath(`/admin/producten/${id}`);
  return product;
}

export async function deleteProduct(id: string) {
  await db.product.delete({ where: { id } });
  revalidatePath("/admin/producten");
}

// ─── Public queries (filtered by status) ───

export async function getPublicProducts() {
  return db.product.findMany({
    where: { status: "ACTIEF" },
    include: {
      category: true,
      specs: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublicProductBySlug(slugOrId: string) {
  // Try slug first
  const bySlug = await db.product.findUnique({
    where: { slug: slugOrId, status: "ACTIEF" },
    include: {
      category: true,
      specs: { orderBy: { sortOrder: "asc" } },
    },
  });
  if (bySlug) return bySlug;

  // Fallback: try by ID (for old/admin links)
  return db.product.findFirst({
    where: { id: slugOrId, status: "ACTIEF" },
    include: {
      category: true,
      specs: { orderBy: { sortOrder: "asc" } },
    },
  });
}
