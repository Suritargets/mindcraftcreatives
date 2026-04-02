import { getSettings } from "@/lib/actions/settings";
import MenuClient from "./menu-client";

const defaultMenu = [
  { id: "m1", label: "Home", href: "/" },
  { id: "m2", label: "Catalogus", href: "/catalogus" },
  { id: "m3", label: "Diensten", href: "/diensten" },
  { id: "m4", label: "Portfolio", href: "/portfolio" },
  { id: "m5", label: "Over Ons", href: "/over-ons" },
  { id: "m6", label: "Contact", href: "/contact" },
];

const defaultFooterMenu = [
  { id: "f1", label: "Privacy Beleid", href: "/privacy" },
  { id: "f2", label: "Algemene Voorwaarden", href: "/voorwaarden" },
  { id: "f3", label: "FAQ", href: "/faq" },
];

export default async function MenuPage() {
  const settings = await getSettings("menu");

  const mainMenu = settings.menu_main
    ? JSON.parse(settings.menu_main)
    : defaultMenu;

  const footerMenu = settings.menu_footer
    ? JSON.parse(settings.menu_footer)
    : defaultFooterMenu;

  return (
    <MenuClient initialMainMenu={mainMenu} initialFooterMenu={footerMenu} />
  );
}
