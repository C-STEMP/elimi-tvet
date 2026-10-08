"use client";

import React from "react";
import { motion } from "framer-motion";

export const FloatingCircles: React.FC = () => (
  <>
    <motion.div
      suppressHydrationWarning
      animate={{
        y: [0, -15, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute -top-28 -right-60 w-[420px] h-[420px] rounded-full bg-white/6 pointer-events-none z-0"
      aria-hidden="true"
    />

    <motion.div
      suppressHydrationWarning
      animate={{
        y: [0, 15, 0],
        x: [0, -10, 0],
        scale: [1, 0.95, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-8 -left-40 w-[360px] h-[360px] rounded-full bg-secondary/15 pointer-events-none z-0"
      aria-hidden="true"
    />
  </>
);
