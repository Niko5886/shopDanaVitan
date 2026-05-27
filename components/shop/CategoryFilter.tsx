"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  counts: Record<string, number>;
}

export const ALL_CATEGORY = "Всички";

export default function CategoryFilter({ categories, activeCategory, onCategoryChange, counts }: Props) {
  // Детектираме дали филтърът е залепен (sticky) чрез sentinel елемент
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-85px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const allCategories = [ALL_CATEGORY, ...categories];
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* Sentinel — когато излезе от viewport, филтърът е залепен */}
      <div ref={sentinelRef} className="h-px" />

      {/* Fade-in + slide при зареждане */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-[84px] z-30 mb-8 flex justify-center px-4 py-3 transition-all duration-300"
        style={{
          backgroundColor: isStuck ? "rgba(0,0,0,0.82)" : "transparent",
          backdropFilter: isStuck ? "blur(14px)" : undefined,
        }}
      >
        {/* Хоризонтален скрол на мобилен */}
        <div
          className="overflow-x-auto"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {/* Pill лента */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm">
            {allCategories.map((cat) => {
              const isActive = cat === activeCategory;
              const count = cat === ALL_CATEGORY ? totalCount : (counts[cat] ?? 0);

              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`group relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {/* Анимиран sliding indicator — плъзга се между активните pills */}
                  {isActive && (
                    <motion.span
                      layoutId="pill-indicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B0000] to-[#5c0000]"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}

                  {/* Hover подсветка за неактивни бутони */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-200 group-hover:bg-white/5" />
                  )}

                  <span className="relative z-10 flex items-baseline gap-1.5">
                    {cat}
                    <span className="text-xs font-normal text-white/40">({count})</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
