"use client";

import { useState } from "react";
import {
  type CareersOpportunity,
  type CareersPageContent,
} from "@/lib/careers-content";
import { saveCareersContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function emptyJob(): CareersOpportunity {
  return {
    id: nextId("opportunity"),
    title: "",
    location: "",
    lineOfService: "",
    applyHref: "",
  };
}

export function JobsEditor({
  initialContent,
}: {
  initialContent: CareersPageContent;
}) {
  const [content, setContent] = useState(() => ({
    ...initialContent,
    opportunities: {
      title: initialContent.opportunities?.title || "Open positions",
      emptyMessage:
        initialContent.opportunities?.emptyMessage ||
        "There are no open positions right now. Check back soon.",
      hero: {
        tag: initialContent.opportunities?.hero?.tag || "OPEN POSITIONS",
        titleWhite:
          initialContent.opportunities?.hero?.titleWhite || "Explore Current Openings.",
        titleAccent:
          initialContent.opportunities?.hero?.titleAccent || "Find the Role That Fits.",
        description:
          initialContent.opportunities?.hero?.description ||
          "Browse live job openings at Inveris and apply for roles that match your skills across consulting, recruitment, finance, compliance, and operations.",
        image: initialContent.opportunities?.hero?.image || initialContent.hero.image,
        imageAlt:
          initialContent.opportunities?.hero?.imageAlt || initialContent.hero.imageAlt,
        cta: {
          label: "",
          href: "#current-opportunities",
        },
      },
      items: initialContent.opportunities?.items ?? [],
    },
  }));
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const jobs = content.opportunities?.items ?? [];
  const hero = content.opportunities.hero;

  function updateHero(patch: Partial<typeof hero>) {
    setContent((prev) => ({
      ...prev,
      opportunities: {
        ...prev.opportunities,
        hero: { ...prev.opportunities.hero, ...patch },
      },
    }));
  }

  function updateJob(id: string, patch: Partial<CareersOpportunity>) {
    setContent((prev) => ({
      ...prev,
      opportunities: {
        ...prev.opportunities,
        items: prev.opportunities.items.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  async function handleSave() {
    const invalid = jobs.some(
      (job) => !job.title.trim() || !job.location.trim() || !job.lineOfService.trim()
    );
    if (invalid) {
      setError("Each job needs a title, location, and line of service.");
      setStatus("");
      return;
    }

    setSaving(true);
    setError("");
    setStatus("");
    try {
      const saved = await saveCareersContent(content);
      setContent(saved);
      setStatus("Jobs saved. They now appear on the public opportunities page.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Jobs</h1>
          <p className="mt-1 text-sm text-text-body">
            Add open roles and edit the opportunities page hero, listing heading, and
            empty-state copy. Applications appear under Form responses and are emailed
            to the notification inbox.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleSave()}
          className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save jobs"}
        </button>
      </div>

      {status ? (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{status}</p>
      ) : null}
      {error ? (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <AdminSection title="Hero" defaultOpen>
        <TextField
          label="Tag"
          value={hero.tag}
          onChange={(v) => updateHero({ tag: v })}
        />
        <TextField
          label="Title (white)"
          value={hero.titleWhite}
          onChange={(v) => updateHero({ titleWhite: v })}
        />
        <TextField
          label="Title (accent)"
          value={hero.titleAccent}
          onChange={(v) => updateHero({ titleAccent: v })}
        />
        <TextField
          label="Description"
          multiline
          value={hero.description}
          onChange={(v) => updateHero({ description: v })}
        />
        <ImageField
          label="Hero image"
          value={hero.image}
          onChange={(v) => updateHero({ image: v })}
        />
        <TextField
          label="Image alt text"
          value={hero.imageAlt}
          onChange={(v) => updateHero({ imageAlt: v })}
        />
      </AdminSection>

      <AdminSection title="Job listings" defaultOpen>
      <TextField
        label="Section heading"
        value={content.opportunities?.title ?? "Open positions"}
        onChange={(v) =>
          setContent((prev) => ({
            ...prev,
            opportunities: { ...prev.opportunities, title: v },
          }))
        }
      />
      <TextField
        label="Empty state message"
        value={
          content.opportunities?.emptyMessage ??
          "There are no open positions right now. Check back soon."
        }
        onChange={(v) =>
          setContent((prev) => ({
            ...prev,
            opportunities: { ...prev.opportunities, emptyMessage: v },
          }))
        }
      />

      {jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
          <p className="font-semibold text-navy">No job openings for now</p>
          <p className="mt-1 text-sm text-text-body">
            Add a role when you are ready to list it on the public opportunities page.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 rounded-xl border border-border bg-white p-4 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">Job {index + 1}</p>
                <DeleteButton
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      opportunities: {
                        ...prev.opportunities,
                        items: prev.opportunities.items.filter((entry) => entry.id !== item.id),
                      },
                    }))
                  }
                />
              </div>
              <TextField
                label="Job title"
                value={item.title}
                onChange={(v) => updateJob(item.id, { title: v })}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Location"
                  value={item.location}
                  onChange={(v) => updateJob(item.id, { location: v })}
                />
                <TextField
                  label="Line of service"
                  value={item.lineOfService}
                  onChange={(v) => updateJob(item.id, { lineOfService: v })}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AddButton
        label="Add job"
        onClick={() =>
          setContent((prev) => ({
            ...prev,
            opportunities: {
              ...prev.opportunities,
              title: prev.opportunities?.title || "Open positions",
              items: [...(prev.opportunities?.items ?? []), emptyJob()],
            },
          }))
        }
      />
      </AdminSection>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white/95 px-4 py-3 lg:left-64">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-xs text-text-muted">
            Saved jobs go live on /careers/opportunities.
          </p>
          <button
            type="button"
            onClick={() => void handleSave()}
            className="rounded-md bg-gold px-5 py-2 text-sm font-semibold text-navy disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save jobs"}
          </button>
        </div>
      </div>
    </div>
  );
}
