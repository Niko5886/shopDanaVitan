'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const TITLE = 'Дана Витан. Кодът на живота.';
const BODY =
  "Името Дана Витан не е случайно. То е код. 'Дана' е древната дума за даряване и водна стихия. 'Витан' носи корена на самия живот и устойчивостта на времето. Ние създадохме този бранд, за да съберем разпилените парчета на съвременната жена. В свят, който постоянно иска нещо от нас, ние се обръщаме към източниците, които ни зареждат. Вярваме, че дрехата трябва да има памет. Затова вплитаме в модерните силуети защитните символи на етно мотивите. Вярваме, че аксесоарът трябва да има вибрация. Затова подбираме полускъпоценни камъни, които не просто блестят, а работят за твоята енергия. Дана Витан е мода за жената, която стъпва здраво на земята, но главата ѝ е в звездите.";

export default function TypewriterStory() {
  const [titleText, setTitleText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [titleDone, setTitleDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < TITLE.length) {
        setTitleText(TITLE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTitleDone(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!titleDone) return;
    let bodyInterval: ReturnType<typeof setInterval> | null = null;
    const timer = setTimeout(() => {
      let j = 0;
      bodyInterval = setInterval(() => {
        if (j < BODY.length) {
          setBodyText(BODY.slice(0, j + 1));
          j++;
        } else {
          if (bodyInterval) clearInterval(bodyInterval);
          setBodyDone(true);
          setTimeout(() => setShowButton(true), 400);
        }
      }, 22);
    }, 300);
    return () => {
      clearTimeout(timer);
      if (bodyInterval) clearInterval(bodyInterval);
    };
  }, [titleDone]);

  return (
    <div className="flex flex-col gap-4 max-w-sm w-full">
      <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight min-h-[3rem]">
        {titleText}
        {!titleDone && <span className="text-[#8B1A2F] animate-pulse">|</span>}
      </h1>

      {titleDone && (
        <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed min-h-[8rem]">
          {bodyText}
          {!bodyDone && <span className="text-[#8B1A2F] animate-pulse">|</span>}
        </p>
      )}

      {showButton && (
        <Link href="/shop" className="self-start">
          <button
            type="button"
            className="mt-2 px-10 py-3 bg-[#8B1A2F] text-white text-sm uppercase tracking-widest font-medium rounded-full border border-[#8B1A2F] hover:bg-transparent transition-all duration-300 cursor-pointer animate-fadeIn"
          >
            Галерия
          </button>
        </Link>
      )}
    </div>
  );
}
