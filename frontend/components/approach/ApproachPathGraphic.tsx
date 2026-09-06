"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { ApproachPathStep } from "@/lib/approach-content";

const VIEW_W = 640;
const VIEW_H = 540;
const GOLD = "#c4a484";
const DRAW_DURATION = 2.2;
const TRAVEL_DURATION = 4.4;

type Point = { x: number; y: number };

/**
 * Four evenly spaced anchors on a straight diagonal (equal Δx and Δy).
 * The curve is interpolated through these points so markers stay visually even.
 */
const STEP_ANCHORS: Point[] = [
  { x: 112, y: 424 },
  { x: 252, y: 336 },
  { x: 392, y: 248 },
  { x: 532, y: 160 },
];

const PATH_D = catmullRomPath(STEP_ANCHORS);

function catmullRomPath(points: Point[]): string {
  if (points.length < 2) return "";
  const padded = [points[0], ...points, points[points.length - 1]];
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = padded[i];
    const p1 = padded[i + 1];
    const p2 = padded[i + 2];
    const p3 = padded[i + 3];
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function toPct(point: Point) {
  return {
    left: `${(point.x / VIEW_W) * 100}%`,
    top: `${(point.y / VIEW_H) * 100}%`,
  };
}

export function ApproachPathGraphic({
  steps,
}: {
  steps: ApproachPathStep[];
}) {
  const rawId = useId().replace(/:/g, "");
  const revealId = `approach-reveal-${rawId}`;

  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.2, margin: "80px 0px" });
  const play = inView || Boolean(reducedMotion);
  const [measuredPoints, setMeasuredPoints] = useState<Point[] | null>(null);
  const [cometReady, setCometReady] = useState(false);

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el || steps.length === 0) return;

    if (steps.length === STEP_ANCHORS.length) {
      setMeasuredPoints(STEP_ANCHORS);
      return;
    }

    const length = el.getTotalLength();
    const count = steps.length;
    setMeasuredPoints(
      Array.from({ length: count }, (_, index) => {
        const t = count === 1 ? 0.5 : index / (count - 1);
        const point = el.getPointAtLength(length * t);
        return { x: point.x, y: point.y };
      })
    );
  }, [steps.length]);

  useLayoutEffect(() => {
    if (!play || reducedMotion) return;
    const timer = window.setTimeout(() => setCometReady(true), DRAW_DURATION * 900);
    return () => window.clearTimeout(timer);
  }, [play, reducedMotion]);

  const markers = useMemo(() => {
    const points = measuredPoints ?? STEP_ANCHORS.slice(0, steps.length);
    return steps.map((step, index) => ({
      step,
      point: points[index] ?? STEP_ANCHORS[0],
    }));
  }, [measuredPoints, steps]);

  const label = steps.map((step) => `${step.number} ${step.title}`).join(", ");

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={label ? `Approach path: ${label}` : "Approach path"}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <mask id={revealId} maskUnits="userSpaceOnUse">
            <motion.path
              d={PATH_D}
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: reducedMotion ? 1 : 0 }}
              animate={{ pathLength: play ? 1 : 0 }}
              transition={{
                duration: reducedMotion ? 0 : DRAW_DURATION,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </mask>
        </defs>

        <path
          ref={pathRef}
          d={PATH_D}
          stroke={GOLD}
          strokeWidth="2"
          strokeDasharray="7 8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          mask={`url(#${revealId})`}
        />

        {markers.map(({ point }, index) => (
          <g key={`marker-${index}`}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              fill="none"
              stroke={GOLD}
              strokeWidth="1.25"
              initial={{ r: 6, opacity: 0 }}
              animate={
                play
                  ? { r: [6, 16], opacity: [0.4, 0] }
                  : { r: 6, opacity: 0 }
              }
              transition={{
                duration: reducedMotion ? 0 : 1.4,
                delay: reducedMotion ? 0 : 0.4 + index * 0.4,
                ease: "easeOut",
              }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              fill={GOLD}
              stroke="white"
              strokeWidth="2"
              initial={{ r: 0, opacity: 0 }}
              animate={play ? { r: 7, opacity: 1 } : { r: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 18,
                delay: reducedMotion ? 0 : 0.32 + index * 0.4,
              }}
            />
          </g>
        ))}

        {cometReady ? (
          <circle cx={STEP_ANCHORS[0].x} cy={STEP_ANCHORS[0].y} r="3.25" fill={GOLD}>
            <animateMotion
              dur={`${TRAVEL_DURATION}s`}
              repeatCount="indefinite"
              path={PATH_D}
              begin="0s"
            />
          </circle>
        ) : null}
      </svg>

      {markers.map(({ step, point }, index) => (
        <motion.div
          key={step.id}
          className="absolute z-10"
          style={toPct(point)}
          initial={{ opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: reducedMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: reducedMotion ? 0 : 0.46 + index * 0.4,
          }}
        >
          <div className="flex -translate-x-1/2 -translate-y-full flex-col items-center pb-2.5">
            <div className="rounded-2xl border border-white/80 bg-white/92 px-2.5 py-1.5 shadow-[var(--shadow-card)] backdrop-blur-md sm:px-3.5 sm:py-2">
              <span className="block text-[10px] font-bold leading-none text-gold sm:text-[11px]">
                {step.number}
              </span>
              <p className="mt-1 text-xs font-semibold leading-none text-heading whitespace-nowrap sm:text-sm">
                {step.title}
              </p>
            </div>
            <span className="mt-0.5 h-2.5 w-px bg-gold/70" aria-hidden="true" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
