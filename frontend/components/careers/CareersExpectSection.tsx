"use client";

import { Briefcase, Handshake, Network, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagicCard } from "@/components/magic/magic-card";
import { CardSpotlight } from "@/components/magic/card-spotlight";
import { ShineBorder } from "@/components/magic/shine-border";
import { BorderBeam } from "@/components/magic/border-beam";
import { BlurFade } from "@/components/magic/blur-fade";
import { GridPattern } from "@/components/magic/grid-pattern";
import type { CareersExpectContent, CareersExpectItem } from "@/lib/careers-content";

const iconMap = {
  briefcase: Briefcase,
  network: Network,
  handshake: Handshake,
  growth: TrendingUp,
};

export function CareersExpectSection({ content }: { content: CareersExpectContent }) {
  const [featured, ...rest] = content.items;

  return (
    <section className="relative overflow-hidden bg-surface-muted py-20 lg:py-28">
      <GridPattern className="opacity-45" />
      <Container className="relative">
        <div className="mb-12 max-w-xl lg:mb-16">
          <SectionTag className="mb-5">{content.tag}</SectionTag>
          <h2 className="text-3xl font-bold leading-[1.12] tracking-tight text-heading md:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[minmax(13.5rem,auto)_minmax(13.5rem,auto)_minmax(12rem,auto)] lg:gap-5">
          {featured ? (
            <BlurFade className="sm:col-span-2 lg:col-span-6 lg:row-span-2">
              <FeaturedExpectCard item={featured} index={0} />
            </BlurFade>
          ) : null}
          {rest.map((item, index) => {
            const isWide = index === rest.length - 1;
            return (
              <BlurFade
                key={item.id}
                delay={(index + 1) * 0.07}
                className={isWide ? "sm:col-span-2 lg:col-span-12" : "lg:col-span-6"}
              >
                {isWide ? (
                  <WideExpectCard item={item} index={index + 1} />
                ) : (
                  <ExpectCard item={item} index={index + 1} />
                )}
              </BlurFade>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function FeaturedExpectCard({ item, index }: { item: CareersExpectItem; index: number }) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Briefcase;
  const number = String(index + 1).padStart(2, "0");

  return (
    <CardSpotlight className="h-full min-h-[20rem] border-gold/25 bg-navy p-7 shadow-[0_24px_70px_rgba(7,16,31,0.28)] sm:min-h-[22rem] lg:min-h-full lg:p-10">
      <ShineBorder duration={14} borderWidth={1.5} />
      <BorderBeam size={120} duration={12} />
      <Icon
        size={220}
        className="pointer-events-none absolute -right-8 -bottom-10 text-gold/[0.07]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div>
          <div className="mb-8 flex items-start justify-between gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/35 bg-gold/15 text-gold shadow-[0_0_28px_rgba(196,164,132,0.28)]">
              <Icon size={26} strokeWidth={1.4} />
            </span>
            <span className="font-display text-5xl leading-none text-white/[0.08]" aria-hidden="true">
              {number}
            </span>
          </div>
          <h3 className="text-3xl font-medium leading-[1.15] text-heading-inverse lg:text-[2.15rem]">
            {item.title}
          </h3>
        </div>
        <div>
          <span className="mb-5 block h-px w-12 bg-gradient-to-r from-gold to-transparent" aria-hidden="true" />
          <p className="max-w-md text-sm leading-relaxed text-paragraph-inverse md:text-[0.95rem]">
            {item.description}
          </p>
        </div>
      </div>
    </CardSpotlight>
  );
}

function WideExpectCard({ item, index }: { item: CareersExpectItem; index: number }) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Briefcase;
  const number = String(index + 1).padStart(2, "0");

  return (
    <MagicCard className="h-full min-h-[12.5rem] rounded-3xl bg-gradient-to-br from-gold/[0.12] via-surface to-surface p-6 lg:flex lg:min-h-full lg:items-center lg:p-8">
      <BorderBeam size={90} duration={11} delay={3} />
      <div className="relative z-10 flex h-full flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/12 text-gold lg:h-16 lg:w-16">
          <Icon size={28} strokeWidth={1.4} />
        </span>
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <span className="font-display text-sm text-gold">{number}</span>
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
          </div>
          <h3 className="mb-2 text-xl font-medium leading-snug text-heading">{item.title}</h3>
          <p className="max-w-xl text-sm leading-relaxed text-paragraph">{item.description}</p>
        </div>
      </div>
    </MagicCard>
  );
}

function ExpectCard({ item, index }: { item: CareersExpectItem; index: number }) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Briefcase;
  const number = String(index + 1).padStart(2, "0");

  return (
    <MagicCard className="flex h-full min-h-[12.5rem] flex-col rounded-3xl p-6 lg:p-7">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
          <Icon size={20} strokeWidth={1.4} />
        </span>
        <span className="font-display text-2xl leading-none text-heading/10" aria-hidden="true">
          {number}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-medium leading-snug text-heading">{item.title}</h3>
      <span className="mb-3 block h-px w-8 bg-gradient-to-r from-gold to-transparent" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-paragraph">{item.description}</p>
    </MagicCard>
  );
}
