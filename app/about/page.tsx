import Image from "next/image";

export const metadata = {
  title: "За нас — Dana`|`Vitan",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <main className="relative z-10 px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="mb-4 text-3xl font-semibold text-white">ЗА НАС</h1>

          {/* Two-column row: nomination image (left) + text card (right) */}
          <div className="flex flex-col gap-6 md:flex-row md:items-stretch">

            {/* Left — nomination image card with hover effect */}
            <a
              href="/assets/imgDana/nomination.webp"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block min-h-[260px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 ring-1 ring-white/5 transition-all duration-500 ease-out hover:border-[color:var(--accent)]/40 hover:shadow-2xl hover:shadow-[color:var(--accent)]/10 hover:ring-[color:var(--accent)]/20 md:w-1/3"
            >
              <Image
                src="/assets/imgDana/nomination.webp"
                alt="Номинация и награда — Dana Vitan"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />

              {/* Subtle gradient overlay — softens on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />

              {/* Award badge */}
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md transition-all duration-500 group-hover:border-amber-300/40 group-hover:bg-black/50">
                <svg
                  className="h-3 w-3 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/90">
                  Номинация
                </span>
              </div>

              {/* Caption — slides up on hover */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ease-out">
                <p className="translate-y-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white">
                  Признание за качество
                </p>
                <p className="mt-1 max-h-0 overflow-hidden text-xs leading-snug text-white/0 transition-all duration-500 group-hover:max-h-12 group-hover:text-white/80">
                  Награда за майсторство и отдаденост
                </p>
              </div>
            </a>

            {/* Right — existing text card */}
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 md:w-2/3">
              <p className="mb-6 text-lg leading-7 text-white/80">
                Успехът не идва случайно. Той е плод на много труд, моменти, в
                които си напът да се откажеш, но продължаваш напред. Защото
                любовта към създаването на красота е по-силна! ❤️
              </p>

              <p className="mb-6 text-base text-white/70">
                Точно тази отдаденост вплитаме във всяка нишка на нашите
                бутикови облекла. Тези думи са олицетворение на всичко, зад
                което стои Dana Vitan – стил, който не остава незабелязан,
                сценично присъствие и задължителният елемент, който носи духа
                на България - шевиците.
              </p>

              <p className="mb-6 text-base text-white/70">
                Създадена, за да подчертае вашата увереност и женственост. 💃
              </p>

              <div className="mb-6">
                <a
                  href="mailto:atelier@nosia.bg"
                  className="inline-flex items-center gap-3 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[color:var(--accent-strong)]"
                >
                  Свържете се с нас
                </a>
              </div>

              <p className="text-sm text-white/60">
                👉 Разгледайте детайлите на шевицата и се свържете с нас на
                съобщение, за да изработим вашата мечтана рокля по поръчка!
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-xs text-white/50">#DanaVitanFashion</span>
                <span className="text-xs text-white/50">#ДанаВитан</span>
                <span className="text-xs text-white/50">#БългарскоПроизводство</span>
                <span className="text-xs text-white/50">#УникаленДизайн</span>
                <span className="text-xs text-white/50">#ЕтноМотиви</span>
                <span className="text-xs text-white/50">#ТрадицияИМода</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
