import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/magic/marquee";
import { Reveal } from "@/components/magic/reveal";
import { HomeMediaIcon, type HomeIconName } from "@/lib/home-icons";
import { type HomeValueItem } from "@/lib/home-content";

export function ValueBarSection({
  title,
  items,
}: {
  title: string;
  items: HomeValueItem[];
}) {
  if (!items.length) return null;

  const first = items.slice(0, Math.ceil(items.length / 2));
  const second = items.slice(Math.ceil(items.length / 2));

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-10 lg:py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
      <Container className="mb-6">
        {title ? (
          <Reveal direction="down">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-label">
              {title}
            </p>
          </Reveal>
        ) : null}
      </Container>
      <Marquee pauseOnHover duration="36s">
        {first.map((item) => (
          <ValueChip key={item.id} item={item} />
        ))}
      </Marquee>
      {second.length ? (
        <Marquee reverse pauseOnHover duration="42s" className="mt-3">
          {second.map((item) => (
            <ValueChip key={item.id} item={item} />
          ))}
        </Marquee>
      ) : null}
    </section>
  );
}

function ValueChip({ item }: { item: HomeValueItem }) {
  return (
    <div className="flex min-w-[280px] max-w-sm items-start gap-3 rounded-2xl border border-border/80 bg-white/80 px-4 py-4 shadow-[var(--shadow-card)] backdrop-blur-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold/12">
        <HomeMediaIcon
          name={item.icon as HomeIconName}
          image={item.image}
          alt={item.title}
          size={22}
          className={item.image ? "size-full object-cover" : "text-gold"}
        />
      </div>
      <div>
        <h3 className="text-sm font-bold text-navy leading-snug">{item.title}</h3>
        <p className="mt-1 text-xs text-text-body leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}
