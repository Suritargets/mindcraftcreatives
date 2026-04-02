"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { updateQuoteStatus, updateQuoteNotes } from "@/lib/actions/quotes";

export type QuoteItem = {
  product: string;
  quantity: number;
  notes?: string;
};

export type QuoteRequest = {
  id: string;
  quoteNumber: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  date: string;
  status: "nieuw" | "in-behandeling" | "offerte-verstuurd" | "afgerond";
  items: QuoteItem[];
  internalNotes?: string;
};

const statusConfig = {
  nieuw: { label: "Nieuw", class: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  "in-behandeling": { label: "In Behandeling", class: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  "offerte-verstuurd": { label: "Offerte Verstuurd", class: "bg-brand-green/10 text-brand-green border-brand-green/20", dot: "bg-brand-green" },
  afgerond: { label: "Afgerond", class: "bg-muted text-muted-foreground border-muted", dot: "bg-muted-foreground" },
};

const statusToDb: Record<string, "NIEUW" | "IN_BEHANDELING" | "OFFERTE_VERSTUURD" | "AFGEROND"> = {
  nieuw: "NIEUW",
  "in-behandeling": "IN_BEHANDELING",
  "offerte-verstuurd": "OFFERTE_VERSTUURD",
  afgerond: "AFGEROND",
};

export default function OffertesClient({ initialQuotes }: { initialQuotes: QuoteRequest[] }) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = quotes.filter((q) => {
    const matchStatus = statusFilter === "all" || q.status === statusFilter;
    const matchSearch =
      search === "" ||
      q.company.toLowerCase().includes(search.toLowerCase()) ||
      q.contact.toLowerCase().includes(search.toLowerCase()) ||
      q.quoteNumber.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const selected = quotes.find((q) => q.id === selectedId) || null;
  const sheetOpen = selected !== null;

  function handleStatusChange(id: string, newStatus: QuoteRequest["status"]) {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
    startTransition(async () => {
      await updateQuoteStatus(id, statusToDb[newStatus]);
    });
  }

  function handleNotesChange(id: string, notes: string) {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, internalNotes: notes } : q))
    );
  }

  function handleNotesSave(id: string) {
    const quote = quotes.find((q) => q.id === id);
    if (!quote) return;
    startTransition(async () => {
      await updateQuoteNotes(id, quote.internalNotes || "");
    });
  }

  const counts = {
    all: quotes.length,
    nieuw: quotes.filter((q) => q.status === "nieuw").length,
    "in-behandeling": quotes.filter((q) => q.status === "in-behandeling").length,
    "offerte-verstuurd": quotes.filter((q) => q.status === "offerte-verstuurd").length,
    afgerond: quotes.filter((q) => q.status === "afgerond").length,
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Offertes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {quotes.length} offerte-aanvragen · {counts.nieuw} nieuw
          </p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {(["all", "nieuw", "in-behandeling", "offerte-verstuurd", "afgerond"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              statusFilter === key
                ? "border-primary bg-primary text-white"
                : "border-border bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            {key !== "all" && (
              <div className={`h-2 w-2 rounded-full ${statusFilter === key ? "bg-white" : statusConfig[key].dot}`} />
            )}
            {key === "all" ? "Alle" : statusConfig[key].label}
            <span className={`ml-0.5 ${statusFilter === key ? "text-white/80" : "text-muted-foreground/60"}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Input
            placeholder="Zoek op bedrijf, contact of ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Full-width table */}
      <Card>
        <div className="overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 sm:px-5 py-3 w-[60px] sm:w-[70px]">ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 sm:px-5 py-3">Bedrijf</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Contact</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden lg:table-cell w-[90px]">Producten</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden lg:table-cell w-[70px]">Stuks</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell w-[120px]">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden xl:table-cell w-[100px]">Datum</th>
                <th className="w-10 px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((quote, i) => {
                const totalQty = quote.items.reduce((s, item) => s + item.quantity, 0);
                return (
                  <tr
                    key={quote.id}
                    onClick={() => setSelectedId(quote.id)}
                    className={`border-b last:border-0 cursor-pointer transition-colors ${
                      selectedId === quote.id ? "bg-primary/5" : i % 2 === 0 ? "hover:bg-muted/20" : "bg-muted/10 hover:bg-muted/20"
                    }`}
                  >
                    <td className="px-4 sm:px-5 py-3.5">
                      <span className="text-xs font-mono text-muted-foreground">{quote.quoteNumber}</span>
                    </td>
                    <td className="px-4 sm:px-5 py-3.5">
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-foreground block truncate">{quote.company}</span>
                        <span className="text-xs text-muted-foreground sm:hidden block truncate">{quote.contact}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <div className="min-w-0">
                        <p className="text-sm text-foreground truncate">{quote.contact}</p>
                        <p className="text-xs text-muted-foreground truncate">{quote.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center hidden lg:table-cell">
                      <Badge variant="secondary" className="text-[10px]">{quote.items.length}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-center hidden lg:table-cell">
                      <span className="text-sm font-medium text-foreground">{totalQty}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <Badge className={`text-[10px] border ${statusConfig[quote.status].class}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${statusConfig[quote.status].dot} mr-1.5`} />
                        {statusConfig[quote.status].label}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 hidden xl:table-cell">
                      <span className="text-sm text-muted-foreground">{quote.date}</span>
                    </td>
                    <td className="px-3 py-3.5">
                      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-muted-foreground">
                    Geen offertes gevonden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Separator />
        <div className="px-5 py-3 text-xs text-muted-foreground">
          {filtered.length} van {quotes.length} aanvragen
        </div>
      </Card>

      {/* ======= OFF-CANVAS SHEET (right side) ======= */}
      <Sheet open={sheetOpen} onOpenChange={(open) => { if (!open) setSelectedId(null); }}>
        <SheetContent side="right" className="w-full sm:w-[75vw] sm:max-w-none p-0 overflow-y-auto">
          {selected && (
            <div>
              {/* Sheet header */}
              <div className="px-4 sm:px-8 lg:px-12 pt-14 pb-5 border-b">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-foreground">{selected.company}</h2>
                      <Badge className={`text-[9px] border ${statusConfig[selected.status].class}`}>
                        {statusConfig[selected.status].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{selected.quoteNumber} · {selected.date}</p>
                  </div>
                </div>

                {/* Status changer */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-muted-foreground">Status:</span>
                  <select
                    value={selected.status}
                    onChange={(e) => handleStatusChange(selected.id, e.target.value as QuoteRequest["status"])}
                    className="h-8 rounded-md border bg-background px-2 text-xs text-foreground"
                  >
                    <option value="nieuw">Nieuw</option>
                    <option value="in-behandeling">In Behandeling</option>
                    <option value="offerte-verstuurd">Offerte Verstuurd</option>
                    <option value="afgerond">Afgerond</option>
                  </select>
                </div>
              </div>

              {/* Contact info */}
              <div className="px-4 sm:px-8 lg:px-12 py-5 border-b">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Klantgegevens</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-muted-foreground">Contactpersoon</span>
                    <p className="text-sm font-medium text-foreground">{selected.contact}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground">Bedrijf</span>
                    <p className="text-sm font-medium text-foreground">{selected.company}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground">Email</span>
                    <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline block">{selected.email}</a>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground">Telefoon</span>
                    <p className="text-sm text-foreground">{selected.phone}</p>
                  </div>
                </div>
              </div>

              {/* Products table */}
              <div className="px-4 sm:px-8 lg:px-12 py-5 border-b">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Aangevraagde Producten ({selected.items.length})
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30 border-b">
                        <th className="text-left text-[11px] font-semibold text-muted-foreground px-3 py-2">Product</th>
                        <th className="text-center text-[11px] font-semibold text-muted-foreground px-3 py-2 w-20">Aantal</th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground px-3 py-2">Opmerking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.items.map((item, i) => (
                        <tr key={i} className={`border-b last:border-0 ${i % 2 !== 0 ? "bg-muted/10" : ""}`}>
                          <td className="px-3 py-2.5 text-sm text-foreground">{item.product}</td>
                          <td className="px-3 py-2.5 text-sm text-foreground text-center font-semibold">{item.quantity}</td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground">{item.notes || "\u2014"}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/30">
                        <td className="px-3 py-2.5 text-sm font-bold text-foreground">Totaal</td>
                        <td className="px-3 py-2.5 text-sm font-bold text-primary text-center">
                          {selected.items.reduce((s, item) => s + item.quantity, 0)}
                        </td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground">stuks</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Internal notes (editable) */}
              <div className="px-4 sm:px-8 lg:px-12 py-5 border-b">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Interne Notities</h3>
                <Textarea
                  placeholder="Voeg interne notities toe over deze offerte..."
                  value={selected.internalNotes || ""}
                  onChange={(e) => handleNotesChange(selected.id, e.target.value)}
                  rows={3}
                  className="text-sm"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleNotesSave(selected.id)}
                    disabled={isPending}
                    className="gap-1.5 text-xs"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {isPending ? "Opslaan..." : "Notities Opslaan"}
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 sm:px-8 lg:px-12 py-5">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Acties</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Offerte ${selected.quoteNumber} - Mindcraft Creatives&body=${encodeURIComponent(
                      `Beste ${selected.contact},\n\nBedankt voor uw offerte-aanvraag (${selected.quoteNumber}).\n\nHierbij de details:\n${selected.items.map((i) => `- ${i.product}: ${i.quantity} stuks${i.notes ? ` (${i.notes})` : ""}`).join("\n")}\n\nTotaal: ${selected.items.reduce((s, i) => s + i.quantity, 0)} stuks\n\nMet vriendelijke groet,\nMindcraft Creatives`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Email Sturen
                  </a>
                  <a
                    href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hallo ${selected.contact}, betreft offerte ${selected.quoteNumber} voor ${selected.company}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border text-sm font-medium text-brand-green hover:bg-brand-green/5 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12Zm-3 0h.008v.008h-.008V12Z" />
                    </svg>
                    PDF Export
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
