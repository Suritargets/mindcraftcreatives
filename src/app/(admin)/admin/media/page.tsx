"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type MediaFileType = "image" | "document" | "video";

type MediaFile = {
  id: string;
  filename: string;
  type: MediaFileType;
  size: number;
  uploadDate: string;
  url: string;
  dimensions?: string;
};

const demoMedia: MediaFile[] = [
  { id: "m1", filename: "hero-banner.jpg", type: "image", size: 2457600, uploadDate: "2026-03-28", url: "/placeholder-1.jpg", dimensions: "1920x1080" },
  { id: "m2", filename: "logo-mindcraft.png", type: "image", size: 184320, uploadDate: "2026-03-27", url: "/placeholder-2.jpg", dimensions: "512x512" },
  { id: "m3", filename: "team-foto.jpg", type: "image", size: 3145728, uploadDate: "2026-03-25", url: "/placeholder-3.jpg", dimensions: "2400x1600" },
  { id: "m4", filename: "offerte-template.pdf", type: "document", size: 524288, uploadDate: "2026-03-24", url: "/docs/template.pdf" },
  { id: "m5", filename: "product-brochure.pdf", type: "document", size: 1048576, uploadDate: "2026-03-22", url: "/docs/brochure.pdf" },
  { id: "m6", filename: "promo-video.mp4", type: "video", size: 15728640, uploadDate: "2026-03-20", url: "/videos/promo.mp4" },
  { id: "m7", filename: "portfolio-signage-01.jpg", type: "image", size: 1843200, uploadDate: "2026-03-18", url: "/placeholder-1.jpg", dimensions: "1600x1200" },
  { id: "m8", filename: "portfolio-branding-02.jpg", type: "image", size: 2097152, uploadDate: "2026-03-17", url: "/placeholder-2.jpg", dimensions: "1800x1200" },
  { id: "m9", filename: "handleiding-drukwerk.pdf", type: "document", size: 786432, uploadDate: "2026-03-15", url: "/docs/handleiding.pdf" },
  { id: "m10", filename: "event-recap.mp4", type: "video", size: 52428800, uploadDate: "2026-03-12", url: "/videos/event.mp4" },
  { id: "m11", filename: "favicon.png", type: "image", size: 8192, uploadDate: "2026-03-10", url: "/favicon.jpeg", dimensions: "64x64" },
  { id: "m12", filename: "banner-actie-april.jpg", type: "image", size: 1572864, uploadDate: "2026-03-08", url: "/placeholder-3.jpg", dimensions: "1200x630" },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
  return (bytes / 1073741824).toFixed(1) + " GB";
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

function getTypeIcon(type: MediaFileType) {
  if (type === "image") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    );
  }
  if (type === "document") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function getTypeBadgeColor(type: MediaFileType): string {
  if (type === "image") return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  if (type === "document") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
}

