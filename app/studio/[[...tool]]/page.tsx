// Тази страница рендира Sanity Studio на маршрута /studio.
// Catch-all [[...tool]] поема всички вътрешни маршрути на Studio.
// Препоръчителни настройки от Sanity за вграждане в Next.js App Router.

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
