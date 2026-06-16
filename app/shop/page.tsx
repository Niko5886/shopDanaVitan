import ShopSubNav from "../../components/shop/ShopSubNav";
import ShopClient from "../../components/ShopClient";
import { client } from "../../sanity/lib/client";
import { allProducts, mapProduct, type RawProduct } from "../../sanity/lib/queries";
import { isRealProduct } from "../../data/realProducts";

export const metadata = {
  title: "Магазин",
  description:
    "Разгледайте бутиковата колекция на Dana Vitan — поли, рокли, ризи, топове, сака и аксесоари с ръчна изработка.",
  alternates: { canonical: "/shop" },
};

const CATEGORIES = ["Поли", "Рокли", "Ризи", "Топове", "Сака", "Аксесоари"] as const;

export default async function ShopPage() {
  // Чете от Sanity с ISR (revalidate 60s). БЕЗ SanityLive — само client.fetch.
  const raw = await client.fetch<RawProduct[]>(allProducts, {}, { next: { revalidate: 60 } });
  const all = raw.map(mapProduct);

  // Разделяме реалните артикули (с истинска информация) от празните карти.
  // Реалните пазят оригиналния ред от Sanity; празните стават „coming soon"
  // картички най-отзад. Виж data/realProducts.ts за whitelist-а и как се връща.
  const products = all.filter((p) => isRealProduct(p.slug));
  const comingSoonCount = all.length - products.length;

  // Броячите по категории отчитат САМО реалните продукти (празните карти нямат
  // категория — те се показват само в изглед „Всички", най-отзад).
  const counts = Object.fromEntries(
    CATEGORIES.map((cat) => [cat, products.filter((p) => p.category === cat).length])
  );

  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      {/* ShopSubNav е sticky top-[72px] и се слива визуално с навбара */}
      <ShopSubNav counts={counts} />

      <main className="relative z-10 px-6 pb-20 pt-8">
        <ShopClient products={products} comingSoonCount={comingSoonCount} />
      </main>
    </div>
  );
}
