import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-28 px-8 md:px-16 bg-[#0a0a0a] flex flex-col items-center text-center">
      <span className="text-accent uppercase tracking-widest text-sm font-medium mb-4">
        ОТКРИЙ КОЛЕКЦИЯТА
      </span>
      <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
        Преоткрий своята визия
      </h2>
      <p className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-xl mb-10">
        Разгледай нашите бутикови облекла, стилизирани носии и ръчно подбрани аксесоари.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/shop">
          <button
            type="button"
            className="px-10 py-3 bg-accent text-white text-sm uppercase tracking-widest font-medium rounded-full border border-accent hover:bg-transparent transition-all duration-300 cursor-pointer"
          >
            Магазин
          </button>
        </Link>
        <Link href="/contacts">
          <button
            type="button"
            className="px-10 py-3 bg-transparent text-white text-sm uppercase tracking-widest font-medium rounded-full border border-accent hover:bg-accent transition-all duration-300 cursor-pointer"
          >
            Свържи се с нас
          </button>
        </Link>
      </div>

      <div className="mt-12 w-24 h-px bg-accent" />
    </section>
  );
}
