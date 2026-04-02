import { getPublicProducts, getPublicProductBySlug } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ProductQuoteForm } from "@/components/catalog/product-quote-form";
import { RelatedProducts } from "@/components/catalog/related-products";
import { QuoteCartButton } from "@/components/catalog/quote-cart-button";
import { ProductDetailTabs } from "@/components/catalog/product-detail-tabs";
import { ProductImageViewer } from "@/components/catalog/product-image-viewer";

export async function generateStaticParams() {
  const products = await getPublicProducts();
  return products.map((p: typeof products[number]) => ({ id: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getPublicProductBySlug(id);
  if (!product) return { title: "Product niet gevonden" };
  return {
    title: product.metaTitle || `${product.name} | Mindcraft Creatives`,
    description: product.metaDescription || product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getPublicProductBySlug(id);

  if (!product) {
    notFound();
  }

  // If accessed by ID instead of slug, redirect to canonical slug URL
  if (product.slug !== id) {
    redirect(`/catalogus/${product.slug}`);
  }

  const category = product.category;

  // Get all categories to find subcategory name
  const allCategories = await getCategories("PRODUCT" as const);
  const parentCat = allCategories.find((c: typeof allCategories[number]) => c.id === product.categoryId);
  const subcategory = parentCat?.children.find(
    (s: { id: string; slug: string; name: string }) => s.slug === product.subcategory
  );

  // Related products: same category, exclude current
  const allProducts = await getPublicProducts();
  const related = allProducts
    .filter((p: typeof allProducts[number]) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)
    .map((p: typeof allProducts[number]) => ({
      slug: p.slug,
      name: p.name,
      description: p.description,
      minOrder: p.minOrder,
    }));

  const specs = product.specs.map((s: typeof product.specs[number]) => ({
    label: s.label,
    values: s.values as string[],
  }));

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
          {/* Left: Product image viewer */}
          <ProductImageViewer
            productName={product.name}
            featuredImage={product.featuredImage}
            gallery={product.gallery as string[]}
          />

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
                  {(product.advantages && product.advantages.length > 0
                    ? (product.advantages as string[])
                    : [
                        "Volledig aanpasbaar met uw logo en huisstijl",
                        "Hoge kwaliteit materialen",
                        "Diverse kleuren en maten beschikbaar",
                        "Inclusief ontwerp-assistentie",
                        "Snelle levering in Suriname",
                      ]
                  ).map((feature) => (
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
              productId={product.slug}
              productName={product.name}
              minOrder={product.minOrder}
            />

            <Separator className="my-6" />

            {/* Direct quote form */}
            <ProductQuoteForm productName={product.name} productId={product.slug} />
          </div>
        </div>

        {/* Product detail tabs */}
        <ProductDetailTabs
          description={product.longDescription || product.description}
          specs={specs}
          printMethods={product.printMethods as string[]}
          advantages={product.advantages as string[]}
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
