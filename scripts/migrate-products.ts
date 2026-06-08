/**
 * Еднократна миграция на съществуващите 54 продукта в Sanity.
 *
 * Пуска се с:  npm run migrate
 * (npm script-ът зарежда .env.local чрез tsx --env-file)
 *
 * Какво прави:
 *  1. Чете масива products от data/products.ts.
 *  2. За всеки продукт качва снимките от public/... като Sanity assets.
 *  3. Създава документ _type 'product' със СЪЩИЯ slug.
 *  4. Идемпотентно: ако вече има продукт с този slug — пропуска го.
 *
 * ВАЖНО: ползва SANITY_API_WRITE_TOKEN (server-side, само в .env.local).
 */

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { products } from "../data/products.bak";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "❌ Липсват env променливи. Нужни са NEXT_PUBLIC_SANITY_PROJECT_ID, " +
      "NEXT_PUBLIC_SANITY_DATASET и SANITY_API_WRITE_TOKEN (в .env.local)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // запис → без CDN
});

// Коренът на public/, откъдето четем файловете със снимки.
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Качва един файл-снимка като Sanity image asset и връща image обект
// с reference към asset-а (формата, която очаква поле от тип image).
async function uploadImage(relPath: string) {
  // relPath е от вида "/assets/imgDana/product-01.webp"
  const filePath = path.join(PUBLIC_DIR, relPath);
  const buffer = await readFile(filePath);
  const filename = path.basename(relPath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return {
    _type: "image" as const,
    _key: filename, // стабилен ключ за елемент в масива
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

async function migrate() {
  let created = 0;
  let skipped = 0;
  let errors = 0;

  console.log(`🚀 Старт на миграцията — ${products.length} продукта.\n`);

  for (const p of products) {
    try {
      // Идемпотентност — има ли вече продукт с този slug?
      const existing = await client.fetch<string | null>(
        `*[_type == "product" && slug.current == $slug][0]._id`,
        { slug: p.slug }
      );
      if (existing) {
        console.log(`⏭️  Пропуснат (вече съществува): ${p.slug}`);
        skipped++;
        continue;
      }

      // Качваме всички снимки последователно.
      const images = [];
      for (const img of p.images) {
        images.push(await uploadImage(img));
      }

      // Създаваме документа със СЪЩИЯ slug.
      await client.create({
        _type: "product",
        name: p.title,
        slug: { _type: "slug", current: p.slug },
        category: p.category,
        price: p.price,
        description: p.description,
        sizes: p.sizes,
        images,
      });

      console.log(`✅ Създаден: ${p.slug} (${p.images.length} снимки)`);
      created++;
    } catch (err) {
      console.error(`❌ Грешка при ${p.slug}:`, (err as Error).message);
      errors++;
    }
  }

  console.log("\n──────── РЕЗУЛТАТ ────────");
  console.log(`✅ Създадени: ${created}`);
  console.log(`⏭️  Пропуснати: ${skipped}`);
  console.log(`❌ Грешки:     ${errors}`);
}

migrate().catch((err) => {
  console.error("Фатална грешка:", err);
  process.exit(1);
});
