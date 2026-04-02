import { getCommercialAreas } from "@/lib/actions/commercial";
import CommercialClient from "./commercial-client";
import type { CommercialArea } from "./commercial-client";

export default async function CommercialPage() {
  const rawAreas = await getCommercialAreas();

  const typeMap: Record<string, CommercialArea["type"]> = {
    BANNER: "banner",
    POPUP: "popup",
    INLINE: "inline",
    SIDEBAR: "sidebar",
  };

  const areas: CommercialArea[] = rawAreas.map((a: typeof rawAreas[number]) => ({
    id: a.id,
    name: a.name,
    location: a.location,
    type: typeMap[a.type] ?? "banner",
    content: a.content,
    linkUrl: a.linkUrl,
    enabled: a.enabled,
  }));

  return <CommercialClient initialAreas={areas} />;
}
