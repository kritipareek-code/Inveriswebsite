import { Container } from "@/components/ui/Container";
import { Spotlight } from "@/components/magic/spotlight";
import { GridPattern } from "@/components/magic/grid-pattern";
import { BlurFade } from "@/components/magic/blur-fade";
import { LeadershipValueCard } from "@/components/leadership/LeadershipValueCard";
import type { LeadershipValuesContent } from "@/lib/leadership-content";
import { resolveMediaUrl } from "@/lib/home-content";

export function CoreValuesSection({
  content,
}: {
  content: LeadershipValuesContent;
}) {
  const values = content;
  const background = resolveMediaUrl(values.backgroundImage);

  return (
    <section id="values" className="relative overflow-hidden py-20 lg:py-28">
      {background ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background})` }}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-navy" />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-navy/78" />
      <GridPattern className="opacity-30" />
      <Spotlight className="-top-24 left-1/3" fill="#c4a484" />

      <Container className="relative z-10">
        <BlurFade className="mb-12 space-y-3 text-center lg:mb-16">
          {values.tag ? (
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              {values.tag}
            </p>
          ) : null}
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {values.title}
          </h2>
        </BlurFade>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {values.items.map((item, index) => (
            <BlurFade key={item.id} delay={index * 0.07}>
              <LeadershipValueCard item={item} index={index} />
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  );
}
