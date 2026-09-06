import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { CmsImage } from "@/components/ui/CmsImage";
import { MagicCard } from "@/components/magic/magic-card";
import { BorderBeam } from "@/components/magic/border-beam";
import { Reveal } from "@/components/magic/reveal";
import type { AboutWhoWeAreContent } from "@/lib/about-content";

export function WhoWeAreSection({ content }: { content: AboutWhoWeAreContent }) {
  return (
    <section className="overflow-hidden bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <Reveal direction="down">
              <SectionTag>{content.tag}</SectionTag>
            </Reveal>
            <Reveal direction="left" delay={0.08}>
              <h2 className="text-3xl md:text-5xl font-bold text-heading leading-[1.12]">
                {content.title}
              </h2>
            </Reveal>
            <div className="space-y-4 text-paragraph leading-relaxed">
              {content.paragraphs.map((paragraph, index) => {
                const isLast = index === content.paragraphs.length - 1;
                if (isLast && content.highlightPhrase) {
                  const parts = paragraph.split(content.highlightPhrase);
                  return (
                    <Reveal
                      key={`${index}-${paragraph.slice(0, 24)}`}
                      as="p"
                      direction="left"
                      delay={0.18 + index * 0.1}
                      duration={0.85}
                    >
                      <strong className="font-semibold text-heading">
                        {content.highlightPhrase}
                      </strong>
                      {parts[1]}
                    </Reveal>
                  );
                }
                return (
                  <Reveal
                    key={`${index}-${paragraph.slice(0, 24)}`}
                    as="p"
                    direction="left"
                    delay={0.18 + index * 0.1}
                    duration={0.85}
                  >
                    {paragraph}
                  </Reveal>
                );
              })}
            </div>
            <Reveal direction="up" delay={0.42} className="w-fit">
              <Button variant="primary" href={content.cta.href}>
                {content.cta.label}
                <ArrowRight size={18} />
              </Button>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal direction="right" delay={0.12}>
              <div className="relative h-[420px] lg:h-[480px] rounded-[2rem] overflow-hidden">
                <CmsImage
                  src={content.image}
                  alt={content.imageAlt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal
              direction="up"
              delay={0.28}
              className="absolute bottom-6 right-0 lg:-right-6 max-w-[22rem]"
            >
              <MagicCard className="overflow-hidden p-6 lg:p-7 bg-white/90 backdrop-blur-xl">
                <BorderBeam size={70} duration={10} />
                <div className="mb-4 flex items-start gap-3">
                  <Users size={28} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" />
                  <Reveal as="h3" direction="left" delay={0.36} duration={0.7} distance={28} className="text-xl font-bold leading-snug text-heading">
                    {content.card.title.split(". ").map((line, index, lines) => (
                      <span key={line} className="block">
                        {index < lines.length - 1 ? `${line}.` : line}
                      </span>
                    ))}
                  </Reveal>
                </div>
                <Reveal as="p" direction="left" delay={0.46} duration={0.7} distance={24} className="text-sm leading-relaxed text-paragraph">
                  {content.card.description}
                </Reveal>
              </MagicCard>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
