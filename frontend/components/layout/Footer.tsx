import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import PixelDrift from "@/components/originkit/ui/pixeldrift";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { GridPattern } from "@/components/magic/grid-pattern";
import { Reveal } from "@/components/magic/reveal";
import { toTelHref, type FooterContent, type FooterSocialIcon } from "@/lib/footer-content";

function SocialIcon({ icon }: { icon: FooterSocialIcon }) {
  const className = "w-4 h-4";

  if (icon === "instagram") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  return null;
}

export function Footer({
  content,
  showCta = true,
}: {
  content: FooterContent;
  showCta?: boolean;
}) {
  const { contact } = content;
  const mobileHref = toTelHref(contact.mobile);

  return (
    <footer className="relative overflow-hidden bg-navy text-paragraph-inverse mt-auto">
      <GridPattern className="opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/8 blur-3xl" />

      <Container className="relative">
        {showCta ? (
          <div className="flex flex-col gap-8 border-b border-white/10 py-12 lg:flex-row lg:items-end lg:justify-between lg:py-16">
            <div className="max-w-xl space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                Start a conversation
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-heading-inverse leading-[1.15]">
                Let&apos;s build what&apos;s next, together.
              </h2>
            </div>
            <Button variant="gold" size="lg" href="/contact">
              Contact Us
              <ArrowRight size={18} />
            </Button>
          </div>
        ) : null}

        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="space-y-5 lg:col-span-4">
            <Link
              href="/"
              aria-label="Inveris Solutions LLP"
              className="relative block h-24 w-full max-w-sm"
            >
              <span className="sr-only">Inveris</span>
              <PixelDrift
                text="Inveris"
                colors={["#FFFFFF", "#FFFFFF"]}
                mode="onEnter"
                replay={false}
                position="above"
                particleSize={12}
                particleCount={50}
                mouseEnabled
                mouseRadius={15}
                mouseForce={30}
                fontSize={120}
                autoFit
                fontFamily="var(--font-playfair)"
                fontWeight={700}
                transition={{ type: "tween", duration: 0.9, ease: "easeOut" }}
                style={{ minWidth: 0, minHeight: 0 }}
              />
            </Link>
            {content.description ? (
              <Reveal as="p" direction="down" delay={0.08} className="text-sm leading-relaxed max-w-xs text-paragraph-inverse">
                {content.description}
              </Reveal>
            ) : null}
            <Reveal direction="right" delay={0.16}>
              <NewsletterForm />
            </Reveal>
          </div>

          {content.links.map((group, groupIndex) => (
            <div key={group.id} className="lg:col-span-2">
              {group.title ? (
                <Reveal direction="left" delay={0.08 + groupIndex * 0.06}>
                  <h4 className="text-heading-inverse font-display text-lg font-medium mb-5">
                    {group.title}
                  </h4>
                </Reveal>
              ) : null}
              {group.items.length ? (
                <ul className="space-y-3">
                  {group.items.map((item, itemIndex) => (
                    <Reveal
                      key={item.id}
                      as="li"
                      direction="left"
                      delay={0.14 + groupIndex * 0.06 + itemIndex * 0.05}
                      distance={28}
                    >
                      <Link
                        href={item.href || "/"}
                        className="text-sm text-paragraph-inverse hover:text-gold transition-colors"
                      >
                        {item.label}
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <div className="lg:col-span-4">
            {contact.title ? (
              <Reveal direction="left" delay={0.2}>
                <h4 className="text-heading-inverse font-display text-lg font-medium mb-5">
                  {contact.title}
                </h4>
              </Reveal>
            ) : null}

            <ul className="space-y-4">
              {contact.location ? (
                <Reveal as="li" direction="left" delay={0.26} distance={28} className="flex gap-3">
                  <MapPin size={18} className="text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-sm leading-relaxed text-paragraph-inverse">
                    {contact.location}
                  </span>
                </Reveal>
              ) : null}
              {contact.mobile ? (
                <Reveal as="li" direction="left" delay={0.32} distance={28} className="flex gap-3">
                  <Phone size={18} className="text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                  {mobileHref ? (
                    <a
                      href={mobileHref}
                      className="text-sm text-paragraph-inverse hover:text-gold transition-colors"
                    >
                      {contact.mobile}
                    </a>
                  ) : (
                    <span className="text-sm text-paragraph-inverse">{contact.mobile}</span>
                  )}
                </Reveal>
              ) : null}
              {contact.email ? (
                <Reveal as="li" direction="left" delay={0.38} distance={28} className="flex gap-3">
                  <Mail size={18} className="text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-paragraph-inverse hover:text-gold transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </Reveal>
              ) : null}
            </ul>
          </div>
        </div>

        <Reveal
          direction="up"
          delay={0.12}
          distance={28}
          amount={0.01}
          margin="0px"
          className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 py-6"
        >
          {content.copyright ? (
            <p className="text-xs sm:text-sm text-paragraph-inverse/80">
              {content.copyright}
            </p>
          ) : null}
          {contact.social.length ? (
            <div className="flex gap-3">
              {contact.social.map((item) => (
                <a
                  key={item.id}
                  href={item.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-paragraph-inverse hover:border-gold hover:text-gold hover:bg-white/5 transition-colors"
                >
                  <SocialIcon icon={item.icon} />
                </a>
              ))}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </footer>
  );
}
