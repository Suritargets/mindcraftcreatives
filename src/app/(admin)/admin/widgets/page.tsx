import { getWidgets } from "@/lib/actions/widgets";
import WidgetsClient from "./widgets-client";
import type { Widget } from "./widgets-client";

export default async function WidgetsPage() {
  const rawWidgets = await getWidgets();

  const typeMap: Record<string, Widget["type"]> = {
    WHATSAPP: "whatsapp",
    CTA_BANNER: "cta-banner",
    NEWSLETTER: "newsletter",
    SOCIAL: "social",
    CUSTOM: "custom",
  };

  const positionMap: Record<string, Widget["position"]> = {
    HEADER: "header",
    FOOTER: "footer",
    SIDEBAR: "sidebar",
    POPUP: "popup",
    FLOATING: "floating",
  };

  const widgets: Widget[] = rawWidgets.map((w) => ({
    id: w.id,
    name: w.name,
    type: typeMap[w.type] ?? "custom",
    enabled: w.enabled,
    position: positionMap[w.position] ?? "footer",
    config: (w.config as Record<string, string>) || {},
  }));

  return <WidgetsClient initialWidgets={widgets} />;
}
