import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { ApproachStepCard } from "@/components/approach/ApproachStepCard";
import { Spotlight } from "@/components/magic/spotlight";
import { GridPattern } from "@/components/magic/grid-pattern";
import type { ApproachFourStepsContent } from "@/lib/approach-content";

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
        <div className="text-center space-y-4 mb-14 lg:mb-16 max-w-3xl mx-auto">
          <SectionTag light className="justify-center">
            {fourSteps.tag}
          </SectionTag>
          <h2 className="text-3xl md:text-5xl font-bold text-heading-inverse leading-[1.12]">
            {fourSteps.title}
          </h2>
          <p className="text-base md:text-lg text-paragraph-inverse leading-relaxed">
            {fourSteps.subtitle}
          </p>
        </div>
        <div className="relative grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {fourSteps.steps.map((step) => (
            <ApproachStepCard
              key={step.id}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              items={step.items}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
