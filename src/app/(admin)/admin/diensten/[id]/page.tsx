import { getService } from "@/lib/actions/services";
import { getCategories } from "@/lib/actions/categories";
import { notFound } from "next/navigation";
import DienstEditClient from "./dienst-edit-client";

export default async function DienstEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [service, categories] = await Promise.all([
    getService(id),
    getCategories("SERVICE" as const),
  ]);

  if (!service) {
    notFound();
  }

  const serializedService = {
    id: service.id,
    name: service.name,
    slug: service.slug,
    description: service.description,
    longDescription: service.longDescription || "",
    icon: service.icon || "",
    categoryId: service.categoryId,
    status: service.status,
    features: (service.features as string[]) || [],
    featuredImage: service.featuredImage || "",
    gallery: (service.gallery as string[]) || [],
    tags: (service.tags as string[]) || [],
    metaTitle: service.metaTitle || "",
    metaDescription: service.metaDescription || "",
  };

  const serializedCategories = categories.map((c: typeof categories[number]) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return (
    <DienstEditClient
      service={serializedService}
      categories={serializedCategories}
    />
  );
}
