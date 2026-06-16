"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { formatPriceLabel } from "@/lib/format";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    totalItems,
    totalPrice,
  } = useCart();

  // Заключи scroll при отворена количка
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Затъмнен фон (overlay) */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Обвивка, която клипва изплъзващия се панел. Затворената количка е
          translate-x-full (извън екрана вдясно); понеже панелът е fixed, body
          overflow-x-hidden НЕ го клипва и предизвиква хоризонтален скрол.
          Тази fixed inset-0 + overflow-hidden обвивка го клипва, без да пипа
          overflow на html/body (което би счупило sticky навигацията). */}
      <div className="fixed inset-0 z-[80] overflow-hidden pointer-events-none">
        {/* Панелът — изплъзва се отдясно */}
        <div
          className={`pointer-events-auto absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-accent/30 bg-[#0a0a0a] transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
        {/* ГЛАВА на панела */}
        <div className="flex items-center justify-between border-b border-accent/20 px-6 py-5">
          <h2 className="text-lg font-medium uppercase tracking-widest text-white">
            Количка
            {totalItems > 0 && (
              <span className="ml-2 text-accent">({totalItems})</span>
            )}
          </h2>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 text-white transition-colors hover:border-accent"
            aria-label="Затвори количка"
          >
            ✕
          </button>
        </div>

        {/* СЪДЪРЖАНИЕ — списък с артикули */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            // Празна количка
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="text-white/60">Количката е празна</p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-accent bg-accent px-6 py-2 text-sm uppercase tracking-widest text-white transition-all hover:bg-transparent"
              >
                Към магазина
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.size}`}
                  className="flex gap-4 border-b border-white/10 pb-5"
                >
                  {/* Снимка */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Детайли */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/50">
                        Размер: {item.size}
                      </p>
                      <p className="mt-1 text-sm font-medium text-accent">
                        {formatPriceLabel(item.price)}
                      </p>
                    </div>

                    {/* Бройка + изтриване */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-full border border-white/20">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.slug,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1 text-white hover:bg-white/10"
                          aria-label="Намали бройката"
                        >
                          −
                        </button>
                        <span className="px-3 text-sm text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.slug,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="px-3 py-1 text-white hover:bg-white/10"
                          aria-label="Увеличи бройката"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.size)}
                        className="text-xs text-white/40 transition-colors hover:text-accent"
                      >
                        Премахни
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ПОДВАЛ — обща сума + бутон */}
        {items.length > 0 && (
          <div className="border-t border-accent/20 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-white/70">
                Общо:
              </span>
              <span className="text-xl font-medium text-white">
                {formatPriceLabel(totalPrice)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full rounded-full border border-accent bg-accent px-8 py-3 text-center text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent"
            >
              Завърши поръчка
            </Link>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
