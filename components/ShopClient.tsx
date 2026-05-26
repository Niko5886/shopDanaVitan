"use client";
import { useMemo, useState } from "react";
import type { ProductWithImages } from "../data/products";
import Image from "next/image";
import Lightbox from "./Lightbox";

type Props = {
  products: ProductWithImages[];
};

const CATEGORIES = ["Поли", "Рокли", "Ризи", "Топове", "Сака", "Аксесоари"];

function ProductCard({ p, openLightbox }: { p: ProductWithImages; openLightbox: (images: string[], i?: number) => void }) {
  const images = p.images ?? (p.thumb ? [p.thumb] : []);
  const [idx, setIdx] = useState(0);

  // default focal point (center top-ish) or per-image focalPoints
  const focalFor = (i: number) => {
    if (p.focalPoints && p.focalPoints[i]) {
      return `${p.focalPoints[i].x}% ${p.focalPoints[i].y}%`;
    }
    return "50% 30%";
  };

  if (images.length === 0) {
    return (
      <div className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="relative aspect-[3/4] w-full bg-white/5" />
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
    );
  }

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div
        className="relative w-full aspect-[3/4] bg-black cursor-pointer"
        onClick={() => openLightbox(images, idx)}
        role="button"
        aria-label={`Отвори ${p.title}`}
      >
        <Image
          src={images[idx]}
          alt={p.title}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: focalFor(idx) }}
        />

        {/* arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIdx((i) => (i - 1 + images.length) % images.length);
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 group-hover:opacity-100 transition"
          aria-label="prev"
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIdx((i) => (i + 1) % images.length);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 group-hover:opacity-100 transition"
          aria-label="next"
        >
          ›
        </button>

        {/* thumbnail strip */}
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex gap-2 rounded-full bg-black/30 p-1 px-2 opacity-90">
          {images.map((im, i) => (
            <button
              key={im}
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
              className={`h-8 w-12 overflow-hidden rounded ${i === idx ? "ring-2 ring-[color:var(--accent)]" : "opacity-70 hover:opacity-100"}`}
            >
              <Image src={im} alt={`${p.title} ${i + 1}`} width={48} height={32} className="object-cover" />
            </button>
          ))}
        </div>
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
  );
}

export default function ShopClient({ products }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const perPage = 9;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selected.length > 0 && !selected.includes(p.category)) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [products, selected, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  function toggleCategory(cat: string) {
    setPage(1);
    setSelected((s) => (s.includes(cat) ? s.filter((x) => x !== cat) : [...s, cat]));
  }

  function openLightbox(images: string[], index = 0) {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            placeholder="Търсене..."
            className="rounded-full px-4 py-2 bg-white/5 placeholder:text-white/50 text-white outline-none"
          />
          <p className="text-sm text-white/60">Показани: {filtered.length}</p>
        </div>

        <button className="sm:hidden rounded px-3 py-2 bg-white/5 text-white/80" onClick={() => setDrawer(true)}>
          Филтри
        </button>

        <div className="ml-auto hidden sm:flex flex-wrap gap-3">
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
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
          <div className="relative w-72 max-w-full bg-[#0b0b0b] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Филтри</h3>
              <button onClick={() => setDrawer(false)} className="text-white/70">Затвори</button>
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Търсене" className="w-full rounded px-3 py-2 bg-white/5 text-white mb-3" />
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={selected.includes(cat)} onChange={() => toggleCategory(cat)} />
                  <span className="text-white/80">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((p) => (
          <ProductCard key={p.id} p={p} openLightbox={openLightbox} />
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

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
