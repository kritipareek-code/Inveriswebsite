import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/magic/reveal";
import { LetterGenerate } from "@/components/magic/letter-generate";
import type { CareersIntroContent } from "@/lib/careers-content";

export function CareersIntroSection({ content }: { content: CareersIntroContent }) {
  return (
    <section className="overflow-hidden bg-surface py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal direction="down">
            <span className="mx-auto mb-8 block h-px w-12 bg-gold" aria-hidden="true" />
          </Reveal>
          <p className="font-display text-2xl leading-snug text-heading md:text-3xl lg:text-[2.15rem] lg:leading-[1.35]">
            <LetterGenerate text={content.statement} delay={0.12} />
          </p>
        </div>
      </Container>
    </section>
  );
}
