"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveTabs } from "@/components/admin/responsive-tabs";
import { categories, products } from "@/lib/catalog-data";

// Count products per category
function countProducts(slug: string) {
  return products.filter((p) => p.category === slug).length;
}
function countSubProducts(catSlug: string, subSlug: string) {
  return products.filter((p) => p.category === catSlug && p.subcategory === subSlug).length;
}

// Dummy tags for taxonomy
const defaultTags = [
  { id: "t1", name: "Populair", color: "bg-primary", count: 8 },
  { id: "t2", name: "Nieuw", color: "bg-brand-green", count: 5 },
  { id: "t3", name: "Bestseller", color: "bg-brand-yellow", count: 3 },
  { id: "t4", name: "Seizoen", color: "bg-brand-teal", count: 4 },
  { id: "t5", name: "Premium", color: "bg-foreground", count: 6 },
  { id: "t6", name: "Budget", color: "bg-muted-foreground", count: 7 },
  { id: "t7", name: "Eco-vriendelijk", color: "bg-brand-green", count: 4 },
  { id: "t8", name: "Kerst", color: "bg-primary", count: 0 },
  { id: "t9", name: "Bedrijfsevent", color: "bg-brand-teal", count: 2 },
];

// Service categories
const defaultServiceCategories = [
  { id: "sc1", name: "Ontwerp & Design", slug: "ontwerp", description: "Grafisch ontwerp, logo design, huisstijl", serviceCount: 2 },
  { id: "sc2", name: "Drukwerk & Productie", slug: "drukwerk", description: "Offset, digitaal en groot formaat drukwerk", serviceCount: 2 },
  { id: "sc3", name: "Branding & Marketing", slug: "branding", description: "Merkidentiteit, verpakking, strategie", serviceCount: 2 },
  { id: "sc4", name: "Signage & Displays", slug: "signage", description: "Gevelreclame, voertuigbelettering, borden", serviceCount: 2 },
  { id: "sc5", name: "Digitale Diensten", slug: "digitaal", description: "Webdesign, social media, digitale content", serviceCount: 2 },
];

