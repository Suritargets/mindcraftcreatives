"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getWidgets() {
  const widgets = await db.widget.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return widgets;
}

export async function getWidget(id: string) {
  const widget = await db.widget.findUnique({ where: { id } });
  return widget;
}

export async function createWidget(data: {
  name: string;
  type: "WHATSAPP" | "CTA_BANNER" | "NEWSLETTER" | "SOCIAL" | "CUSTOM";
  position: "HEADER" | "FOOTER" | "SIDEBAR" | "POPUP" | "FLOATING";
  enabled?: boolean;
  config?: Record<string, string>;
}) {
  const widget = await db.widget.create({
    data: {
      ...data,
      config: data.config || {},
      enabled: data.enabled ?? true,
    },
  });

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
  const widget = await db.widget.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/widgets");
  return widget;
}

export async function toggleWidget(id: string, enabled: boolean) {
  const widget = await db.widget.update({
    where: { id },
    data: { enabled },
  });

  revalidatePath("/admin/widgets");
  return widget;
}

export async function deleteWidget(id: string) {
  await db.widget.delete({ where: { id } });
  revalidatePath("/admin/widgets");
}
