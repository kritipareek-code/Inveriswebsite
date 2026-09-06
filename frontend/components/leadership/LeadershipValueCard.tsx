"use client";

import {
  Award,
  Handshake,
  Lightbulb,
  Mountain,
  Target,
  Users,
} from "lucide-react";
import { Card3D } from "@/components/magic/card-3d";
import { CardSpotlight } from "@/components/magic/card-spotlight";
import { ShineBorder } from "@/components/magic/shine-border";
import { BorderBeam } from "@/components/magic/border-beam";
import type { LeadershipValueItem } from "@/lib/leadership-content";

const iconMap = {
  handshake: Handshake,
  users: Users,
  award: Award,
  lightbulb: Lightbulb,
  mountain: Mountain,
  target: Target,
};

export function LeadershipValueCard({
  item,
  index,
}: {
  item: LeadershipValueItem;
  index: number;
}) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Target;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Card3D>
      <CardSpotlight className="bg-[#07101F] flex h-full min-h-[17.5rem] flex-col p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_0_1px_rgba(196,164,132,0.16)] transition-shadow duration-500 hover:shadow-[0_28px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(196,164,132,0.38),0_0_72px_rgba(196,164,132,0.18)] lg:p-7">
        <ShineBorder duration={10 + index} borderWidth={1.4} />
        <BorderBeam size={90} duration={11} delay={index * 1.4} />

        <Icon
          size={170}
          className="pointer-events-none absolute -right-6 -bottom-8 text-gold/[0.07] transition-transform duration-500 group-hover/spotlight:scale-110"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col [transform:translateZ(28px)]">
          <div className="mb-6 flex items-start justify-between gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/35 bg-gold/15 text-gold shadow-[0_0_24px_rgba(196,164,132,0.28)] transition-transform duration-500 group-hover/spotlight:scale-110">
              <span
                className="absolute inset-0 rounded-2xl bg-gold/10 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
                aria-hidden="true"
              />
              <Icon size={22} className="relative" strokeWidth={1.4} />
            </span>
            <span
              className="font-display text-4xl leading-none text-white/[0.1] transition-colors duration-500 group-hover/spotlight:text-gold/35"
              aria-hidden="true"
            >
              {number}
            </span>
          </div>

          <h3 className="text-lg font-medium leading-snug text-heading-inverse md:text-xl">
            {item.title}
          </h3>
          <span
            className="mt-4 mb-4 block h-px w-8 bg-gradient-to-r from-gold to-transparent transition-[width] duration-500 group-hover/spotlight:w-16"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-paragraph-inverse">
            {item.description}
          </p>
        </div>
      </CardSpotlight>
    </Card3D>
  );
}
