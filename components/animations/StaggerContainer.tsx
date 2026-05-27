"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  staggerDelay?: number;
  delayStart?: number;
  className?: string;
  once?: boolean;
}

const containerVariants = (stagger: number, delayStart: number) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delayStart },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayStart = 0,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      variants={containerVariants(staggerDelay, delayStart)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
