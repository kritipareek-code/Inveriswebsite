import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { MissionVisionCard } from "@/components/about/MissionVisionCard";
import { GridPattern } from "@/components/magic/grid-pattern";
import { Spotlight } from "@/components/magic/spotlight";
import { Reveal } from "@/components/magic/reveal";
import type { AboutMissionVisionContent } from "@/lib/about-content";

export function MissionVisionSection({
  content,
}: {
  content: AboutMissionVisionContent;
}) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {content.backgroundImage ? (
        <CmsImage
          src={content.backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-navy" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-navy/88" aria-hidden="true" />
      <GridPattern className="opacity-40" />
      <Spotlight className="-top-24 left-1/4" fill="#c4a484" />

      <Container className="relative z-10">
        <div className="mb-12 max-w-2xl space-y-4 lg:mb-16">
          <Reveal direction="down">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              {content.tag}
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.08}>
            <h2 className="text-3xl font-medium leading-tight text-heading-inverse md:text-5xl">
              {content.title}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <MissionVisionCard
            tag={content.mission.tag}
            title={content.mission.title}
            icon={content.mission.icon}
            items={content.mission.items}
            footer={content.mission.footer}
            index={1}
            className="h-full"
          />
          <MissionVisionCard
            tag={content.vision.tag}
            title={content.vision.title}
            icon={content.vision.icon}
            items={content.vision.items}
            footer={content.vision.footer}
            index={2}
            className="h-full"
          />
        </div>
      </Container>
    </section>
  );
}
