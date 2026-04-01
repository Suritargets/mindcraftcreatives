import { products, categories } from "@/lib/catalog-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ProductQuoteForm } from "@/components/catalog/product-quote-form";
import { RelatedProducts } from "@/components/catalog/related-products";
import { QuoteCartButton } from "@/components/catalog/quote-cart-button";
import { ProductDetailTabs } from "@/components/catalog/product-detail-tabs";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product niet gevonden" };
  return {
    title: `${product.name} | Mindcraft Creatives`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.slug === product.category);
  const subcategory = category?.subcategories.find(
    (s) => s.slug === product.subcategory
  );

  // Related products: same category, exclude current
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/catalogus"
              className="hover:text-primary transition-colors"
            >
              Catalogus
            </Link>
            <span>/</span>
            {category && (
              <>
                <Link
                  href={`/catalogus?categorie=${category.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product image */}
          <div>
            {/* Main image placeholder */}
            <div className="aspect-square rounded-xl bg-gradient-to-br from-muted/50 to-muted border flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="h-24 w-24 mx-auto rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <span className="text-primary font-bold text-5xl">M</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Productafbeelding binnenkort
                </p>
              </div>
            </div>

            {/* Thumbnail row placeholder */}
            <div className="grid grid-cols-4 gap-3 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg border flex items-center justify-center ${
                    i === 1
                      ? "border-primary bg-primary/5"
                      : "bg-muted/30 hover:border-primary/30 cursor-pointer transition-colors"
                  }`}
                >
                  <span className="text-primary/40 font-bold text-lg">M</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {category && (
                <Badge variant="secondary" className="text-xs">
                  {category.name}
                </Badge>
              )}
              {subcategory && (
                <Badge variant="outline" className="text-xs">
                  {subcategory.name}
                </Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {product.name}
            </h1>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Separator className="my-6" />

            {/* Product details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Minimale bestelling
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {product.minOrder}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Levertijd
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      7-14 dagen
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick highlights */}
              <div className="bg-muted/30 rounded-lg p-5">
                <h3 className="font-semibold text-sm text-foreground mb-3">
                  Kenmerken
                </h3>
                <ul className="space-y-2">
                  {[
                    "Volledig aanpasbaar met uw logo en huisstijl",
                    "Hoge kwaliteit materialen",
                    "Diverse kleuren en maten beschikbaar",
                    "Inclusief ontwerp-assistentie",
                    "Snelle levering in Suriname",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <svg
                        className="h-4 w-4 mt-0.5 text-brand-green shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Add to quote cart */}
            <QuoteCartButton
              productId={product.id}
              productName={product.name}
              minOrder={product.minOrder}
            />

            <Separator className="my-6" />

            {/* Direct quote form */}
            <ProductQuoteForm productName={product.name} productId={product.id} />
          </div>
        </div>

        {/* Product detail tabs (Description, Specs, Printing, How to Order) */}
        <ProductDetailTabs
          description={product.description}
          specs={product.specs}
          printMethods={product.printMethods}
          advantages={product.advantages}
        />

        {/* Related / suggested products */}
        {related.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-10" />
            <RelatedProducts products={related} categoryName={category?.name || ""} />
          </div>
        )}
      </div>
    </div>
  );
}
