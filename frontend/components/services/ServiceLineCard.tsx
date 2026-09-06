"use client";

import { Check, Crown, Shield, ShieldCheck, Users } from "lucide-react";
import { IconCircle } from "@/components/ui/IconCircle";
import { CmsImage } from "@/components/ui/CmsImage";
import { MagicCard } from "@/components/magic/magic-card";
import { BorderBeam } from "@/components/magic/border-beam";
import { Reveal, type RevealDirection } from "@/components/magic/reveal";

type ServiceIcon = "consulting" | "recruitment" | "compliance" | "audit";

interface ServiceLineCardProps {
  title: string;
  description: string;
  items: string[];
  image: string;
  icon: string;
  onEnquire: (service: string) => void;
  imageFrom?: RevealDirection;
}

const iconMap = {
  consulting: Crown,
  recruitment: Users,
  compliance: ShieldCheck,
  audit: Shield,
};

export function ServiceLineCard({
  title,
  description,
  items,
  image,
  icon,
  onEnquire,
  imageFrom = "left",
}: ServiceLineCardProps) {
  const Icon = iconMap[icon as ServiceIcon] ?? Crown;

  return (
    <MagicCard className="overflow-hidden">
      <BorderBeam size={90} duration={12} />
      <div
        role="button"
        tabIndex={0}
        onClick={() => onEnquire(title)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onEnquire(title);
          }
        }}
        className="grid w-full cursor-pointer grid-cols-1 text-left lg:grid-cols-[minmax(280px,38%)_1fr]"
      >
        <div className="relative h-56 sm:h-64 lg:h-auto lg:min-h-[280px]">
          <CmsImage
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 38vw"
          />
        </div>
        <div className="relative flex flex-col overflow-hidden p-6 lg:p-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-700 ease-out group-hover:scale-x-100"
          />
          <div className="relative z-[1] flex flex-col">
            <div className="flex items-center gap-4">
              <IconCircle
                variant="navy"
                size="md"
                className="transition-colors duration-500 group-hover:bg-gold group-hover:text-navy"
              >
                <Icon size={22} strokeWidth={1.5} />
              </IconCircle>
              <div>
                <Reveal
                  as="h3"
                  direction={imageFrom}
                  delay={0.12}
                  duration={0.7}
                  distance={28}
                  className="text-xl font-bold text-heading transition-colors duration-500 group-hover:text-white md:text-2xl"
                >
                  {title}
                </Reveal>
                <Reveal
                  as="p"
                  direction="left"
                  delay={0.2}
                  duration={0.55}
                  distance={20}
                  className="mt-2 text-xs font-semibold tracking-wide text-gold"
                >
                  Click to enquire
                </Reveal>
              </div>
            </div>
            <Reveal
              as="p"
              direction="left"
              delay={0.26}
              duration={0.7}
              distance={28}
              className="mt-5 text-sm leading-relaxed text-paragraph transition-colors duration-500 group-hover:text-white/80 md:text-base"
            >
              {description}
            </Reveal>
            <ul className="mt-6 space-y-3">
              {items.map((item, itemIndex) => (
                <Reveal
                  key={item}
                  as="li"
                  direction="left"
                  delay={0.34 + itemIndex * 0.08}
                  duration={0.55}
                  distance={24}
                  className="flex gap-2.5 text-sm text-paragraph transition-colors duration-500 group-hover:text-white/85 md:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-gold">
                    <Check size={10} className="text-gold" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MagicCard>
  );
}
