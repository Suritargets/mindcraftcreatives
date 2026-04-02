import { getSettings } from "@/lib/actions/settings";
import InstellingenClient from "./instellingen-client";

export default async function InstellingenPage() {
  const settings = await getSettings();

  return <InstellingenClient initialSettings={settings} />;
}
