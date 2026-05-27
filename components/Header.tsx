"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<"home" | "shop" | "about" | "contacts">("home");

  const scrollToSection = (id: "home" | "shop" | "about" | "contacts") => {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    const newHash = `#${id}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }

    if (id === "home") {
      window.dispatchEvent(new Event("dana:reset-shop-pagination"));
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "shop", "about", "contacts"] as const;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (!top) return;

        const id = top.target.id as "home" | "shop" | "about" | "contacts";
        setActiveSection(id);

        const newHash = `#${id}`;
        if (window.location.hash !== newHash) {
          window.history.replaceState(null, "", newHash);
        }
      },
      {
        root: null,
        threshold: [0.35, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [pathname]);

  const linkClass = (href: string) => {
    const isHashLink = href.startsWith("/#");
    const hashTarget = isHashLink ? href.replace("/#", "") : "";

    const isActive = isHashLink
      ? pathname === "/" && activeSection === hashTarget
      : href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

    return [
      "rounded-full px-3 py-2 transition",
      isActive ? "bg-[color:var(--accent)] text-white" : "text-white/70 hover:text-white",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/#home"
          className="flex items-center gap-3"
          aria-label="Към началото"
          onClick={(e) => {
            if (pathname !== "/") return;
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          <span className="h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.9),rgba(0,0,0,0.8))]" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Dana Vitan</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] text-white/70 md:flex">
          <Link
            className={linkClass("/#home")}
            href="/#home"
            onClick={(e) => {
              if (pathname !== "/") return;
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            НАЧАЛО
          </Link>
          <Link
            className={linkClass("/#shop")}
            href="/#shop"
            onClick={(e) => {
              if (pathname !== "/") return;
              e.preventDefault();
              scrollToSection("shop");
            }}
          >
            МАГАЗИН
          </Link>
          <Link
            className={linkClass("/#about")}
            href="/#about"
            onClick={(e) => {
              if (pathname !== "/") return;
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            ЗА НАС
          </Link>
          <Link
            className={linkClass("/#contacts")}
            href="/#contacts"
            onClick={(e) => {
              if (pathname !== "/") return;
              e.preventDefault();
              scrollToSection("contacts");
            }}
          >
            Контакти
          </Link>
        </nav>
        <div className="flex items-center gap-4"></div>
      </div>
    </header>
  );
}
