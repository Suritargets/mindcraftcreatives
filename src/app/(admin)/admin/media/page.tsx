import { getMediaFiles } from "@/lib/actions/media";
import MediaClient from "./media-client";

export default async function MediaPage() {
  const files = await getMediaFiles();
  return <MediaClient initialFiles={files} />;
}
