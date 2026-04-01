"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";

type TagCloudProps = {
  values: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
};

export function TagCloud({
  values,
  onChange,
  suggestions = [],
  placeholder = "Nieuwe tag...",
}: TagCloudProps) {
  const [input, setInput] = useState("");

  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim();
      if (trimmed && !values.includes(trimmed)) {
        onChange([...values, trimmed]);
      }
      setInput("");
    },
    [values, onChange]
  );

  const removeTag = useCallback(
    (tag: string) => {
      onChange(values.filter((t) => t !== tag));
    },
    [values, onChange]
  );

  const toggleSuggestion = useCallback(
    (tag: string) => {
      if (values.includes(tag)) {
        removeTag(tag);
      } else {
        onChange([...values, tag]);
      }
    },
    [values, onChange, removeTag]
  );

  return (
    <div className="space-y-3">
      {/* Selected tags as removable bubbles */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full text-xs font-medium bg-primary text-white"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="h-4 w-4 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
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
            </span>
          ))}
        </div>
      )}

      {/* Suggestion bubbles */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {suggestions
            .filter((s) => !values.includes(s))
            .map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => toggleSuggestion(suggestion)}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
              >
                + {suggestion}
              </button>
            ))}
        </div>
      )}

      {/* Custom tag input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(input);
            }
          }}
          placeholder={placeholder}
          className="h-8 text-xs flex-1"
        />
        <button
          onClick={() => addTag(input)}
          disabled={!input.trim()}
          className="h-8 w-8 rounded-md border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none shrink-0"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
