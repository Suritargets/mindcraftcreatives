"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveTabs } from "@/components/admin/responsive-tabs";
import { useRouter } from "next/navigation";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/actions/categories";

// ── Types ──────────────────────────────────────────────────────────

type CategoryChild = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  type: string;
  sortOrder: number;
};

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  type: string;
  sortOrder: number;
  children: CategoryChild[];
  _count: {
    products: number;
    services: number;
    portfolioItems: number;
  };
};

type Props = {
  productCategories: CategoryItem[];
  serviceCategories: CategoryItem[];
  portfolioCategories: CategoryItem[];
};

// ── Helpers ────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getItemCount(cat: CategoryItem): number {
  return cat._count.products + cat._count.services + cat._count.portfolioItems;
}

function itemCountLabel(cat: CategoryItem): string {
  if (cat.type === "PRODUCT") return `${cat._count.products} producten`;
  if (cat.type === "SERVICE") return `${cat._count.services} diensten`;
  return `${cat._count.portfolioItems} portfolio items`;
}

// ── Component ──────────────────────────────────────────────────────

export function CategorieenClient({
  productCategories,
  serviceCategories,
  portfolioCategories,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [activeTab, setActiveTab] = useState("producten");
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  // New category form state per tab
  const [newProductCat, setNewProductCat] = useState("");
  const [newServiceCat, setNewServiceCat] = useState("");
  const [newPortfolioCat, setNewPortfolioCat] = useState("");

  // Subcategory add state
  const [addingSubTo, setAddingSubTo] = useState<string | null>(null);
  const [newSubName, setNewSubName] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  // ── Actions ────────────────────────────────────────────────────

  function handleCreate(name: string, type: "PRODUCT" | "SERVICE" | "PORTFOLIO", parentId?: string) {
    if (!name.trim()) return;
    startTransition(async () => {
      await createCategory({
        name: name.trim(),
        slug: slugify(name.trim()),
        type,
        ...(parentId ? { parentId } : {}),
      });
      router.refresh();
    });
  }

  function handleUpdate(id: string, name: string) {
    if (!name.trim()) return;
    startTransition(async () => {
      await updateCategory(id, {
        name: name.trim(),
        slug: slugify(name.trim()),
      });
      setEditingId(null);
      setEditName("");
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteCategory(id);
      router.refresh();
    });
  }

  // ── Shared renderers ──────────────────────────────────────────

  function renderCategoryList(
    categories: CategoryItem[],
    type: "PRODUCT" | "SERVICE" | "PORTFOLIO",
    newName: string,
    setNewName: (v: string) => void,
    typeLabel: string,
    colorClass: string,
  ) {
    const totalChildren = categories.reduce(
      (acc: number, c: CategoryItem) => acc + c.children.length,
      0,
    );

    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {categories.length} hoofdcategorieën, {totalChildren} subcategorieën
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category list */}
          <div className="lg:col-span-2 space-y-3">
            {categories.map((cat: CategoryItem) => {
              const isExpanded = expandedCat === cat.id;
              const count = getItemCount(cat);

              return (
                <Card key={cat.id} className="overflow-hidden">
                  {/* Category header */}
                  <button
                    onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-md ${colorClass}/10 flex items-center justify-center shrink-0`}>
                        <svg className={`h-4 w-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                      </div>
                      <div>
                        {editingId === cat.id ? (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <Input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleUpdate(cat.id, editName);
                                if (e.key === "Escape") { setEditingId(null); setEditName(""); }
                              }}
                              className="h-7 text-sm w-48"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs"
                              onClick={(e) => { e.stopPropagation(); handleUpdate(cat.id, editName); }}
                              disabled={isPending}
                            >
                              Opslaan
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs"
                              onClick={(e) => { e.stopPropagation(); setEditingId(null); setEditName(""); }}
                            >
                              Annuleer
                            </Button>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {cat.children.length} subcategorieën · {itemCountLabel(cat)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-[10px]">{cat.slug}</Badge>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(cat.id);
                            setEditName(cat.name);
                          }}
                        >
                          Bewerk
                        </button>
                        <button
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Categorie "${cat.name}" verwijderen?`)) {
                              handleDelete(cat.id);
                            }
                          }}
                          disabled={isPending}
                        >
                          Verwijder
                        </button>
                      </div>
                      <svg
                        className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </button>

                  {/* Subcategories */}
                  {isExpanded && (
                    <>
                      <Separator />
                      <div className="p-4 bg-muted/10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Subcategorieën
                          </span>
                          <button
                            className="text-xs text-primary hover:underline font-medium"
                            onClick={() => {
                              setAddingSubTo(addingSubTo === cat.id ? null : cat.id);
                              setNewSubName("");
                            }}
                          >
                            + Toevoegen
                          </button>
                        </div>

                        {/* Add subcategory form */}
                        {addingSubTo === cat.id && (
                          <div className="flex items-center gap-2 mb-3">
                            <Input
                              placeholder="Subcategorie naam..."
                              value={newSubName}
                              onChange={(e) => setNewSubName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleCreate(newSubName, type, cat.id);
                                  setNewSubName("");
                                  setAddingSubTo(null);
                                }
                                if (e.key === "Escape") {
                                  setAddingSubTo(null);
                                  setNewSubName("");
                                }
                              }}
                              className="h-8 text-sm flex-1"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              className="h-8 text-xs"
                              disabled={!newSubName.trim() || isPending}
                              onClick={() => {
                                handleCreate(newSubName, type, cat.id);
                                setNewSubName("");
                                setAddingSubTo(null);
                              }}
                            >
                              Toevoegen
                            </Button>
                          </div>
                        )}

                        <div className="space-y-1">
                          {cat.children.map((sub: CategoryChild) => (
                            <div
                              key={sub.id}
                              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-background transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                                {editingId === sub.id ? (
                                  <div className="flex items-center gap-2">
                                    <Input
                                      value={editName}
                                      onChange={(e) => setEditName(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") handleUpdate(sub.id, editName);
                                        if (e.key === "Escape") { setEditingId(null); setEditName(""); }
                                      }}
                                      className="h-7 text-sm w-40"
                                      autoFocus
                                    />
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-7 px-2 text-xs"
                                      onClick={() => handleUpdate(sub.id, editName)}
                                      disabled={isPending}
                                    >
                                      Opslaan
                                    </Button>
                                  </div>
                                ) : (
                                  <>
                                    <span className="text-sm text-foreground">{sub.name}</span>
                                    <Badge variant="secondary" className="text-[10px]">{sub.slug}</Badge>
                                  </>
                                )}
                              </div>
                              {editingId !== sub.id && (
                                <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                  <button
                                    className="text-xs text-muted-foreground hover:text-foreground"
                                    onClick={() => {
                                      setEditingId(sub.id);
                                      setEditName(sub.name);
                                    }}
                                  >
                                    Bewerk
                                  </button>
                                  <button
                                    className="text-xs text-muted-foreground hover:text-destructive"
                                    onClick={() => {
                                      if (confirm(`Subcategorie "${sub.name}" verwijderen?`)) {
                                        handleDelete(sub.id);
                                      }
                                    }}
                                    disabled={isPending}
                                  >
                                    Verwijder
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                          {cat.children.length === 0 && (
                            <p className="text-xs text-muted-foreground py-2 px-3">
                              Geen subcategorieën. Klik &quot;+ Toevoegen&quot; om er een aan te maken.
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              );
            })}

            {categories.length === 0 && (
              <Card>
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Geen categorieën gevonden. Maak een nieuwe categorie aan.
                </div>
              </Card>
            )}
          </div>

          {/* Add category sidebar */}
          <div>
            <Card>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Nieuwe {typeLabel} Categorie
                </h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Categorie naam..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newName.trim()) {
                        handleCreate(newName, type);
                        setNewName("");
                      }
                    }}
                    className="h-10"
                  />
                  <Button
                    onClick={() => {
                      handleCreate(newName, type);
                      setNewName("");
                    }}
                    className="w-full"
                    size="sm"
                    disabled={!newName.trim() || isPending}
                  >
                    {isPending ? "Bezig..." : "Categorie Toevoegen"}
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-2 w-2 rounded-full ${colorClass}`} />
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {typeLabel} categorieën
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {type === "PRODUCT" && "Product categorieën worden gebruikt om uw producten te groeperen in de catalogus."}
                  {type === "SERVICE" && "Dienst categorieën zijn gescheiden van product categorieën. Ze worden gebruikt om uw services te groeperen op de website."}
                  {type === "PORTFOLIO" && "Portfolio categorieën worden gebruikt om uw portfolio items te organiseren."}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // ── Main render ────────────────────────────────────────────────

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Categorieën & Taxonomy</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Beheer product categorieën, dienst categorieën en portfolio categorieën.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile: dropdown */}
        <ResponsiveTabs
          className="mb-6 md:hidden"
          value={activeTab}
          onChange={setActiveTab}
          items={[
            { value: "producten", label: "Product Categorieën", count: productCategories.length },
            { value: "diensten", label: "Dienst Categorieën", count: serviceCategories.length },
            { value: "portfolio", label: "Portfolio Categorieën", count: portfolioCategories.length },
          ]}
        />
        {/* Desktop: original tab bar */}
        <TabsList className="mb-6 hidden md:inline-flex">
          <TabsTrigger value="producten">
            Product Categorieën
            <Badge variant="secondary" className="ml-2 text-[10px]">{productCategories.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="diensten">
            Dienst Categorieën
            <Badge variant="secondary" className="ml-2 text-[10px]">{serviceCategories.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            Portfolio Categorieën
            <Badge variant="secondary" className="ml-2 text-[10px]">{portfolioCategories.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* === PRODUCT CATEGORIEËN TAB === */}
        <TabsContent value="producten">
          {renderCategoryList(
            productCategories,
            "PRODUCT",
            newProductCat,
            setNewProductCat,
            "Product",
            "bg-primary",
          )}
        </TabsContent>

        {/* === DIENST CATEGORIEËN TAB === */}
        <TabsContent value="diensten">
          {renderCategoryList(
            serviceCategories,
            "SERVICE",
            newServiceCat,
            setNewServiceCat,
            "Dienst",
            "bg-brand-teal",
          )}
        </TabsContent>

        {/* === PORTFOLIO CATEGORIEËN TAB === */}
        <TabsContent value="portfolio">
          {renderCategoryList(
            portfolioCategories,
            "PORTFOLIO",
            newPortfolioCat,
            setNewPortfolioCat,
            "Portfolio",
            "bg-brand-green",
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
