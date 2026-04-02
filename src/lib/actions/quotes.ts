"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getQuotes() {
  const quotes = await db.quote.findMany({
    include: {
      items: {
        include: { product: true },
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { date: "desc" },
  });
  return quotes;
}

export async function getQuote(id: string) {
  const quote = await db.quote.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
  return quote;
}

export async function updateQuoteStatus(
  id: string,
  status: "NIEUW" | "IN_BEHANDELING" | "OFFERTE_VERSTUURD" | "AFGEROND"
) {
  const quote = await db.quote.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/offertes");
  return quote;
}

export async function updateQuoteNotes(id: string, internalNotes: string) {
  const quote = await db.quote.update({
    where: { id },
    data: { internalNotes },
  });

  revalidatePath("/admin/offertes");
  return quote;
}

export async function createQuote(data: {
  company: string;
  contact: string;
  email: string;
  phone: string;
  items: { productName: string; quantity: number; notes?: string }[];
  internalNotes?: string;
}) {
  // Generate quote number
  const lastQuote = await db.quote.findFirst({
    orderBy: { quoteNumber: "desc" },
  });
  const nextNum = lastQuote
    ? parseInt(lastQuote.quoteNumber.replace("Q-", "")) + 1
    : 1;
  const quoteNumber = `Q-${String(nextNum).padStart(3, "0")}`;

  const quote = await db.quote.create({
    data: {
      quoteNumber,
      company: data.company,
      contact: data.contact,
      email: data.email,
      phone: data.phone,
      internalNotes: data.internalNotes,
      items: {
        create: data.items.map((item, i) => ({
          productName: item.productName,
          quantity: item.quantity,
          notes: item.notes,
          sortOrder: i,
        })),
      },
    },
  });

  revalidatePath("/admin/offertes");
  return quote;
}

export async function deleteQuote(id: string) {
  await db.quote.delete({ where: { id } });
  revalidatePath("/admin/offertes");
}
