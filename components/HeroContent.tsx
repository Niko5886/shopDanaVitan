"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const handleShop = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex w-full justify-end">
      <div className="max-w-md text-right">
        <motion.p
          custom={0.1}
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-3 text-[11px] uppercase tracking-[0.42em] text-white/45"
        >
          Бутикова мода
        </motion.p>

        <motion.p
          custom={0.22}
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-8 ml-auto max-w-sm text-2xl leading-9 text-white/60 sm:text-3xl"
        >
          Бутикови дрехи и стилизирани носии, създадени да впечатляват.
        </motion.p>

        <motion.div
          custom={0.36}
          variants={item}
          initial="hidden"
          animate="show"
        >
          <motion.a
            href="/#shop"
            onClick={pathname === "/" ? handleShop : undefined}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 28px rgba(122,12,31,0.55)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="inline-flex items-center gap-3 rounded-full bg-[color:var(--accent)] px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-white"
          >
            Разгледай колекцията
            <motion.svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
