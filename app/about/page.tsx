import AutoRouteOnScroll from "../../components/AutoRouteOnScroll";

export const metadata = {
  title: "За нас — Dana`|`Vitan",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <AutoRouteOnScroll downHref="/contacts" upHref="/shop" />
      <main className="relative z-10 px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="mb-4 text-3xl font-semibold text-white">ЗА НАС</h1>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="mb-6 text-lg leading-7 text-white/80">
              Успехът не идва случайно. Той е плод на много труд, моменти, в които си
              напът да се откажеш, но продължаваш напред. Защото любовта към създаването на
              красота е по-силна! ❤️
            </p>

            <p className="mb-6 text-base text-white/70">
              Точно тази отдаденост вплитаме във всяка нишка на нашите бутикови облекла.
              Тези думи са олицетворение на всичко, зад което стои Dana Vitan – стил, който
              не остава незабелязан, сценично присъствие и задължителният елемент, който носи
              духа на България - шевиците.
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

            <p className="text-sm text-white/60">👉 Разгледайте детайлите на шевицата и се свържете с нас на съобщение, за да изработим вашата мечтана рокля по поръчка!</p>

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
      </main>
    </div>
  );
}
