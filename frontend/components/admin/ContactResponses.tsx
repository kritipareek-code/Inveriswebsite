"use client";

import { useEffect, useState } from "react";
import {
  deleteContactSubmission,
  fetchContactSubmissions,
  markContactSubmissionRead,
  type ContactSubmission,
} from "@/lib/admin-api";
import { cn } from "@/lib/cn";

function sourceLabel(source?: string) {
  if (source === "consulting-call") return "Consulting call";
  if (source === "service-enquiry") return "Service enquiry";
  if (source === "contact") return "Contact form";
  return source || "";
}

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

export function ContactResponses() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState("");

  async function load() {
    setError("");
    const data = await fetchContactSubmissions();
    setSubmissions(data.submissions);
    setUnread(data.unread);
  }

  useEffect(() => {
    async function start() {
      try {
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load responses");
      } finally {
        setLoading(false);
      }
    }
    void start();
  }, []);

  async function toggleRead(item: ContactSubmission) {
    setBusyId(item.id);
    setError("");
    try {
      const updated = await markContactSubmissionRead(item.id, !item.read);
      setSubmissions((prev) => prev.map((row) => (row.id === item.id ? updated : row)));
      setUnread((prev) => Math.max(0, prev + (updated.read ? -1 : 1)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update response");
    } finally {
      setBusyId("");
    }
  }

  async function remove(item: ContactSubmission) {
    if (!window.confirm(`Delete the response from ${item.name}?`)) return;
    setBusyId(item.id);
    setError("");
    try {
      await deleteContactSubmission(item.id);
      setSubmissions((prev) => prev.filter((row) => row.id !== item.id));
      if (!item.read) setUnread((prev) => Math.max(0, prev - 1));
      if (openId === item.id) setOpenId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete response");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Contact & service enquiries</h2>
          <p className="mt-1 text-sm text-text-body">
            Messages from the contact page, service card enquiries, and consulting call requests.
            Each submission is also emailed to the notification inbox.
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
        <p className="text-sm text-text-body">Loading responses...</p>
      ) : submissions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-navy">No responses yet</p>
          <p className="mt-1 text-sm text-text-body">
            New messages from the contact page, services enquiry form, and consulting call form will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((item) => {
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
                      <h2 className="truncate text-base font-bold text-navy">{item.name}</h2>
                      {sourceLabel(item.source) ? (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-navy">
                          {sourceLabel(item.source)}
                        </span>
                      ) : null}
                      {item.enquiryType ? (
                        <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-navy">
                          {item.enquiryType}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 truncate text-sm text-text-body">
                      {item.email}
                      {item.subject ? ` · ${item.subject}` : ""}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-paragraph-muted">{item.message}</p>
                  </div>
                  <p className="shrink-0 text-xs text-paragraph-muted">{formatDate(item.createdAt)}</p>
                </button>

                {open ? (
                  <div className="space-y-4 border-t border-border px-5 py-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Detail label="Name" value={item.name} />
                      <Detail label="Email" value={item.email} />
                      <Detail label="Company" value={item.company} />
                      <Detail label="Phone" value={item.phone} />
                      <Detail label="Enquiry type" value={item.enquiryType} />
                      <Detail label="Subject" value={item.subject} />
                      <Detail label="Source" value={sourceLabel(item.source)} />
                    </div>
                    <Detail label="Message" value={item.message} />
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
