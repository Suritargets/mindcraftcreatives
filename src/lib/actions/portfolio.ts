"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { and, asc, eq } from "drizzle-orm";
import { portfolioItems, type Category, type PortfolioItem } from "@/drizzle/schema";

type PortfolioItemWithRelations = PortfolioItem & { category: Category };
type NormalizedPortfolioItem = Omit<PortfolioItemWithRelations, "images" | "tags"> & {
  images: string[];
  tags: string[];
};

function normalizePortfolioItem(p: PortfolioItemWithRelations): NormalizedPortfolioItem {
  return {
    ...p,
    images: p.images ?? [],
    tags: p.tags ?? [],
  };
}

export async function getPortfolioItems() {
  const rows = await db.query.portfolioItems.findMany({
    with: { category: true },
    orderBy: asc(portfolioItems.sortOrder),
  });
  return rows.map(normalizePortfolioItem);
}

export async function getPortfolioItem(id: string) {
  const row = await db.query.portfolioItems.findFirst({
    where: eq(portfolioItems.id, id),
    with: { category: true },
  });
  return row ? normalizePortfolioItem(row) : row;
}

export async function createPortfolioItem(data: {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  client?: string;
  date?: string;
  categoryId: string;
  mediaType?: "FOTO" | "SLIDER" | "VIDEO";
  videoUrl?: string;
  images?: string[];
  status?: "GEPUBLICEERD" | "CONCEPT";
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
}) {
  const [item] = await db
    .insert(portfolioItems)
    .values({
      ...data,
      images: data.images || [],
      tags: data.tags || [],
      mediaType: data.mediaType || "FOTO",
      status: data.status || "CONCEPT",
      updatedAt: new Date(),
    })
    .returning();

  revalidatePath("/admin/portfolio");
  return item;
}

export async function updatePortfolioItem(
  id: string,
  data: {
    title?: string;
    slug?: string;
    description?: string;
    longDescription?: string;
    client?: string;
    date?: string;
    categoryId?: string;
    mediaType?: "FOTO" | "SLIDER" | "VIDEO";
    videoUrl?: string | null;
    images?: string[];
    status?: "GEPUBLICEERD" | "CONCEPT";
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
  }
) {
  const [item] = await db
    .update(portfolioItems)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(portfolioItems.id, id))
    .returning();

  revalidatePath("/admin/portfolio");
  revalidatePath(`/admin/portfolio/${id}`);
  return item;
}

export async function deletePortfolioItem(id: string) {
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
  revalidatePath("/admin/portfolio");
}

// ─── Public queries (filtered by status) ───

export async function getPublicPortfolioItems() {
  const rows = await db.query.portfolioItems.findMany({
    where: eq(portfolioItems.status, "GEPUBLICEERD"),
    with: { category: true },
    orderBy: asc(portfolioItems.sortOrder),
  });
  return rows.map(normalizePortfolioItem);
}

export async function getPublicPortfolioBySlug(slugOrId: string) {
  // Try slug first
  const bySlug = await db.query.portfolioItems.findFirst({
    where: and(eq(portfolioItems.slug, slugOrId), eq(portfolioItems.status, "GEPUBLICEERD")),
    with: { category: true },
  });
  if (bySlug) return normalizePortfolioItem(bySlug);

  // Fallback: try by ID
  const byId = await db.query.portfolioItems.findFirst({
    where: and(eq(portfolioItems.id, slugOrId), eq(portfolioItems.status, "GEPUBLICEERD")),
    with: { category: true },
  });
  return byId ? normalizePortfolioItem(byId) : byId;
}
