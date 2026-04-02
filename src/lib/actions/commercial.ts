"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCommercialAreas() {
  const areas = await db.commercialArea.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return areas;
}

export async function getCommercialArea(id: string) {
  const area = await db.commercialArea.findUnique({ where: { id } });
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
  const area = await db.commercialArea.create({
    data: {
      ...data,
      enabled: data.enabled ?? true,
    },
  });

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
  const area = await db.commercialArea.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/commercial");
  return area;
}

export async function toggleCommercialArea(id: string, enabled: boolean) {
  const area = await db.commercialArea.update({
    where: { id },
    data: { enabled },
  });

  revalidatePath("/admin/commercial");
  return area;
}

export async function deleteCommercialArea(id: string) {
  await db.commercialArea.delete({ where: { id } });
  revalidatePath("/admin/commercial");
}
