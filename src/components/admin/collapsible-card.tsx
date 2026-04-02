"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CollapsibleCardProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  defaultOpen?: boolean;
  variant?: "default" | "sidebar" | "danger";
  children: React.ReactNode;
};

export function CollapsibleCard({
  title,
  subtitle,
  badge,
  defaultOpen = true,
  variant = "default",
  children,
}: CollapsibleCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  const isSidebar = variant === "sidebar";

  return (
    <Card className={variant === "danger" ? "border-destructive/30" : ""}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between text-left transition-colors ${
          isSidebar ? "px-3 py-2" : "px-4 py-2.5"
        } hover:bg-muted/20 rounded-lg`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <h3
            className={
              isSidebar
                ? "text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                : "text-sm font-semibold text-foreground"
            }
          >
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs text-muted-foreground truncate">{subtitle}</span>
          )}
          {badge && (
            <Badge variant="secondary" className="text-[10px]">
              {badge}
            </Badge>
          )}
        </div>
        <svg
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={isSidebar ? "px-3 pb-2.5 pt-0.5" : "px-4 pb-3 pt-0.5"}>
          {children}
        </div>
      </div>
    </Card>
  );
}
