import { getSettings } from "@/lib/actions/settings";
import AppearanceClient from "./appearance-client";

export default async function AppearancePage() {
  const settings = await getSettings("appearance");

  return <AppearanceClient initialSettings={settings} />;
}
