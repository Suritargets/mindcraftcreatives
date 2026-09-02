import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ============================================
// ENUMS
// ============================================

export const categoryTypeEnum = pgEnum("CategoryType", [
  "PRODUCT",
  "SERVICE",
  "PORTFOLIO",
]);

export const productStatusEnum = pgEnum("ProductStatus", [
  "ACTIEF",
  "CONCEPT",
  "GEARCHIVEERD",
]);

export const serviceStatusEnum = pgEnum("ServiceStatus", [
  "ACTIEF",
  "CONCEPT",
  "GEARCHIVEERD",
]);

export const mediaTypeEnum = pgEnum("MediaType", ["FOTO", "SLIDER", "VIDEO"]);

export const portfolioStatusEnum = pgEnum("PortfolioStatus", [
  "GEPUBLICEERD",
  "CONCEPT",
]);

export const quoteStatusEnum = pgEnum("QuoteStatus", [
  "NIEUW",
  "IN_BEHANDELING",
  "OFFERTE_VERSTUURD",
  "AFGEROND",
]);

export const widgetTypeEnum = pgEnum("WidgetType", [
  "WHATSAPP",
  "CTA_BANNER",
  "NEWSLETTER",
  "SOCIAL",
  "CUSTOM",
]);

export const widgetPositionEnum = pgEnum("WidgetPosition", [
  "HEADER",
  "FOOTER",
  "SIDEBAR",
  "POPUP",
  "FLOATING",
]);

export const commercialAreaTypeEnum = pgEnum("CommercialAreaType", [
  "BANNER",
  "POPUP",
  "INLINE",
  "SIDEBAR",
]);

export const mediaFileTypeEnum = pgEnum("MediaFileType", [
  "IMAGE",
  "DOCUMENT",
  "VIDEO",
]);

// ============================================
// CATEGORIEEN & TAXONOMIE
// ============================================

export const categories = pgTable(
  "Category",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    icon: text("icon").notNull().default("folder"),
    type: categoryTypeEnum("type").notNull().default("PRODUCT"),
    parentId: text("parentId"),
    sortOrder: integer("sortOrder").notNull().default(0),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (t) => [
    index("Category_parentId_idx").on(t.parentId),
    uniqueIndex("Category_slug_key").on(t.slug),
    index("Category_type_idx").on(t.type),
    foreignKey({
      columns: [t.parentId],
      foreignColumns: [t.id],
      name: "Category_parentId_fkey",
    })
      .onDelete("set null")
      .onUpdate("cascade"),
  ]
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "CategoryTree",
  }),
  children: many(categories, { relationName: "CategoryTree" }),
  products: many(products),
  services: many(services),
  portfolioItems: many(portfolioItems),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

// ============================================
// PRODUCTEN
// ============================================

export const products = pgTable(
  "Product",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description").notNull(),
    longDescription: text("longDescription"),
    minOrder: text("minOrder").notNull(),
    categoryId: text("categoryId").notNull(),
    subcategory: text("subcategory"),
    status: productStatusEnum("status").notNull().default("ACTIEF"),
    featuredImage: text("featuredImage"),
    gallery: text("gallery").array(),
    printMethods: text("printMethods").array(),
    advantages: text("advantages").array(),
    tags: text("tags").array(),
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),
    sortOrder: integer("sortOrder").notNull().default(0),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (t) => [
    index("Product_categoryId_idx").on(t.categoryId),
    uniqueIndex("Product_slug_key").on(t.slug),
    index("Product_status_idx").on(t.status),
    foreignKey({
      columns: [t.categoryId],
      foreignColumns: [categories.id],
      name: "Product_categoryId_fkey",
    })
      .onDelete("restrict")
      .onUpdate("cascade"),
  ]
);

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  specs: many(productSpecs),
  quoteItems: many(quoteItems),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const productSpecs = pgTable(
  "ProductSpec",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    productId: text("productId").notNull(),
    label: text("label").notNull(),
    values: text("values").array(),
    sortOrder: integer("sortOrder").notNull().default(0),
  },
  (t) => [
    index("ProductSpec_productId_idx").on(t.productId),
    foreignKey({
      columns: [t.productId],
      foreignColumns: [products.id],
      name: "ProductSpec_productId_fkey",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ]
);

export const productSpecsRelations = relations(productSpecs, ({ one }) => ({
  product: one(products, {
    fields: [productSpecs.productId],
    references: [products.id],
  }),
}));

export type ProductSpec = typeof productSpecs.$inferSelect;
export type NewProductSpec = typeof productSpecs.$inferInsert;

// ============================================
// DIENSTEN (SERVICES)
// ============================================

export const services = pgTable(
  "Service",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description").notNull(),
    longDescription: text("longDescription"),
    icon: text("icon").notNull().default("pen"),
    categoryId: text("categoryId").notNull(),
    status: serviceStatusEnum("status").notNull().default("ACTIEF"),
    features: text("features").array(),
    featuredImage: text("featuredImage"),
    gallery: text("gallery").array(),
    tags: text("tags").array(),
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),
    sortOrder: integer("sortOrder").notNull().default(0),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (t) => [
    index("Service_categoryId_idx").on(t.categoryId),
    uniqueIndex("Service_slug_key").on(t.slug),
    index("Service_status_idx").on(t.status),
    foreignKey({
      columns: [t.categoryId],
      foreignColumns: [categories.id],
      name: "Service_categoryId_fkey",
    })
      .onDelete("restrict")
      .onUpdate("cascade"),
  ]
);

export const servicesRelations = relations(services, ({ one }) => ({
  category: one(categories, {
    fields: [services.categoryId],
    references: [categories.id],
  }),
}));

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

