import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { IconCircle } from "@/components/ui/IconCircle";
import { CmsImage } from "@/components/ui/CmsImage";
import { MagicCard } from "@/components/magic/magic-card";
import { Reveal } from "@/components/magic/reveal";
import { HomeIcon, type HomeIconName } from "@/lib/home-icons";
import { resolveMediaUrl, type HomeAboutContent } from "@/lib/home-content";

export function AboutSection({ content }: { content: HomeAboutContent }) {
  const background = resolveMediaUrl(content.backgroundImage);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {background ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background})` }}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-surface-muted" />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-surface/92" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6">
          <div className="rounded-3xl border border-border/70 bg-white/75 p-8 lg:p-10 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="space-y-4">
                {content.tag ? (
                  <Reveal direction="down">
                    <SectionTag>{content.tag}</SectionTag>
                  </Reveal>
                ) : null}
                {content.title ? (
                  <Reveal direction="left" delay={0.08}>
                    <h2 className="text-3xl md:text-5xl font-bold leading-[1.12] text-heading">
                      {content.title}
                    </h2>
                  </Reveal>
                ) : null}
              </div>
              {content.description ? (
                <Reveal direction="left" delay={0.18}>
                  <p className="text-text-body leading-relaxed text-lg">{content.description}</p>
                </Reveal>
              ) : null}
              {content.cta?.label ? (
                <Reveal direction="up" delay={0.3} className="w-fit">
                  <Button variant="primary" href="/about">
                    {content.cta.label}
                  </Button>
                </Reveal>
              ) : null}
            </div>
          </div>

          {content.features.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.features.map((feature, index) => (
                <Reveal
                  key={feature.id}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={0.1 * index}
                  className="h-full"
                >
                  <MagicCard className="h-full">
                    <div className="relative h-36 overflow-hidden bg-navy/10">
                      {feature.image ? (
                        <CmsImage
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-navy/25" />
                      <div className="absolute top-3 left-3">
                        <IconCircle variant="white" size="sm">
                          <HomeIcon name={feature.icon as HomeIconName} size={18} className="text-gold" />
                        </IconCircle>
                      </div>
                    </div>
                    <div className="space-y-2 p-5">
                      <h3 className="text-sm font-bold text-navy">{feature.title}</h3>
                      <p className="text-xs leading-relaxed text-text-body">{feature.description}</p>
                    </div>
                  </MagicCard>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
