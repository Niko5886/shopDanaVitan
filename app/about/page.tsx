import Image from "next/image";

export const metadata = {
  title: "За нас — Dana`|`Vitan",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <main className="relative z-10 px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="mb-10 text-3xl font-semibold text-white">ЗА НАС</h1>

          {/* Editorial асиметричен layout: снимка ляво (голяма, leko завъртяна нагоре)
              — текст център — снимка дясно (по-малка, в обратна посока, изместена надолу).
              На мобилен преминава в едноколонен stack без ротации. */}
          <section className="relative">

            {/* Декоративен бордо glow зад композицията — ambient светлина */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B0000]/10 blur-3xl"
            />

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_2fr_1fr] lg:gap-8">

              {/* Ляво — Номинация (по-голяма, rotate -3deg, изместена нагоре) */}
              <a
                href="/assets/imgDana/nomination.webp"
                target="_blank"
                rel="noopener noreferrer"
                className="about-slide-left group relative mx-auto block w-[250px] self-start overflow-hidden rounded-2xl border-2 border-[#8B0000]/30 shadow-2xl shadow-black/50 transition-all duration-700 ease-out hover:scale-105 hover:border-[#8B0000]/60 hover:shadow-[#8B0000]/30 lg:-mt-8 lg:w-[350px] lg:rotate-[-3deg] lg:hover:rotate-0"
                style={{ aspectRatio: "350 / 450" }}
              >
                <Image
                  src="/assets/imgDana/nomination.webp"
                  alt="Номинация — Дамските брандове"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 250px, 350px"
                  priority
                />

                {/* Градиент за четимост на бадж/caption */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Бадж в горен ляв ъгъл */}
                <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md">
                  <svg className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/90">Номинация</span>
                </div>

                {/* Caption долу */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                    Дамските брандове
                  </p>
                </div>
              </a>

              {/* Център — текстов блок (z-10, над снимките визуално) */}
              <div className="about-fade-up relative z-10 mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-md shadow-2xl shadow-black/40">
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

              {/* Дясно — Награда Fashion Week Ruse (по-малка, rotate 4deg, изместена надолу) */}
              <a
                href="/assets/imgDana/fashion-week-ruse.webp"
                target="_blank"
                rel="noopener noreferrer"
                className="about-slide-right group relative mx-auto block w-[230px] self-end overflow-hidden rounded-2xl border-2 border-[#8B0000]/30 shadow-xl shadow-black/40 transition-all duration-700 ease-out hover:scale-105 hover:border-[#8B0000]/60 hover:shadow-[#8B0000]/30 lg:mt-12 lg:w-[280px] lg:rotate-[4deg] lg:hover:rotate-0"
                style={{ aspectRatio: "280 / 350" }}
              >
                <Image
                  src="/assets/imgDana/fashion-week-ruse.webp"
                  alt="Награда — Fashion Week Ruse"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 230px, 280px"
                  priority
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md">
                  <svg className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/90">Награда</span>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                    Fashion Week Ruse
                  </p>
                </div>
              </a>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
