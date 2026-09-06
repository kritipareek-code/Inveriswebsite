import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCircle } from "@/components/ui/IconCircle";
import { CmsImage } from "@/components/ui/CmsImage";
import { MagicCard } from "@/components/magic/magic-card";
import { BorderBeam } from "@/components/magic/border-beam";
import { GridPattern } from "@/components/magic/grid-pattern";
import { Reveal } from "@/components/magic/reveal";
import { HomeIcon, type HomeIconName } from "@/lib/home-icons";
import { type HomeServicesContent } from "@/lib/home-content";

const cardDirections = ["left", "up", "down", "right"] as const;

export function ServicesSection({ content }: { content: HomeServicesContent }) {
  return (
    <section className="relative overflow-hidden bg-surface-muted py-20 lg:py-28">
      <GridPattern className="opacity-40" fade={false} />
      <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-navy/10 blur-3xl" />

      <Container className="relative z-10">
        <Reveal direction="down">
          <SectionHeading
            tag={content.tag}
            title={content.title}
            align="center"
            className="mb-12 lg:mb-16"
          />
        </Reveal>

        {content.services.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.services.map((service, index) => {
              const cardDirection = cardDirections[index % cardDirections.length];
              const itemDirection = index % 2 === 0 ? "left" : "right";

              return (
                <Reveal
                  key={service.id}
                  direction={cardDirection}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <Link href={service.href || "/services"} className="block h-full">
                    <MagicCard className="flex h-full flex-col">
                      <BorderBeam size={70} duration={10} delay={index} />
                      <div className="relative h-36 overflow-hidden bg-navy/10">
                        {service.image ? (
                          <CmsImage
                            src={service.image}
                            alt={service.imageAlt || service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/35 to-navy/10" />
                      </div>

                      <div className="absolute left-1/2 top-36 z-20 -translate-x-1/2 -translate-y-1/2">
                        <IconCircle variant="navy" size="md" className="ring-4 ring-surface">
                          <HomeIcon name={service.icon as HomeIconName} size={24} className="text-gold" />
                        </IconCircle>
                      </div>

                      <div className="relative z-10 flex flex-1 flex-col overflow-hidden px-5 pb-6 pt-10">
                        <Reveal as="h3" direction={itemDirection} delay={0.12} duration={0.7} distance={28} className="mb-4 text-center font-bold text-navy">
                          {service.title}
                        </Reveal>
                        {service.items.length ? (
                          <ul className="mb-6 flex-1 space-y-2.5">
                            {service.items.map((item, itemIndex) => (
                              <Reveal
                                key={item}
                                as="li"
                                direction="left"
                                delay={0.2 + itemIndex * 0.08}
                                duration={0.55}
                                distance={24}
                                className="flex items-start gap-2.5 text-sm text-text-body"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                                {item}
                              </Reveal>
                            ))}
                          </ul>
                        ) : null}
                        {service.linkLabel ? (
                          <Reveal
                            as="span"
                            direction="up"
                            delay={0.52}
                            duration={0.6}
                            distance={20}
                            className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-gold"
                          >
                            {service.linkLabel}
                            <HomeIcon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                          </Reveal>
                        ) : null}
                      </div>
                    </MagicCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
