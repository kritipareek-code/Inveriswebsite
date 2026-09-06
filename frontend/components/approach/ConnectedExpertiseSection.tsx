import { Container } from "@/components/ui/Container";
import { ExpertiseDiagram } from "@/components/approach/ExpertiseDiagram";
import { MagicCard } from "@/components/magic/magic-card";
import type { ApproachConnectedExpertiseContent } from "@/lib/approach-content";

export function ConnectedExpertiseSection({
  content,
}: {
  content: ApproachConnectedExpertiseContent;
}) {
  const connectedExpertise = content;

  return (
    <section className="relative overflow-hidden bg-surface-alt py-20 lg:py-28">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl space-y-7">
            <span className="block h-px w-10 bg-gold" aria-hidden="true" />
            <h2 className="text-3xl font-medium leading-[1.15] md:text-5xl">
              <span className="text-heading">{connectedExpertise.title}</span>
              <br />
              <span className="text-gold">{connectedExpertise.titleAccent}</span>
            </h2>
            <p className="text-base leading-relaxed text-paragraph md:text-lg">
              {connectedExpertise.description}
            </p>
            <MagicCard className="p-6 md:p-7">
              <div className="flex gap-4">
                <span
                  className="font-display text-4xl leading-none text-gold"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="font-display pt-1 text-lg font-medium leading-snug text-heading md:text-xl">
                  {connectedExpertise.quote}
                </p>
              </div>
            </MagicCard>
          </div>
          <ExpertiseDiagram nodes={connectedExpertise.nodes} />
        </div>
      </Container>
    </section>
  );
}
