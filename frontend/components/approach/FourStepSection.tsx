import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { ApproachStepCard } from "@/components/approach/ApproachStepCard";
import { Spotlight } from "@/components/magic/spotlight";
import { GridPattern } from "@/components/magic/grid-pattern";
import { Reveal } from "@/components/magic/reveal";
import type { ApproachFourStepsContent } from "@/lib/approach-content";

const cardDirections = ["left", "up", "down", "right"] as const;

export function FourStepSection({
  content,
}: {
  content: ApproachFourStepsContent;
}) {
  const fourSteps = content;

  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <GridPattern />
      <Spotlight className="-top-24 left-1/3" fill="#c4a484" />
      <Container className="relative">
        <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center lg:mb-16">
          <Reveal direction="down">
            <SectionTag light className="justify-center">
              {fourSteps.tag}
            </SectionTag>
          </Reveal>
          <Reveal direction="left" delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-bold text-heading-inverse leading-[1.12]">
              {fourSteps.title}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.18}>
            <p className="text-base md:text-lg text-paragraph-inverse leading-relaxed">
              {fourSteps.subtitle}
            </p>
          </Reveal>
        </div>
        <div className="relative grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {fourSteps.steps.map((step, index) => (
            <ApproachStepCard
              key={step.id}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              items={step.items}
              direction={cardDirections[index % cardDirections.length]}
              delay={index * 0.08}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
