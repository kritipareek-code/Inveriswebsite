import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { PAGE_HERO_HEIGHT, PAGE_HERO_PADDING } from "@/components/shared/PageHero";
import { Spotlight } from "@/components/magic/spotlight";
import { GridPattern } from "@/components/magic/grid-pattern";
import type { CareersHeroContent } from "@/lib/careers-content";
import { cn } from "@/lib/cn";

export function CareersHeroSection({ content }: { content: CareersHeroContent }) {
  const hero = content;

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-y-0 right-0 hidden w-[78%] lg:block">
        <CmsImage
          src={hero.image}
          alt={hero.imageAlt || hero.titleWhite}
          fill
          priority
          className="object-cover object-center"
          sizes="78vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-navy from-[0%] via-navy/80 via-[22%] to-navy/20 to-[70%]"
        />
      </div>
      <GridPattern className="opacity-25" />
      <Spotlight className="-top-40 left-10" fill="#c4a484" />

      <Container className="relative z-10">
        <div className={cn("flex flex-col lg:block", PAGE_HERO_HEIGHT)}>
          <div className={cn("flex flex-1 items-center lg:max-w-[48%]", PAGE_HERO_PADDING)}>
            <div className="max-w-xl space-y-6">
              <SectionTag light>{hero.tag}</SectionTag>
              <h1 className="text-3xl font-bold leading-[1.1] md:text-5xl lg:text-[3.1rem]">
                <span className="text-heading-inverse">{hero.titleWhite}</span>
                <br />
                <span className="text-gold">{hero.titleAccent}</span>
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-paragraph-inverse md:text-lg">
                {hero.description}
              </p>
              <Button variant="gold" href={hero.cta.href}>
                {hero.cta.label}
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
          <div className="relative h-72 min-h-[300px] lg:hidden">
            <CmsImage
              src={hero.image}
              alt={hero.imageAlt || hero.titleWhite}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-b from-navy via-navy/30 to-transparent"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
