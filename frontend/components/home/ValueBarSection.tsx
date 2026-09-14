import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
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
    <div className="relative pb-8 pt-4 lg:pb-10 lg:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />

      <Container className="relative z-10 mb-6">
        {title ? (
          <Reveal direction="down">
            <SectionTag light>{title}</SectionTag>
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
    </div>
  );
}

function ValueChip({ item }: { item: HomeValueItem }) {
  return (
    <div className="flex min-w-[280px] max-w-sm items-start gap-3 rounded-2xl border border-white/12 bg-white/95 px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold/12 ring-1 ring-gold/25">
        <HomeMediaIcon
          name={item.icon as HomeIconName}
          image={item.image}
          alt={item.title}
          size={22}
          className={item.image ? "size-full object-cover" : "text-gold"}
        />
      </div>
      <div>
        <h3 className="text-sm font-bold leading-snug text-navy">{item.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-text-body">{item.description}</p>
      </div>
    </div>
  );
}
