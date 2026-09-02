"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { widgets } from "@/drizzle/schema";

export async function getWidgets() {
  return db.select().from(widgets).orderBy(asc(widgets.sortOrder));
}

export async function getWidget(id: string) {
  const [widget] = await db.select().from(widgets).where(eq(widgets.id, id)).limit(1);
  return widget;
}

export async function createWidget(data: {
  name: string;
  type: "WHATSAPP" | "CTA_BANNER" | "NEWSLETTER" | "SOCIAL" | "CUSTOM";
  position: "HEADER" | "FOOTER" | "SIDEBAR" | "POPUP" | "FLOATING";
  enabled?: boolean;
  config?: Record<string, string>;
}) {
  const [widget] = await db
    .insert(widgets)
    .values({
      ...data,
      config: data.config || {},
      enabled: data.enabled ?? true,
      updatedAt: new Date(),
    })
    .returning();

  revalidatePath("/admin/widgets");
  return widget;
}

export async function updateWidget(
  id: string,
  data: {
    name?: string;
    type?: "WHATSAPP" | "CTA_BANNER" | "NEWSLETTER" | "SOCIAL" | "CUSTOM";
    position?: "HEADER" | "FOOTER" | "SIDEBAR" | "POPUP" | "FLOATING";
    enabled?: boolean;
    config?: Record<string, string>;
  }
) {
  const [widget] = await db
    .update(widgets)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(widgets.id, id))
    .returning();

  revalidatePath("/admin/widgets");
  return widget;
}

export async function toggleWidget(id: string, enabled: boolean) {
  const [widget] = await db
    .update(widgets)
    .set({ enabled, updatedAt: new Date() })
    .where(eq(widgets.id, id))
    .returning();

  revalidatePath("/admin/widgets");
  return widget;
}

export async function deleteWidget(id: string) {
  await db.delete(widgets).where(eq(widgets.id, id));
  revalidatePath("/admin/widgets");
}
