"use server";

import { db } from "@/lib/db";

export async function getDashboardStats() {
  const [productCount, categoryCount, serviceCount, quoteCount, portfolioCount, widgetCount] = await Promise.all([
    db.product.count(),
    db.category.count({ where: { parentId: null, type: "PRODUCT" } }),
    db.service.count(),
    db.quote.count(),
    db.portfolioItem.count(),
    db.widget.count({ where: { enabled: true } }),
  ]);

  const [subcategoryCount, newQuotes, conceptServices, conceptProducts] = await Promise.all([
    db.category.count({ where: { parentId: { not: null }, type: "PRODUCT" } }),
    db.quote.count({ where: { status: "NIEUW" } }),
    db.service.count({ where: { status: "CONCEPT" } }),
    db.product.count({ where: { status: "CONCEPT" } }),
  ]);

  const recentQuotes = await db.quote.findMany({
    take: 5,
    orderBy: { date: "desc" },
    include: { items: true },
  });

  return {
    productCount,
    categoryCount,
    subcategoryCount,
    serviceCount,
    quoteCount,
    portfolioCount,
    widgetCount,
    newQuotes,
    conceptServices,
    conceptProducts,
    recentQuotes,
  };
}
