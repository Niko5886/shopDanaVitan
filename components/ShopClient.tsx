"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductWithImages } from "../data/products";
import Image from "next/image";

type Props = {
  products: ProductWithImages[];
};

const CATEGORIES = ["Поли", "Рокли", "Ризи", "Топове", "Сака", "Аксесоари"];

function ProductCard({ p, openProduct }: { p: ProductWithImages; openProduct: (id: string) => void }) {
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
      <div
        className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/30 cursor-pointer"
        onClick={() => openProduct(p.id)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openProduct(p.id);
          }
        }}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(122,12,31,0.82),rgba(18,12,13,0.98)_58%,rgba(0,0,0,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(122,12,31,0.2),transparent_42%)] opacity-80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">{p.category}</p>
            <p className="text-xl font-semibold uppercase tracking-[0.14em] text-white">{p.title}</p>
            <p className="max-w-[14rem] text-xs leading-6 text-white/65">{p.note}</p>
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

  return (
    <div
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/30 cursor-pointer"
      onClick={() => openProduct(p.id)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProduct(p.id);
        }
      }}
    >
      <div
        className="relative aspect-[3/4] w-full bg-black"
        aria-label={`Отвори детайли за ${p.title}`}
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
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIdx((i) => (i - 1 + images.length) % images.length);
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 group-hover:opacity-100 transition"
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
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 group-hover:opacity-100 transition"
          aria-label="Следваща снимка"
        >
          ›
        </button>

        {/* thumbnail strip */}
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex gap-2 rounded-full bg-black/30 p-1 px-2 opacity-90">
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
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50 transition group-hover:text-white/80">
          Разгледай продукта
        </p>
      </div>
    </div>
  );
}

export default function ShopClient({ products }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const perPage = 9;

  const keepShopInView = () => {
    const section = document.getElementById("shop");
    if (!section) return;

    const newHash = "#shop";
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selected.length > 0 && !selected.includes(p.category)) return false;
      return true;
    });
  }, [products, selected]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    const resetPagination = () => {
      setPage(1);
    };

    window.addEventListener("dana:reset-shop-pagination", resetPagination);
    return () => {
      window.removeEventListener("dana:reset-shop-pagination", resetPagination);
    };
  }, []);

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  function toggleCategory(cat: string) {
    setPage(1);
    // single-select behavior: clicking a category selects it alone;
    // clicking the active category again clears the selection.
    setSelected((s) => (s.length === 1 && s[0] === cat ? [] : [cat]));
    requestAnimationFrame(keepShopInView);
  }

  function openProduct(id: string) {
    router.push(`/shop/${id}`);
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-4 flex items-center gap-3">
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
          <ProductCard key={p.id} p={p} openProduct={openProduct} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPage((s) => Math.max(1, s - 1));
            requestAnimationFrame(keepShopInView);
          }}
          disabled={page === 1}
          className="rounded px-3 py-2 bg-white/5 text-white/70 disabled:opacity-40"
        >
          Предишна
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPage(i + 1);
              requestAnimationFrame(keepShopInView);
            }}
            className={`min-w-[40px] rounded px-3 py-2 ${page === i + 1 ? "bg-[color:var(--accent)] text-white" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPage((s) => Math.min(totalPages, s + 1));
            requestAnimationFrame(keepShopInView);
          }}
          disabled={page === totalPages}
          className="rounded px-3 py-2 bg-white/5 text-white/70 disabled:opacity-40"
        >
          Следваща
        </button>
      </div>
    </div>
  );
}
