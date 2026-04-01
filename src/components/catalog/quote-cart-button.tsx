"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuoteCart } from "@/lib/quote-cart-context";

interface QuoteCartButtonProps {
  productId: string;
  productName: string;
  minOrder: string;
}

export function QuoteCartButton({ productId, productName, minOrder }: QuoteCartButtonProps) {
  const { addItem, isInCart, removeItem } = useQuoteCart();
  const [quantity, setQuantity] = useState(parseInt(minOrder) || 50);
  const inCart = isInCart(productId);

  function handleAdd() {
    addItem({ productId, productName, quantity });
  }

  function handleRemove() {
    removeItem(productId);
  }

  return (
    <div className="space-y-3">
      {!inCart ? (
        <>
          <div className="flex items-center gap-3">
            <label htmlFor={`qty-${productId}`} className="text-sm font-medium text-foreground shrink-0">
              Aantal:
            </label>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 10))}
                className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-l-md"
              >
                −
              </button>
              <Input
                id={`qty-${productId}`}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-9 w-20 text-center border-0 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={() => setQuantity(quantity + 10)}
                className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-r-md"
              >
                +
              </button>
            </div>
          </div>

          <Button onClick={handleAdd} className="w-full font-semibold gap-2" size="lg">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Toevoegen aan Offerte
          </Button>
        </>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-brand-green/10 rounded-lg border border-brand-green/20">
            <svg className="h-5 w-5 text-brand-green shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-sm font-medium text-brand-green">
              Toegevoegd aan offerte-mandje
            </span>
          </div>
          <Button onClick={handleRemove} variant="outline" size="sm" className="w-full text-xs text-muted-foreground">
            Verwijderen uit offerte
          </Button>
        </div>
      )}
    </div>
  );
}
