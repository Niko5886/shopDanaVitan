/**
 * Еднократен backfill: попълва полетата note и order на вече мигрираните
 * 54 продукта, за да се запази визуалната идентичност на /shop:
 *   - note  → подзаглавието под името на картата
 *   - order → оригиналният ред от масива в data/products.ts
 *
 * Пуска се с:  npm run backfill
 * Идемпотентен е — patch по slug презаписва само note/order.
 */

import { createClient } from "@sanity/client";
import { products } from "../data/products.bak";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("❌ Липсват env променливи (PROJECT_ID/DATASET/WRITE_TOKEN).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function backfill() {
  let patched = 0;
  let missing = 0;
  let errors = 0;

  console.log(`🚀 Backfill на note + order — ${products.length} продукта.\n`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    try {
      // Намираме документа по slug (същият, който мигрирахме).
      const id = await client.fetch<string | null>(
        `*[_type == "product" && slug.current == $slug][0]._id`,
        { slug: p.slug }
      );
      if (!id) {
        console.warn(`⚠️  Няма документ за slug: ${p.slug}`);
        missing++;
        continue;
      }

      await client
        .patch(id)
        .set({ note: p.note, order: i }) // i = оригиналният индекс в масива
        .commit();

      console.log(`✅ ${String(i).padStart(2, "0")} ${p.slug} → note="${p.note}"`);
      patched++;
    } catch (err) {
      console.error(`❌ Грешка при ${p.slug}:`, (err as Error).message);
      errors++;
    }
  }

  console.log("\n──────── РЕЗУЛТАТ ────────");
  console.log(`✅ Обновени:   ${patched}`);
  console.log(`⚠️  Липсващи:   ${missing}`);
  console.log(`❌ Грешки:     ${errors}`);
}

backfill().catch((err) => {
  console.error("Фатална грешка:", err);
  process.exit(1);
});
