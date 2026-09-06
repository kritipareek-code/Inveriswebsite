import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MagicCard } from "@/components/magic/magic-card";
import { BorderBeam } from "@/components/magic/border-beam";
import { Reveal } from "@/components/magic/reveal";
import type { ContactOfficeContent } from "@/lib/contact-content";

export function OfficeSection({ content }: { content: ContactOfficeContent }) {
  const office = content;

  return (
    <section className="overflow-hidden bg-surface-muted py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-6">
            <div>
              <Reveal direction="down">
                <span className="mb-4 block h-px w-8 bg-gold" aria-hidden="true" />
              </Reveal>
              <Reveal direction="left" delay={0.08}>
                <h2 className="text-2xl font-bold text-heading md:text-4xl">{office.title}</h2>
              </Reveal>
              <Reveal direction="left" delay={0.16}>
                <p className="mt-2 text-paragraph">{office.subtitle}</p>
              </Reveal>
            </div>
            <Reveal direction="left" delay={0.22}>
              <MagicCard className="flex gap-4 overflow-hidden p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <Building2 size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <Reveal
                    as="p"
                    direction="left"
                    delay={0.08}
                    duration={0.6}
                    distance={20}
                    className="text-sm font-bold text-heading"
                  >
                    {office.company}
                  </Reveal>
                  <Reveal
                    as="p"
                    direction="left"
                    delay={0.16}
                    duration={0.65}
                    distance={20}
                    className="mt-1 text-sm leading-relaxed text-paragraph"
                  >
                    {office.address}
                  </Reveal>
                </div>
              </MagicCard>
            </Reveal>
            <Reveal direction="up" delay={0.3} className="w-fit">
              <Button
                variant="gold"
                href={office.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                Get Directions
                <ArrowRight size={18} />
              </Button>
            </Reveal>
          </div>

          <Reveal direction="right" delay={0.14} className="lg:col-span-2">
            <MagicCard className="relative h-80 overflow-hidden lg:h-96">
              <BorderBeam size={100} duration={12} />
              <iframe
                src={office.mapEmbedUrl}
                title="Inveris Solutions office location"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </MagicCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
