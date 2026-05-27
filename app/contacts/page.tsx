import Link from "next/link";
import AutoRouteOnScroll from "../../components/AutoRouteOnScroll";

export const metadata = {
  title: "Контакти — Dana`|`Vitan",
  description: "Контакти и адрес на ателието на Dana`|`Vitan в Русе.",
};

export default function ContactsPage() {
  return (
    <>
      <AutoRouteOnScroll upHref="/about" />
      <main className="relative flex-1 overflow-hidden px-6 pb-20 pt-20 sm:pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(122,12,31,0.28),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_36%)]" />

      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(18,16,17,0.96),rgba(8,8,8,0.98))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/55">Контакти</p>
          <h1 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
            DANA VITAN
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Ателието носи характер, прецизност и отношение към детайла. Тук всяка линия е
            мислена като част от цялата визия, а пространството е подредено така, че да
            подчертае спокойствието и уверения стил на марката.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Адрес</p>
              <p className="mt-3 text-sm leading-6 text-white/85">
                АМД Дана Стил ЕООД
                <br />
                Ruse, Област Русе
                <br />
                ул. „Николаевска“ 80
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(122,12,31,0.22),rgba(255,255,255,0.03))] p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Визия</p>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Черна основа, бордо акцент и изчистена композиция, която оставя фокуса върху
                самото изделие и усещането за бутикова изработка.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
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
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Какво да очаквате</p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-white/75">
              <li>Персонално отношение и визия, съобразена със стила на клиента.</li>
              <li>Ателие с фокус върху детайла, линията и силуета.</li>
              <li>Подход, който съчетава модерна естетика и усещане за ръчна работа.</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-[color:var(--accent)]/40 bg-[linear-gradient(135deg,rgba(122,12,31,0.95),rgba(12,12,12,0.98))] p-8 text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Бърз достъп</p>
            <h2 className="mt-4 text-2xl font-semibold">Отидете към магазина или началната страница.</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Ако искате да добавим и телефон, имейл или карта, мога да го оформя като
              завършена контактна секция.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
              >
                Магазин
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
              >
                Начало
              </Link>
            </div>
          </div>
        </aside>
      </div>
      </main>
    </>
  );
}