"use client";

import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

export function ShineBorder({
  borderWidth = 1.5,
  duration = 12,
  shineColor = ["#c4a484", "#ffffff", "#c4a484"],
  className,
}: {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
  className?: string;
}) {
  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          backgroundImage: `radial-gradient(transparent, transparent, ${
            Array.isArray(shineColor) ? shineColor.join(",") : shineColor
          }, transparent, transparent)`,
          backgroundSize: "300% 300%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine",
        className
      )}
    />
  );
}
