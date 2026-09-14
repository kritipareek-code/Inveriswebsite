"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  clearAdminToken,
  fetchAdminSession,
  getAdminToken,
  loginAdmin,
} from "@/lib/admin-api";
import { AdminShell } from "./AdminShell";

export function AdminGate({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(true);
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      if (!getAdminToken()) {
        setChecking(false);
        return;
      }
      try {
        const admin = await fetchAdminSession();
        setEmail(admin.email);
      } catch {
        clearAdminToken();
      } finally {
        setChecking(false);
      }
    }
    void load();
  }, []);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const admin = await loginAdmin(formEmail, password);
      setEmail(admin.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-muted text-sm text-text-body">
        Loading admin...
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy px-4">
        <form
          onSubmit={(e) => void handleLogin(e)}
          className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-[var(--shadow-card)]"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">INVERIS</p>
            <h1 className="mt-2 text-2xl font-bold text-navy">Admin login</h1>
            <p className="mt-1 text-sm text-text-body">
              Sign in to edit website content.
            </p>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase text-navy">Email</span>
            <input
              type="email"
              required
              autoComplete="username"
              placeholder="Email"
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase text-navy">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-navy py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}

export function AdminOverview() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="text-sm text-text-body">
        This panel is the live editor for the website. Review contact form responses, then edit Home, About, Services, Industries, Approach, Leadership, Careers, Contact, and Footer.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/responses"
          className="inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white"
        >
          View form responses
        </Link>
        <Link
          href="/admin/newsletter"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          View newsletter
        </Link>
        <Link
          href="/admin/home"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit home page
        </Link>
        <Link
          href="/admin/about"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit about page
        </Link>
        <Link
          href="/admin/services"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit services page
        </Link>
        <Link
          href="/admin/industries"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit industries page
        </Link>
        <Link
          href="/admin/approach"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit approach page
        </Link>
        <Link
          href="/admin/leadership"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit leadership page
        </Link>
        <Link
          href="/admin/careers"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit careers page
        </Link>
        <Link
          href="/admin/jobs"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Manage jobs
        </Link>
        <Link
          href="/admin/contact"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit contact page
        </Link>
        <Link
          href="/admin/footer"
          className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
        >
          Edit footer
        </Link>
      </div>
    </div>
  );
}
