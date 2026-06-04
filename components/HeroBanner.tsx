'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TITLE = 'ДАНА ВИТАН . КОДЪТ НА ЖИВОТА .';
const BODY =
  "Името Дана Витан не е случайно. То е код. 'Дана' е древната дума за даряване и водна стихия. 'Витан' носи корена на самия живот и устойчивостта на времето. Ние създадохме този бранд, за да съберем разпилените парчета на съвременната жена. В свят, който постоянно иска нещо от нас, ние се обръщаме към източниците, които ни зареждат. Вярваме, че дрехата трябва да има памет. Затова вплитаме в модерните силуети защитните символи на етно мотивите. Вярваме, че аксесоарът трябва да има вибрация. Затова подбираме полускъпоценни камъни, които не просто блестят, а работят за твоята енергия. Дана Витан е мода за жената, която стъпва здраво на земята, но главата ѝ е в звездите.";

const BG = '#0a0a0a';
const BLUR_WINDOW = 160;

type Char = { char: string; id: number };

export default function HeroBanner() {
  const shouldReduceMotion = useReducedMotion();

  const [titleChars, setTitleChars] = useState<Char[]>([]);
  const [bodyCount, setBodyCount] = useState(0);
  const [titleDone, setTitleDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTitleChars(TITLE.split('').map((char, id) => ({ char, id })));
      setTitleDone(true);
      setBodyCount(BODY.length);
      setBodyDone(true);
      setShowButton(true);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i < TITLE.length) {
        const idx = i;
        setTitleChars(prev => [...prev, { char: TITLE[idx], id: idx }]);
        i++;
      } else {
        clearInterval(interval);
        setTitleDone(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!titleDone || shouldReduceMotion) return;
    let bodyInterval: ReturnType<typeof setInterval> | null = null;
    const timer = setTimeout(() => {
      let j = 0;
      bodyInterval = setInterval(() => {
        if (j < BODY.length) {
          j++;
          setBodyCount(j);
        } else {
          if (bodyInterval) clearInterval(bodyInterval);
          setBodyDone(true);
          setTimeout(() => setShowButton(true), 400);
        }
      }, 13);
    }, 300);
    return () => {
      clearTimeout(timer);
      if (bodyInterval) clearInterval(bodyInterval);
    };
  }, [titleDone, shouldReduceMotion]);

  const settledEnd = Math.max(0, bodyCount - BLUR_WINDOW);
  const settled = BODY.slice(0, settledEnd);
  const animating = BODY.slice(settledEnd, bodyCount);

  return (
    <section className="relative w-full overflow-x-clip" style={{ backgroundColor: BG }}>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
      >
        <Image
          src="/assets/imgDana/DanaV.png"
          alt="Dana Vitan — колекция стилизирани носии и бутикови облекла"
          width={2658}
          height={984}
          priority
          unoptimized
          sizes="100vw"
          className="w-full h-auto block"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(to right, ${BG} 0%, transparent 12%, transparent 88%, ${BG} 100%)` }} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.65) 85%, ${BG} 100%)` }} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)' }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'radial-gradient(ellipse at bottom, rgba(139,26,47,0.28), transparent 65%)' }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/70" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-start text-left max-w-2xl mx-auto px-6 md:px-8 pt-10 md:pt-14 pb-16 md:pb-20">
        {/* ЗАГЛАВИЕ — призрачен пълен текст резервира финалния размер,
            за да не подскача центрирането, докато буквите се изписват */}
        <h1 className="relative text-white text-3xl md:text-5xl font-bold leading-tight tracking-normal uppercase mb-6">
          <span aria-hidden className="invisible">{TITLE}</span>
          <span className="absolute inset-0">
            {titleChars.map(({ char, id }) => (
              <span key={id} className="char-blur-in">{char}</span>
            ))}
          </span>
        </h1>

        {/* ТЕКСТ — призрачният пълен текст държи финалната височина,
            за да не „подскача" страницата, докато се изписва */}
        <p className="relative text-white/70 text-sm md:text-base font-light leading-relaxed mb-10">
          <span aria-hidden className="invisible">{BODY}</span>
          <span className="absolute inset-0">
            {settled}
            {animating.split('').map((char, i) => (
              <span key={settledEnd + i} className="char-blur-in">{char}</span>
            ))}
            {titleDone && !bodyDone && <span className="text-accent animate-pulse">|</span>}
          </span>
        </p>

        <Link href="/shop" className={showButton ? 'animate-fadeIn' : 'invisible'}>
          <button
            type="button"
            className="px-10 py-3 bg-accent text-white text-sm uppercase tracking-widest font-medium rounded-full border border-accent transition-all duration-300 cursor-pointer hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Магазин
          </button>
        </Link>
      </div>
    </section>
  );
}
