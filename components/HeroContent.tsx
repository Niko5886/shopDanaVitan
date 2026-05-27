"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, x: 48 },
  show: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 2.2, delay, ease },
  }),
};

export default function HeroContent() {
  return (
    <div className="flex w-full justify-end">
      <div className="max-w-md text-right">
        <motion.p
          custom={0.1}
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-3 inline-block rounded-full bg-[rgba(122,12,31,0.35)] px-4 py-1.5 text-[11px] uppercase tracking-[0.42em] text-white/60"
        >
          Бутикова мода
        </motion.p>

        <motion.p
          custom={0.22}
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-8 ml-auto max-w-sm text-3xl leading-10 text-white/80 sm:text-4xl"
        >
          Бутикови дрехи и стилизирани носии, създадени да впечатляват.
        </motion.p>

      </div>
    </div>
  );
}
