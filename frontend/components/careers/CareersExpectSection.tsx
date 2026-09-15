"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Reveal } from "@/components/magic/reveal";
import { useCareersForm } from "@/components/careers/CareersFormProvider";
import type { CareersExpectContent } from "@/lib/careers-content";
import { cn } from "@/lib/cn";

export function CareersExpectSection({
  content,
}: {
  content: CareersExpectContent;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { openForm } = useCareersForm();

  return (
    <section className="overflow-hidden bg-surface py-20 lg:py-28">
      <Container>
        <div className="mb-10 max-w-xl lg:mb-14">
          <Reveal direction="down">
            <SectionTag className="mb-5">{content.tag}</SectionTag>
          </Reveal>
          <Reveal direction="left" delay={0.08}>
            <h2 className="text-3xl font-bold tracking-tight text-heading md:text-5xl">
              {content.title}
            </h2>
          </Reveal>
        </div>

        <div className="border-y border-border">
          {content.items.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");
            const isActive = hoveredId === item.id;

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => openForm()}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(null)}
                className="group relative grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 overflow-hidden border-b border-border px-3 py-6 text-left last:border-b-0 sm:px-5 lg:grid-cols-[4.5rem_minmax(12rem,0.9fr)_minmax(0,1.4fr)_auto] lg:items-center lg:gap-8 lg:px-6 lg:py-8"
              >
                {isActive ? (
                  <motion.span
                    layoutId="expect-row-highlight"
                    className="pointer-events-none absolute inset-0 bg-navy"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}

                <span
                  className={cn(
                    "relative z-10 pt-0.5 text-sm font-bold tracking-wider tabular-nums transition-colors duration-300 lg:text-base",
                    isActive ? "text-neutral-300" : "text-neutral-400"
                  )}
                >
                  {number}
                </span>

                <Reveal
                  as="h3"
                  direction="left"
                  delay={0.08}
                  duration={0.65}
                  distance={24}
                  className={cn(
                    "relative z-10 text-xl font-bold leading-snug transition-colors duration-300 lg:text-2xl",
                    isActive ? "text-white" : "text-heading"
                  )}
                >
                  {item.title}
                </Reveal>

                <Reveal
                  as="p"
                  direction="left"
                  delay={0.16}
                  duration={0.7}
                  distance={28}
                  className={cn(
                    "relative z-10 col-span-3 max-w-xl text-sm leading-relaxed transition-colors duration-300 sm:col-span-1 sm:col-start-2 lg:col-span-1 lg:col-start-auto lg:max-w-none lg:text-base",
                    isActive ? "text-white/80" : "text-paragraph"
                  )}
                >
                  {item.description}
                </Reveal>

                <span
                  className={cn(
                    "relative z-10 col-start-3 row-start-1 flex h-10 w-10 items-center justify-center self-start transition-colors duration-300 lg:col-start-auto lg:row-start-auto lg:self-center",
                    isActive ? "text-gold" : "text-navy"
                  )}
                >
                  <ArrowRight
                    size={22}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
