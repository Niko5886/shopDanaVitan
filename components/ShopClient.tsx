"use client";
import { useMemo, useState } from "react";
import type { Product } from "../data/products";
import Image from "next/image";

type Props = {
  products: Product[];
};

const CATEGORIES = ["Поли", "Рокли", "Ризи", "Топове", "Сака", "Аксесоари"];

export default function ShopClient({ products }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    if (selected.length === 0) return products;
    return products.filter((p) => selected.includes(p.category));
  }, [products, selected]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  function toggleCategory(cat: string) {
    setPage(1);
    setSelected((s) => (s.includes(cat) ? s.filter((x) => x !== cat) : [...s, cat]));
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm tracking-[0.2em] transition ${selected.includes(cat) ? "bg-[color:var(--accent)] text-white" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <p className="text-sm text-white/60">Показани: {filtered.length}</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((p) => (
          <div key={p.id} className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="relative h-44 w-full">
              <Image
                src={p.thumb ?? '/assets/imgDana/product-01-thumb.webp'}
                alt={p.title}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-white/60">{p.note}</p>
                </div>
                <span className="text-sm text-white/70">{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="rounded px-3 py-2 bg-white/5 text-white/70 disabled:opacity-40"
        >
          Предишна
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`min-w-[40px] rounded px-3 py-2 ${page === i + 1 ? "bg-[color:var(--accent)] text-white" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
          disabled={page === totalPages}
          className="rounded px-3 py-2 bg-white/5 text-white/70 disabled:opacity-40"
        >
          Следваща
        </button>
      </div>
    </div>
  );
}
