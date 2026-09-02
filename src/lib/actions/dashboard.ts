"use server";

import { db } from "@/lib/db";
import { and, count, desc, eq, isNotNull, isNull, type SQL } from "drizzle-orm";
import { type PgTable } from "drizzle-orm/pg-core";
import { categories, portfolioItems, products, quotes, services, widgets } from "@/drizzle/schema";

async function getCount(table: PgTable, where?: SQL) {
  const [row] = await db.select({ value: count() }).from(table).where(where);
  return row.value;
}

export async function getDashboardStats() {
  const [productCount, categoryCount, serviceCount, quoteCount, portfolioCount, widgetCount] = await Promise.all([
    getCount(products),
    getCount(categories, and(isNull(categories.parentId), eq(categories.type, "PRODUCT"))),
    getCount(services),
    getCount(quotes),
    getCount(portfolioItems),
    getCount(widgets, eq(widgets.enabled, true)),
  ]);

  const [subcategoryCount, newQuotes, conceptServices, conceptProducts] = await Promise.all([
    getCount(categories, and(isNotNull(categories.parentId), eq(categories.type, "PRODUCT"))),
    getCount(quotes, eq(quotes.status, "NIEUW")),
    getCount(services, eq(services.status, "CONCEPT")),
    getCount(products, eq(products.status, "CONCEPT")),
  ]);

  const recentQuotes = await db.query.quotes.findMany({
    limit: 5,
    orderBy: desc(quotes.date),
    with: { items: true },
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
