"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { updateSettings } from "@/lib/actions/settings";

type MenuItem = {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
};

const defaultMenu: MenuItem[] = [
  { id: "m1", label: "Home", href: "/" },
  { id: "m2", label: "Catalogus", href: "/catalogus" },
  { id: "m3", label: "Diensten", href: "/diensten" },
  { id: "m4", label: "Portfolio", href: "/portfolio" },
  { id: "m5", label: "Over Ons", href: "/over-ons" },
  { id: "m6", label: "Contact", href: "/contact" },
];

const defaultFooterMenu: MenuItem[] = [
  { id: "f1", label: "Privacy Beleid", href: "/privacy" },
  { id: "f2", label: "Algemene Voorwaarden", href: "/voorwaarden" },
  { id: "f3", label: "FAQ", href: "/faq" },
];

export default function MenuClient({
  initialMainMenu,
  initialFooterMenu,
}: {
  initialMainMenu: MenuItem[];
  initialFooterMenu: MenuItem[];
}) {
  const [mainMenu, setMainMenu] = useState(initialMainMenu);
  const [footerMenu, setFooterMenu] = useState(initialFooterMenu);
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");
  const [activeTab, setActiveTab] = useState<"hoofd" | "footer">("hoofd");
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentMenu = activeTab === "hoofd" ? mainMenu : footerMenu;
  const setCurrentMenu = activeTab === "hoofd" ? setMainMenu : setFooterMenu;

  function handleAdd() {
    if (!newLabel.trim()) return;
    setCurrentMenu([...currentMenu, { id: `m${Date.now()}`, label: newLabel.trim(), href: newHref || "#" }]);
    setNewLabel(""); setNewHref("");
  }

  function handleRemove(id: string) {
    setCurrentMenu(currentMenu.filter((i) => i.id !== id));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const arr = [...currentMenu];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    setCurrentMenu(arr);
  }

  function moveDown(index: number) {
    if (index === currentMenu.length - 1) return;
    const arr = [...currentMenu];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    setCurrentMenu(arr);
  }

  function handleSave() {
    startTransition(async () => {
      await updateSettings(
        {
          menu_main: JSON.stringify(mainMenu),
          menu_footer: JSON.stringify(footerMenu),
        },
        "menu"
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Menu Beheer</h1>
          <p className="text-xs text-muted-foreground mt-1">Beheer de navigatie van de website.</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-brand-green font-medium">Opgeslagen</span>}
          <Button size="sm" onClick={handleSave} disabled={isPending} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            {isPending ? "Opslaan..." : "Opslaan"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(["hoofd", "footer"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === tab ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab === "hoofd" ? "Hoofdmenu" : "Footer Menu"}
            <Badge variant={activeTab === tab ? "secondary" : "outline"} className="ml-2 text-[10px]">
              {tab === "hoofd" ? mainMenu.length : footerMenu.length}
            </Badge>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Menu items */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-3">
              <h3 className="text-xs font-semibold text-foreground mb-0.5">{activeTab === "hoofd" ? "Hoofdmenu" : "Footer Menu"} Items</h3>
              <p className="text-xs text-muted-foreground mb-3">Sleep items of gebruik pijltjes om de volgorde aan te passen.</p>
            </div>
            <Separator />
            <div className="p-2">
              {currentMenu.map((item, i) => (
                <div key={item.id} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 group transition-colors">
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => moveUp(i)} disabled={i === 0} className="text-muted-foreground/50 hover:text-foreground disabled:opacity-20 transition-colors">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>
                    </button>
                    <button onClick={() => moveDown(i)} disabled={i === currentMenu.length - 1} className="text-muted-foreground/50 hover:text-foreground disabled:opacity-20 transition-colors">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.href}</span>
                  </div>
                  <button onClick={() => handleRemove(item.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Add item */}
        <Card>
          <div className="p-3">
            <h3 className="text-xs font-semibold text-foreground mb-3">Item Toevoegen</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Label</label>
                <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Menu tekst" className="h-8" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">URL</label>
                <Input value={newHref} onChange={(e) => setNewHref(e.target.value)} placeholder="/pagina-url" className="h-8 font-mono text-xs" />
              </div>
              <Button onClick={handleAdd} className="w-full" size="sm" disabled={!newLabel.trim()}>Toevoegen</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
