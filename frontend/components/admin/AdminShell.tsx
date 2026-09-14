"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { clearAdminToken, fetchCareerUnreadCount, fetchContactUnreadCount } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/responses", label: "Form responses" },
  { href: "/admin/newsletter", label: "Newsletter emails" },
  { href: "/admin/home", label: "Home page" },
  { href: "/admin/about", label: "About page" },
  { href: "/admin/services", label: "Services page" },
  { href: "/admin/industries", label: "Industries page" },
  { href: "/admin/approach", label: "Approach page" },
  { href: "/admin/leadership", label: "Leadership page" },
  { href: "/admin/careers", label: "Careers page" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/contact", label: "Contact page" },
  { href: "/admin/footer", label: "Footer" },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    async function loadUnread() {
      try {
        const [contactUnread, careerUnread] = await Promise.all([
          fetchContactUnreadCount(),
          fetchCareerUnreadCount(),
        ]);
        setUnread(contactUnread + careerUnread);
      } catch {
        setUnread(0);
      }
    }
    void loadUnread();
  }, [pathname]);

  function logout() {
    clearAdminToken();
    window.location.assign("/admin");
  }

  return (
    <div className="min-h-full bg-surface-muted">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-navy p-6 text-white lg:block">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold">INVERIS</p>
        <h1 className="mt-2 text-xl font-bold">Admin</h1>
        <nav className="mt-8 space-y-1">
          {links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  active ? "bg-white/10 text-gold" : "text-white/80 hover:bg-white/5"
                )}
              >
                <span>{link.label}</span>
                {link.href === "/admin/responses" && unread > 0 ? (
                  <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-navy">
                    {unread}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-border bg-white px-4 py-3 lg:px-8">
          <nav className="flex gap-3 lg:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-navy">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-text-body">{email}</p>
          <button
            type="button"
            onClick={logout}
            className="text-sm font-semibold text-navy hover:text-gold"
          >
            Log out
          </button>
        </header>
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
