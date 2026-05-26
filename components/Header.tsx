import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Към началото">
          <span className="h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.9),rgba(0,0,0,0.8))]" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Dana`|`Vitan</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] text-white/70 md:flex">
          <Link className="transition hover:text-white" href="/">
            НАЧАЛО
          </Link>
          <Link className="transition hover:text-white" href="/shop">
            МАГАЗИН
          </Link>
          <Link className="transition hover:text-white" href="#craft">
            ЗА НАС
          </Link>
          <Link className="transition hover:text-white" href="#stories">
            Истории
          </Link>
          <Link className="transition hover:text-white" href="#contacts">
            Контакти
          </Link>
        </nav>
        <div className="flex items-center gap-4">
        </div>
      </div>
    </header>
  );
}
