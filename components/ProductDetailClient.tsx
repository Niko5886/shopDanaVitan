"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Lightbox from "./Lightbox";
import type { ProductWithImages } from "../data/products";

type Props = {
  product: ProductWithImages;
  related: ProductWithImages[];
};

export default function ProductDetailClient({ product, related }: Props) {
  const router = useRouter();
  const images = product.images ?? (product.thumb ? [product.thumb] : []);
  const hasImages = images.length > 0;

  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = () => {
    if (!selectedSize) {
      setError("Моля, изберете размер");
      return;
    }
    setError(null);
    const params = new URLSearchParams({
      product: product.id,
      size: selectedSize,
      price: product.price,
    });
    router.push(`/checkout?${params.toString()}`);
  };

  const focalPos = product.focalPoints?.[idx]
    ? `${product.focalPoints[idx].x}% ${product.focalPoints[idx].y}%`
    : "50% 30%";

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 pb-20 pt-24 text-white">
      <div className="mx-auto w-full max-w-6xl">
        {/* Breadcrumb */}
        <nav aria-label="Навигация" className="mb-8 text-xs uppercase tracking-[0.2em]">
          <ol className="flex flex-wrap items-center gap-2 text-white/50">
            <li>
              <Link href="/" className="transition-colors duration-200 hover:text-white">
                Начало
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/30">→</li>
            <li>
              <Link href="/shop" className="transition-colors duration-200 hover:text-white">
                Магазин
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/30">→</li>
            <li className="text-[#8B1A2F]" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[55fr_45fr]">
          {/* ── ЛЯВА КОЛОНА ── */}
          <section>
            <div
              className={`relative aspect-[4/5] min-h-[500px] w-full overflow-hidden rounded-sm bg-black ${hasImages ? "cursor-zoom-in" : ""}`}
              onClick={hasImages ? () => setLightboxOpen(true) : undefined}
              role={hasImages ? "button" : undefined}
              tabIndex={hasImages ? 0 : undefined}
              onKeyDown={
                hasImages
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxOpen(true);
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
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-[var(--focal)] transition-transform duration-300 hover:scale-[1.02]"
                  style={{ ["--focal" as string]: focalPos }}
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#8B1A2F,#1a0d10_58%,#000)]" />
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {images.map((image, i) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-all duration-200 ${
                      i === idx
                        ? "border-[#8B1A2F] opacity-100"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Снимка ${i + 1}`}
                  >
                    <Image src={image} alt={`${product.title} ${i + 1}`} fill className="object-cover" sizes="120px" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* ── ДЯСНА КОЛОНА ── */}
          <section className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B1A2F]">
              {product.category}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-[2.5rem]">
              {product.title}
            </h1>

            <p className="mt-4 text-2xl font-bold text-[#8B1A2F] sm:text-[1.8rem]">
              {product.price || "—"}
            </p>

            <hr className="my-6 border-t border-white/10" />

            <div className="border-l-2 border-[#8B1A2F] pl-4 text-sm leading-[1.8] text-white/70">
              {product.description}
            </div>

            {/* РАЗМЕРИ */}
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">Размер:</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setError(null);
                      }}
                      className={`min-w-[3rem] rounded-sm border border-[#8B1A2F] px-4 py-2 text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 ${
                        isSelected
                          ? "bg-[#8B1A2F]"
                          : "bg-transparent hover:bg-[#8B1A2F]/15"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {error && (
                <p className="mt-3 text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </div>

            {/* БУТОН КУПИ */}
            <button
              type="button"
              onClick={handleBuy}
              disabled={product.placeholder}
              className="mt-8 w-full rounded-sm bg-[#8B1A2F] py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-200 hover:bg-[#A52035] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#8B1A2F]"
            >
              {product.placeholder ? "Очаквайте скоро" : "Купи"}
            </button>
          </section>
        </div>

        {/* Сходни артикули */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-semibold text-white">Сходни артикули</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const preview = item.thumb ?? item.images?.[0] ?? "";
                return (
                  <Link
                    key={item.id}
                    href={`/shop/${item.id}`}
                    className="group overflow-hidden rounded-sm border border-white/10 bg-white/5 transition-all duration-200 hover:-translate-y-1 hover:border-white/30"
                  >
                    <div className="relative aspect-[4/5] bg-black">
                      {preview ? (
                        <Image
                          src={preview}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#8B1A2F,#1a0d10_58%,#000)]" />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-base font-semibold text-white">{item.title}</p>
                        <span className="text-xs font-semibold text-[#8B1A2F]">
                          {item.price}
                        </span>
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

      {lightboxOpen && hasImages && (
        <Lightbox images={images} initialIndex={idx} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
