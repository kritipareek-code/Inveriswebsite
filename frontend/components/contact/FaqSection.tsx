"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagicCard } from "@/components/magic/magic-card";
import { Reveal } from "@/components/magic/reveal";
import type { ContactFaqItem } from "@/lib/contact-content";
import { cn } from "@/lib/cn";

const defaultAvatars = [
  "https://i.pravatar.cc/120?img=12",
  "https://i.pravatar.cc/120?img=25",
  "https://i.pravatar.cc/120?img=47",
];

type FaqSectionContent = {
  tag?: string;
  title: string;
  items: ContactFaqItem[];
  stillHaveQuestions?: string;
  ctaLabel?: string;
  avatars?: string[];
};

export function FaqSection({
  content,
  ctaHref = "#contact-form",
  onCtaClick,
  showBottomCta = true,
}: {
  content: FaqSectionContent;
  ctaHref?: string;
  onCtaClick?: () => void;
  showBottomCta?: boolean;
}) {
  const faq = content;
  const [openIndex, setOpenIndex] = useState(0);
  const cmsAvatars = (faq.avatars ?? []).filter(Boolean);
  const avatars = cmsAvatars.length >= 3 ? cmsAvatars.slice(0, 3) : defaultAvatars;

  return (
    <section className="overflow-hidden bg-surface py-20 lg:py-28">
      <Container className="max-w-3xl">
        {faq.tag ? (
          <Reveal direction="down">
            <div className="mb-5 flex justify-center">
              <SectionTag>{faq.tag}</SectionTag>
            </div>
          </Reveal>
        ) : null}
        <Reveal direction="left" delay={0.08}>
          <h2 className="mb-10 text-center text-3xl font-bold text-heading md:text-5xl lg:mb-12">
            {faq.title}
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faq.items.map((item, index) => {
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

        {showBottomCta ? (
          <div className="mt-12 space-y-5 text-center">
            <Reveal direction="down" delay={0.08}>
              <div className="flex justify-center -space-x-3">
                {avatars.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm"
                  >
                    <CmsImage
                      src={src}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="48px"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.16}>
              <p className="font-bold text-heading">{faq.stillHaveQuestions}</p>
            </Reveal>
            <Reveal direction="up" delay={0.24} className="flex justify-center">
              <Button
                variant="gold"
                href={onCtaClick ? undefined : ctaHref}
                onClick={onCtaClick}
                className="inline-flex"
              >
                {faq.ctaLabel || "Get in Touch"}
              </Button>
            </Reveal>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
