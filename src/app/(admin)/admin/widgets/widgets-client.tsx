"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  toggleWidget as toggleWidgetAction,
  updateWidget as updateWidgetAction,
  createWidget as createWidgetAction,
  deleteWidget as deleteWidgetAction,
} from "@/lib/actions/widgets";

export type WidgetConfig = Record<string, string>;

export type Widget = {
  id: string;
  name: string;
  type: "whatsapp" | "cta-banner" | "newsletter" | "social" | "custom";
  enabled: boolean;
  position: "header" | "footer" | "sidebar" | "popup" | "floating";
  config: WidgetConfig;
};

const typeLabels: Record<string, string> = {
  whatsapp: "WhatsApp",
  "cta-banner": "CTA Banner",
  newsletter: "Nieuwsbrief",
  social: "Social Media",
  custom: "Custom",
};

const positionLabels: Record<string, string> = {
  header: "Header",
  footer: "Footer",
  sidebar: "Zijbalk",
  popup: "Popup",
  floating: "Zwevend",
};

const typeToDb: Record<string, "WHATSAPP" | "CTA_BANNER" | "NEWSLETTER" | "SOCIAL" | "CUSTOM"> = {
  whatsapp: "WHATSAPP",
  "cta-banner": "CTA_BANNER",
  newsletter: "NEWSLETTER",
  social: "SOCIAL",
  custom: "CUSTOM",
};

const positionToDb: Record<string, "HEADER" | "FOOTER" | "SIDEBAR" | "POPUP" | "FLOATING"> = {
  header: "HEADER",
  footer: "FOOTER",
  sidebar: "SIDEBAR",
  popup: "POPUP",
  floating: "FLOATING",
};

export default function WidgetsClient({ initialWidgets }: { initialWidgets: Widget[] }) {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleToggleWidget(id: string) {
    const widget = widgets.find((w) => w.id === id);
    if (!widget) return;
    const newEnabled = !widget.enabled;
    setWidgets(widgets.map((w) => w.id === id ? { ...w, enabled: newEnabled } : w));
    startTransition(async () => {
      await toggleWidgetAction(id, newEnabled);
    });
  }

  function updateWidget(id: string, updates: Partial<Widget>) {
    setWidgets(widgets.map((w) => w.id === id ? { ...w, ...updates } : w));
  }

  function updateConfig(id: string, key: string, value: string) {
    setWidgets(widgets.map((w) => w.id === id ? { ...w, config: { ...w.config, [key]: value } } : w));
  }

  function handleSave(id: string) {
    const widget = widgets.find((w) => w.id === id);
    if (!widget) return;
    setSaved(id);
    setEditingId(null);
    setTimeout(() => setSaved(null), 2000);
    startTransition(async () => {
      await updateWidgetAction(id, {
        name: widget.name,
        type: typeToDb[widget.type],
        position: positionToDb[widget.position],
        enabled: widget.enabled,
        config: widget.config,
      });
    });
  }

  function handleDelete(id: string) {
    setWidgets(widgets.filter((w) => w.id !== id));
    if (editingId === id) setEditingId(null);
    startTransition(async () => {
      await deleteWidgetAction(id);
    });
  }

  function handleAddWidget() {
    startTransition(async () => {
      const created = await createWidgetAction({
        name: "Nieuwe Widget",
        type: "CUSTOM",
        position: "FOOTER",
        enabled: false,
        config: { titel: "", tekst: "" },
      });
      const newWidget: Widget = {
        id: created.id,
        name: created.name,
        type: "custom",
        enabled: false,
        position: "footer",
        config: (created.config as WidgetConfig) || { titel: "", tekst: "" },
      };
      setWidgets((prev) => [...prev, newWidget]);
      setEditingId(created.id);
    });
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Widgets</h1>
          <p className="text-sm text-muted-foreground mt-1">Beheer widgets en extra elementen op de website.</p>
        </div>
        <Button onClick={handleAddWidget} disabled={isPending} className="gap-1.5">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nieuwe Widget
        </Button>
      </div>

      <div className="space-y-4">
        {widgets.map((widget) => {
          const isEditing = editingId === widget.id;
          const justSaved = saved === widget.id;

          return (
            <Card key={widget.id} className={`transition-all ${!widget.enabled ? "opacity-70" : ""} ${isEditing ? "ring-2 ring-primary/30" : ""}`}>
              {/* Widget header - always visible */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${widget.enabled ? "bg-primary/10" : "bg-muted"}`}>
                    {widget.type === "whatsapp" ? (
                      <svg className={`h-5 w-5 ${widget.enabled ? "text-brand-green" : "text-muted-foreground"}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    ) : (
                      <svg className={`h-5 w-5 ${widget.enabled ? "text-primary" : "text-muted-foreground"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground truncate">{widget.name}</h3>
                      {justSaved && (
                        <span className="text-[10px] text-brand-green font-medium flex items-center gap-0.5">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                          Opgeslagen
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <Badge variant="secondary" className="text-[10px]">{typeLabels[widget.type]}</Badge>
                      <Badge variant="outline" className="text-[10px]">{positionLabels[widget.position]}</Badge>
                      <span className={`text-[10px] font-medium ${widget.enabled ? "text-brand-green" : "text-muted-foreground"}`}>
                        {widget.enabled ? "Actief" : "Uit"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {/* Edit button */}
                  <button
                    onClick={() => setEditingId(isEditing ? null : widget.id)}
                    className={`h-8 w-8 rounded-md flex items-center justify-center transition-colors ${isEditing ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  {/* Toggle */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleWidget(widget.id); }}
                    className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${widget.enabled ? "bg-brand-green" : "bg-muted-foreground/30"}`}
                  >
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${widget.enabled ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </div>
              </div>

              {/* Expandable edit panel */}
              {isEditing && (
                <>
                  <Separator />
                  <div className="p-5 space-y-4 bg-muted/10">
                    {/* Basic settings */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Widget Naam</label>
                        <Input
                          value={widget.name}
                          onChange={(e) => updateWidget(widget.id, { name: e.target.value })}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Type</label>
                        <select
                          value={widget.type}
                          onChange={(e) => updateWidget(widget.id, { type: e.target.value as Widget["type"] })}
                          className="w-full h-9 rounded-md border bg-background px-3 text-sm text-foreground"
                        >
                          {Object.entries(typeLabels).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Positie</label>
                        <select
                          value={widget.position}
                          onChange={(e) => updateWidget(widget.id, { position: e.target.value as Widget["position"] })}
                          className="w-full h-9 rounded-md border bg-background px-3 text-sm text-foreground"
                        >
                          {Object.entries(positionLabels).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Config fields */}
                    <Separator />
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Configuratie</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(widget.config).map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-xs text-muted-foreground mb-1 capitalize">{key}</label>
                            {value.length > 60 ? (
                              <Textarea
                                value={value}
                                onChange={(e) => updateConfig(widget.id, key, e.target.value)}
                                rows={2}
                                className="text-xs"
                              />
                            ) : (
                              <Input
                                value={value}
                                onChange={(e) => updateConfig(widget.id, key, e.target.value)}
                                className="h-8 text-xs"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(widget.id)} className="gap-1 text-xs">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Verwijderen
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingId(null)}>Annuleren</Button>
                        <Button size="sm" onClick={() => handleSave(widget.id)} disabled={isPending} className="gap-1.5">
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {isPending ? "Opslaan..." : "Opslaan"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          );
        })}

        {widgets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">Geen widgets. Maak een nieuwe widget aan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
