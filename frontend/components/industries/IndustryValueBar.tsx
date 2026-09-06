import { Container } from "@/components/ui/Container";
import { BlurFade } from "@/components/magic/blur-fade";
import { GridPattern } from "@/components/magic/grid-pattern";
import {
  IndustryValueCard,
  type IndustryValueCardVariant,
} from "@/components/industries/IndustryValueCard";
import { cn } from "@/lib/cn";
import type { IndustriesValueBarContent } from "@/lib/industries-content";

function getValueCardVariant(
  index: number,
  count: number
): IndustryValueCardVariant {
  if (count === 5) {
    if (index === 0) return "featured";
    if (index === count - 1) return "wide";
    return "default";
  }
  return index === 0 ? "featured" : "default";
}

function getValueCardSpan(index: number, count: number) {
  if (count !== 5) return "h-full";
  const spans = [
    "sm:col-span-2 lg:col-span-7 lg:row-span-2",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
  ];
  return cn("h-full", spans[index]);
}

export function IndustryValueBar({
  content,
}: {
  content: IndustriesValueBarContent;
}) {
  const { items } = content;
  const title = content.title || "Why Partner With Inveris?";
  const isBento = items.length === 5;

  return (
    <section className="relative overflow-hidden bg-surface-muted py-20 lg:py-28">
      <GridPattern className="opacity-50" />
      <Container className="relative">
        <div className="mb-12 text-center lg:mb-16">
          <span
            className="mx-auto mb-5 block h-px w-12 bg-gold"
            aria-hidden="true"
          />
          <h2 className="text-3xl font-bold tracking-tight text-heading md:text-4xl">
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2",
            isBento
              ? "lg:grid-cols-12 lg:auto-rows-[minmax(13.5rem,auto)] lg:gap-5"
              : "lg:grid-cols-3 lg:gap-5"
          )}
        >
          {items.map((item, index) => (
            <BlurFade
              key={item.id}
              delay={index * 0.07}
              className={getValueCardSpan(index, items.length)}
            >
              <IndustryValueCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                index={index}
                variant={getValueCardVariant(index, items.length)}
              />
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  );
}
