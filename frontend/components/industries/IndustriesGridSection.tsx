"use client";

import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { CmsImage } from "@/components/ui/CmsImage";
import { Timeline } from "@/components/ui/timeline";
import { Reveal } from "@/components/magic/reveal";
import type { IndustriesWeServeContent } from "@/lib/industries-content";

export function IndustriesGridSection({
  content,
}: {
  content: IndustriesWeServeContent;
}) {
  const data = content.industries.map((industry, index) => ({
    title: industry.title,
    content: (
      <div className="space-y-6 overflow-hidden">
        <Reveal
          as="p"
          direction="left"
          delay={0.12}
          duration={0.8}
          distance={32}
          className="text-base leading-relaxed text-paragraph md:text-lg"
        >
          {industry.description}
        </Reveal>
        {industry.image ? (
          <Reveal direction={index % 2 === 0 ? "right" : "up"} delay={0.22}>
            <div className="overflow-hidden rounded-2xl transition-transform duration-500 ease-out hover:scale-[1.03]">
              <CmsImage
                src={industry.image}
                alt={industry.title}
                width={900}
                height={560}
                className="h-40 w-full object-cover shadow-[var(--shadow-card)] md:h-52 lg:h-60"
              />
            </div>
          </Reveal>
        ) : null}
      </div>
    ),
  }));

  return (
    <section className="overflow-hidden bg-surface py-16 lg:py-24">
      <Container>
        <div className="mb-8 grid grid-cols-1 items-start gap-8 lg:mb-4 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <Reveal direction="down">
              <SectionTag withLine>{content.tag}</SectionTag>
            </Reveal>
            <Reveal direction="left" delay={0.08}>
              <h2 className="text-3xl leading-tight font-bold text-heading md:text-4xl">
                {content.title}
              </h2>
            </Reveal>
          </div>
          <Reveal direction="right" delay={0.12}>
            <p className="leading-relaxed text-paragraph lg:pt-8">
              {content.description}
            </p>
          </Reveal>
        </div>

        <Timeline data={data} />
      </Container>
    </section>
  );
}
