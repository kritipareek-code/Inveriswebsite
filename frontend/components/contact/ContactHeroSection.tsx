"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionTag } from "@/components/ui/SectionTag";
import { PAGE_HERO_HEIGHT, PAGE_HERO_PADDING } from "@/components/shared/page-hero-layout";
import { Spotlight } from "@/components/magic/spotlight";
import { GridPattern } from "@/components/magic/grid-pattern";
import { TextGenerate } from "@/components/magic/text-generate";
import type { ContactHeroContent } from "@/lib/contact-content";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactHeroSection({ content }: { content: ContactHeroContent }) {
  const hero = content;

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-y-0 right-0 hidden w-[78%] lg:block">
        <CmsImage
          src={hero.image}
          alt={hero.imageAlt || hero.titleWhite}
          fill
          priority
          className="object-cover object-center"
          sizes="78vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-navy from-[0%] via-navy/80 via-[22%] to-navy/20 to-[70%]"
        />
      </div>
      <GridPattern className="opacity-25" />
      <Spotlight className="-top-40 left-10" fill="#c4a484" />

      <Container className="relative z-10">
        <div className={cn("flex flex-col lg:block", PAGE_HERO_HEIGHT)}>
          <div className={cn("flex flex-1 items-center lg:max-w-[52%]", PAGE_HERO_PADDING)}>
            <div className="max-w-3xl space-y-5">
              <motion.div
                initial={{ opacity: 0, y: -28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-flex"
              >
                <SectionTag light>{hero.tag}</SectionTag>
              </motion.div>
              <h1 className="text-3xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
                <span className="block text-heading-inverse">
                  <TextGenerate text={hero.titleWhite} duration={0.62} staggerDelay={0.07} />
                </span>
                <span className="block text-gold">
                  <TextGenerate text={hero.titleAccent} delay={0.35} duration={0.62} staggerDelay={0.07} />
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0, x: -56 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.95, delay: 0.45, ease }}
                className="max-w-2xl text-base leading-relaxed text-paragraph-inverse md:text-lg"
              >
                {hero.description}
              </motion.p>
            </div>
          </div>
          <div className="relative h-72 min-h-[300px] lg:hidden">
            <CmsImage
              src={hero.image}
              alt={hero.imageAlt || hero.titleWhite}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-navy via-navy/30 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
