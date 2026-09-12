"use client";

import { useState } from "react";
import { type ServicesLineItem, type ServicesPageContent } from "@/lib/services-content";
import { saveServicesContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

const lineIcons = ["consulting", "recruitment", "compliance", "audit"] as const;

export function ServicesEditor({ initialContent }: { initialContent: ServicesPageContent }) {
  const [content, setContent] = useState(() =>
    initialContent.consultingCall
      ? initialContent
      : {
          ...initialContent,
          consultingCall: {
            tag: "BOOK A CALL",
            title: "Book a Consulting Call",
            description: "",
            submitLabel: "Request a call",
            images: [],
          },
        }
  );
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const saved = await saveServicesContent(content);
      setContent(saved);
      setStatus("Services page saved. Refresh the public Services page to see changes.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateLine(id: string, patch: Partial<ServicesLineItem>) {
    setContent((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        serviceLines: prev.offer.serviceLines.map((line) =>
          line.id === id ? { ...line, ...patch } : line
        ),
      },
    }));
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Services page</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit every block on the Services page. Changes go live after you save.
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
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{status}</p>
      ) : null}
      {error ? (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <AdminSection title="Hero" defaultOpen>
        <TextField
          label="Tag"
          value={content.hero.tag}
          onChange={(v) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, tag: v } }))}
        />
        <TextField
          label="Title"
          value={content.hero.title}
          onChange={(v) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, title: v } }))}
        />
        <TextField
          label="Description"
          multiline
          value={content.hero.description}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, hero: { ...prev.hero, description: v } }))
          }
        />
        <ImageField
          label="Hero image"
          value={content.hero.image}
          onChange={(v) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, image: v } }))}
        />
        <TextField
          label="Image alt text"
          value={content.hero.imageAlt}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, hero: { ...prev.hero, imageAlt: v } }))
          }
        />
      </AdminSection>

      <AdminSection title="What we offer">
        <TextField
          label="Tag"
          value={content.offer.tag}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, offer: { ...prev.offer, tag: v } }))
          }
        />
        <TextField
          label="Title"
          value={content.offer.title}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, offer: { ...prev.offer, title: v } }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.offer.description}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, offer: { ...prev.offer, description: v } }))
          }
        />

        {content.offer.serviceLines.map((line, index) => (
          <div key={line.id} className="space-y-4 rounded-lg border border-border bg-surface-alt p-4">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Service line {index + 1}</h3>
              <DeleteButton
                label="Delete service line"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    offer: {
                      ...prev.offer,
                      serviceLines: prev.offer.serviceLines.filter((item) => item.id !== line.id),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Title"
              value={line.title}
              onChange={(v) => updateLine(line.id, { title: v })}
            />
            <TextField
              label="Description"
              multiline
              value={line.description}
              onChange={(v) => updateLine(line.id, { description: v })}
            />
            <ImageField
              label="Image"
              value={line.image}
              onChange={(v) => updateLine(line.id, { image: v })}
            />
            <TextField
              label="Icon (consulting, recruitment, compliance, audit)"
              value={line.icon}
              onChange={(v) => updateLine(line.id, { icon: v })}
            />
            <TextField
              label="Image position (left or right)"
              value={line.imagePosition}
              onChange={(v) =>
                updateLine(line.id, {
                  imagePosition: v === "right" ? "right" : "left",
                })
              }
            />
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wide text-navy uppercase">
                Bullet points
              </span>
              {line.items.map((item, itemIndex) => (
                <div key={`${line.id}-${itemIndex}`} className="flex gap-2">
                  <input
                    className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    value={item}
                    onChange={(e) => {
                      const items = [...line.items];
                      items[itemIndex] = e.target.value;
                      updateLine(line.id, { items });
                    }}
                  />
                  <DeleteButton
                    onClick={() =>
                      updateLine(line.id, {
                        items: line.items.filter((_, i) => i !== itemIndex),
                      })
                    }
                  />
                </div>
              ))}
              <AddButton
                label="Add bullet"
                onClick={() => updateLine(line.id, { items: [...line.items, ""] })}
              />
            </div>
          </div>
        ))}
        <AddButton
          label="Add service line"
          onClick={() =>
            setContent((prev) => {
              const nextIndex = prev.offer.serviceLines.length;
              return {
                ...prev,
                offer: {
                  ...prev.offer,
                  serviceLines: [
                    ...prev.offer.serviceLines,
                    {
                      id: nextId("line"),
                      title: "New service",
                      description: "",
                      items: [],
                      image: "",
                      icon: lineIcons[nextIndex % lineIcons.length],
                      imagePosition: nextIndex % 2 === 0 ? "right" : "left",
                    } satisfies ServicesLineItem,
                  ],
                },
              };
            })
          }
        />
      </AdminSection>

      <AdminSection title="Book a consulting call">
        <TextField
          label="Tag"
          value={content.consultingCall.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              consultingCall: { ...prev.consultingCall, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.consultingCall.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              consultingCall: { ...prev.consultingCall, title: v },
            }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.consultingCall.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              consultingCall: { ...prev.consultingCall, description: v },
            }))
          }
        />
        <TextField
          label="Button label"
          value={content.consultingCall.submitLabel}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              consultingCall: { ...prev.consultingCall, submitLabel: v },
            }))
          }
        />
        {content.consultingCall.images.map((image, index) => (
          <div key={image.id} className="space-y-4 rounded-lg border border-border bg-surface-alt p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Image {index + 1}</h3>
              <DeleteButton
                label="Delete image"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    consultingCall: {
                      ...prev.consultingCall,
                      images: prev.consultingCall.images.filter((entry) => entry.id !== image.id),
                    },
                  }))
                }
              />
            </div>
            <ImageField
              label="Image"
              value={image.src}
              onChange={(v) =>
                setContent((prev) => ({
                  ...prev,
                  consultingCall: {
                    ...prev.consultingCall,
                    images: prev.consultingCall.images.map((entry) =>
                      entry.id === image.id ? { ...entry, src: v } : entry
                    ),
                  },
                }))
              }
            />
            <TextField
              label="Alt text"
              value={image.alt}
              onChange={(v) =>
                setContent((prev) => ({
                  ...prev,
                  consultingCall: {
                    ...prev.consultingCall,
                    images: prev.consultingCall.images.map((entry) =>
                      entry.id === image.id ? { ...entry, alt: v } : entry
                    ),
                  },
                }))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add image"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              consultingCall: {
                ...prev.consultingCall,
                images: [
                  ...prev.consultingCall.images,
                  { id: nextId("consult-img"), src: "", alt: "" },
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
          onChange={(v) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, title: v } }))}
        />
        <TextField
          label="Description"
          multiline
          value={content.cta.description}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, cta: { ...prev.cta, description: v } }))
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
          <p className="text-xs text-text-muted">Unsaved edits stay in this browser until you save.</p>
          <button
            type="button"
            onClick={() => void handleSave()}
            className="rounded-md bg-gold px-5 py-2 text-sm font-semibold text-navy disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save services page"}
          </button>
        </div>
      </div>
    </div>
  );
}
