"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useQuoteCart } from "@/lib/quote-cart-context";

export function QuoteCartSheet() {
  const { items, itemCount, removeItem, updateQuantity, updateNotes, clearCart } = useQuoteCart();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative h-10 w-10 rounded-md flex items-center justify-center hover:bg-muted transition-colors">
          <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[460px] overflow-y-auto p-0">
        <div className="px-6 pt-14 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-foreground">Offerte Mandje</h2>
              {itemCount > 0 && (
                <Badge variant="secondary" className="text-xs">{itemCount} items</Badge>
              )}
            </div>
            {itemCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-sm text-muted-foreground">
                Leeg maken
              </Button>
            )}
          </div>

          {itemCount === 0 ? (
            <div className="text-center py-12">
              <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <p className="font-medium text-foreground mb-1">Uw offerte-mandje is leeg</p>
              <p className="text-sm text-muted-foreground">
                Voeg producten toe vanuit de catalogus.
              </p>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="border rounded-lg p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-sm text-foreground leading-snug flex-1 pr-3">
                        {item.productName}
                      </h3>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        aria-label="Verwijderen"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-muted-foreground">Aantal:</span>
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 10))}
                          className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm rounded-l-md"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.productId, Math.max(1, parseInt(e.target.value) || 1))
                          }
                          className="h-9 w-16 text-center text-sm border-x bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 10)}
                          className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-muted-foreground">stuks</span>
                    </div>

                    <Input
                      placeholder="Opmerkingen (kleur, maat, etc.)"
                      value={item.notes}
                      onChange={(e) => updateNotes(item.productId, e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Summary */}
              <div className="bg-muted/50 rounded-xl p-5 mb-6">
                <h3 className="font-semibold text-base text-foreground mb-3">Overzicht</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Aantal producten</span>
                    <span className="font-medium text-foreground">{itemCount}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Totaal stuks</span>
                    <span className="font-medium text-foreground">
                      {items.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                  </div>
                </div>
              </div>

              {!showForm ? (
                <Button onClick={() => setShowForm(true)} className="w-full font-semibold" size="lg">
                  Offerte Aanvragen
                </Button>
              ) : (
                <div className="space-y-4 border rounded-xl p-5">
                  <h3 className="font-semibold text-base text-foreground">Uw Gegevens</h3>
                  <Input placeholder="Bedrijfsnaam" className="h-10" />
                  <Input placeholder="Contactpersoon" className="h-10" />
                  <Input type="email" placeholder="Email" className="h-10" />
                  <Input placeholder="Telefoonnummer" className="h-10" />
                  <Textarea placeholder="Extra opmerkingen voor de offerte..." rows={3} className="text-sm" />
                  <Button type="submit" className="w-full font-semibold">
                    Verstuur Offerte Aanvraag ({itemCount} producten)
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(false)}
                    className="w-full text-xs text-muted-foreground"
                  >
                    Terug naar overzicht
                  </Button>
                </div>
              )}

              {/* WhatsApp option */}
              <a style={{ marginTop: '12px' }}
                href={`https://wa.me/5978581854?text=${encodeURIComponent(
                  `Hallo, ik wil graag een offerte voor:\n\n${items
                    .map((i) => `• ${i.productName} (${i.quantity} stuks)${i.notes ? ` - ${i.notes}` : ""}`)
                    .join("\n")}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 h-11 rounded-lg border bg-brand-green/10 text-brand-green font-medium text-sm hover:bg-brand-green hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Offerte via WhatsApp
              </a>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
