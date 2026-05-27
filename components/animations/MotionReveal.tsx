"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "left" | "right" | "up" | "down";

interface Props {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  left:  { x: -52 },
  right: { x:  52 },
  up:    { y: -32 },
  down:  { y:  32 },
};

export default function MotionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  once = true,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
