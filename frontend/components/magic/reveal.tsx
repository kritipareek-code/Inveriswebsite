"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export type RevealDirection = "left" | "right" | "up" | "down";
type RevealTag = "div" | "p" | "h2" | "h3" | "li" | "span";

const components = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  span: motion.span,
};

function offsetFor(direction: RevealDirection, distance: number) {
  if (direction === "left") return { x: -distance, y: 0 };
  if (direction === "right") return { x: distance, y: 0 };
  if (direction === "down") return { x: 0, y: -distance };
  return { x: 0, y: distance };
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  as?: RevealTag;
}) {
  const reduce = useReducedMotion();
  const offset = offsetFor(direction, distance);
  const Component = components[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{ duration, delay, ease }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
