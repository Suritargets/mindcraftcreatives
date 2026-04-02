"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { CategoryType } from "@prisma/client";

export async function getCategories(type?: CategoryType) {
  const categories = await db.category.findMany({
    where: type ? { type, parentId: null } : { parentId: null },
    include: {
      children: {
        orderBy: { sortOrder: "asc" },
      },
      _count: {
        select: {
          products: true,
          services: true,
          portfolioItems: true,
        },
      },
    },
    orderBy: { sortOrder: "asc" },
  });
  return categories;
}

export async function getAllCategories(type?: CategoryType) {
  const categories = await db.category.findMany({
    where: type ? { type } : undefined,
    include: {
      children: true,
      parent: true,
    },
    orderBy: { sortOrder: "asc" },
  });
  return categories;
}

export async function getCategory(id: string) {
  const category = await db.category.findUnique({
    where: { id },
    include: {
      children: { orderBy: { sortOrder: "asc" } },
      parent: true,
      _count: {
        select: {
          products: true,
          services: true,
          portfolioItems: true,
        },
      },
    },
  });
  return category;
}

export async function createCategory(data: {
  name: string;
  slug: string;
  icon?: string;
  type: CategoryType;
  parentId?: string;
}) {
  const category = await db.category.create({
    data: {
      ...data,
      icon: data.icon || "folder",
    },
  });

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
  const category = await db.category.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/categorieen");
  return category;
}

export async function deleteCategory(id: string) {
  // Move children to parent or make them root
  const cat = await db.category.findUnique({
    where: { id },
    include: { children: true },
  });

  if (cat?.children.length) {
    await db.category.updateMany({
      where: { parentId: id },
      data: { parentId: cat.parentId },
    });
  }

  await db.category.delete({ where: { id } });
  revalidatePath("/admin/categorieen");
}
