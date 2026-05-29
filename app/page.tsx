import Image from 'next/image';
import TypewriterStory from '@/components/TypewriterStory';
import PhilosophySection from '@/components/PhilosophySection';
import FounderSection from '@/components/FounderSection';
import CtaSection from '@/components/CtaSection';

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">

      {/* HERO — Split Layout */}
      <section className="
        relative
        min-h-[calc(100vh-80px)]
        flex flex-col md:flex-row
        items-center
      ">

        {/* ЛЯВА КОЛОНА — Typewriter текст */}
        <div className="
          w-full md:w-1/2
          flex flex-col
          justify-center
          px-8 md:px-16
          py-12
          order-2 md:order-1
        ">
          <TypewriterStory />
        </div>

        {/* ДЯСНА КОЛОНА — Floating Card with Glow */}
        <div className="
          w-full md:w-1/2
          h-[50vh] md:h-[calc(100vh-80px)]
          relative
          order-1 md:order-2
          flex items-center justify-center
          p-8
        ">
          {/* Glow зад картата */}
          <div className="
            absolute
            w-[300px] h-[400px]
            bg-[#8B1A2F]
            opacity-30
            blur-[80px]
            rounded-full
            pointer-events-none
          "/>

          {/* Самата карта */}
          <div className="
            relative
            w-full max-w-sm
            rounded-2xl
            overflow-hidden
            border border-[#8B1A2F]/50
            rotate-[-3deg]
            transition-transform duration-500
            hover:rotate-0
            hover:scale-[1.02]
            shadow-2xl
          ">
            <div className="relative w-full aspect-[3/4]">
              <Image
                src="/assets/imgDana/dntop.webp"
                alt="Дана Витан"
                fill
                className="object-cover object-top"
                priority
              />

            </div>
          </div>
        </div>

      </section>

      {/* СЕКЦИЯ 1 — Философия */}
      <PhilosophySection />

      {/* СЕКЦИЯ 2 — Основателката */}
      <FounderSection />

      {/* СЕКЦИЯ 3 — Покана */}
      <CtaSection />

    </main>
  );
}
