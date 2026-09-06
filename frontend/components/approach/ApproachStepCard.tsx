import { BarChart3, PenLine, Play, Search } from "lucide-react";
import { MagicCard } from "@/components/magic/magic-card";
import { BorderBeam } from "@/components/magic/border-beam";
import { Reveal, type RevealDirection } from "@/components/magic/reveal";
import { CmsImage } from "@/components/ui/CmsImage";
import { cn } from "@/lib/cn";

type StepIcon = "search" | "pen" | "play" | "chart";

interface ApproachStepCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  items: string[];
  className?: string;
  direction?: RevealDirection;
  delay?: number;
}

const iconMap: Record<StepIcon, typeof Search> = {
  search: Search,
  pen: PenLine,
  play: Play,
  chart: BarChart3,
};

export function ApproachStepCard({
  number,
  title,
  description,
  icon,
  image,
  items,
  className,
  direction = "up",
  delay = 0,
}: ApproachStepCardProps) {
  const Icon = iconMap[icon as StepIcon] ?? Search;

  return (
    <Reveal
      direction={direction}
      delay={delay}
      className={cn("relative flex h-full flex-col pt-7", className)}
    >
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
        <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-gold shadow-[0_10px_30px_rgba(196,164,132,0.4)]">
          {image ? (
            <CmsImage
              src={image}
              alt={title}
              width={56}
              height={56}
              className="size-full object-cover"
            />
          ) : (
            <Icon size={24} className="text-navy" strokeWidth={1.5} />
          )}
        </div>
      </div>

      <MagicCard
        className="flex h-full flex-col overflow-hidden border-white/10 bg-white/5 px-6 pb-6 pt-12 text-left backdrop-blur-xl"
        gradientColor="rgba(196,164,132,0.18)"
      >
        <BorderBeam size={70} duration={10} />

        <Reveal
          as="span"
          direction="down"
          delay={delay + 0.08}
          duration={0.55}
          distance={16}
          className="inline-flex items-center gap-3 text-sm font-bold leading-none text-gold"
        >
          {number}
          <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
        </Reveal>
        <Reveal
          as="h3"
          direction="left"
          delay={delay + 0.14}
          duration={0.7}
          distance={24}
          className="mt-2 text-lg font-bold leading-7 text-heading-inverse"
        >
          {title}
        </Reveal>
        <Reveal
          as="p"
          direction="left"
          delay={delay + 0.22}
          duration={0.7}
          distance={24}
          className="mt-3 text-sm leading-relaxed text-paragraph-inverse"
        >
          {description}
        </Reveal>
        <span className="mt-4 mb-4 block h-px w-8 shrink-0 bg-gold" aria-hidden="true" />
        <ul className="flex flex-col gap-2.5">
          {items.map((item, itemIndex) => (
            <Reveal
              key={item}
              as="li"
              direction="left"
              delay={delay + 0.3 + itemIndex * 0.08}
              duration={0.55}
              distance={20}
              className="grid grid-cols-[6px_1fr] items-start gap-x-2.5 text-sm leading-relaxed text-paragraph-inverse"
            >
              <span
                className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden="true"
              />
              <span>{item}</span>
            </Reveal>
          ))}
        </ul>
      </MagicCard>
    </Reveal>
  );
}
