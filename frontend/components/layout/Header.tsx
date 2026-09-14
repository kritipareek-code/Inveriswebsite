"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useNav } from "@/components/providers/NavProvider";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/cn";

const LIGHT_HERO_PATHS = new Set(["/approach"]);

export function Header() {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useNav();
  const headerRef = useRef<HTMLElement>(null);
  const [isOverHero, setIsOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const solid = !isOverHero || isOpen;
  const onDarkHero = !solid && !LIGHT_HERO_PATHS.has(pathname);

  useEffect(() => {
    close();
    setIsOverHero(true);
    setScrolled(window.scrollY > 12);

    const hero = document.querySelector("main > *");
    if (!(hero instanceof HTMLElement)) {
      setIsOverHero(false);
      return;
    }

    const update = () => {
      const height = headerRef.current?.offsetHeight ?? 88;
      setIsOverHero(hero.getBoundingClientRect().bottom > height);
      setScrolled(window.scrollY > 12);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, close]);

  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-50 pt-3 lg:pt-5">
      <Container>
        <div
          className={cn(
            "relative flex items-center justify-between gap-4 h-[4.25rem] lg:h-[4.75rem] rounded-2xl px-4 sm:px-5 lg:px-6 transition-all duration-300",
            solid
              ? "bg-white/90 backdrop-blur-xl border border-border/80 shadow-[0_12px_40px_rgba(7,16,31,0.1)]"
              : onDarkHero
                ? cn(
                    "bg-navy/25 backdrop-blur-xl border border-white/12",
                    scrolled && "bg-navy/45 shadow-[0_12px_40px_rgba(7,16,31,0.25)]"
                  )
                : "bg-white/55 backdrop-blur-xl border border-white/40"
          )}
        >
          <Logo light={onDarkHero} />

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative font-display text-[14px] xl:text-[15px] px-2.5 xl:px-3.5 py-2 transition-colors",
                    onDarkHero
                      ? isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : isActive
                        ? "text-navy"
                        : "text-text-body hover:text-navy"
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-2.5 right-2.5 xl:left-3.5 xl:right-3.5 -bottom-0.5 h-px bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute left-2.5 right-2.5 xl:left-3.5 xl:right-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center pl-2">
            <Button variant="gold" size="sm" href="/contact">
              Contact Us
            </Button>
          </div>

          <button
            className={cn(
              "lg:hidden p-2 rounded-xl transition-colors",
              onDarkHero ? "text-white hover:bg-white/10" : "text-navy hover:bg-navy/5"
            )}
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <nav className="lg:hidden mt-2 rounded-2xl border border-border bg-white/95 backdrop-blur-xl p-3 shadow-[0_18px_50px_rgba(7,16,31,0.12)]">
            <div className="flex flex-col">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={cn(
                      "px-4 py-3 rounded-xl font-display text-lg transition-colors",
                      isActive
                        ? "bg-navy text-white"
                        : "text-navy/80 hover:bg-surface-muted hover:text-navy"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 px-1">
                <Button variant="gold" size="sm" href="/contact" className="w-full">
                  Contact Us
                </Button>
              </div>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
