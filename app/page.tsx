export default function Home() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <div className="relative overflow-visible">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.35),rgba(0,0,0,0))] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.2),rgba(0,0,0,0))] blur-3xl" />

        

        <main className="relative z-10">
          <section id="home" className="scroll-mt-28 px-6 pb-20 pt-20 sm:pt-24">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
              <div className="space-y-6 motion-safe:animate-[reveal_0.8s_ease-out]">
                <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                  Бутикови дрехи и стилизирани носии, създадени да впечатляват
                </h1>
                <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
                  {[
                    { id: "etho", title: "Етно", href: "/brand/etho" },
                    { id: "afro", title: "Афро", href: "/brand/afro" },
                    { id: "casual", title: "Кежуал", href: "/brand/casual" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="group relative block rounded-3xl border border-white/10 bg-white/5 p-4 hover:scale-105 transform-gpu transition h-28 sm:h-32 flex items-center justify-center overflow-hidden"
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

          <section id="shop" className="scroll-mt-28 px-6 pb-20">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    МАГАЗИН
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Колекции, които разказват история
                  </h2>
                </div>
                <p className="max-w-md text-sm text-white/60">
                  От ритуалната нишка до модерната линия — всяка серия е ограничена и
                  създадена за клиенти, които търсят характер и стил.
                </p>
              </div>
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {[
                  {
                    title: "Стилизирани носии",
                    text: "Традиционни мотиви с градски силует.",
                    tag: "Лимитирана",
                  },
                  {
                    title: "Бутикови проекти",
                    text: "Персонални дрехи по ваша идея.",
                    tag: "По поръчка",
                  },
                  {
                    title: "Аксесоари",
                    text: "Бижута, колани и акценти с бордо шевица.",
                    tag: "Нови",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {item.tag}
                      </span>
                      <span className="text-[color:var(--accent)]">●</span>
                    </div>
                    <div className="mt-6 h-32 rounded-2xl bg-[linear-gradient(135deg,rgba(122,12,31,0.55),rgba(12,12,12,0.95))]" />
                    <h3 className="mt-6 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60">{item.text}</p>
                    <button className="mt-6 text-xs uppercase tracking-[0.3em] text-white/70 transition group-hover:text-white">
                      Разгледай
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="scroll-mt-28 px-6 pb-20">
            <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">ЗА НАС</p>
                <h2 className="text-3xl font-semibold text-white">
                  Модерна кройка, традиционна емоция
                </h2>
                <p className="text-sm text-white/60">
                  Всяка визия преминава през внимателен процес, в който художествената
                  идея се превръща в силует, а бордо акцентът подчертава индивидуалността.
                </p>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm text-white/70">Материали</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Вълна, коприна, лен, ръчно бродирани панели
                  </p>
                </div>
              </div>
              <div className="grid gap-5">
                {[
                  {
                    step: "01",
                    title: "Разговор и идея",
                    text: "Стилистична консултация и избор на мотиви.",
                  },
                  {
                    step: "02",
                    title: "Кройка и текстил",
                    text: "Подбор на материя и изработка на прототип.",
                  },
                  {
                    step: "03",
                    title: "Ръчна декорация",
                    text: "Бродерия, кант и финални бордо акценти.",
                  },
                  {
                    step: "04",
                    title: "Финален силует",
                    text: "Проба, корекции и доставка до клиента.",
                  },
                ].map((step) => (
                  <div
                    key={step.step}
                    className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
                      {step.step}
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">{step.title}</p>
                      <p className="text-sm text-white/60">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contacts" className="scroll-mt-28 px-6 pb-24">
            <div className="mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(122,12,31,0.75),rgba(8,8,8,0.95))] p-10">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/80">КОНТАКТИ</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Готова ли си за новата си визия?
                  </h2>
                  <p className="mt-4 text-sm text-white/80">
                    Изпрати запитване и ще получиш персонална консултация в рамките на 24
                    часа. Доставяме в цялата страна с Еконт или Спиди.
                  </p>
                </div>
                <div className="space-y-4 text-sm text-white/80">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Контакти</p>
                    <p className="mt-2">atelier@nosia.bg</p>
                    <p>+359 888 123 456</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Ателие</p>
                    <p className="mt-2">ул. Стил 12, София</p>
                    <p>Пон - Съб: 10:00 - 19:00</p>
                  </div>
                  <button className="mt-4 w-full rounded-full bg-black/70 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-black">
                    Изпрати запитване
                  </button>
                </div>
              </div>
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
