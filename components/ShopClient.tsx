"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../data/products";
import Image from "next/image";

type Props = {
  products: Product[];
  /** Брой празни „coming soon" карти (продукти без реална информация). */
  comingSoonCount?: number;
};

const ALL_CATEGORY = "Всички";

// Карта в мрежата: или реален продукт, или празна „coming soon" клетка.
type Card =
  | { kind: "product"; product: Product }
  | { kind: "coming-soon"; id: string };

const SLUG_TO_CATEGORY: Record<string, string> = {
  poli: "Поли",
  rokli: "Рокли",
  rizi: "Ризи",
  topove: "Топове",
  saka: "Сака",
  aksesoari: "Аксесоари",
};

function ProductCard({ p }: { p: Product }) {
  const images = p.images;
  const [idx, setIdx] = useState(0);

  const focalFor = (i: number) =>
    p.focalPoints && p.focalPoints[i] ? `${p.focalPoints[i].x}% ${p.focalPoints[i].y}%` : "50% 30%";

  return (
    <Link
      href={`/shop/${p.slug}`}
      className="group block cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-accent/70 hover:shadow-[0_18px_50px_rgba(139,26,47,0.25)]"
    >
      <div className="relative aspect-[3/4] w-full bg-black">
        <Image
          src={images[idx]}
          alt={p.title}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: focalFor(idx) }}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIdx((i) => (i - 1 + images.length) % images.length);
              }}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-100 transition md:opacity-0 md:group-hover:opacity-100"
              aria-label="Предишна снимка"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIdx((i) => (i + 1) % images.length);
              }}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-100 transition md:opacity-0 md:group-hover:opacity-100"
              aria-label="Следваща снимка"
            >
              ›
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 p-1 px-2 opacity-90">
              {images.map((im, i) => (
                <button
                  key={im}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIdx(i);
                  }}
                  aria-label={`Снимка ${i + 1} за ${p.title}`}
                  className={`h-8 w-12 overflow-hidden rounded ${
                    i === idx ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={im} alt={`${p.title} ${i + 1}`} width={48} height={32} className="object-cover" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
          {p.category}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-white">{p.title}</p>
            {p.note && <p className="text-xs text-white/60">{p.note}</p>}
          </div>
          <span className="text-sm font-semibold text-white">{p.priceLabel}</span>
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50 transition group-hover:text-white/80">
          Разгледай продукта
        </p>
      </div>
    </Link>
  );
}

// Празна карта — placeholder за продукт, който ще добавим по-късно.
// Без снимки, без информация, БЕЗ линк (не се кликва — няма какво да отвори).
// Дизайнът ползва бордо акцента и фирмения монограм като ненатрапчив воден знак.
function ComingSoonCard() {
  return (
    <div
      aria-hidden="true"
      className="group relative block cursor-default select-none overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
    >
      <div className="relative flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-b from-white/[0.04] to-black/40">
        {/* Деликатна бордо аура */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,26,47,0.18),transparent_65%)]" />

        {/* Фирмен монограм като воден знак */}
        <Image
          src="/images/Dana_Vitan_png2.png"
          alt=""
          width={120}
          height={120}
          className="pointer-events-none h-auto w-24 opacity-10 grayscale"
        />

        {/* Тънка рамка-каре в центъра за усещане за „предстоящо" */}
        <span className="pointer-events-none absolute inset-6 rounded-xl border border-dashed border-white/10" />
      </div>

      <div className="p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/70">
          Нова колекция
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-base font-semibold text-white/40">Очаквайте скоро</p>
          <span className="rounded-full border border-accent/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent/80">
            Coming soon
          </span>
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/25">
          Нов артикул в подготовка
        </p>
      </div>
    </div>
  );
}

export default function ShopClient({ products, comingSoonCount = 0 }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window === "undefined") return ALL_CATEGORY;
    const slug = new URLSearchParams(window.location.search).get("category");
    return slug && SLUG_TO_CATEGORY[slug] ? SLUG_TO_CATEGORY[slug] : ALL_CATEGORY;
  });
  const [page, setPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent<string>).detail;
      setActiveCategory(cat);
      setPage(1);
    };
    window.addEventListener("dana:category-changed", handler);
    return () => window.removeEventListener("dana:category-changed", handler);
  }, []);

  // Обединен списък от карти: първо реалните продукти (по реда от Sanity),
  // после празните „coming soon" карти — само в изглед „Всички". В отделна
  // категория показваме само реалните артикули от нея (празните нямат категория).
  const cards = useMemo<Card[]>(() => {
    const realCards: Card[] =
      activeCategory === ALL_CATEGORY
        ? products.map((p) => ({ kind: "product", product: p }))
        : products
            .filter((p) => p.category === activeCategory)
            .map((p) => ({ kind: "product", product: p }));

    if (activeCategory !== ALL_CATEGORY) return realCards;

    const placeholders: Card[] = Array.from({ length: comingSoonCount }, (_, i) => ({
      kind: "coming-soon",
      id: `cs-${i}`,
    }));
    return [...realCards, ...placeholders];
  }, [products, activeCategory, comingSoonCount]);

  const totalPages = Math.max(1, Math.ceil(cards.length / perPage));

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return cards.slice(start, start + perPage);
  }, [cards, page]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + "-" + page}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pageItems.map((card, i) => (
            <motion.div
              key={card.kind === "product" ? card.product.slug : card.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
            >
              {card.kind === "product" ? (
                <ProductCard p={card.product} />
              ) : (
                <ComingSoonCard />
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Празно състояние — категория без реални продукти (напр. Поли/Сака). */}
      {cards.length === 0 && (
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-8 py-16 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/70">
            Нова колекция
          </p>
          <p className="mt-3 text-lg font-semibold text-white/70">Очаквайте скоро</p>
          <p className="mt-2 text-sm text-white/40">
            Подготвяме нови артикули за тази категория.
          </p>
        </div>
      )}

      {totalPages > 1 && (
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            goToPage(Math.max(1, page - 1));
          }}
          disabled={page === 1}
          className="min-h-[44px] rounded bg-white/5 px-4 py-2 text-white/70 disabled:opacity-40"
        >
          Предишна
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goToPage(i + 1);
            }}
            className={`min-h-[44px] min-w-[44px] rounded px-3 py-2 ${
              page === i + 1
                ? "bg-accent text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            goToPage(Math.min(totalPages, page + 1));
          }}
          disabled={page === totalPages}
          className="min-h-[44px] rounded bg-white/5 px-4 py-2 text-white/70 disabled:opacity-40"
        >
          Следваща
        </button>
      </div>
      )}
    </div>
  );
}
