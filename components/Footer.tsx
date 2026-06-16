import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0a0a0a] text-white/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Бранд */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-white px-2 py-1 shadow-sm ring-1 ring-white/10"
            >
              <Image
                src="/images/Dana_Vitan_png2.png"
                alt="Dana Vitan Boutique"
                width={140}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/55">
              Бутикови дрехи, стилизирани носии и аксесоари с ръчна изработка и
              персонална консултация.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Навигация
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="transition-colors duration-200 hover:text-white">
                  Начало
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition-colors duration-200 hover:text-white">
                  Магазин
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors duration-200 hover:text-white">
                  За нас
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="transition-colors duration-200 hover:text-white">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакти */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Контакти
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:dana13@abv.bg"
                  className="transition-colors duration-200 hover:text-white"
                >
                  dana13@abv.bg
                </a>
              </li>
              <li className="text-white/55">Русе, България</li>
              <li className="text-white/55">ул. Николаевска 80</li>
            </ul>
          </div>

          {/* Социални */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Социални
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/dana_vitan8?fbclid=IwY2xjawSGKqpleHRuA2FlbQIxMABicmlkETAwb0JYWUpPZmlZc1RQM2tQc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvib_vld7J2rHpYlnJioVNtTe17kMl7gx0DTVhhjg663HGh14bocrw-KG8rz_aem_TCKtkxrcsHlAmfXpiv9DTg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/AMDSTYLE?rdid=h6acQ2mZJ57kS1gE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18hk3TPJ2P%2F#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© {year} Dana Vitan Boutique. Всички права запазени.</p>
          <p className="sm:ml-auto">
            © {year}{" "}
            <a
              href="https://nymerix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-white"
            >
              nymerix.com
            </a>{" "}
            | Tech Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
