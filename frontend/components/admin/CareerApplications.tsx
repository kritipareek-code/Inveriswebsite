"use client";

import { useEffect, useState } from "react";
import {
  deleteCareerApplication,
  fetchCareerApplications,
  markCareerApplicationRead,
  type CareerApplication,
} from "@/lib/admin-api";
import { cn } from "@/lib/cn";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-navy">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm text-text-body">{value}</p>
    </div>
  );
}

export function CareerApplications() {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState("");

  async function load() {
    setError("");
    const data = await fetchCareerApplications();
    setApplications(data.applications);
    setUnread(data.unread);
  }

  useEffect(() => {
    async function start() {
      try {
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load applications");
      } finally {
        setLoading(false);
      }
    }
    void start();
  }, []);

  async function toggleRead(item: CareerApplication) {
    setBusyId(item.id);
    setError("");
    try {
      const updated = await markCareerApplicationRead(item.id, !item.read);
      setApplications((prev) => prev.map((row) => (row.id === item.id ? updated : row)));
      setUnread((prev) => Math.max(0, prev + (updated.read ? -1 : 1)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update application");
    } finally {
      setBusyId("");
    }
  }

  async function remove(item: CareerApplication) {
    if (!window.confirm(`Delete the application from ${item.name}?`)) return;
    setBusyId(item.id);
    setError("");
    try {
      await deleteCareerApplication(item.id);
      setApplications((prev) => prev.filter((row) => row.id !== item.id));
      if (!item.read) setUnread((prev) => Math.max(0, prev - 1));
      if (openId === item.id) setOpenId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete application");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Career applications</h2>
          <p className="mt-1 text-sm text-text-body">
            Profiles submitted through the careers talent network form. Notifications go to HR, and
            resumes are attached when available.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-navy">
            {unread} unread
          </p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              void load().finally(() => setLoading(false));
            }}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-navy hover:bg-surface-muted"
          >
            Refresh
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {loading ? (
        <p className="text-sm text-text-body">Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-navy">No applications yet</p>
          <p className="mt-1 text-sm text-text-body">
            New submissions from the careers page will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((item) => {
            const open = openId === item.id;
            return (
              <article
                key={item.id}
                className={cn(
                  "overflow-hidden rounded-xl border bg-white shadow-[var(--shadow-card)]",
                  item.read ? "border-border" : "border-gold/60"
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    const nextOpen = !open;
                    setOpenId(nextOpen ? item.id : null);
                    if (nextOpen && !item.read) void toggleRead(item);
                  }}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {!item.read ? (
                        <span className="h-2 w-2 rounded-full bg-gold" aria-label="Unread" />
                      ) : null}
                      <h3 className="truncate text-base font-bold text-navy">{item.name}</h3>
                      {item.interest ? (
                        <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-navy">
                          {item.interest}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 truncate text-sm text-text-body">
                      {item.email}
                      {item.experience ? ` · ${item.experience}` : ""}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-paragraph-muted">
                      {item.about || item.organization || item.location}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs text-paragraph-muted">{formatDate(item.createdAt)}</p>
                </button>

                {open ? (
                  <div className="space-y-4 border-t border-border px-5 py-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Detail label="Name" value={item.name} />
                      <Detail label="Email" value={item.email} />
                      <Detail label="Phone" value={item.phone} />
                      <Detail label="Location" value={item.location} />
                      <Detail label="Area of interest" value={item.interest} />
                      <Detail label="Experience" value={item.experience} />
                      <Detail label="Organization" value={item.organization} />
                      <Detail label="Designation" value={item.designation} />
                      <Detail label="LinkedIn" value={item.linkedin} />
                    </div>
                    <Detail label="About" value={item.about} />
                    {item.resumeUrl ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-navy">
                          Resume
                        </p>
                        <a
                          href={item.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-sm text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold"
                        >
                          {item.resumeName || "View resume"}
                        </a>
                      </div>
                    ) : item.resumeName ? (
                      <Detail label="Resume" value={item.resumeName} />
                    ) : null}
                    <p className="text-xs text-paragraph-muted">
                      {item.emailSent
                        ? "Notification email was sent."
                        : "Saved here. Notification email was not sent — check RESEND_API_KEY."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`mailto:${item.email}`}
                        className="rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Reply by email
                      </a>
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => void toggleRead(item)}
                        className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-navy disabled:opacity-60"
                      >
                        {item.read ? "Mark as unread" : "Mark as read"}
                      </button>
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => void remove(item)}
                        className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
