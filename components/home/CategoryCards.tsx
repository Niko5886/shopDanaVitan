"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// Трите категории с техните маршрути и stagger забавяния
const categories = [
  { label: "ЕТНО",    href: "/brand/etno",    delay: 0.3 },
  { label: "АФРО",    href: "/brand/afro",    delay: 0.5 },
  { label: "КЕЖУАЛ",  href: "/brand/casual",  delay: 0.7 },
];

export default function CategoryCards() {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
      {categories.map(({ label, href, delay }) => (
        <motion.div
          key={label}
          // Всяка карта влиза от ляво — opacity 0 + translateX(-80px) → нормално
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          // will-change за GPU ускорение
          style={{ willChange: "transform" }}
        >
          <Link
            href={href}
            className="group relative flex h-[80px] w-[220px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md transition-all duration-500 ease-out hover:scale-105 hover:border-white/20 hover:shadow-[0_0_25px_rgba(139,0,0,0.4)]"
          >
            {/* Бордо gradient overlay — винаги видим */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(139,0,0,0.55)] to-transparent" />
            {/* Светъл overlay при hover */}
            <div className="absolute inset-0 bg-white/0 transition-colors duration-500 ease-out group-hover:bg-white/10" />

            {/* Категорийно название */}
            <span className="relative z-10 text-2xl font-light tracking-[0.3em] text-white/60">
              {label}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
