"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Lightbox from "./Lightbox";
import type { Product } from "../data/products";

type Props = {
  product: Product;
  related: Product[];
};

export default function ProductDetailClient({ product, related }: Props) {
  const { addItem } = useCart();
  const images = product.images;
  const hasImages = images.length > 0;

  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Моля, изберете размер");
      return;
    }
    setError(null);
    addItem(
      {
        slug: product.slug,
        name: product.title,
        price: product.price,
        size: selectedSize,
        image: product.images[0],
      },
      quantity
    );
    // addItem автоматично отваря количката
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
            <li className="text-accent" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[55fr_45fr]">
          {/* ── ЛЯВА КОЛОНА ── */}
          <section>
            <div
              className={`relative aspect-[4/5] max-h-[60vh] w-full overflow-hidden rounded-sm bg-black lg:max-h-none ${hasImages ? "cursor-zoom-in" : ""}`}
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
                <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--accent),#1a0d10_58%,#000)]" />
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
                        ? "border-accent opacity-100"
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {product.category}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-[2.5rem]">
              {product.title}
            </h1>

            <p className="mt-4 text-2xl font-bold text-accent sm:text-[1.8rem]">
              {product.priceLabel}
            </p>

            <hr className="my-6 border-t border-white/10" />

            <div className="border-l-2 border-accent pl-4 text-sm leading-[1.8] text-white/70">
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
                      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-accent px-4 py-2 text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 ${
                        isSelected
                          ? "bg-accent"
                          : "bg-transparent hover:bg-accent/15"
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

            {/* БРОЙКА */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-white/60">
                Брой:
              </span>
              <div className="flex items-center overflow-hidden rounded-full border border-accent/40">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-white transition-colors hover:bg-accent/20"
                  aria-label="Намали бройката"
                >
                  −
                </button>
                <span className="min-w-[3rem] px-4 py-2 text-center text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-white transition-colors hover:bg-accent/20"
                  aria-label="Увеличи бройката"
                >
                  +
                </button>
              </div>
            </div>

            {/* БУТОН ДОБАВИ В КОЛИЧКА */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-4 w-full cursor-pointer rounded-full border border-accent bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent"
            >
              Добави в количка
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
                    key={item.slug}
                    href={`/shop/${item.slug}`}
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
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--accent),#1a0d10_58%,#000)]" />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-base font-semibold text-white">{item.title}</p>
                        <span className="text-xs font-semibold text-accent">
                          {item.priceLabel}
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
