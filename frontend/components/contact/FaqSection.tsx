"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagicCard } from "@/components/magic/magic-card";
import type { ContactFaqContent } from "@/lib/contact-content";
import { cn } from "@/lib/cn";

const defaultAvatars = [
  "https://i.pravatar.cc/120?img=12",
  "https://i.pravatar.cc/120?img=25",
  "https://i.pravatar.cc/120?img=47",
];

export function FaqSection({
  content,
  ctaHref = "#contact-form",
}: {
  content: ContactFaqContent;
  ctaHref?: string;
}) {
  const faq = content;
  const [openIndex, setOpenIndex] = useState(0);
  const avatars =
    faq.avatars?.filter(Boolean).length >= 3
      ? faq.avatars.slice(0, 3)
      : defaultAvatars;

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container className="max-w-3xl">
        {faq.tag ? (
          <div className="mb-5 flex justify-center">
            <SectionTag>{faq.tag}</SectionTag>
          </div>
        ) : null}
        <h2 className="mb-10 text-center text-3xl font-bold text-heading md:text-5xl lg:mb-12">
          {faq.title}
        </h2>

        <div className="space-y-3">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <MagicCard key={item.id} className="px-5">
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
            );
          })}
        </div>

        <div className="mt-12 space-y-5 text-center">
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
          <p className="font-bold text-heading">{faq.stillHaveQuestions}</p>
          <Button variant="gold" href={ctaHref} className="inline-flex">
            {faq.ctaLabel || "Get in Touch"}
          </Button>
        </div>
      </Container>
    </section>
  );
}
