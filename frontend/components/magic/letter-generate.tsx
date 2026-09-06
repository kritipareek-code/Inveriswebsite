"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export function LetterGenerate({
  text,
  className,
  delay = 0,
  duration = 0.22,
  staggerDelay = 0.018,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 4 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </motion.span>
  );
}
