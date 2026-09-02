"use server";

import { del, put } from "@vercel/blob";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { mediaFiles } from "@/drizzle/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const isAuthenticated = await getSession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }
}

const ALLOWED_MIME_TYPES: Record<string, "IMAGE" | "DOCUMENT" | "VIDEO"> = {
  "image/jpeg": "IMAGE",
  "image/png": "IMAGE",
  "image/webp": "IMAGE",
  "image/gif": "IMAGE",
  "application/pdf": "DOCUMENT",
  "video/mp4": "VIDEO",
  "video/webm": "VIDEO",
  "video/quicktime": "VIDEO",
};

function sanitizeFilename(name: string): string {
  const trimmed = name.trim().slice(-150);
  return trimmed.replace(/[^a-zA-Z0-9._-]/g, "_") || "bestand";
}

export async function getMediaFiles() {
  await requireAdmin();
  return db.select().from(mediaFiles).orderBy(desc(mediaFiles.uploadDate));
}

export type UploadMediaState = {
  success: boolean;
  message?: string;
  file?: typeof mediaFiles.$inferSelect;
};

export async function uploadMediaFile(formData: FormData): Promise<UploadMediaState> {
  await requireAdmin();

  const file = formData.get("file");
  const dimensions = formData.get("dimensions");

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "Geen bestand geselecteerd." };
  }

  const mediaType = ALLOWED_MIME_TYPES[file.type];
  if (!mediaType) {
    return { success: false, message: "Bestandstype niet toegestaan." };
  }

  const safeName = sanitizeFilename(file.name);
  const pathname = `media/${Date.now()}-${safeName}`;
  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: true,
  });

  const [record] = await db
    .insert(mediaFiles)
    .values({
      filename: safeName,
      type: mediaType,
      size: file.size,
      url: blob.url,
      dimensions: typeof dimensions === "string" && dimensions ? dimensions : null,
      updatedAt: new Date(),
    })
    .returning();

  revalidatePath("/admin/media");
  return { success: true, file: record };
}

export async function deleteMediaFile(id: string) {
  await requireAdmin();
  const [file] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id)).limit(1);
  if (file) {
    await del(file.url).catch(() => {});
  }
  await db.delete(mediaFiles).where(eq(mediaFiles.id, id));
  revalidatePath("/admin/media");
}

export async function deleteMediaFiles(ids: string[]) {
  await requireAdmin();
  if (!ids.length) return;
  const files = await db.select().from(mediaFiles).where(inArray(mediaFiles.id, ids));
  await Promise.all(files.map((f) => del(f.url).catch(() => {})));
  await db.delete(mediaFiles).where(inArray(mediaFiles.id, ids));
  revalidatePath("/admin/media");
}
