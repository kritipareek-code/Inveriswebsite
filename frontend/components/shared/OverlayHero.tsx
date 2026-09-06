"use client";

import { motion } from "motion/react";
import { CmsImage } from "@/components/ui/CmsImage";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { PAGE_HERO_HEIGHT, PAGE_HERO_PADDING } from "@/components/shared/page-hero-layout";
import { Spotlight } from "@/components/magic/spotlight";
import { GridPattern } from "@/components/magic/grid-pattern";
import { TextGenerate } from "@/components/magic/text-generate";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

interface OverlayHeroProps {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export function OverlayHero({
  tag,
  title,
  description,
  image,
  imageAlt,
}: OverlayHeroProps) {
  return (
    <section className={cn("relative flex items-center overflow-hidden", PAGE_HERO_HEIGHT)}>
      <CmsImage
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,16,31,0.88),rgba(7,16,31,0.45),rgba(7,16,31,0.2))]"
      />
      <GridPattern className="opacity-25" />
      <Spotlight className="-top-32 left-20" fill="#c4a484" />

      <Container className={cn("relative z-10", PAGE_HERO_PADDING)}>
        <div className="max-w-2xl space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex"
          >
            <SectionTag light>{tag}</SectionTag>
          </motion.div>
          <h1 className="text-3xl md:text-5xl lg:text-[3.1rem] font-bold text-heading-inverse leading-[1.1]">
            <TextGenerate text={title} duration={0.62} staggerDelay={0.07} />
          </h1>
          <motion.p
            initial={{ opacity: 0, x: -56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.35, ease }}
            className="text-base md:text-lg text-paragraph-inverse leading-relaxed max-w-xl"
          >
            {description}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
