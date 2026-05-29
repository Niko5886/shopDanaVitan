"use client";

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
      isActive(href) ? "bg-[color:var(--accent)] text-white" : "text-white/70 hover:text-white",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Към началото">
          <span className="h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.9),rgba(0,0,0,0.8))]" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Dana Vitan</p>
          </div>
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
