"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { commercialAreas } from "@/drizzle/schema";

export async function getCommercialAreas() {
  return db.select().from(commercialAreas).orderBy(asc(commercialAreas.sortOrder));
}

export async function getCommercialArea(id: string) {
  const [area] = await db.select().from(commercialAreas).where(eq(commercialAreas.id, id)).limit(1);
  return area;
}

export async function createCommercialArea(data: {
  name: string;
  location: string;
  type: "BANNER" | "POPUP" | "INLINE" | "SIDEBAR";
  content: string;
  linkUrl: string;
  enabled?: boolean;
}) {
  const [area] = await db
    .insert(commercialAreas)
    .values({
      ...data,
      enabled: data.enabled ?? true,
      updatedAt: new Date(),
    })
    .returning();

  revalidatePath("/admin/commercial");
  return area;
}

export async function updateCommercialArea(
  id: string,
  data: {
    name?: string;
    location?: string;
    type?: "BANNER" | "POPUP" | "INLINE" | "SIDEBAR";
    content?: string;
    linkUrl?: string;
    enabled?: boolean;
  }
) {
  const [area] = await db
    .update(commercialAreas)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(commercialAreas.id, id))
    .returning();

  revalidatePath("/admin/commercial");
  return area;
}

export async function toggleCommercialArea(id: string, enabled: boolean) {
  const [area] = await db
    .update(commercialAreas)
    .set({ enabled, updatedAt: new Date() })
    .where(eq(commercialAreas.id, id))
    .returning();

  revalidatePath("/admin/commercial");
  return area;
}

export async function deleteCommercialArea(id: string) {
  await db.delete(commercialAreas).where(eq(commercialAreas.id, id));
  revalidatePath("/admin/commercial");
}
