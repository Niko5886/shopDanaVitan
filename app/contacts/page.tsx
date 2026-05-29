import Link from "next/link";

export const metadata = {
  title: "Контакти — Dana`|`Vitan",
  description: "Контакти и адрес на ателието на Dana`|`Vitan в Русе.",
};

export default function ContactsPage() {
  return (
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

          <div className="mt-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Адрес</p>
              <p className="mt-3 text-sm leading-6 text-white/85">
                АМД Дана Стил ЕООД
                <br />
                Ruse, Област Русе
                <br />
                ул. „Николаевска" 80
              </p>
            </div>
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

          <div className="rounded-[2rem] border border-[#8B1A2F]/40 overflow-hidden flex flex-col">
            <p className="text-xs uppercase tracking-widest text-[#8B1A2F] px-6 pt-5 pb-3">НАМЕРЕТЕ НИ</p>
            <div className="relative w-full min-h-[180px]">
              <iframe
                src="https://maps.google.com/maps?q=Nikolaevska%2080,%20Ruse,%20Bulgaria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="border-0 min-h-[180px] w-full h-full"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Местоположение на Dana Vitan Boutique"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}