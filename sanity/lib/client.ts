import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Обикновен Sanity клиент за четене на данни.
// ВАЖНО: БЕЗ SanityLive / defineLive (несъвместими с Next.js 16) —
// използваме само стандартния client.fetch().
// useCdn: false → данните идват директно от API-то (без CDN кеш слой).
// Така ISR-ът на Next (revalidate) е единственият кеш и промените от
// Studio излизат консистентно, без „трептене" старо/ново.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
