import AutoRouteOnScroll from "../components/AutoRouteOnScroll";

export default function Home() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <AutoRouteOnScroll downHref="/shop" />
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