// ============================================
// PORTFOLIO
// ============================================

export const portfolioItems = pgTable(
  "PortfolioItem",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    description: text("description").notNull(),
    longDescription: text("longDescription"),
    client: text("client"),
    date: text("date"),
    categoryId: text("categoryId").notNull(),
    mediaType: mediaTypeEnum("mediaType").notNull().default("FOTO"),
    videoUrl: text("videoUrl"),
    images: text("images").array(),
    status: portfolioStatusEnum("status").notNull().default("CONCEPT"),
    tags: text("tags").array(),
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),
    sortOrder: integer("sortOrder").notNull().default(0),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (t) => [
    index("PortfolioItem_categoryId_idx").on(t.categoryId),
    uniqueIndex("PortfolioItem_slug_key").on(t.slug),
    index("PortfolioItem_status_idx").on(t.status),
    foreignKey({
      columns: [t.categoryId],
      foreignColumns: [categories.id],
      name: "PortfolioItem_categoryId_fkey",
    })
      .onDelete("restrict")
      .onUpdate("cascade"),
  ]
);

export const portfolioItemsRelations = relations(portfolioItems, ({ one }) => ({
  category: one(categories, {
    fields: [portfolioItems.categoryId],
    references: [categories.id],
  }),
}));

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type NewPortfolioItem = typeof portfolioItems.$inferInsert;

// ============================================
// CONTACT SUBMISSIONS
// ============================================

export const contactSubmissions = pgTable(
  "ContactSubmission",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    read: boolean("read").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (t) => [
    index("ContactSubmission_read_idx").on(t.read),
    index("ContactSubmission_createdAt_idx").on(t.createdAt),
  ]
);

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;

// ============================================
// OFFERTES (QUOTES)
// ============================================

export const quotes = pgTable(
  "Quote",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    quoteNumber: text("quoteNumber").notNull(),
    company: text("company").notNull(),
    contact: text("contact").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    date: timestamp("date", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    status: quoteStatusEnum("status").notNull().default("NIEUW"),
    internalNotes: text("internalNotes"),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (t) => [
    index("Quote_quoteNumber_idx").on(t.quoteNumber),
    uniqueIndex("Quote_quoteNumber_key").on(t.quoteNumber),
    index("Quote_status_idx").on(t.status),
  ]
);

export const quotesRelations = relations(quotes, ({ many }) => ({
  items: many(quoteItems),
}));

export type Quote = typeof quotes.$inferSelect;
export type NewQuote = typeof quotes.$inferInsert;

export const quoteItems = pgTable(
  "QuoteItem",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    quoteId: text("quoteId").notNull(),
    productId: text("productId"),
    productName: text("productName").notNull(),
    quantity: integer("quantity").notNull(),
    notes: text("notes"),
    sortOrder: integer("sortOrder").notNull().default(0),
  },
  (t) => [
    index("QuoteItem_quoteId_idx").on(t.quoteId),
    foreignKey({
      columns: [t.quoteId],
      foreignColumns: [quotes.id],
      name: "QuoteItem_quoteId_fkey",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
    foreignKey({
      columns: [t.productId],
      foreignColumns: [products.id],
      name: "QuoteItem_productId_fkey",
    })
      .onDelete("set null")
      .onUpdate("cascade"),
  ]
);

export const quoteItemsRelations = relations(quoteItems, ({ one }) => ({
  quote: one(quotes, {
    fields: [quoteItems.quoteId],
    references: [quotes.id],
  }),
  product: one(products, {
    fields: [quoteItems.productId],
    references: [products.id],
  }),
}));

export type QuoteItem = typeof quoteItems.$inferSelect;
export type NewQuoteItem = typeof quoteItems.$inferInsert;

// ============================================
// WIDGETS
// ============================================

export const widgets = pgTable("Widget", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  type: widgetTypeEnum("type").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  position: widgetPositionEnum("position").notNull(),
  config: jsonb("config").notNull().default({}),
  sortOrder: integer("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
});

export type Widget = typeof widgets.$inferSelect;
export type NewWidget = typeof widgets.$inferInsert;

// ============================================
// COMMERCIAL ZONES
// ============================================

export const commercialAreas = pgTable("CommercialArea", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  location: text("location").notNull(),
  type: commercialAreaTypeEnum("type").notNull(),
  content: text("content").notNull(),
  linkUrl: text("linkUrl").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  sortOrder: integer("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
});

export type CommercialArea = typeof commercialAreas.$inferSelect;
export type NewCommercialArea = typeof commercialAreas.$inferInsert;

// ============================================
// MEDIA BESTANDEN
// ============================================

export const mediaFiles = pgTable(
  "MediaFile",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    filename: text("filename").notNull(),
    type: mediaFileTypeEnum("type").notNull(),
    size: integer("size").notNull(),
    url: text("url").notNull(),
    dimensions: text("dimensions"),
    alt: text("alt"),
    uploadDate: timestamp("uploadDate", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (t) => [index("MediaFile_type_idx").on(t.type)]
);

export type MediaFile = typeof mediaFiles.$inferSelect;
export type NewMediaFile = typeof mediaFiles.$inferInsert;

// ============================================
// INSTELLINGEN (SETTINGS)
// ============================================

export const settings = pgTable(
  "Setting",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    key: text("key").notNull(),
    value: text("value").notNull(),
    group: text("group").notNull().default("general"),
  },
  (t) => [
    index("Setting_group_idx").on(t.group),
    uniqueIndex("Setting_key_key").on(t.key),
  ]
);

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;
