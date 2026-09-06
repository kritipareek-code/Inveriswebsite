"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionTag } from "@/components/ui/SectionTag";
import { PAGE_HERO_HEIGHT, PAGE_HERO_PADDING } from "@/components/shared/page-hero-layout";
import { GridPattern } from "@/components/magic/grid-pattern";
import { TextGenerate } from "@/components/magic/text-generate";
import { ApproachPathGraphic } from "@/components/approach/ApproachPathGraphic";
import { cn } from "@/lib/cn";
import type { ApproachHeroContent } from "@/lib/approach-content";

const ease = [0.22, 1, 0.36, 1] as const;

export function ApproachHeroSection({ content }: { content: ApproachHeroContent }) {
  const hero = content;

  return (
    <section className="relative bg-surface-alt">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <GridPattern className="opacity-40" />
      </div>
      <div className={cn("grid grid-cols-1 lg:grid-cols-2 lg:items-stretch", PAGE_HERO_HEIGHT)}>
        <Container className={cn("relative z-10 flex h-full items-center lg:pr-12", PAGE_HERO_PADDING)}>
          <div className="max-w-xl space-y-5">
            <motion.div
              initial={{ opacity: 0, y: -28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex"
            >
              <SectionTag>{hero.tag}</SectionTag>
            </motion.div>
            <h1 className="text-3xl md:text-5xl lg:text-[3.1rem] font-bold text-heading leading-[1.1]">
              <TextGenerate text={hero.title} duration={0.62} staggerDelay={0.07} />
            </h1>
            <motion.p
              initial={{ opacity: 0, x: -56 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.35, ease }}
              className="text-base md:text-lg text-paragraph leading-relaxed"
            >
              {hero.description}
            </motion.p>
          </div>
        </Container>

        <motion.div
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.25, ease }}
          className="relative h-88 min-h-80 overflow-hidden sm:h-96 lg:h-auto lg:min-h-full"
        >
          <CmsImage
            src={hero.image}
            alt={hero.imageAlt || hero.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-surface-alt via-surface-alt/30 to-transparent" />
          <ApproachPathGraphic steps={hero.pathSteps} />
        </motion.div>
      </div>
    </section>
  );
}
