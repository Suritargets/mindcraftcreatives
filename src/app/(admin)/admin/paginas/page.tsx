import { getSettings } from "@/lib/actions/settings";
import PaginasClient from "./paginas-client";

export default async function PaginasPage() {
  const settings = await getSettings("pages");

  return <PaginasClient initialSettings={settings} />;
}
