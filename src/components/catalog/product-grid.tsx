"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Product } from "@/lib/catalog-data";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Geen producten gevonden
        </h3>
        <p className="text-sm text-muted-foreground">
          Probeer een andere categorie of filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <Link key={product.id} href={`/catalogus/${product.id}`}>
          <Card className="group overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
            {/* Product image placeholder */}
            <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="h-14 w-14 mx-auto rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary font-bold text-xl">M</span>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                <span className="inline-flex items-center justify-center h-8 px-3 rounded-md bg-white text-primary text-xs font-semibold shadow-md">
                  Bekijk Product
                </span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-foreground leading-tight mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">
                  Min. {product.minOrder}
                </Badge>
                <span className="text-[10px] font-medium text-primary">
                  Details →
                </span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
