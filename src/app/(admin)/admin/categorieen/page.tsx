import { getCategories } from "@/lib/actions/categories";
import { CategorieenClient } from "./categorieen-client";

export default async function CategorieenPage() {
  const [productCategories, serviceCategories, portfolioCategories] = await Promise.all([
    getCategories("PRODUCT"),
    getCategories("SERVICE"),
    getCategories("PORTFOLIO"),
  ]);

  const mapCategory = (c: typeof productCategories[number]) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    type: c.type,
    sortOrder: c.sortOrder,
    children: c.children.map((ch: typeof c.children[number]) => ({
      id: ch.id,
      name: ch.name,
      slug: ch.slug,
      icon: ch.icon,
      type: ch.type,
      sortOrder: ch.sortOrder,
    })),
    _count: c._count,
  });

  const productData = productCategories.map((c: typeof productCategories[number]) => mapCategory(c));
  const serviceData = serviceCategories.map((c: typeof serviceCategories[number]) => mapCategory(c));
  const portfolioData = portfolioCategories.map((c: typeof portfolioCategories[number]) => mapCategory(c));

  return (
    <CategorieenClient
      productCategories={productData}
      serviceCategories={serviceData}
      portfolioCategories={portfolioData}
    />
  );
}
