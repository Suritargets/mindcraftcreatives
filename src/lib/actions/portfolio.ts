"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPortfolioItems() {
  const items = await db.portfolioItem.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return items;
}

export async function getPortfolioItem(id: string) {
  const item = await db.portfolioItem.findUnique({
    where: { id },
    include: { category: true },
  });
  return item;
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
  const item = await db.portfolioItem.create({
    data: {
      ...data,
      images: data.images || [],
      tags: data.tags || [],
      mediaType: data.mediaType || "FOTO",
      status: data.status || "CONCEPT",
    },
  });

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
  const item = await db.portfolioItem.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/portfolio");
  revalidatePath(`/admin/portfolio/${id}`);
  return item;
}

export async function deletePortfolioItem(id: string) {
  await db.portfolioItem.delete({ where: { id } });
  revalidatePath("/admin/portfolio");
}
