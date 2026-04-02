import type { MetadataRoute } from "next";
import { getPublicProducts } from "@/lib/actions/products";
import { getPublicPortfolioItems } from "@/lib/actions/portfolio";

const BASE_URL = "https://mindcraftcreatives.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalogus`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const [products, portfolioItems] = await Promise.all([
      getPublicProducts(),
      getPublicPortfolioItems(),
    ]);

    const productPages: MetadataRoute.Sitemap = products.map(
      (product: (typeof products)[number]) => ({
        url: `${BASE_URL}/catalogus/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })
    );

    const portfolioPages: MetadataRoute.Sitemap = portfolioItems.map(
      (item: (typeof portfolioItems)[number]) => ({
        url: `${BASE_URL}/portfolio/${item.slug}`,
        lastModified: item.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })
    );

    return [...staticPages, ...productPages, ...portfolioPages];
  } catch {
    return staticPages;
  }
}
