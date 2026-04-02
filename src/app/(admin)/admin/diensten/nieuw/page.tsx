import { getCategories } from "@/lib/actions/categories";
import DienstNieuwClient from "./dienst-nieuw-client";

export default async function NieuweDienstPage() {
  const categories = await getCategories("SERVICE" as const);

  const serializedCategories = categories.map((c: typeof categories[number]) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return <DienstNieuwClient categories={serializedCategories} />;
}
