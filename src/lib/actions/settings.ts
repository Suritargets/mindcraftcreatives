"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getSettings(group?: string) {
  const settings = await db.setting.findMany({
    where: group ? { group } : undefined,
    orderBy: { key: "asc" },
  });

  // Convert to key-value map
  const map: Record<string, string> = {};
  for (const s of settings) {
    map[s.key] = s.value;
  }
  return map;
}

export async function getSetting(key: string) {
  const setting = await db.setting.findUnique({ where: { key } });
  return setting?.value || "";
}

export async function updateSettings(data: Record<string, string>, group?: string) {
  for (const [key, value] of Object.entries(data)) {
    await db.setting.upsert({
      where: { key },
      update: { value, group: group || "general" },
      create: { key, value, group: group || "general" },
    });
  }

  revalidatePath("/admin/instellingen");
}

export async function updateSetting(key: string, value: string, group?: string) {
  await db.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value, group: group || "general" },
  });

  revalidatePath("/admin/instellingen");
}
