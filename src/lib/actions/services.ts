"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { services, type Category, type Service } from "@/drizzle/schema";

type ServiceWithRelations = Service & { category: Category };
type NormalizedService = Omit<ServiceWithRelations, "features" | "gallery" | "tags"> & {
  features: string[];
  gallery: string[];
  tags: string[];
};

function normalizeService(s: ServiceWithRelations): NormalizedService {
  return {
    ...s,
    features: s.features ?? [],
    gallery: s.gallery ?? [],
    tags: s.tags ?? [],
  };
}

export async function getServices() {
  const rows = await db.query.services.findMany({
    with: { category: true },
    orderBy: asc(services.sortOrder),
  });
  return rows.map(normalizeService);
}

export async function getService(id: string) {
  const row = await db.query.services.findFirst({
    where: eq(services.id, id),
    with: { category: true },
  });
  return row ? normalizeService(row) : row;
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
  const [service] = await db
    .insert(services)
    .values({
      ...data,
      features: data.features || [],
      gallery: data.gallery || [],
      tags: data.tags || [],
      status: data.status || "ACTIEF",
      updatedAt: new Date(),
    })
    .returning();

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
  const [service] = await db
    .update(services)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(services.id, id))
    .returning();

  revalidatePath("/admin/diensten");
  revalidatePath(`/admin/diensten/${id}`);
  return service;
}

export async function deleteService(id: string) {
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/admin/diensten");
}

// ─── Public queries (filtered by status) ───

export async function getPublicServices() {
  const rows = await db.query.services.findMany({
    where: eq(services.status, "ACTIEF"),
    with: { category: true },
    orderBy: asc(services.sortOrder),
  });
  return rows.map(normalizeService);
}
