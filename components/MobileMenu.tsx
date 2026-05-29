"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NAV = [
  { label: "НАЧАЛО", href: "/" },
  { label: "МАГАЗИН", href: "/shop" },
  { label: "ЗА НАС", href: "/about" },
  { label: "КОНТАКТИ", href: "/contacts" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const didMount = useRef(false);

  // Portal може да рендира едва след mount (няма document при SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    setIsAnimating(true);
    // Показвай линковете след като кръгът се е разширил
    setTimeout(() => {
      setShowContent(true);
    }, 400);
  };

  const closeMenu = () => {
    setShowContent(false);
    // Изчакай линковете да изчезнат, после свий кръга
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }, 150);
  };

  // Заключи scroll при отворено меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Затвори при смяна на route (но не при първоначално зареждане)
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    closeMenu();
  }, [pathname]);

  // Overlay-ът се рендира през portal в document.body, за да излезе
  // извън containing block-а, който backdrop-filter на хедъра създава.
  const overlay = isOpen && (
    <div className="fixed inset-0 z-[100] pointer-events-none md:hidden">
      {/* Разширяващият се кръг */}
      <div
        className={`
          absolute top-6 right-6
          h-10 w-10
          rounded-full
          bg-[#0a0a0a]
          pointer-events-auto
          ${isAnimating ? "circle-expand" : "circle-collapse"}
        `}
        style={{ transformOrigin: "center" }}
      />

      {/* Съдържанието на менюто */}
      {showContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 pointer-events-auto sm:gap-8">
          {/* X бутон */}
          <button
            onClick={closeMenu}
            className="
              absolute top-5 right-5
              flex h-11 w-11 items-center justify-center
              rounded-full
              border border-[#8B1A2F]/50
              text-white
              transition-all duration-200
              hover:border-[#8B1A2F]
            "
            aria-label="Затвори меню"
          >
            ✕
          </button>

          {/* Лого */}
          <div className="absolute top-5 left-5 menu-item-in" style={{ animationDelay: "0ms" }}>
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">Dana Vitan</span>
          </div>

          {/* Навигационни линкове */}
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="
                menu-item-in
                whitespace-nowrap
                text-2xl font-light uppercase tracking-[0.2em]
                text-white
                transition-colors duration-300
                hover:text-[#8B1A2F]
                sm:text-4xl sm:tracking-widest
              "
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {item.label}
            </Link>
          ))}

          {/* Декоративна бордо линия */}
          <div
            className="menu-item-in h-[1px] w-12 bg-[#8B1A2F]"
            style={{ animationDelay: "320ms" }}
          />

          {/* Слоган долу */}
          <p
            className="menu-item-in absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-white/30"
            style={{ animationDelay: "400ms" }}
          >
            Бутикова мода · Dana Vitan
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* HAMBURGER БУТОН */}
      <button
        onClick={openMenu}
        className="
          flex md:hidden
          h-11 w-11 flex-col items-center justify-center gap-1.5
          rounded-full
          bg-[#8B1A2F]
          cursor-pointer
          transition-transform duration-200
          hover:scale-110 active:scale-95
        "
        aria-label="Отвори меню"
      >
        <span className="block h-[1.5px] w-5 bg-white" />
        <span className="block h-[1.5px] w-4 bg-white" />
        <span className="block h-[1.5px] w-5 bg-white" />
      </button>

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
