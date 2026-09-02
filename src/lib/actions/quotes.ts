"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { asc, desc, eq } from "drizzle-orm";
import { quoteItems, quotes } from "@/drizzle/schema";

export async function getQuotes() {
  return db.query.quotes.findMany({
    with: {
      items: {
        with: { product: true },
        orderBy: asc(quoteItems.sortOrder),
      },
    },
    orderBy: desc(quotes.date),
  });
}

export async function getQuote(id: string) {
  return db.query.quotes.findFirst({
    where: eq(quotes.id, id),
    with: {
      items: {
        with: { product: true },
        orderBy: asc(quoteItems.sortOrder),
      },
    },
  });
}

export async function updateQuoteStatus(
  id: string,
  status: "NIEUW" | "IN_BEHANDELING" | "OFFERTE_VERSTUURD" | "AFGEROND"
) {
  const [quote] = await db
    .update(quotes)
    .set({ status, updatedAt: new Date() })
    .where(eq(quotes.id, id))
    .returning();

  revalidatePath("/admin/offertes");
  return quote;
}

export async function updateQuoteNotes(id: string, internalNotes: string) {
  const [quote] = await db
    .update(quotes)
    .set({ internalNotes, updatedAt: new Date() })
    .where(eq(quotes.id, id))
    .returning();

  revalidatePath("/admin/offertes");
  return quote;
}

async function nextQuoteNumber() {
  const lastQuote = await db.query.quotes.findFirst({
    orderBy: desc(quotes.quoteNumber),
  });
  const nextNum = lastQuote ? parseInt(lastQuote.quoteNumber.replace("Q-", "")) + 1 : 1;
  return `Q-${String(nextNum).padStart(3, "0")}`;
}

export async function createQuote(data: {
  company: string;
  contact: string;
  email: string;
  phone: string;
  items: { productName: string; quantity: number; notes?: string }[];
  internalNotes?: string;
}) {
  const quoteNumber = await nextQuoteNumber();

  const quote = await db.transaction(async (tx) => {
    const [quote] = await tx
      .insert(quotes)
      .values({
        quoteNumber,
        company: data.company,
        contact: data.contact,
        email: data.email,
        phone: data.phone,
        internalNotes: data.internalNotes,
        updatedAt: new Date(),
      })
      .returning();

    await tx.insert(quoteItems).values(
      data.items.map((item, i) => ({
        quoteId: quote.id,
        productName: item.productName,
        quantity: item.quantity,
        notes: item.notes,
        sortOrder: i,
      }))
    );

    return quote;
  });

  revalidatePath("/admin/offertes");
  return quote;
}

export async function deleteQuote(id: string) {
  await db.delete(quotes).where(eq(quotes.id, id));
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
    const quoteNumber = await nextQuoteNumber();

    // Look up the product to link it if possible
    const productIdStr = typeof productId === "string" ? productId.trim() : undefined;

    await db.transaction(async (tx) => {
      const [quote] = await tx
        .insert(quotes)
        .values({
          quoteNumber,
          company: "-",
          contact: (name as string).trim(),
          email: (email as string).trim(),
          phone: typeof phone === "string" ? phone.trim() : "",
          status: "NIEUW",
          updatedAt: new Date(),
        })
        .returning();

      await tx.insert(quoteItems).values([
        {
          quoteId: quote.id,
          productId: productIdStr || null,
          productName: (productName as string).trim(),
          quantity: qty,
          notes: typeof notes === "string" && notes.trim() ? notes.trim() : null,
          sortOrder: 0,
        },
      ]);
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