export default function CategorieenPage() {
  const [tags, setTags] = useState(defaultTags);
  const [newTag, setNewTag] = useState("");
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [serviceCategories, setServiceCategories] = useState(defaultServiceCategories);
  const [newServiceCat, setNewServiceCat] = useState("");
  const [activeTab, setActiveTab] = useState("categorieen");

  function handleAddTag() {
    if (!newTag.trim()) return;
    setTags([
      ...tags,
      { id: `t${Date.now()}`, name: newTag.trim(), color: "bg-muted-foreground", count: 0 },
    ]);
    setNewTag("");
  }

  function handleDeleteTag(id: string) {
    setTags(tags.filter((t) => t.id !== id));
  }

  return (
    <div className="p-6 lg:p-8 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Categorieën & Taxonomy</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Beheer product categorieën, dienst categorieën en tags.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile: dropdown */}
        <ResponsiveTabs
          className="mb-6 md:hidden"
          value={activeTab}
          onChange={setActiveTab}
          items={[
            { value: "categorieen", label: "Product Categorieën", count: categories.length },
            { value: "diensten", label: "Dienst Categorieën", count: serviceCategories.length },
            { value: "tags", label: "Tags", count: tags.length },
          ]}
        />
        {/* Desktop: original tab bar */}
        <TabsList className="mb-6 hidden md:inline-flex">
          <TabsTrigger value="categorieen">
            Product Categorieën
            <Badge variant="secondary" className="ml-2 text-[10px]">{categories.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="diensten">
            Dienst Categorieën
            <Badge variant="secondary" className="ml-2 text-[10px]">{serviceCategories.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="tags">
            Tags
            <Badge variant="secondary" className="ml-2 text-[10px]">{tags.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* === CATEGORIEËN TAB === */}
        <TabsContent value="categorieen">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">{categories.length} hoofdcategorieën, {categories.reduce((acc, c) => acc + c.subcategories.length, 0)} subcategorieën</p>
            <Button size="sm" className="gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nieuwe Categorie
            </Button>
          </div>

          <div className="space-y-3">
            {categories.map((cat) => {
              const isExpanded = expandedCat === cat.slug;
              const prodCount = countProducts(cat.slug);

              return (
                <Card key={cat.slug} className="overflow-hidden">
                  {/* Category header */}
                  <button
                    onClick={() => setExpandedCat(isExpanded ? null : cat.slug)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {cat.subcategories.length} subcategorieën · {prodCount} producten
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-[10px]">{cat.slug}</Badge>
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
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subcategorieën</span>
                          <button className="text-xs text-primary hover:underline font-medium">+ Toevoegen</button>
                        </div>
                        <div className="space-y-1">
                          {cat.subcategories.map((sub) => {
                            const subCount = countSubProducts(cat.slug, sub.slug);
                            return (
                              <div key={sub.slug} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-background transition-colors group">
                                <div className="flex items-center gap-3">
                                  <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                                  <span className="text-sm text-foreground">{sub.name}</span>
                                  <Badge variant="secondary" className="text-[10px]">{subCount}</Badge>
                                </div>
                                <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                  <button className="text-xs text-muted-foreground hover:text-foreground">Bewerk</button>
                                  <button className="text-xs text-muted-foreground hover:text-destructive">Verwijder</button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* === DIENST CATEGORIEËN TAB === */}
        <TabsContent value="diensten">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">{serviceCategories.length} dienst categorieën</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {serviceCategories.map((cat) => (
                <Card key={cat.id}>
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-md bg-brand-teal/10 flex items-center justify-center shrink-0">
                        <svg className="h-4 w-4 text-brand-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <Badge variant="secondary" className="text-[10px]">{cat.serviceCount} diensten</Badge>
                      <Badge variant="outline" className="text-[10px]">{cat.slug}</Badge>
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Bewerk</button>
                        <button
                          onClick={() => setServiceCategories(serviceCategories.filter((c) => c.id !== cat.id))}
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                        >
                          Verwijder
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Add service category */}
            <div>
              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Nieuwe Dienst Categorie</h3>
                  <div className="space-y-3">
                    <Input
                      placeholder="Categorie naam..."
                      value={newServiceCat}
                      onChange={(e) => setNewServiceCat(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newServiceCat.trim()) {
                          setServiceCategories([
                            ...serviceCategories,
                            {
                              id: `sc${Date.now()}`,
                              name: newServiceCat.trim(),
                              slug: newServiceCat.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                              description: "",
                              serviceCount: 0,
                            },
                          ]);
                          setNewServiceCat("");
                        }
                      }}
                      className="h-10"
                    />
                    <Button
                      onClick={() => {
                        if (!newServiceCat.trim()) return;
                        setServiceCategories([
                          ...serviceCategories,
                          {
                            id: `sc${Date.now()}`,
                            name: newServiceCat.trim(),
                            slug: newServiceCat.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                            description: "",
                            serviceCount: 0,
                          },
                        ]);
                        setNewServiceCat("");
                      }}
                      className="w-full"
                      size="sm"
                      disabled={!newServiceCat.trim()}
                    >
                      Categorie Toevoegen
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-brand-teal" />
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dienst categorieën</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dienst categorieën zijn gescheiden van product categorieën. Ze worden gebruikt om uw services te groeperen op de website.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* === TAGS TAB === */}
        <TabsContent value="tags">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tag list */}
            <div className="lg:col-span-2">
              <Card>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Alle Tags</h3>
                  <span className="text-xs text-muted-foreground">{tags.length} tags</span>
                </div>
                <Separator />
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Tag</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Slug</th>
                        <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Producten</th>
                        <th className="w-20 px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tags.map((tag, i) => (
                        <tr key={tag.id} className={`border-b last:border-0 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                              <span className="text-sm font-medium text-foreground">{tag.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                              {tag.name.toLowerCase().replace(/[\s-]+/g, "-").replace(/[^a-z0-9-]/g, "")}
                            </code>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Badge variant="secondary" className="text-[10px]">{tag.count}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2 justify-end">
                              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                Bewerk
                              </button>
                              <button
                                onClick={() => handleDeleteTag(tag.id)}
                                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Add tag */}
            <div>
              <Card>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Nieuwe Tag</h3>
                  <div className="space-y-3">
                    <Input
                      placeholder="Tag naam..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                      className="h-10"
                    />
                    <Button onClick={handleAddTag} className="w-full" size="sm" disabled={!newTag.trim()}>
                      Tag Toevoegen
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Snelle weergave</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag.id} variant="outline" className="text-xs gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${tag.color}`} />
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
