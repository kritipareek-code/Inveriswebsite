"use client";

import { BarChart3, Handshake, Network, Target, Users } from "lucide-react";
import { MagicCard } from "@/components/magic/magic-card";
import { CardSpotlight } from "@/components/magic/card-spotlight";
import { ShineBorder } from "@/components/magic/shine-border";
import { BorderBeam } from "@/components/magic/border-beam";

const iconMap = {
  users: Users,
  target: Target,
  network: Network,
  chart: BarChart3,
  handshake: Handshake,
};

export type IndustryValueCardVariant = "featured" | "default" | "wide";

export function IndustryValueCard({
  title,
  description,
  icon,
  index,
  variant = "default",
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
  variant?: IndustryValueCardVariant;
}) {
  const Icon = iconMap[icon as keyof typeof iconMap] ?? Users;
  const number = String(index + 1).padStart(2, "0");

  if (variant === "featured") {
    return (
      <CardSpotlight className="h-full min-h-[20rem] border-gold/25 bg-navy p-7 shadow-[0_24px_70px_rgba(7,16,31,0.28)] sm:min-h-[22rem] lg:min-h-full lg:p-10">
        <ShineBorder duration={14} borderWidth={1.5} />
        <BorderBeam size={120} duration={12} />
        <Icon
          size={220}
          className="pointer-events-none absolute -right-8 -bottom-10 text-gold/[0.07]"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col justify-between gap-8">
          <div>
            <div className="mb-8 flex items-start justify-between gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/35 bg-gold/15 text-gold shadow-[0_0_28px_rgba(196,164,132,0.28)]">
                <Icon size={26} strokeWidth={1.4} />
              </span>
              <span
                className="font-display text-5xl leading-none text-white/[0.08]"
                aria-hidden="true"
              >
                {number}
              </span>
            </div>
            <h3 className="text-3xl font-medium leading-[1.15] text-heading-inverse lg:text-[2.15rem]">
              {title}
            </h3>
          </div>

          <div>
            <span
              className="mb-5 block h-px w-12 bg-gradient-to-r from-gold to-transparent"
              aria-hidden="true"
            />
            <p className="max-w-md text-sm leading-relaxed text-paragraph-inverse md:text-[0.95rem]">
              {description}
            </p>
          </div>
        </div>
      </CardSpotlight>
    );
  }

  if (variant === "wide") {
    return (
      <MagicCard className="h-full min-h-[12.5rem] rounded-3xl bg-gradient-to-br from-gold/[0.12] via-surface to-surface p-6 lg:flex lg:min-h-full lg:items-center lg:p-8">
        <BorderBeam size={90} duration={11} delay={3} />
        <div className="relative z-10 flex h-full flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/12 text-gold lg:h-16 lg:w-16">
            <Icon size={28} strokeWidth={1.4} />
          </span>
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-display text-sm text-gold">{number}</span>
              <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-medium leading-snug text-heading">
              {title}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-paragraph">
              {description}
            </p>
          </div>
        </div>
      </MagicCard>
    );
  }

  return (
    <MagicCard className="flex h-full min-h-[12.5rem] flex-col rounded-3xl p-6 lg:p-7">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
          <Icon size={20} strokeWidth={1.4} />
        </span>
        <span className="font-display text-2xl leading-none text-heading/10" aria-hidden="true">
          {number}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-medium leading-snug text-heading">
        {title}
      </h3>
      <span
        className="mb-3 block h-px w-8 bg-gradient-to-r from-gold to-transparent"
        aria-hidden="true"
      />
      <p className="text-sm leading-relaxed text-paragraph">{description}</p>
    </MagicCard>
  );
}

