import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RelatedProduct {
  slug: string;
  name: string;
  description: string;
  minOrder: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  categoryName: string;
}

export function RelatedProducts({ products, categoryName }: RelatedProductsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">
          Gerelateerde Producten
        </h2>
        <span className="text-sm text-muted-foreground">
          Meer uit <span className="text-primary font-medium">{categoryName}</span>
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.slug} href={`/catalogus/${product.slug}`}>
            <Card className="group overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center relative">
                <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary font-bold text-lg">M</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                  <span className="text-xs font-medium text-primary bg-white/90 px-3 py-1 rounded-full shadow-sm">
                    Bekijk product →
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-foreground leading-tight mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                  {product.description}
                </p>
                <Badge variant="outline" className="text-[10px]">
                  Min. {product.minOrder}
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
