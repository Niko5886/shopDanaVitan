import ShopSubNav from "../../components/shop/ShopSubNav";
import ShopClient from "../../components/ShopClient";
import { products } from "../../data/products";

export const metadata = {
  title: "Магазин",
  description:
    "Разгледайте бутиковата колекция на Dana Vitan — поли, рокли, ризи, топове, сака и аксесоари с ръчна изработка.",
  alternates: { canonical: "/shop" },
};

const CATEGORIES = ["Поли", "Рокли", "Ризи", "Топове", "Сака", "Аксесоари"] as const;

// Броят се на сервъра — products е статичен масив
const counts = Object.fromEntries(
  CATEGORIES.map((cat) => [cat, products.filter((p) => p.category === cat).length])
);

export default function ShopPage() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      {/* ShopSubNav е sticky top-[72px] и се слива визуално с навбара */}
      <ShopSubNav counts={counts} />

      <main className="relative z-10 px-6 pb-20 pt-8">
        <ShopClient products={products} />
      </main>
    </div>
  );
}
