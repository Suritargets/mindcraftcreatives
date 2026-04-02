import { getCategories } from "@/lib/actions/categories";
import PortfolioNewClient from "./portfolio-new-client";

export default async function NieuwPortfolioPage() {
  const categories = await getCategories("PORTFOLIO" as const);

  const serializedCategories = categories.map((c: typeof categories[number]) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return <PortfolioNewClient categories={serializedCategories} />;
}
