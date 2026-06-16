"use client";
// Sticky лента с категорийния филтър — рендерира се директно от shop page.
// Позиционирана веднага след навбара (sticky top-[72px]) и визуално слята с него.
// Няма условни рендерирания и няма opacity-0 анимации — ВИНАГИ видима при mount.

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CATEGORIES = ["Поли", "Рокли", "Ризи", "Топове", "Сака", "Аксесоари"] as const;
const ALL = "Всички";

const SLUG: Record<string, string> = {
  Поли: "poli",
  Рокли: "rokli",
  Ризи: "rizi",
  Топове: "topove",
  Сака: "saka",
  Аксесоари: "aksesoari",
};
const FROM_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG).map(([k, v]) => [v, k])
);

interface Props {
  counts: Record<string, number>;
}

export default function ShopSubNav({ counts }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // Дефолтна стойност — "Всички". Задава се директно в useState без useEffect
  // за да е видима от първия рендеринг (SSR + hydration).
  const [active, setActive] = useState<string>(() => {
    // При SSR window не съществува — връщаме дефолта.
    if (typeof window === "undefined") return ALL;
    const slug = new URLSearchParams(window.location.search).get("category");
    return (slug && FROM_SLUG[slug]) ? FROM_SLUG[slug] : ALL;
  });

  // Синхронизираме при browser back/forward навигация
  useEffect(() => {
    const onPop = () => {
      const slug = new URLSearchParams(window.location.search).get("category");
      setActive((slug && FROM_SLUG[slug]) ? FROM_SLUG[slug] : ALL);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  function handleChange(cat: string) {
    setActive(cat);
    // URL sync само на /shop (shareable). На homepage филтрираме на място.
    if (pathname === "/shop") {
      const slug = SLUG[cat];
      router.replace(`/shop${slug ? `?category=${slug}` : ""}`, { scroll: false });
    }
    window.dispatchEvent(new CustomEvent("dana:category-changed", { detail: cat }));
  }

  return (
    // sticky top-[72px] = точно под навбара (навбарът е 72px висок: py-4 + h-10).
    // Същият bg/blur като навбара — изглеждат като едно цяло.
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center gap-3 py-2">

          {/* Малък лейбъл вляво */}
          <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.4em] text-white/30 sm:block">
            Магазин
          </span>
          <span className="hidden h-3 w-px shrink-0 bg-white/10 sm:block" />

          {/* Pill бутони — хоризонтален скрол на мобилен без scrollbar.
              min-w-0 е задължително: без него flex-детето отказва да се свие
              под съдържанието си (min-width:auto) и бута цялата страница
              настрани, вместо да скролира вътрешно. */}
          <div
            className="min-w-0 flex-1 overflow-x-auto"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            <div className="flex items-center gap-0.5 min-w-max">
              {[ALL, ...CATEGORIES].map((cat) => {
                const isActive = cat === active;
                const count = cat === ALL ? totalCount : (counts[cat] ?? 0);

                return (
                  <button
                    key={cat}
                    onClick={() => handleChange(cat)}
                    className={`group relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {/* Анимиран sliding indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="shop-subnav-indicator"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}

                    {/* Hover подсветка за неактивни */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-200 group-hover:bg-white/5" />
                    )}

                    <span className="relative z-10 flex items-baseline gap-1">
                      {cat}
                      <span className="text-[10px] font-normal text-white/50">({count})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
