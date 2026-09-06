import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { MagicCard } from "@/components/magic/magic-card";
import { BorderBeam } from "@/components/magic/border-beam";
import { Reveal } from "@/components/magic/reveal";
import type { ContactFormContent, ContactInfoContent } from "@/lib/contact-content";

const iconMap = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
  clock: Clock,
};

type ContactRow = {
  id: string;
  icon: keyof typeof iconMap;
  label: string;
  lines: string[];
  href?: string;
};

function buildContactRows(contactInfo: ContactInfoContent): ContactRow[] {
  const rows: ContactRow[] = [
    ...contactInfo.emails.map((item) => ({
      id: item.id,
      icon: "mail" as const,
      label: item.label,
      lines: [item.value],
      href: item.href || `mailto:${item.value}`,
    })),
    ...contactInfo.phones.map((item) => ({
      id: item.id,
      icon: "phone" as const,
      label: item.label,
      lines: [item.value],
      href: item.href,
    })),
    ...contactInfo.addresses.map((item) => ({
      id: item.id,
      icon: "map" as const,
      label: item.label,
      lines: item.company ? [item.company, item.value] : [item.value],
    })),
  ];

  if (contactInfo.businessHours) {
    rows.push({
      id: "business-hours",
      icon: "clock",
      label: "Business Hours",
      lines: contactInfo.businessHours.split("\n").filter(Boolean),
    });
  }

  return rows;
}

export function ContactMainSection({
  form,
  contactInfo,
}: {
  form: ContactFormContent;
  contactInfo: ContactInfoContent;
}) {
  const rows = buildContactRows(contactInfo);

  return (
    <section id="contact-form" className="scroll-mt-28 overflow-hidden bg-surface-muted py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-5 lg:gap-10">
          <Reveal direction="left" className="h-full lg:col-span-3">
            <MagicCard className="flex h-full flex-col p-6 lg:p-8">
              <BorderBeam size={90} duration={12} />
              <div className="mb-6 shrink-0">
                <Reveal direction="down">
                  <span className="mb-4 block h-px w-8 bg-gold" aria-hidden="true" />
                </Reveal>
                <Reveal direction="left" delay={0.08}>
                  <h2 className="text-2xl font-bold text-heading md:text-3xl">{form.title}</h2>
                </Reveal>
              </div>
              <ContactForm form={form} className="flex-1" />
            </MagicCard>
          </Reveal>

          <div className="flex h-full flex-col lg:col-span-2">
            <div className="mb-8 shrink-0">
              <Reveal direction="down">
                <span className="mb-4 block h-px w-8 bg-gold" aria-hidden="true" />
              </Reveal>
              <Reveal direction="right" delay={0.08}>
                <h2 className="text-2xl font-bold text-heading md:text-3xl">{contactInfo.title}</h2>
              </Reveal>
            </div>
            <div className="space-y-3">
              {rows.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <Reveal
                    key={item.id}
                    direction="right"
                    delay={0.12 + index * 0.08}
                  >
                    <MagicCard className="flex gap-4 overflow-hidden p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy">
                        <Icon size={18} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <div>
                        <Reveal
                          as="h3"
                          direction="left"
                          delay={0.08}
                          duration={0.6}
                          distance={20}
                          className="mb-1 text-sm font-bold text-heading"
                        >
                          {item.label}
                        </Reveal>
                        <div className="space-y-1">
                          {item.lines.map((line, lineIndex) =>
                            item.href ? (
                              <Reveal
                                key={line}
                                direction="left"
                                delay={0.14 + lineIndex * 0.06}
                                duration={0.55}
                                distance={16}
                              >
                                <a
                                  href={item.href}
                                  className="block text-sm text-paragraph transition-colors hover:text-gold"
                                >
                                  {line}
                                </a>
                              </Reveal>
                            ) : (
                              <Reveal
                                key={line}
                                as="p"
                                direction="left"
                                delay={0.14 + lineIndex * 0.06}
                                duration={0.55}
                                distance={16}
                                className="text-sm leading-relaxed text-paragraph"
                              >
                                {line}
                              </Reveal>
                            )
                          )}
                        </div>
                      </div>
                    </MagicCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
