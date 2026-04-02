import { getPortfolioItem } from "@/lib/actions/portfolio";
import { getCategories } from "@/lib/actions/categories";
import { notFound } from "next/navigation";
import PortfolioEditClient from "./portfolio-edit-client";

export default async function PortfolioEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    getPortfolioItem(id),
    getCategories("PORTFOLIO" as const),
  ]);

  if (!item) {
    notFound();
  }

  const serializedItem = {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    longDescription: item.longDescription || "",
    client: item.client || "",
    date: item.date || "",
    categoryId: item.categoryId,
    mediaType: (item.mediaType || "FOTO") as "FOTO" | "SLIDER" | "VIDEO",
    videoUrl: item.videoUrl || "",
    images: (item.images as string[]) || [],
    status: item.status as "GEPUBLICEERD" | "CONCEPT",
    tags: (item.tags as string[]) || [],
    metaTitle: item.metaTitle || "",
    metaDescription: item.metaDescription || "",
  };

  const serializedCategories = categories.map((c: typeof categories[number]) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return (
    <PortfolioEditClient
      item={serializedItem}
      categories={serializedCategories}
    />
  );
}
