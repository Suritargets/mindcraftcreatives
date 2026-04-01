"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

// ─── Single Image Upload ───────────────────────────────────────────────
type SingleUploadProps = {
  value: string | null;
  onChange: (url: string | null) => void;
  aspect?: string; // e.g. "aspect-square", "aspect-video", "aspect-[4/3]"
  height?: string; // e.g. "h-32", "h-48"
  label?: string;
  hint?: string;
  compact?: boolean; // smaller variant for sidebar
};

export function ImageUpload({
  value,
  onChange,
  aspect = "aspect-[4/3]",
  height,
  label = "Upload afbeelding",
  hint = "PNG, JPG, WebP tot 5MB",
  compact = false,
}: SingleUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onChange(url);
    },
    [onChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (value) {
    return (
      <div className="relative group">
        <div
          className={`${height || aspect} rounded-lg bg-muted border overflow-hidden`}
        >
          <Image
            src={value}
            alt="Uploaded"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
          <button
            onClick={() => inputRef.current?.click()}
            className="h-8 w-8 rounded-full bg-white/90 text-foreground flex items-center justify-center hover:bg-white transition-colors"
            title="Vervangen"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
          </button>
          <button
            onClick={() => onChange(null)}
            className="h-8 w-8 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-colors"
            title="Verwijderen"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
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

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`w-full ${height || aspect} rounded-lg border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-2 group ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/20 hover:border-primary/40 bg-muted/30 hover:bg-muted/50"
        }`}
      >
        <div
          className={`${compact ? "h-8 w-8" : "h-10 w-10"} rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors`}
        >
          <svg
            className={`${compact ? "h-4 w-4" : "h-5 w-5"} text-muted-foreground group-hover:text-primary transition-colors`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
        <span
          className={`${compact ? "text-[10px]" : "text-xs"} text-muted-foreground group-hover:text-foreground transition-colors`}
        >
          {label}
        </span>
        {hint && !compact && (
          <span className="text-[10px] text-muted-foreground/60">{hint}</span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </>
  );
}

// ─── Gallery / Multi Image Upload ──────────────────────────────────────
type GalleryUploadProps = {
  values: string[];
  onChange: (urls: string[]) => void;
  columns?: number; // grid columns, default 3
};

export function GalleryUpload({
  values,
  onChange,
  columns = 3,
}: GalleryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList) => {
      const newUrls: string[] = [];
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          newUrls.push(URL.createObjectURL(file));
        }
      });
      if (newUrls.length > 0) {
        onChange([...values, ...newUrls]);
      }
    },
    [values, onChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      const url = values[index];
      if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      onChange(values.filter((_, i) => i !== index));
    },
    [values, onChange]
  );

  return (
    <>
      <div
        className={`grid gap-2`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {values.map((url, i) => (
          <div
            key={`${url}-${i}`}
            className="relative group aspect-square rounded-md bg-muted border overflow-hidden"
          >
            <Image
              src={url}
              alt={`Gallery ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                className="h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="aspect-square rounded-md border-2 border-dashed border-muted-foreground/20 hover:border-primary/40 bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col items-center justify-center gap-1"
        >
          <svg
            className="h-5 w-5 text-muted-foreground/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-[9px] text-muted-foreground/60">Toevoegen</span>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </>
  );
}

// ─── Slider Image Upload (ordered list with previews) ──────────────────
type SliderUploadProps = {
  values: string[];
  onChange: (urls: string[]) => void;
};

export function SliderUpload({ values, onChange }: SliderUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (files: FileList) => {
      const newUrls: string[] = [];
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          newUrls.push(URL.createObjectURL(file));
        }
      });
      if (newUrls.length > 0) onChange([...values, ...newUrls]);
    },
    [values, onChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      const url = values[index];
      if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      onChange(values.filter((_, i) => i !== index));
    },
    [values, onChange]
  );

  return (
    <div className="space-y-2">
      {values.map((url, idx) => (
        <div
          key={`${url}-${idx}`}
          className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20"
        >
          <div className="h-16 w-24 rounded bg-muted shrink-0 relative overflow-hidden">
            <Image
              src={url}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground">Slide {idx + 1}</p>
            <p className="text-[10px] text-muted-foreground truncate">
              {url.startsWith("blob:") ? "Nieuwe afbeelding" : url}
            </p>
          </div>
          <button
            onClick={() => removeImage(idx)}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full h-20 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-primary/40 bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 group"
      >
        <svg className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
          Afbeelding toevoegen
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
