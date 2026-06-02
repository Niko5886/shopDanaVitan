"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/MobileMenu";

const NAV = [
  { href: "/", label: "НАЧАЛО" },
  { href: "/shop", label: "МАГАЗИН" },
  { href: "/about", label: "ЗА НАС" },
  { href: "/contacts", label: "Контакти" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClass = (href: string) =>
    [
      "rounded-full px-3 py-2 transition",
      isActive(href) ? "bg-accent text-white" : "text-white/70 hover:text-white",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group relative flex items-center rounded-xl bg-white px-2 py-1 shadow-sm ring-1 ring-white/10 transition-all duration-300 hover:shadow-md hover:ring-white/20 md:-translate-x-10"
          aria-label="Dana Vitan Boutique — към началото"
        >
          <Image
            src="/images/Dana_Vitan_png2.png"
            alt="Dana Vitan Boutique"
            width={140}
            height={48}
            priority
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] text-white/70 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} className={linkClass(n.href)} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
