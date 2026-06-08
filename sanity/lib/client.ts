import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Обикновен Sanity клиент за четене на данни.
// ВАЖНО: БЕЗ SanityLive / defineLive (несъвместими с Next.js 16) —
// използваме само стандартния client.fetch().
// useCdn: true → бързи кеширани отговори от CDN-а на Sanity.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
