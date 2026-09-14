"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { CmsImage } from "@/components/ui/CmsImage";
import { Spotlight } from "@/components/magic/spotlight";
import { BackgroundBeams } from "@/components/magic/background-beams";
import { GridPattern } from "@/components/magic/grid-pattern";
import { Meteors } from "@/components/magic/meteors";
import { TextGenerate } from "@/components/magic/text-generate";
import { HomeIcon } from "@/lib/home-icons";
import { ValueBarSection } from "@/components/home/ValueBarSection";
import {
  resolveMediaUrl,
  type HomeHeroContent,
  type HomeValueItem,
} from "@/lib/home-content";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection({
  content,
  valueBarTitle,
  valuePropositions,
}: {
  content: HomeHeroContent;
  valueBarTitle: string;
  valuePropositions: HomeValueItem[];
}) {
  const background = resolveMediaUrl(content.backgroundImage);

  return (
    <section className="relative overflow-hidden bg-navy">
      {background ? (
        <CmsImage
          src={content.backgroundImage}
          alt={content.backgroundImageAlt || ""}
          fill
          priority
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,164,132,0.18),transparent_45%),linear-gradient(to_bottom,rgba(7,16,31,0.55),rgba(7,16,31,0.92))]" />
      <GridPattern className="opacity-50" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#c4a484" />
      <BackgroundBeams />
      <Meteors number={14} />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <Container className="flex flex-1 flex-col justify-center pt-[calc(var(--header-height)+3.5rem)] pb-10 lg:pb-12">
          <div className="max-w-3xl space-y-7">
            {content.tag ? (
              <motion.div
                initial={{ opacity: 0, y: -28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="relative inline-flex"
              >
                <SectionTag light>{content.tag}</SectionTag>
              </motion.div>
            ) : null}

            {content.title ? (
              <h1 className="text-4xl md:text-6xl lg:text-[4.15rem] font-bold text-heading-inverse leading-[1.05] tracking-tight">
                <TextGenerate text={content.title} duration={0.62} staggerDelay={0.07} />
              </h1>
            ) : null}

            {content.description ? (
              <motion.p
                initial={{ opacity: 0, x: -56 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.95, delay: 0.35, ease }}
                className="text-base md:text-lg text-paragraph-inverse leading-relaxed max-w-2xl"
              >
                {content.description}
              </motion.p>
            ) : null}

            <div className="flex flex-wrap gap-4 overflow-hidden pt-2">
              {content.primaryCta?.label ? (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.7, ease }}
                >
                  <Button variant="gold" size="lg" href={content.primaryCta.href || "/about"}>
                    {content.primaryCta.label}
                    <HomeIcon name="arrowRight" size={18} />
                  </Button>
                </motion.div>
              ) : null}
              {content.secondaryCta?.label ? (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.84, ease }}
                >
                  <Button variant="light" size="lg" href={content.secondaryCta.href || "/services"}>
                    {content.secondaryCta.label}
                  </Button>
                </motion.div>
              ) : null}
            </div>
          </div>
        </Container>
        <ValueBarSection title={valueBarTitle} items={valuePropositions} />
      </div>
    </section>
  );
}
