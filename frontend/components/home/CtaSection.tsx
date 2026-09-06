import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { BorderBeam } from "@/components/magic/border-beam";
import { Meteors } from "@/components/magic/meteors";
import { Reveal } from "@/components/magic/reveal";
import { HomeIcon } from "@/lib/home-icons";
import { type HomeCtaContent } from "@/lib/home-content";

export function CtaSection({ content }: { content: HomeCtaContent }) {
  return (
    <section className="py-16 lg:py-24 bg-surface">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-navy p-8 lg:p-12">
          <BorderBeam size={120} duration={12} />
          <Meteors number={10} />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-6">
              {content.title ? (
                <Reveal direction="left">
                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {content.title}
                  </h2>
                </Reveal>
              ) : null}
              {content.description ? (
                <Reveal direction="left" delay={0.12}>
                  <p className="text-paragraph-inverse text-lg leading-relaxed">
                    {content.description}
                  </p>
                </Reveal>
              ) : null}
              {content.cta?.label ? (
                <Reveal direction="up" delay={0.26} className="w-fit">
                  <Button variant="gold" href="/contact">
                    {content.cta.label}
                    <HomeIcon name="arrowRight" size={18} />
                  </Button>
                </Reveal>
              ) : null}
            </div>

            {content.image ? (
              <Reveal direction="right" delay={0.1}>
                <div className="relative h-64 lg:h-80 overflow-hidden rounded-3xl">
                  <CmsImage
                    src={content.image}
                    alt={content.imageAlt || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
