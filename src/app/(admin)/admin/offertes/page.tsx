import { getQuotes } from "@/lib/actions/quotes";
import OffertesClient from "./offertes-client";
import type { QuoteRequest } from "./offertes-client";

export default async function OffertesPage() {
  const rawQuotes = await getQuotes();

  const statusMap: Record<string, QuoteRequest["status"]> = {
    NIEUW: "nieuw",
    IN_BEHANDELING: "in-behandeling",
    OFFERTE_VERSTUURD: "offerte-verstuurd",
    AFGEROND: "afgerond",
  };

  const quotes: QuoteRequest[] = rawQuotes.map((q: typeof rawQuotes[number]) => ({
    id: q.id,
    quoteNumber: q.quoteNumber,
    company: q.company,
    contact: q.contact,
    email: q.email,
    phone: q.phone,
    date: q.date.toISOString().split("T")[0],
    status: statusMap[q.status] ?? "nieuw",
    items: q.items.map((item: typeof q.items[number]) => ({
      product: item.productName,
      quantity: item.quantity,
      notes: item.notes ?? undefined,
    })),
    internalNotes: q.internalNotes ?? undefined,
  }));

  return <OffertesClient initialQuotes={quotes} />;
}
