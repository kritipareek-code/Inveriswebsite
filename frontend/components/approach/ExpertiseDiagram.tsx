"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { SpinningText } from "@/components/magic/spinning-text";

interface DiagramNode {
  id?: string;
  label: string;
  description: string;
  icon: string;
  position: string;
  align: string;
}

function titleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ExpertiseDiagram({ nodes }: { nodes: DiagramNode[] }) {
  const reducedMotion = useReducedMotion();
  const spinningCopy =
    nodes.map((node) => titleCase(node.label)).join("  •  ") + "  •  ";

  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
      role="img"
      aria-label={nodes
        .map((node) => `${node.label}: ${node.description}`)
        .join(". ")}
    >
      <SpinningText
        className="pointer-events-none absolute inset-0 font-display text-[13px] tracking-[0.18em] text-heading sm:text-xl font-semibold"
        duration={22}
        radius={16}
        reverse
        variants={
          reducedMotion
            ? { container: { visible: { rotate: 0 } } }
            : undefined
        }
      >
        {spinningCopy}
      </SpinningText>

      <div className="relative z-10 flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Inveris"
          width={330}
          height={150}
          className="h-16 w-auto object-contain sm:h-28"
        />
      </div>
    </div>
  );
}
