"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── CSV Export Button ───────────────────────────────────────────────
type ExportButtonProps = {
  data: Record<string, unknown>[];
  filename: string;
  columns?: { key: string; label: string }[];
};

export function ExportCSVButton({ data, filename, columns }: ExportButtonProps) {
  function handleExport() {
    if (data.length === 0) return;

    const cols = columns || Object.keys(data[0]).map((key) => ({ key, label: key }));
    const header = cols.map((c) => `"${c.label}"`).join(",");
    const rows = data.map((row) =>
      cols
        .map((c) => {
          const val = row[c.key];
          if (val === null || val === undefined) return '""';
          if (Array.isArray(val)) return `"${val.join("; ")}"`;
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 text-xs">
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      Export CSV
    </Button>
  );
}

// ─── CSV Import Button ───────────────────────────────────────────────
type ImportButtonProps = {
  onImport: (data: Record<string, string>[]) => void;
  expectedColumns?: string[];
};

export function ImportCSVButton({ onImport, expectedColumns }: ImportButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ count: number; error?: string } | null>(null);

  function parseCSV(text: string): Record<string, string>[] {
    const lines = text.split("\n").filter((l) => l.trim());
    if (lines.length < 2) return [];

    // Parse header
    const headers = lines[0].split(",").map((h) => h.replace(/^"|"$/g, "").trim());

    const rows: Record<string, string>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values: string[] = [];
      let current = "";
      let inQuotes = false;

      for (const char of lines[i]) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const row: Record<string, string> = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx] || "";
      });
      rows.push(row);
    }
    return rows;
  }

  function handleFile(file: File) {
    setImporting(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = parseCSV(text);

        if (expectedColumns) {
          const headers = Object.keys(data[0] || {});
          const missing = expectedColumns.filter((c) => !headers.includes(c));
          if (missing.length > 0) {
            setResult({ count: 0, error: `Ontbrekende kolommen: ${missing.join(", ")}` });
            setImporting(false);
            return;
          }
        }

        onImport(data);
        setResult({ count: data.length });
      } catch {
        setResult({ count: 0, error: "Kon het bestand niet verwerken" });
      }
      setImporting(false);
      setTimeout(() => setResult(null), 4000);
    };
    reader.readAsText(file);
  }

  return (
    <div className="inline-flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={importing}
        className="gap-1.5 text-xs"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
        {importing ? "Importeren..." : "Import CSV"}
      </Button>
      {result && (
        result.error ? (
          <Badge variant="destructive" className="text-[10px]">{result.error}</Badge>
        ) : (
          <Badge className="text-[10px] bg-brand-green/10 text-brand-green border-0">
            {result.count} items geïmporteerd
          </Badge>
        )
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ─── Combined Import/Export Toolbar ──────────────────────────────────
type ImportExportToolbarProps = {
  exportData: Record<string, unknown>[];
  exportFilename: string;
  exportColumns?: { key: string; label: string }[];
  onImport: (data: Record<string, string>[]) => void;
  expectedImportColumns?: string[];
};

export function ImportExportToolbar({
  exportData,
  exportFilename,
  exportColumns,
  onImport,
  expectedImportColumns,
}: ImportExportToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <ExportCSVButton data={exportData} filename={exportFilename} columns={exportColumns} />
      <ImportCSVButton onImport={onImport} expectedColumns={expectedImportColumns} />
    </div>
  );
}
