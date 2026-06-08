import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

import type { Product } from "../../data/products";
import { urlFor } from "./image";

// ───────────────────────────────────────────────────────────────────────────
// GROQ заявки. Връщат продукта в СЪЩИЯ shape като интерфейса Product, с две
// уговорки, които се довършват в JS (mapProduct):
//   - categorySlug се изчислява тук в GROQ чрез select() по картата от Етап 2.
//   - priceLabel се сглобява тук като `<price> лв.`.
//   - снимките идват като сурови image обекти (rawImages) и се превръщат в
//     URL-и през urlFor() в mapProduct (GROQ не може да вика urlFor).
// Подредбата е по полето order → запазва оригиналния ред от data/products.ts.
// ───────────────────────────────────────────────────────────────────────────

// Общата проекция, която ползват и трите заявки.
const PRODUCT_PROJECTION = groq`{
  "id": _id,
  "title": name,
  "slug": slug.current,
  category,
  "categorySlug": select(
    category == "Поли" => "poli",
    category == "Рокли" => "rokli",
    category == "Ризи" => "rizi",
    category == "Топове" => "topove",
    category == "Сака" => "saka",
    category == "Аксесоари" => "aksesoari"
  ),
  price,
  "priceLabel": string(price) + " лв.",
  note,
  description,
  sizes,
  "rawImages": images
}`;

// Всички продукти, подредени както досега (по order).
export const allProducts = groq`*[_type == "product"] | order(order asc) ${PRODUCT_PROJECTION}`;

// Един продукт по slug.
export const productBySlug = groq`*[_type == "product" && slug.current == $slug][0] ${PRODUCT_PROJECTION}`;

// Сходни артикули: същата категория, без текущия, първите 3 по реда.
export const relatedProducts = groq`*[_type == "product" && category == $category && slug.current != $slug] | order(order asc)[0...3] ${PRODUCT_PROJECTION}`;

// Само slug-овете — за generateStaticParams и sitemap.
export const allSlugs = groq`*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`;

// ───────────────────────────────────────────────────────────────────────────
// Тип на суровия резултат от GROQ (преди превръщане на снимките в URL-и).
export type RawProduct = Omit<Product, "images" | "thumb" | "focalPoints"> & {
  rawImages?: SanityImageSource[] | null;
};

// Превръща сурова GROQ запис в Product със снимки като URL низове.
// ВАЖНО: width(1200) без фиксирана height → пази оригиналното съотношение,
// а кадрирането остава на object-cover + objectPosition в компонентите
// (точно както досега) — визуално идентично.
export function mapProduct(raw: RawProduct): Product {
  const images = (raw.rawImages ?? []).map((img) =>
    urlFor(img).width(1200).url()
  );
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    categorySlug: raw.categorySlug,
    price: raw.price,
    priceLabel: raw.priceLabel,
    note: raw.note,
    description: raw.description,
    sizes: raw.sizes,
    images,
  };
}
