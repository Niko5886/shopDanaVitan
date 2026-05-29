import Image from 'next/image';
import Link from 'next/link';

export default function FounderSection() {
  return (
    <section className="py-20 px-8 md:px-16 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">

        {/* Снимка */}
        <div className="w-full md:w-1/2 order-1">
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/assets/imgDana/dVitan.webp"
              alt="Дана Витан"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Текст */}
        <div className="w-full md:w-1/2 order-2 flex flex-col gap-5">
          <span className="text-accent uppercase tracking-widest text-sm font-medium">
            ОСНОВАТЕЛКАТА
          </span>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            Дана Витан
          </h2>
          <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
            Зад всяко изделие стои визия, отдаденост и стремеж към съвършенство.
            Дана влага характер, прецизност и отношение към детайла във всяко свое
            творение — носии, рокли и аксесоари, които разказват история.
          </p>
          <Link href="/about" className="self-start">
            <button
              type="button"
              className="mt-2 px-10 py-3 bg-accent text-white text-sm uppercase tracking-widest font-medium rounded-full border border-accent hover:bg-transparent transition-all duration-300 cursor-pointer"
            >
              Научи повече
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
