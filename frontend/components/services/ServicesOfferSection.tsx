"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { ServiceLineCard } from "@/components/services/ServiceLineCard";
import { ServiceEnquiryModal } from "@/components/services/ServiceEnquiryModal";
import { Reveal } from "@/components/magic/reveal";
import type { ServicesOfferContent } from "@/lib/services-content";

const cardDirections = ["left", "right", "left", "right"] as const;

export function ServicesOfferSection({ content }: { content: ServicesOfferContent }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section className="overflow-hidden bg-surface py-20 lg:py-28">
      <Container>
        <div className="mb-12 grid grid-cols-1 items-start gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <Reveal direction="down">
              <SectionTag>{content.tag}</SectionTag>
            </Reveal>
            <Reveal direction="left" delay={0.08}>
              <h2 className="text-3xl md:text-5xl font-bold text-heading leading-[1.12]">
                {content.title}
              </h2>
            </Reveal>
          </div>
          <Reveal direction="right" delay={0.12}>
            <p className="text-paragraph leading-relaxed lg:pt-8">{content.description}</p>
          </Reveal>
        </div>

        <div className="space-y-6">
          {content.serviceLines.map((service, index) => (
            <Reveal
              key={service.id}
              direction={cardDirections[index % cardDirections.length]}
              delay={index * 0.08}
            >
              <ServiceLineCard
                title={service.title}
                description={service.description}
                items={service.items}
                image={service.image}
                icon={service.icon}
                onEnquire={setSelectedService}
                imageFrom={index % 2 === 0 ? "left" : "right"}
              />
            </Reveal>
          ))}
        </div>
      </Container>
      <ServiceEnquiryModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
