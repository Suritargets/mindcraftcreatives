"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { settings } from "@/drizzle/schema";

export async function getSettings(group?: string) {
  const rows = await db
    .select()
    .from(settings)
    .where(group ? eq(settings.group, group) : undefined)
    .orderBy(asc(settings.key));

  // Convert to key-value map
  const map: Record<string, string> = {};
  for (const s of rows) {
    map[s.key] = s.value;
  }
  return map;
}

export async function getSetting(key: string) {
  const [setting] = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  return setting?.value || "";
}

export async function updateSettings(data: Record<string, string>, group?: string) {
  for (const [key, value] of Object.entries(data)) {
    await db
      .insert(settings)
      .values({ key, value, group: group || "general" })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value, group: group || "general" },
      });
  }

  revalidatePath("/admin/instellingen");
  revalidatePath("/admin/menu");
  revalidatePath("/admin/paginas");
  revalidatePath("/admin/appearance");
  revalidatePath("/");
  revalidatePath("/catalogus");
}

export async function updateSetting(key: string, value: string, group?: string) {
  await db
    .insert(settings)
    .values({ key, value, group: group || "general" })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value },
    });

  revalidatePath("/admin/instellingen");
}
