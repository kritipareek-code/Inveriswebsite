import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCircle } from "@/components/ui/IconCircle";
import { Spotlight } from "@/components/magic/spotlight";
import { GridPattern } from "@/components/magic/grid-pattern";
import { Reveal } from "@/components/magic/reveal";
import { HomeMediaIcon, type HomeIconName } from "@/lib/home-icons";
import { type HomeApproachContent } from "@/lib/home-content";

const stepDirections = ["left", "up", "down", "right"] as const;

export function ApproachSection({ content }: { content: HomeApproachContent }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <GridPattern />
      <Spotlight className="-top-32 left-1/4" fill="#c4a484" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

      <Container className="relative">
        <Reveal direction="down">
          <SectionHeading
            tag={content.tag}
            title={content.title}
            align="center"
            light
            className="mb-16"
          />
        </Reveal>

        {content.steps.length ? (
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-gold/35" />

            {content.steps.map((step, index) => (
              <Reveal
                key={step.id}
                direction={stepDirections[index % stepDirections.length]}
                delay={index * 0.1}
                className="text-center space-y-4 relative"
              >
                <div className="flex justify-center">
                  <IconCircle variant="gold" size="lg" className="overflow-hidden">
                    <HomeMediaIcon
                      name={step.icon as HomeIconName}
                      image={step.image}
                      alt={step.title}
                      size={24}
                      className={step.image ? "size-full object-cover" : "text-navy"}
                    />
                  </IconCircle>
                </div>
                <div>
                  {step.number ? (
                    <span className="text-gold text-sm font-bold">{step.number}.</span>
                  ) : null}
                  <h3 className="text-white font-bold text-lg mt-1">{step.title}</h3>
                </div>
                {step.description ? (
                  <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                ) : null}
              </Reveal>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
