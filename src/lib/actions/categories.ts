"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { and, asc, count, eq, inArray, isNull } from "drizzle-orm";
import { categories, categoryTypeEnum, portfolioItems, products, services } from "@/drizzle/schema";

export type CategoryType = (typeof categoryTypeEnum.enumValues)[number];

type CategoryCounts = { products: number; services: number; portfolioItems: number };

async function attachCategoryCounts<T extends { id: string }>(
  rows: T[]
): Promise<(T & { _count: CategoryCounts })[]> {
  const ids = rows.map((r) => r.id);
  if (ids.length === 0) return [];

  const [productCounts, serviceCounts, portfolioCounts] = await Promise.all([
    db
      .select({ categoryId: products.categoryId, value: count() })
      .from(products)
      .where(inArray(products.categoryId, ids))
      .groupBy(products.categoryId),
    db
      .select({ categoryId: services.categoryId, value: count() })
      .from(services)
      .where(inArray(services.categoryId, ids))
      .groupBy(services.categoryId),
    db
      .select({ categoryId: portfolioItems.categoryId, value: count() })
      .from(portfolioItems)
      .where(inArray(portfolioItems.categoryId, ids))
      .groupBy(portfolioItems.categoryId),
  ]);

  const toMap = (rows: { categoryId: string; value: number }[]) =>
    new Map(rows.map((r) => [r.categoryId, r.value]));
  const pMap = toMap(productCounts);
  const sMap = toMap(serviceCounts);
  const poMap = toMap(portfolioCounts);

  return rows.map((r) => ({
    ...r,
    _count: {
      products: pMap.get(r.id) ?? 0,
      services: sMap.get(r.id) ?? 0,
      portfolioItems: poMap.get(r.id) ?? 0,
    },
  }));
}

export async function getCategories(type?: CategoryType) {
  const rows = await db.query.categories.findMany({
    where: type
      ? and(eq(categories.type, type), isNull(categories.parentId))
      : isNull(categories.parentId),
    with: {
      children: { orderBy: asc(categories.sortOrder) },
    },
    orderBy: asc(categories.sortOrder),
  });
  return attachCategoryCounts(rows);
}

export async function getAllCategories(type?: CategoryType) {
  const rows = await db.query.categories.findMany({
    where: type ? eq(categories.type, type) : undefined,
    with: {
      children: true,
      parent: true,
    },
    orderBy: asc(categories.sortOrder),
  });
  return rows;
}

export async function getCategory(id: string) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: {
      children: { orderBy: asc(categories.sortOrder) },
      parent: true,
    },
  });
  if (!category) return null;
  const [withCounts] = await attachCategoryCounts([category]);
  return withCounts;
}

export async function createCategory(data: {
  name: string;
  slug: string;
  icon?: string;
  type: CategoryType;
  parentId?: string;
}) {
  const [category] = await db
    .insert(categories)
    .values({
      ...data,
      icon: data.icon || "folder",
      updatedAt: new Date(),
    })
    .returning();

  revalidatePath("/admin/categorieen");
  return category;
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    icon?: string;
    parentId?: string | null;
  }
) {
  const [category] = await db
    .update(categories)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(categories.id, id))
    .returning();

  revalidatePath("/admin/categorieen");
  return category;
}

export async function deleteCategory(id: string) {
  // Move children to parent or make them root
  const cat = await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: { children: true },
  });

  if (cat?.children.length) {
    await db
      .update(categories)
      .set({ parentId: cat.parentId, updatedAt: new Date() })
      .where(eq(categories.parentId, id));
  }

  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/admin/categorieen");
}
