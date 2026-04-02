import { getPortfolioItems } from "@/lib/actions/portfolio";
import { getCategories } from "@/lib/actions/categories";
import PortfolioClient from "./portfolio-client";

export default async function PortfolioPage() {
  const [rawItems, rawCategories] = await Promise.all([
    getPortfolioItems(),
    getCategories("PORTFOLIO"),
  ]);

  const items = rawItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category?.slug ?? "overig",
    categoryId: item.categoryId,
    mediaType: item.mediaType.toLowerCase() as "foto" | "slider" | "video",
    videoUrl: item.videoUrl,
    images: item.images,
    status: item.status === "GEPUBLICEERD" ? ("gepubliceerd" as const) : ("concept" as const),
  }));

  const categories = rawCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));

  return <PortfolioClient items={items} categories={categories} />;
}
