"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

export function TextGenerate({
  text,
  className,
  delay = 0,
  duration = 0.62,
  staggerDelay = 0.07,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
