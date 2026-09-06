import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionTag } from "@/components/ui/SectionTag";
import { PAGE_HERO_HEIGHT, PAGE_HERO_PADDING } from "@/components/shared/PageHero";
import { GridPattern } from "@/components/magic/grid-pattern";
import { ApproachPathGraphic } from "@/components/approach/ApproachPathGraphic";
import { cn } from "@/lib/cn";
import type { ApproachHeroContent } from "@/lib/approach-content";

export function ApproachHeroSection({ content }: { content: ApproachHeroContent }) {
  const hero = content;

  return (
    <section className="relative overflow-hidden bg-surface-alt">
      <GridPattern className="opacity-40" />
      <div className={cn("grid grid-cols-1 lg:grid-cols-2", PAGE_HERO_HEIGHT)}>
        <Container className={cn("flex items-center lg:pr-12 relative z-10", PAGE_HERO_PADDING)}>
          <div className="max-w-xl space-y-5">
            <SectionTag>{hero.tag}</SectionTag>
            <h1 className="text-3xl md:text-5xl lg:text-[3.1rem] font-bold text-heading leading-[1.1]">
              {hero.title}
            </h1>
            <p className="text-base md:text-lg text-paragraph leading-relaxed">
              {hero.description}
            </p>
          </div>
        </Container>

        <div className="relative h-88 min-h-80 sm:h-96 lg:h-auto">
          <CmsImage
            src={hero.image}
            alt={hero.imageAlt || hero.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-surface-alt via-surface-alt/30 to-transparent" />
          <ApproachPathGraphic steps={hero.pathSteps} />
        </div>
      </div>
    </section>
  );
}
