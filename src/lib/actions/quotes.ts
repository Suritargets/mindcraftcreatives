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

// ============================================
// PUBLIC QUOTE REQUEST (from product page form)
// ============================================

export type QuoteFormState = {
  success: boolean;
  message: string;
} | null;

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const quantity = formData.get("quantity");
  const notes = formData.get("notes");
  const productId = formData.get("product_id");
  const productName = formData.get("product_name");

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { success: false, message: "Vul uw naam in." };
  }
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return { success: false, message: "Vul uw e-mailadres in." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email as string).trim())) {
    return { success: false, message: "Vul een geldig e-mailadres in." };
  }
  if (!productName || typeof productName !== "string") {
    return { success: false, message: "Product informatie ontbreekt." };
  }

  const qty = quantity ? parseInt(quantity as string, 10) : 1;
  if (isNaN(qty) || qty < 1) {
    return { success: false, message: "Vul een geldig aantal in." };
  }

  try {
    // Generate quote number
    const lastQuote = await db.quote.findFirst({
      orderBy: { quoteNumber: "desc" },
    });
    const nextNum = lastQuote
      ? parseInt(lastQuote.quoteNumber.replace("Q-", "")) + 1
      : 1;
    const quoteNumber = `Q-${String(nextNum).padStart(3, "0")}`;

    // Look up the product to link it if possible
    const productIdStr = typeof productId === "string" ? productId.trim() : undefined;

    await db.quote.create({
      data: {
        quoteNumber,
        company: "-",
        contact: (name as string).trim(),
        email: (email as string).trim(),
        phone: typeof phone === "string" ? phone.trim() : "",
        status: "NIEUW",
        items: {
          create: [
            {
              productId: productIdStr || undefined,
              productName: (productName as string).trim(),
              quantity: qty,
              notes: typeof notes === "string" && notes.trim() ? notes.trim() : undefined,
              sortOrder: 0,
            },
          ],
        },
      },
    });

    return {
      success: true,
      message: "Uw offerte aanvraag is verstuurd! Wij nemen zo snel mogelijk contact met u op.",
    };
  } catch (error) {
    console.error("Failed to save quote request:", error);
    return {
      success: false,
      message: "Er is iets misgegaan. Probeer het later opnieuw.",
    };
  }
}
