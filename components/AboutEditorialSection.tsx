import Image from "next/image";

const nominationImage = encodeURI("/assets/imgDana/номинация.png");
const awardImage = encodeURI("/assets/imgDana/награда фешун русе.png");

type AboutEditorialSectionProps = {
  headingLevel?: "h1" | "h2";
  showHeading?: boolean;
};

export default function AboutEditorialSection({ headingLevel = "h1", showHeading = true }: AboutEditorialSectionProps) {
  const HeadingTag = headingLevel;

  return (
    <section className="relative overflow-hidden">
      {/* Декоративна бордо светлина зад композицията. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      {/* Фина вертикална линия, видима само на по-големи екрани. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-32 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent lg:block"
      />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_2fr_1fr] lg:gap-8">
        {/* Ляво — Номинация. */}
        <div className="about-enter-left order-1 mx-auto w-[250px] self-start lg:order-none lg:w-[350px] lg:-mt-8 lg:self-start">
          <div className="relative aspect-[350/450] overflow-hidden rounded-2xl border-2 border-accent/30 shadow-2xl shadow-black/50 transition-all duration-700 ease-out lg:rotate-[-3deg]">
            <Image
              src={nominationImage}
              alt="Номинация — Дамските брандове"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 250px, 350px"
              priority
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          </div>
        </div>

        {/* Център — запазеният текстов блок. */}
        <div className="about-enter-up relative z-10 order-3 mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-black/60 p-8 shadow-2xl shadow-black/40 backdrop-blur-md lg:order-none">
          {showHeading ? (
            <HeadingTag className="mb-10 text-3xl font-semibold text-white">ЗА НАС</HeadingTag>
          ) : null}

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

          <p className="text-sm text-white/60">
            👉 Разгледайте детайлите на шевицата и се свържете с нас на
            съобщение, за да изработим вашата мечтана рокля по поръчка!
          </p>

        </div>

        {/* Дясно — Награда Fashion Week Ruse. */}
        <div className="about-enter-right order-2 mx-auto w-[250px] self-start lg:order-none lg:w-[280px] lg:mt-0 lg:self-center">
          <div className="relative aspect-[280/350] overflow-hidden rounded-2xl border-2 border-accent/30 shadow-xl shadow-black/40 transition-all duration-700 ease-out lg:rotate-[4deg]">
            <Image
              src={awardImage}
              alt="Награда — Fashion Week Ruse"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 250px, 280px"
              priority
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}