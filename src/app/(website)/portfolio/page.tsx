import { getPublicPortfolioItems } from "@/lib/actions/portfolio";
import { getCategories } from "@/lib/actions/categories";
import PortfolioClient from "./portfolio-client";

export default async function PortfolioPage() {
  const [rawItems, rawCategories] = await Promise.all([
    getPublicPortfolioItems(),
    getCategories("PORTFOLIO" as const),
  ]);

  const items = rawItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    categorySlug: item.category?.slug ?? "",
    categoryName: item.category?.name ?? "",
    tags: (item.tags as string[]) || [],
    client: item.client,
    date: item.date,
  }));

  const categories = rawCategories.map((c) => ({
    slug: c.slug,
    name: c.name,
  }));

  return <PortfolioClient items={items} categories={categories} />;
}
