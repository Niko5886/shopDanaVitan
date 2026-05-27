import ShopClient from "../../components/ShopClient";
import AutoRouteOnScroll from "../../components/AutoRouteOnScroll";
import { products } from "../../data/products";

export const metadata = {
  title: "Магазин — Dana`|`Vitan",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <AutoRouteOnScroll downHref="/about" upHref="/" />
      <main className="relative z-10 px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="mb-4 text-3xl font-semibold text-white">МАГАЗИН</h1>
          
        </div>
        <ShopClient products={products} />
      </main>
    </div>
  );
}
