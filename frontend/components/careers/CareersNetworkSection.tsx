import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagicCard } from "@/components/magic/magic-card";
import { BorderBeam } from "@/components/magic/border-beam";
import { Reveal } from "@/components/magic/reveal";
import { CareersApplicationForm } from "@/components/careers/CareersApplicationForm";
import type { CareersNetworkContent, CareersNextContent } from "@/lib/careers-content";

export function CareersNetworkSection({
  network,
  next,
}: {
  network: CareersNetworkContent;
  next: CareersNextContent;
}) {
  return (
    <section id="talent-network" className="scroll-mt-28 overflow-hidden bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-10 lg:col-span-5 lg:sticky lg:top-32">
            <div className="space-y-5">
              <Reveal direction="down">
                <SectionTag>{network.tag}</SectionTag>
              </Reveal>
              <Reveal direction="left" delay={0.08}>
                <h2 className="text-3xl font-bold leading-[1.12] text-heading md:text-5xl">
                  {network.title}
                </h2>
              </Reveal>
              <Reveal direction="left" delay={0.18}>
                <p className="text-base leading-relaxed text-paragraph md:text-lg">
                  {network.description}
                </p>
              </Reveal>
            </div>

            <div className="space-y-5">
              <Reveal direction="down" delay={0.08}>
                <span className="block h-px w-8 bg-gold" aria-hidden="true" />
              </Reveal>
              <Reveal direction="left" delay={0.14}>
                <h3 className="text-xl font-bold text-heading md:text-2xl">{next.title}</h3>
              </Reveal>
              <Reveal direction="left" delay={0.22}>
                <p className="text-sm leading-relaxed text-paragraph">{next.description}</p>
              </Reveal>
              <ol className="space-y-4">
                {next.steps.map((step, index) => (
                  <Reveal
                    key={step.id}
                    as="li"
                    direction="left"
                    delay={0.28 + index * 0.08}
                    duration={0.65}
                    distance={24}
                    className="flex gap-4"
                  >
                    <span className="font-display text-sm text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-heading">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-paragraph">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>

          <Reveal direction="right" delay={0.12} className="lg:col-span-7">
            <MagicCard className="p-6 lg:p-8">
              <BorderBeam size={90} duration={12} />
              <div className="mb-6">
                <Reveal direction="down">
                  <span className="mb-4 block h-px w-8 bg-gold" aria-hidden="true" />
                </Reveal>
                <Reveal direction="left" delay={0.1}>
                  <h3 className="text-2xl font-bold text-heading md:text-3xl">{network.formTitle}</h3>
                </Reveal>
              </div>
              <CareersApplicationForm network={network} />
            </MagicCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
