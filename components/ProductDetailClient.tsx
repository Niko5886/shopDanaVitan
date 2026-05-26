"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "./Lightbox";
import type { ProductWithImages } from "../data/products";

type Props = {
  product: ProductWithImages;
  related: ProductWithImages[];
};

export default function ProductDetailClient({ product, related }: Props) {
  const images = product.images ?? (product.thumb ? [product.thumb] : []);
  const hasImages = images.length > 0;
  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const sizeRows = useMemo(
    () => product.sizes.map((size) => ({ size, status: size === "Един размер" ? "Универсален" : "Наличен" })),
    [product.sizes],
  );

  const openImage = (index: number) => {
    setIdx(index);
    setLightboxOpen(true);
  };

  return (
    <div className="px-6 pb-20 pt-24 text-[color:var(--foreground)]">
      <div className="mx-auto w-full max-w-6xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white">
          ← Назад към магазина
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
            <div
              className={`relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-black ${hasImages ? "cursor-zoom-in" : ""}`}
              onClick={hasImages ? () => openImage(idx) : undefined}
              role={hasImages ? "button" : undefined}
              tabIndex={hasImages ? 0 : undefined}
              aria-label={hasImages ? `Отвори ${product.title}` : undefined}
              onKeyDown={
                hasImages
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openImage(idx);
                      }
                    }
                  : undefined
              }
            >
              {hasImages ? (
                <Image
                  src={images[idx]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  style={{ objectPosition: product.focalPoints?.[idx] ? `${product.focalPoints[idx].x}% ${product.focalPoints[idx].y}%` : "50% 30%" }}
                />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(122,12,31,0.9),rgba(17,12,13,0.98)_58%,rgba(0,0,0,1))]" />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.75))]" />
              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/80">
                {product.category}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/80">
                <span className="text-xs uppercase tracking-[0.35em]">Преглед</span>
                <span className="text-xs uppercase tracking-[0.35em]">Клик за zoom</span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.map((image, imageIndex) => (
                  <button
                    key={image}
                    onClick={() => setIdx(imageIndex)}
                    className={`relative aspect-[4/5] overflow-hidden rounded-2xl border transition ${imageIndex === idx ? "border-[color:var(--accent)]" : "border-white/10 opacity-70 hover:opacity-100"}`}
                  >
                    <Image src={image} alt={`${product.title} ${imageIndex + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/55">Бутикова селекция</p>
              <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">{product.title}</h1>
              <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--accent)]">{product.price}</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/55">Кратко описание</p>
              <p className="mt-4 text-sm leading-7 text-white/75">{product.description}</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(122,12,31,0.18),rgba(255,255,255,0.03))] p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/55">Размери</p>
                  <p className="mt-2 text-sm text-white/65">Малка таблица за ориентация</p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">Ограничени серии</span>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm text-white/80">
                  <thead className="bg-black/30 text-xs uppercase tracking-[0.3em] text-white/50">
                    <tr>
                      <th className="px-4 py-3">Размер</th>
                      <th className="px-4 py-3">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeRows.map((row) => (
                      <tr key={row.size} className="border-t border-white/10 bg-black/15">
                        <td className="px-4 py-3 font-medium text-white">{row.size}</td>
                        <td className="px-4 py-3 text-white/70">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/55">Детайли</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/75">
                <li>• Изпипана кройка и луксозно усещане на силуета.</li>
                <li>• Подходящо за специални поводи, фотосесии и лимитирани визии.</li>
                <li>• Бордо акцент и тъмна база, в синхрон с цялостната концепция.</li>
              </ul>
            </div>
          </section>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/55">Разгледай още</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Сходни артикули от същата категория</h2>
              </div>
              <p className="max-w-xl text-sm text-white/60">Още предложения в същия стил, подредени като селекция от ателие, а не като масов магазин.</p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const preview = item.thumb ?? item.images?.[0] ?? "";
                return (
                  <Link
                    key={item.id}
                    href={`/shop/${item.id}`}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/25"
                  >
                    <div className="relative aspect-[4/5] bg-black">
                      {preview ? (
                        <Image src={preview} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(122,12,31,0.9),rgba(18,12,14,0.98)_58%,rgba(0,0,0,1))]" />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.75))]" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-base font-semibold text-white">{item.title}</p>
                        <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">{item.price}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/60">{item.note}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={idx}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}