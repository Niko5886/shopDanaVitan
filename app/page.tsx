import type { Metadata } from 'next';
import HeroBanner from '@/components/HeroBanner';
import PhilosophySection from '@/components/PhilosophySection';
import FounderSection from '@/components/FounderSection';
import CtaSection from '@/components/CtaSection';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">

      {/* HERO — кинематографичен full-bleed банер */}
      <HeroBanner />

      {/* СЕКЦИЯ 1 — Философия */}
      <PhilosophySection />

      {/* СЕКЦИЯ 2 — Основателката */}
      <FounderSection />

      {/* СЕКЦИЯ 3 — Покана */}
      <CtaSection />

    </main>
  );
}
