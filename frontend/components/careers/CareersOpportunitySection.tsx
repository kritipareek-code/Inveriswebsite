import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BorderBeam } from "@/components/magic/border-beam";
import { GridPattern } from "@/components/magic/grid-pattern";
import type { CareersOpportunityContent } from "@/lib/careers-content";

export function CareersOpportunitySection({
  content,
}: {
  content: CareersOpportunityContent;
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <GridPattern className="opacity-25" />
      <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gold/12 blur-3xl" />

      <Container className="relative z-10 py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:p-12">
          <BorderBeam size={110} duration={11} />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="block h-px w-10 bg-gold" aria-hidden="true" />
              <h2 className="text-2xl font-bold leading-tight text-heading-inverse md:text-4xl lg:text-5xl">
                {content.title}
              </h2>
              <p className="text-base leading-relaxed text-paragraph-inverse md:text-lg">
                {content.description}
              </p>
              <a
                href={`mailto:${content.email}`}
                className="inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-light"
              >
                <Mail size={16} strokeWidth={1.5} />
                {content.emailLabel} at {content.email}
              </a>
            </div>
            <Button variant="gold" size="lg" href={content.cta.href} className="shrink-0">
              {content.cta.label}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
