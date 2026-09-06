"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/magic/reveal";

export type TimelineEntry = {
  title: string;
  content: ReactNode;
};

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const updateHeight = () => setHeight(node.getBoundingClientRect().height);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="relative w-full overflow-clip font-sans" ref={containerRef}>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex items-start justify-start pt-10 md:gap-20 lg:gap-28 md:pt-32"
          >
            <div className="relative flex max-w-xs shrink-0 flex-col items-start self-start md:w-[46%] md:max-w-none md:flex-row lg:w-[48%]">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-[0_0_0_6px_rgba(196,164,132,0.12)] md:left-3">
                <div className="h-3 w-3 rounded-full bg-gold" />
              </div>
              <Reveal
                as="h3"
                direction="left"
                delay={0.06}
                duration={0.7}
                distance={28}
                className="hidden text-xl font-bold text-heading md:block md:pl-20 md:text-2xl lg:text-4xl"
              >
                {item.title}
              </Reveal>
            </div>

            <div className="relative w-full max-w-md pl-20 pr-4 md:max-w-lg md:flex-1 md:pl-0">
              <Reveal
                as="h3"
                direction="left"
                delay={0.06}
                duration={0.7}
                distance={24}
                className="mb-4 block text-left text-xl font-bold text-heading md:hidden"
              >
                {item.title}
              </Reveal>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-linear-to-t from-gold via-gold-light to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
}