export default function MediaPage() {
  const [files, setFiles] = useState(demoMedia);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | MediaFileType>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);

  const filtered = useMemo(() => {
    return files.filter((f) => {
      const matchesSearch = f.filename.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || f.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [files, search, typeFilter]);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((f) => f.id)));
    }
  }

  function handleDelete(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function handleBulkDelete() {
    setFiles((prev) => prev.filter((f) => !selectedIds.has(f.id)));
    setSelectedIds(new Set());
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media</h1>
          <p className="text-sm text-muted-foreground mt-1">Beheer al uw geüploade bestanden</p>
        </div>
        <Button className="gap-1.5">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          Uploaden
        </Button>
      </div>

      {/* Storage stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Totaal bestanden</p>
          <p className="text-2xl font-bold text-foreground mt-1">{files.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Totale grootte</p>
          <p className="text-2xl font-bold text-foreground mt-1">{formatFileSize(totalSize)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Afbeeldingen</p>
          <p className="text-2xl font-bold text-foreground mt-1">{files.filter((f) => f.type === "image").length}</p>
        </Card>
      </div>

      <Separator className="mb-6" />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <Input
            placeholder="Zoek op bestandsnaam..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-1.5">
          {(["all", "image", "document", "video"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                typeFilter === t
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t === "all" ? "Alles" : t === "image" ? "Afbeeldingen" : t === "document" ? "Documenten" : "Video's"}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex border rounded-md overflow-hidden ml-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
            title="Rasterweergave"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
            title="Lijstweergave"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium text-foreground">{selectedIds.size} geselecteerd</span>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Verwijderen
          </Button>
          <button onClick={() => setSelectedIds(new Set())} className="text-xs text-muted-foreground hover:text-foreground ml-auto">
            Deselecteer alles
          </button>
        </div>
      )}

      {/* Select all checkbox */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={toggleSelectAll}
          className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
            selectedIds.size === filtered.length && filtered.length > 0
              ? "bg-primary border-primary"
              : "border-muted-foreground/30 hover:border-muted-foreground/50"
          }`}
        >
          {selectedIds.size === filtered.length && filtered.length > 0 && (
            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          )}
        </button>
        <span className="text-xs text-muted-foreground">
          {filtered.length} bestand{filtered.length !== 1 ? "en" : ""}
        </span>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((file) => (
            <Card
              key={file.id}
              className="overflow-hidden group relative cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all"
              onClick={() => setPreviewFile(file)}
            >
              {/* Checkbox */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleSelect(file.id); }}
                className={`absolute top-2 left-2 z-10 h-5 w-5 rounded border flex items-center justify-center transition-all ${
                  selectedIds.has(file.id)
                    ? "bg-primary border-primary"
                    : "border-white/60 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                }`}
              >
                {selectedIds.has(file.id) && (
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>

              {/* Delete button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}
                className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full bg-destructive/80 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                title="Verwijderen"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Thumbnail */}
              <div className="aspect-square bg-muted flex items-center justify-center">
                {file.type === "image" ? (
                  <div className="h-full w-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                    <svg className="h-10 w-10 text-muted-foreground/30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                  </div>
                ) : (
                  <div className="text-muted-foreground/40">
                    {getTypeIcon(file.type)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-xs font-medium text-foreground truncate" title={file.filename}>{file.filename}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${getTypeBadgeColor(file.type)}`}>
                    {file.type === "image" ? "Afbeelding" : file.type === "document" ? "Document" : "Video"}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{formatFileSize(file.size)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{formatDate(file.uploadDate)}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 w-8"></th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Bestand</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Grootte</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Upload datum</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Acties</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((file) => (
                  <tr
                    key={file.id}
                    className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors group"
                    onClick={() => setPreviewFile(file)}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleSelect(file.id)}
                        className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                          selectedIds.has(file.id)
                            ? "bg-primary border-primary"
                            : "border-muted-foreground/30 hover:border-muted-foreground/50"
                        }`}
                      >
                        {selectedIds.has(file.id) && (
                          <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center shrink-0 text-muted-foreground/50">
                          {getTypeIcon(file.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{file.filename}</p>
                          {file.dimensions && (
                            <p className="text-[10px] text-muted-foreground">{file.dimensions}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${getTypeBadgeColor(file.type)}`}>
                        {file.type === "image" ? "Afbeelding" : file.type === "document" ? "Document" : "Video"}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">{formatFileSize(file.size)}</td>
                    <td className="p-3 text-sm text-muted-foreground">{formatDate(file.uploadDate)}</td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all p-1 rounded"
                        title="Verwijderen"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <svg className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
          <p className="text-sm text-muted-foreground">Geen bestanden gevonden.</p>
        </div>
      )}

      {/* Preview overlay */}
      {previewFile && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3 min-w-0">
                <div className="text-muted-foreground shrink-0">{getTypeIcon(previewFile.type)}</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{previewFile.filename}</p>
                  <p className="text-[10px] text-muted-foreground">{formatFileSize(previewFile.size)} · {formatDate(previewFile.uploadDate)}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              >
                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preview body */}
            <div className="aspect-video bg-muted flex items-center justify-center">
              {previewFile.type === "image" ? (
                <div className="h-full w-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                  <svg className="h-20 w-20 text-muted-foreground/20" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                </div>
              ) : previewFile.type === "video" ? (
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Video preview</p>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="h-16 w-16 text-muted-foreground/30 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <p className="text-sm text-muted-foreground">Document preview</p>
                </div>
              )}
            </div>

            {/* Preview footer with details */}
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground mt-0.5">
                    {previewFile.type === "image" ? "Afbeelding" : previewFile.type === "document" ? "Document" : "Video"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Grootte</p>
                  <p className="font-medium text-foreground mt-0.5">{formatFileSize(previewFile.size)}</p>
                </div>
                {previewFile.dimensions && (
                  <div>
                    <p className="text-muted-foreground">Afmetingen</p>
                    <p className="font-medium text-foreground mt-0.5">{previewFile.dimensions}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Upload datum</p>
                  <p className="font-medium text-foreground mt-0.5">{formatDate(previewFile.uploadDate)}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setPreviewFile(null)}>
                  Sluiten
                </Button>
                <Button variant="destructive" size="sm" className="gap-1.5" onClick={() => { handleDelete(previewFile.id); setPreviewFile(null); }}>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Verwijderen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
