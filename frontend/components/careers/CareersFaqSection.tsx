"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagicCard } from "@/components/magic/magic-card";
import { Reveal } from "@/components/magic/reveal";
import type { CareersFaqContent } from "@/lib/careers-content";
import { cn } from "@/lib/cn";

export function CareersFaqSection({ content }: { content: CareersFaqContent }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="overflow-hidden bg-surface py-20 lg:py-28">
      <Container className="max-w-3xl">
        {content.tag ? (
          <Reveal direction="down">
            <div className="mb-5 flex justify-center">
              <SectionTag>{content.tag}</SectionTag>
            </div>
          </Reveal>
        ) : null}
        <Reveal direction="left" delay={0.08}>
          <h2 className="mb-10 text-center text-3xl font-bold text-heading md:text-5xl lg:mb-12">
            {content.title}
          </h2>
        </Reveal>

        <div className="space-y-3">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal
                key={item.id}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.06}
              >
                <MagicCard className="px-5">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-heading md:text-base">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-paragraph",
                        isOpen && "bg-navy text-white border-navy"
                      )}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="-mt-1 pb-5 text-sm leading-relaxed text-paragraph">
                      {item.answer}
                    </p>
                  ) : null}
                </MagicCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
