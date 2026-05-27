import Link from "next/link";
import ShopClient from "../components/ShopClient";
import SectionRevealObserver from "../components/SectionRevealObserver";
import { products } from "../data/products";

export default function Home() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <div className="relative overflow-visible">
        <SectionRevealObserver />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.35),rgba(0,0,0,0))] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.2),rgba(0,0,0,0))] blur-3xl" />


        <main className="relative z-10">
          <section id="home" data-reveal-section className="reveal-section home-hero scroll-mt-28 snap-start px-6 pb-20 pt-20 sm:pt-24 lg:min-h-[calc(100vh-84px)]">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
              <div className="space-y-6 motion-safe:animate-[reveal_0.8s_ease-out]">
                <h1 className="reveal-item reveal-delay-1 mx-auto max-w-4xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                  Бутикови дрехи и стилизирани носии, създадени да впечатляват
                </h1>
                <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
                  {[
                    { id: "etho", title: "Етно", href: "/brand/etho" },
                    { id: "afro", title: "Афро", href: "/brand/afro" },
                    { id: "casual", title: "Кежуал", href: "/brand/casual" },
                  ].map((item, idx) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`group reveal-item relative block h-28 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 transition transform-gpu hover:scale-105 sm:h-32 flex items-center justify-center ${
                        idx === 0 ? "reveal-delay-2" : idx === 1 ? "reveal-delay-3" : "reveal-delay-4"
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(122,12,31,0.78),rgba(14,10,11,0.98)_58%,rgba(0,0,0,1))]" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(122,12,31,0.24),transparent_42%)] opacity-80" />
                      <div className="relative z-10 text-xl font-semibold text-white uppercase tracking-[0.12em] text-center">
                        {item.title}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="shop" data-reveal-section className="reveal-section scroll-mt-28 snap-start px-6 pb-20 pt-14 lg:min-h-[calc(100vh-84px)]">
            <main className="relative z-10">
              <div className="mx-auto w-full max-w-6xl">
                <h2 className="reveal-item reveal-delay-1 mb-4 text-3xl font-semibold text-white">МАГАЗИН</h2>
              </div>
              <div className="reveal-item reveal-delay-2">
                <ShopClient products={products} />
              </div>
            </main>
          </section>

          <section id="about" data-reveal-section className="reveal-section scroll-mt-28 snap-start px-6 pb-20 pt-20 lg:min-h-[calc(100vh-84px)]">
            <div className="mx-auto w-full max-w-4xl">
              <h2 className="reveal-item reveal-delay-1 mb-4 text-3xl font-semibold text-white">ЗА НАС</h2>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <p className="reveal-item reveal-delay-2 mb-6 text-lg leading-7 text-white/80">
                  Успехът не идва случайно. Той е плод на много труд, моменти, в които си
                  напът да се откажеш, но продължаваш напред. Защото любовта към създаването на
                  красота е по-силна! ❤️
                </p>

                <p className="reveal-item reveal-delay-3 mb-6 text-base text-white/70">
                  Точно тази отдаденост вплитаме във всяка нишка на нашите бутикови облекла.
                  Тези думи са олицетворение на всичко, зад което стои Dana Vitan - стил, който
                  не остава незабелязан, сценично присъствие и задължителният елемент, който носи
                  духа на България - шевиците.
                </p>

                <p className="reveal-item reveal-delay-4 mb-6 text-base text-white/70">
                  Създадена, за да подчертае вашата увереност и женственост. 💃
                </p>

                <div className="reveal-item reveal-delay-5 mb-6">
                  <a
                    href="mailto:atelier@nosia.bg"
                    className="inline-flex items-center gap-3 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[color:var(--accent-strong)]"
                  >
                    Свържете се с нас
                  </a>
                </div>

                <p className="reveal-item reveal-delay-6 text-sm text-white/60">👉 Разгледайте детайлите на шевицата и се свържете с нас на съобщение, за да изработим вашата мечтана рокля по поръчка!</p>

                <div className="reveal-item reveal-delay-7 mt-6 flex flex-wrap gap-2">
                  <span className="text-xs text-white/50">#DanaVitanFashion</span>
                  <span className="text-xs text-white/50">#ДанаВитан</span>
                  <span className="text-xs text-white/50">#БългарскоПроизводство</span>
                  <span className="text-xs text-white/50">#УникаленДизайн</span>
                  <span className="text-xs text-white/50">#ЕтноМотиви</span>
                  <span className="text-xs text-white/50">#ТрадицияИМода</span>
                </div>
              </div>
            </div>
          </section>

          <section id="contacts" data-reveal-section className="reveal-section scroll-mt-28 snap-start px-6 pb-20 pt-20 lg:min-h-[calc(100vh-84px)]">
            <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="reveal-item reveal-delay-1 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(18,16,17,0.96),rgba(8,8,8,0.98))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-10">
                <p className="reveal-item reveal-delay-2 text-xs uppercase tracking-[0.4em] text-white/55">Контакти</p>
                <h2 className="reveal-item reveal-delay-3 mt-4 font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
                  DANA VITAN
                </h2>
                <p className="reveal-item reveal-delay-4 mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                  Ателието носи характер, прецизност и отношение към детайла. Тук всяка линия е
                  мислена като част от цялата визия, а пространството е подредено така, че да
                  подчертае спокойствието и уверения стил на марката.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="reveal-item reveal-delay-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Адрес</p>
                    <p className="mt-3 text-sm leading-6 text-white/85">
                      АМД Дана Стил ЕООД
                      <br />
                      Ruse, Област Русе
                      <br />
                      ул. &quot;Николаевска&quot; 80
                    </p>
                  </div>

                  <div className="reveal-item reveal-delay-6 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(122,12,31,0.22),rgba(255,255,255,0.03))] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Визия</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">
                      Черна основа, бордо акцент и изчистена композиция, която оставя фокуса върху
                      самото изделие и усещането за бутикова изработка.
                    </p>
                  </div>
                </div>

                <div className="reveal-item reveal-delay-7 mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    Бутиково присъствие
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    Индивидуален стил
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    Прецизна изработка
                  </span>
                </div>
              </section>

              <aside className="grid gap-6">
                <div className="reveal-item reveal-delay-2 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">Какво да очаквате</p>
                  <ul className="mt-5 space-y-4 text-sm leading-6 text-white/75">
                    <li>Персонално отношение и визия, съобразена със стила на клиента.</li>
                    <li>Ателие с фокус върху детайла, линията и силуета.</li>
                    <li>Подход, който съчетава модерна естетика и усещане за ръчна работа.</li>
                  </ul>
                </div>

                <div className="reveal-item reveal-delay-3 rounded-[2rem] border border-[color:var(--accent)]/40 bg-[linear-gradient(135deg,rgba(122,12,31,0.95),rgba(12,12,12,0.98))] p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">Бърз достъп</p>
                  <h3 className="reveal-item reveal-delay-4 mt-4 text-2xl font-semibold">Отидете към магазина или началната секция.</h3>
                  <div className="reveal-item reveal-delay-5 mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/#shop"
                      className="rounded-full bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
                    >
                      Магазин
                    </Link>
                    <Link
                      href="/#home"
                      className="rounded-full border border-white/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
                    >
                      Начало
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </section>

        </main>

        <footer className="border-t border-white/10 px-6 py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-[0.3em] text-white/50">
            <span>© 2026 Dana`|`Vitan</span>
            <div className="flex flex-wrap gap-6">
              <span>Политика за доставка</span>
              <span>Връщане и замяна</span>
              <span>Лична консултация</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
