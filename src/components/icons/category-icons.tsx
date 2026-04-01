// Line-art style icons for product categories (like yahik.com)
// Each icon is a clean outline SVG

export function IconPen({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M44 8l12 12-32 32H12V40z" />
      <path d="M38 14l12 12" />
      <path d="M12 52l6-6" />
    </svg>
  );
}

export function IconNotebook({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="8" width="36" height="48" rx="2" />
      <path d="M22 8v48" />
      <path d="M30 20h12" />
      <path d="M30 28h12" />
      <path d="M30 36h8" />
      <path d="M10 16h4M10 24h4M10 32h4M10 40h4M10 48h4" />
    </svg>
  );
}

export function IconBag({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 20h48v36H8z" />
      <path d="M20 20V14a12 12 0 0124 0v6" />
      <path d="M8 20l4 36h40l4-36" />
    </svg>
  );
}

export function IconBottle({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6h16v8l4 6v32a4 4 0 01-4 4H24a4 4 0 01-4-4V20l4-6V6z" />
      <path d="M22 14h20" />
      <path d="M20 30h24" />
    </svg>
  );
}

export function IconBackpack({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20a16 16 0 0132 0v30a4 4 0 01-4 4H20a4 4 0 01-4-4V20z" />
      <path d="M24 10V8a8 8 0 0116 0v2" />
      <rect x="24" y="30" width="16" height="12" rx="2" />
      <path d="M12 28v20M52 28v20" />
    </svg>
  );
}

export function IconUmbrella({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8v44" />
      <path d="M32 8C16 8 8 22 8 32h48c0-10-8-24-24-24z" />
      <path d="M32 52a4 4 0 01-8 0" />
    </svg>
  );
}

export function IconMug({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 20h34v28a4 4 0 01-4 4H14a4 4 0 01-4-4V20z" />
      <path d="M44 26h6a6 6 0 010 12h-6" />
      <path d="M10 56h34" />
      <path d="M22 14c0-4 4-4 4-8M30 14c0-4 4-4 4-8" />
    </svg>
  );
}

export function IconCeramicMug({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 18h30v30a6 6 0 01-6 6H18a6 6 0 01-6-6V18z" />
      <path d="M42 24h6a8 8 0 010 16h-6" />
    </svg>
  );
}

export function IconTshirt({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 8l-14 8 6 10 8-4v32h20V22l8 4 6-10-14-8" />
      <path d="M22 8c0 6 4 10 10 10s10-4 10-10" />
    </svg>
  );
}

export function IconKeychain({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="26" cy="26" r="12" />
      <circle cx="26" cy="26" r="5" />
      <path d="M36 36l16 16" />
      <path d="M44 52h8v-8" />
      <path d="M42 42l4 4" />
    </svg>
  );
}

export function IconCoolerBag({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 22h44v30a4 4 0 01-4 4H14a4 4 0 01-4-4V22z" />
      <path d="M10 22l4-10h36l4 10" />
      <path d="M22 12V8M42 12V8" />
      <path d="M28 34h8M32 30v8" />
    </svg>
  );
}

export function IconHoodie({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 8l-12 10 6 8 6-4v34h24V22l6 4 6-8-12-10" />
      <path d="M20 8c0 8 4 12 12 12s12-4 12-12" />
      <path d="M26 28h12v10H26z" />
    </svg>
  );
}

export function IconApron({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 12h28v8c0 4-2 6-6 8v24H24V28c-4-2-6-4-6-8V12z" />
      <path d="M18 12c-4 0-8 2-8 6l4 14M46 12c4 0 8 2 8 6l-4 14" />
      <rect x="24" y="34" width="16" height="10" rx="1" />
    </svg>
  );
}

export function IconGadget({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4" />
      <path d="M32 16v-6M28 10h8" />
      <path d="M26 30h4v8h-4zM34 26h4v12h-4z" />
      <path d="M22 38h20" />
    </svg>
  );
}

export function IconBanner({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8v48M48 8v48" />
      <rect x="16" y="12" width="32" height="28" rx="1" />
      <path d="M12 8h8M44 8h8" />
      <path d="M26 22h12M28 28h8" />
    </svg>
  );
}

export function IconIdea({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8a16 16 0 00-8 29.8V44h16v-6.2A16 16 0 0032 8z" />
      <path d="M24 48h16M26 52h12" />
      <path d="M32 20v8M28 28h8" />
    </svg>
  );
}

// Map icon names to components
export const categoryIconMap: Record<string, React.FC<{ className?: string }>> = {
  pen: IconPen,
  notebook: IconNotebook,
  bag: IconBag,
  bottle: IconBottle,
  backpack: IconBackpack,
  umbrella: IconUmbrella,
  mug: IconMug,
  ceramicmug: IconCeramicMug,
  tshirt: IconTshirt,
  keychain: IconKeychain,
  coolerbag: IconCoolerBag,
  hoodie: IconHoodie,
  apron: IconApron,
  gadget: IconGadget,
  banner: IconBanner,
  idea: IconIdea,
};
