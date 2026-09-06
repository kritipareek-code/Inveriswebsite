"use client";

import { Check, Diamond, TrendingUp } from "lucide-react";
import { GoGoal } from "react-icons/go";
import { PiEyeLight } from "react-icons/pi";
import { SectionTag } from "@/components/ui/SectionTag";
import { CardSpotlight } from "@/components/magic/card-spotlight";
import { Card3D } from "@/components/magic/card-3d";
import { ShineBorder } from "@/components/magic/shine-border";
import { BorderBeam } from "@/components/magic/border-beam";
import { cn } from "@/lib/cn";

type CardIcon = "target" | "eye";

interface MissionVisionCardProps {
  tag: string;
  title: string;
  icon: string;
  items: string[];
  footer:
    | { icon: string; prefix: string; highlight: string }
    | { icon: string; text: string };
  index?: number;
  className?: string;
}

const cardIconMap = {
  target: GoGoal,
  eye: PiEyeLight,
};

const footerIconMap = {
  diamond: Diamond,
  chart: TrendingUp,
};

export function MissionVisionCard({
  tag,
  title,
  icon,
  items,
  footer,
  index = 1,
  className,
}: MissionVisionCardProps) {
  const CardIcon = cardIconMap[icon as CardIcon] ?? cardIconMap.target;
  const FooterIcon = footerIconMap[footer.icon as keyof typeof footerIconMap] ?? footerIconMap.diamond;
  const number = String(index).padStart(2, "0");

  return (
    <Card3D className={className}>
      <CardSpotlight
        className={cn(
          "flex h-full flex-col p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(196,164,132,0.18),0_0_72px_rgba(196,164,132,0.12)] lg:p-9",
          "transition-shadow duration-500 hover:shadow-[0_32px_90px_rgba(0,0,0,0.5),0_0_0_1px_rgba(196,164,132,0.35),0_0_90px_rgba(196,164,132,0.22)]"
        )}
      >
        <ShineBorder duration={10 + index * 2} borderWidth={1.5} />
        <BorderBeam size={110} duration={11} delay={index * 2} />

        <CardIcon
          size={180}
          className="pointer-events-none absolute -right-6 -bottom-8 text-gold/[0.06]"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col [transform:translateZ(32px)]">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/35 bg-gold/15 text-gold shadow-[0_0_28px_rgba(196,164,132,0.35)]">
              <span className="absolute inset-0 animate-pulse rounded-2xl bg-gold/10" aria-hidden="true" />
              <CardIcon size={30} className="relative" />
            </div>
            <span className="font-display text-5xl leading-none text-white/[0.08]" aria-hidden="true">
              {number}
            </span>
          </div>

          <SectionTag light className="mb-4 w-fit">
            {tag}
          </SectionTag>

          <h3 className="mb-6 text-2xl font-medium leading-snug text-heading-inverse md:text-[1.7rem]">
            {title}
          </h3>

          <span className="mb-6 block h-px w-14 bg-gradient-to-r from-gold to-transparent" aria-hidden="true" />

          <ul className="mb-8 flex-1 space-y-4">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-paragraph-inverse">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/15">
                  <Check size={11} className="text-gold" strokeWidth={3} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/12 to-white/5 p-4">
            <FooterIcon size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
            {"prefix" in footer ? (
              <p className="text-sm leading-relaxed text-heading-inverse">
                {footer.prefix}{" "}
                <strong className="font-semibold text-gold-light">{footer.highlight}</strong>
              </p>
            ) : (
              <p className="text-sm font-medium leading-relaxed text-heading-inverse">
                {footer.text}
              </p>
            )}
          </div>
        </div>
      </CardSpotlight>
    </Card3D>
  );
}
