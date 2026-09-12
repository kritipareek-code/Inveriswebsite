"use client";

import { useState } from "react";
import {
  type IndustriesPageContent,
  type IndustryTimelineItem,
} from "@/lib/industries-content";
import { saveIndustriesContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export function IndustriesEditor({
  initialContent,
}: {
  initialContent: IndustriesPageContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const saved = await saveIndustriesContent(content);
      setContent(saved);
      setStatus(
        "Industries page saved. Refresh the public Industries page to see changes."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateIndustry(id: string, patch: Partial<IndustryTimelineItem>) {
    setContent((prev) => ({
      ...prev,
      industriesWeServe: {
        ...prev.industriesWeServe,
        industries: prev.industriesWeServe.industries.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Industries page</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit every section on Industries, including images and labels.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleSave()}
          className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {status ? (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <AdminSection title="Hero">
        <TextField
          label="Tag"
          value={content.hero.tag}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, hero: { ...prev.hero, tag: v } }))
          }
        />
        <TextField
          label="Title"
          value={content.hero.title}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, hero: { ...prev.hero, title: v } }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.hero.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              hero: { ...prev.hero, description: v },
            }))
          }
        />
        <ImageField
          label="Background image"
          value={content.hero.image}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, hero: { ...prev.hero, image: v } }))
          }
        />
        <TextField
          label="Image alt text"
          value={content.hero.imageAlt}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              hero: { ...prev.hero, imageAlt: v },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Industries we serve (section header)">
        <TextField
          label="Tag"
          value={content.industriesWeServe.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              industriesWeServe: { ...prev.industriesWeServe, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.industriesWeServe.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              industriesWeServe: { ...prev.industriesWeServe, title: v },
            }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.industriesWeServe.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              industriesWeServe: { ...prev.industriesWeServe, description: v },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Timeline industries">
        <p className="text-xs text-text-muted">
          Order here is the scroll order on the page (Manufacturing first, then
          Retail, and so on). Each entry shows a title, description, and image —
          no Learn More link.
        </p>
        {content.industriesWeServe.industries.map((industry, index) => (
          <div
            key={industry.id}
            className="space-y-4 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">
                Industry {index + 1}
              </h3>
              <DeleteButton
                label="Delete industry"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    industriesWeServe: {
                      ...prev.industriesWeServe,
                      industries: prev.industriesWeServe.industries.filter(
                        (item) => item.id !== industry.id
                      ),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Title (timeline heading)"
              value={industry.title}
              onChange={(v) => updateIndustry(industry.id, { title: v })}
            />
            <TextField
              label="Description"
              multiline
              value={industry.description}
              onChange={(v) => updateIndustry(industry.id, { description: v })}
            />
            <ImageField
              label="Image"
              value={industry.image}
              onChange={(v) => updateIndustry(industry.id, { image: v })}
            />
            <TextField
              label="Image alt text"
              value={industry.imageAlt}
              onChange={(v) => updateIndustry(industry.id, { imageAlt: v })}
            />
            <TextField
              label="Icon (manufacturing, retail, healthcare, technology, banking, education, realEstate, travel)"
              value={industry.icon}
              onChange={(v) => updateIndustry(industry.id, { icon: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add industry"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              industriesWeServe: {
                ...prev.industriesWeServe,
                industries: [
                  ...prev.industriesWeServe.industries,
                  {
                    id: nextId("industry"),
                    title: "New industry",
                    description: "",
                    image: "",
                    imageAlt: "",
                    icon: "manufacturing",
                  } satisfies IndustryTimelineItem,
                ],
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Value bar">
        <TextField
          label="Section heading"
          value={content.valueBar.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              valueBar: { ...prev.valueBar, title: v },
            }))
          }
        />
        {content.valueBar.items.map((item, index) => (
          <div
            key={item.id}
            className="space-y-4 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Item {index + 1}</h3>
              <DeleteButton
                label="Delete item"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    valueBar: {
                      ...prev.valueBar,
                      items: prev.valueBar.items.filter(
                        (entry) => entry.id !== item.id
                      ),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Title"
              value={item.title}
              onChange={(v) =>
                setContent((prev) => ({
                  ...prev,
                  valueBar: {
                    ...prev.valueBar,
                    items: prev.valueBar.items.map((entry) =>
                      entry.id === item.id ? { ...entry, title: v } : entry
                    ),
                  },
                }))
              }
            />
            <TextField
              label="Description"
              multiline
              value={item.description}
              onChange={(v) =>
                setContent((prev) => ({
                  ...prev,
                  valueBar: {
                    ...prev.valueBar,
                    items: prev.valueBar.items.map((entry) =>
                      entry.id === item.id
                        ? { ...entry, description: v }
                        : entry
                    ),
                  },
                }))
              }
            />
            <TextField
              label="Icon (users, target, network, chart, handshake)"
              value={item.icon}
              onChange={(v) =>
                setContent((prev) => ({
                  ...prev,
                  valueBar: {
                    ...prev.valueBar,
                    items: prev.valueBar.items.map((entry) =>
                      entry.id === item.id ? { ...entry, icon: v } : entry
                    ),
                  },
                }))
              }
            />
            <ImageField
              label="Icon image (optional, overrides icon name)"
              value={item.image}
              onChange={(v) =>
                setContent((prev) => ({
                  ...prev,
                  valueBar: {
                    ...prev.valueBar,
                    items: prev.valueBar.items.map((entry) =>
                      entry.id === item.id ? { ...entry, image: v } : entry
                    ),
                  },
                }))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add value item"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              valueBar: {
                ...prev.valueBar,
                items: [
                  ...prev.valueBar.items,
                  {
                    id: nextId("value"),
                    title: "New item",
                    description: "",
                    icon: "users",
                    image: "",
                  },
                ],
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Call to action">
        <TextField
          label="Title"
          value={content.cta.title}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, cta: { ...prev.cta, title: v } }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.cta.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              cta: { ...prev.cta, description: v },
            }))
          }
        />
        <TextField
          label="Button"
          value={content.cta.cta.label}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              cta: { ...prev.cta, cta: { ...prev.cta.cta, label: v } },
            }))
          }
        />
      </AdminSection>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white/95 px-4 py-3 lg:left-64">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-xs text-text-muted">
            Unsaved edits stay in this browser until you save.
          </p>
          <button
            type="button"
            onClick={() => void handleSave()}
            className="rounded-md bg-gold px-5 py-2 text-sm font-semibold text-navy disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save industries page"}
          </button>
        </div>
      </div>
    </div>
  );
}
