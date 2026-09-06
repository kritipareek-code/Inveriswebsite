import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionTag } from "@/components/ui/SectionTag";
import { PAGE_HERO_HEIGHT, PAGE_HERO_PADDING } from "@/components/shared/page-hero-layout";
import { Spotlight } from "@/components/magic/spotlight";
import { GridPattern } from "@/components/magic/grid-pattern";
import type { LeadershipHeroContent } from "@/lib/leadership-content";
import { cn } from "@/lib/cn";

export function LeadershipHeroSection({
  content,
}: {
  content: LeadershipHeroContent;
}) {
  const hero = content;

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-y-0 right-0 hidden lg:block w-[78%]">
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
          <div className={cn("flex flex-1 items-center lg:max-w-[42%]", PAGE_HERO_PADDING)}>
            <div className="max-w-xl space-y-6">
              <SectionTag light>{hero.tag}</SectionTag>
              <h1 className="text-3xl md:text-5xl lg:text-[3.1rem] font-bold leading-[1.1]">
                <span className="text-heading-inverse">{hero.titleWhite}</span>
                <br />
                <span className="text-gold">{hero.titleAccent}</span>
              </h1>
              <div className="space-y-4">
                {hero.paragraphs.map((paragraph, index) => (
                  <p
                    key={`hero-p-${index}`}
                    className="text-base md:text-lg text-paragraph-inverse leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
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
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-navy via-navy/30 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
