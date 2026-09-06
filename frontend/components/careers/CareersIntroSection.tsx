import { Container } from "@/components/ui/Container";
import { BlurFade } from "@/components/magic/blur-fade";
import type { CareersIntroContent } from "@/lib/careers-content";

export function CareersIntroSection({ content }: { content: CareersIntroContent }) {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <BlurFade className="mx-auto max-w-3xl text-center">
          <span className="mx-auto mb-8 block h-px w-12 bg-gold" aria-hidden="true" />
          <p className="font-display text-2xl leading-snug text-heading md:text-3xl lg:text-[2.15rem] lg:leading-[1.35]">
            {content.statement}
          </p>
        </BlurFade>
      </Container>
    </section>
  );
}
