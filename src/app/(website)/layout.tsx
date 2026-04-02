import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCategories } from "@/lib/actions/categories";
import { getSetting } from "@/lib/actions/settings";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rawCategories, homepage] = await Promise.all([
    getCategories("PRODUCT" as const),
    getSetting("homepage"),
  ]);

  const categories = rawCategories.map((c) => ({
    name: c.name,
    slug: c.slug,
    subcategories: c.children.map((sub) => ({
      name: sub.name,
      slug: sub.slug,
    })),
  }));

  // Default to "catalogus" if not set
  const logoHref = (homepage || "catalogus") === "catalogus" ? "/catalogus" : "/";

  return (
    <>
      <Header categories={categories} logoHref={logoHref} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
