import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCategories } from "@/lib/actions/categories";
import { getSetting, getSettings } from "@/lib/actions/settings";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rawCategories, homepage, menuSettings] = await Promise.all([
    getCategories("PRODUCT" as const),
    getSetting("homepage"),
    getSettings("menu"),
  ]);

  const categories = rawCategories.map((c: typeof rawCategories[number]) => ({
    name: c.name,
    slug: c.slug,
    subcategories: c.children.map((sub: typeof c.children[number]) => ({
      name: sub.name,
      slug: sub.slug,
    })),
  }));

  // Default to "catalogus" if not set
  const logoHref = (homepage || "catalogus") === "catalogus" ? "/catalogus" : "/";

  // Parse menu settings from DB (JSON strings)
  type MenuItem = { id: string; label: string; href: string; children?: MenuItem[] };
  let mainMenu: MenuItem[] | undefined;
  let footerMenu: MenuItem[] | undefined;

  try {
    if (menuSettings.menu_main) {
      mainMenu = JSON.parse(menuSettings.menu_main) as MenuItem[];
    }
  } catch {
    // invalid JSON — fall back to defaults
  }
  try {
    if (menuSettings.menu_footer) {
      footerMenu = JSON.parse(menuSettings.menu_footer) as MenuItem[];
    }
  } catch {
    // invalid JSON — fall back to defaults
  }

  return (
    <>
      <Header categories={categories} logoHref={logoHref} mainMenu={mainMenu} footerMenu={footerMenu} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
