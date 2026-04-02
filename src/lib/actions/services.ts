"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getServices() {
  const services = await db.service.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return services;
}

export async function getService(id: string) {
  const service = await db.service.findUnique({
    where: { id },
    include: { category: true },
  });
  return service;
}

export async function createService(data: {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  icon?: string;
  categoryId: string;
  status?: "ACTIEF" | "CONCEPT" | "GEARCHIVEERD";
  features?: string[];
  featuredImage?: string;
  gallery?: string[];
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
}) {
  const service = await db.service.create({
    data: {
      ...data,
      features: data.features || [],
      gallery: data.gallery || [],
      tags: data.tags || [],
      status: data.status || "ACTIEF",
    },
  });

  revalidatePath("/admin/diensten");
  return service;
}

export async function updateService(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    longDescription?: string;
    icon?: string;
    categoryId?: string;
    status?: "ACTIEF" | "CONCEPT" | "GEARCHIVEERD";
    features?: string[];
    featuredImage?: string | null;
    gallery?: string[];
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
  }
) {
  const service = await db.service.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/diensten");
  revalidatePath(`/admin/diensten/${id}`);
  return service;
}

export async function deleteService(id: string) {
  await db.service.delete({ where: { id } });
  revalidatePath("/admin/diensten");
}
