"use client";

import { useState } from "react";
import { type AboutPageContent } from "@/lib/about-content";
import { saveAboutContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

export function AboutEditor({ initialContent }: { initialContent: AboutPageContent }) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const saved = await saveAboutContent(content);
      setContent(saved);
      setStatus("About page saved. Refresh the public About page to see changes.");
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
          <h1 className="text-2xl font-bold text-navy">About page</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit every block on the About page. Changes go live after you save.
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

      <AdminSection title="Who we are">
        <TextField
          label="Tag"
          value={content.whoWeAre.tag}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, whoWeAre: { ...prev.whoWeAre, tag: v } }))
          }
        />
        <TextField
          label="Title"
          value={content.whoWeAre.title}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, whoWeAre: { ...prev.whoWeAre, title: v } }))
          }
        />
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wide text-navy uppercase">
            Paragraphs
          </span>
          {content.whoWeAre.paragraphs.map((paragraph, index) => (
            <div key={`who-p-${index}`} className="flex gap-2">
              <textarea
                rows={3}
                className="min-h-20 w-full resize-y rounded-md border border-border px-3 py-2 text-sm"
                value={paragraph}
                onChange={(e) => {
                  const paragraphs = [...content.whoWeAre.paragraphs];
                  paragraphs[index] = e.target.value;
                  setContent((prev) => ({
                    ...prev,
                    whoWeAre: { ...prev.whoWeAre, paragraphs },
                  }));
                }}
              />
              <DeleteButton
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    whoWeAre: {
                      ...prev.whoWeAre,
                      paragraphs: prev.whoWeAre.paragraphs.filter((_, i) => i !== index),
                    },
                  }))
                }
              />
            </div>
          ))}
          <AddButton
            label="Add paragraph"
            onClick={() =>
              setContent((prev) => ({
                ...prev,
                whoWeAre: {
                  ...prev.whoWeAre,
                  paragraphs: [...prev.whoWeAre.paragraphs, ""],
                },
              }))
            }
          />
        </div>
        <TextField
          label="Highlight phrase"
          value={content.whoWeAre.highlightPhrase}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              whoWeAre: { ...prev.whoWeAre, highlightPhrase: v },
            }))
          }
        />
        <TextField
          label="Button"
          value={content.whoWeAre.cta.label}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              whoWeAre: { ...prev.whoWeAre, cta: { ...prev.whoWeAre.cta, label: v } },
            }))
          }
        />
        <ImageField
          label="Image"
          value={content.whoWeAre.image}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, whoWeAre: { ...prev.whoWeAre, image: v } }))
          }
        />
        <TextField
          label="Image alt text"
          value={content.whoWeAre.imageAlt || ""}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              whoWeAre: { ...prev.whoWeAre, imageAlt: v },
            }))
          }
        />
        <TextField
          label="Card title"
          value={content.whoWeAre.card.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              whoWeAre: { ...prev.whoWeAre, card: { ...prev.whoWeAre.card, title: v } },
            }))
          }
        />
        <TextField
          label="Card description"
          multiline
          value={content.whoWeAre.card.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              whoWeAre: {
                ...prev.whoWeAre,
                card: { ...prev.whoWeAre.card, description: v },
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Mission & vision">
        <TextField
          label="Section tag"
          value={content.missionVision.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: { ...prev.missionVision, tag: v },
            }))
          }
        />
        <TextField
          label="Section title"
          value={content.missionVision.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: { ...prev.missionVision, title: v },
            }))
          }
        />
        <ImageField
          label="Background image"
          value={content.missionVision.backgroundImage}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: { ...prev.missionVision, backgroundImage: v },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Mission">
        <TextField
          label="Tag"
          value={content.missionVision.mission.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                mission: { ...prev.missionVision.mission, tag: v },
              },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.missionVision.mission.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                mission: { ...prev.missionVision.mission, title: v },
              },
            }))
          }
        />
        <TextField
          label="Icon (target, eye)"
          value={content.missionVision.mission.icon}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                mission: { ...prev.missionVision.mission, icon: v },
              },
            }))
          }
        />
        {content.missionVision.mission.items.map((item, index) => (
          <div key={`mission-item-${index}`} className="flex gap-2">
            <textarea
              rows={2}
              className="min-h-16 w-full resize-y rounded-md border border-border px-3 py-2 text-sm"
              value={item}
              onChange={(e) => {
                const items = [...content.missionVision.mission.items];
                items[index] = e.target.value;
                setContent((prev) => ({
                  ...prev,
                  missionVision: {
                    ...prev.missionVision,
                    mission: { ...prev.missionVision.mission, items },
                  },
                }));
              }}
            />
            <DeleteButton
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  missionVision: {
                    ...prev.missionVision,
                    mission: {
                      ...prev.missionVision.mission,
                      items: prev.missionVision.mission.items.filter((_, i) => i !== index),
                    },
                  },
                }))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add mission point"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                mission: {
                  ...prev.missionVision.mission,
                  items: [...prev.missionVision.mission.items, ""],
                },
              },
            }))
          }
        />
        <TextField
          label="Footer prefix"
          value={content.missionVision.mission.footer.prefix}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                mission: {
                  ...prev.missionVision.mission,
                  footer: { ...prev.missionVision.mission.footer, prefix: v },
                },
              },
            }))
          }
        />
        <TextField
          label="Footer highlight"
          multiline
          value={content.missionVision.mission.footer.highlight}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                mission: {
                  ...prev.missionVision.mission,
                  footer: { ...prev.missionVision.mission.footer, highlight: v },
                },
              },
            }))
          }
        />
        <TextField
          label="Footer icon (diamond, chart)"
          value={content.missionVision.mission.footer.icon}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                mission: {
                  ...prev.missionVision.mission,
                  footer: { ...prev.missionVision.mission.footer, icon: v },
                },
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Vision">
        <TextField
          label="Tag"
          value={content.missionVision.vision.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                vision: { ...prev.missionVision.vision, tag: v },
              },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.missionVision.vision.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                vision: { ...prev.missionVision.vision, title: v },
              },
            }))
          }
        />
        <TextField
          label="Icon (target, eye)"
          value={content.missionVision.vision.icon}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                vision: { ...prev.missionVision.vision, icon: v },
              },
            }))
          }
        />
        {content.missionVision.vision.items.map((item, index) => (
          <div key={`vision-item-${index}`} className="flex gap-2">
            <textarea
              rows={2}
              className="min-h-16 w-full resize-y rounded-md border border-border px-3 py-2 text-sm"
              value={item}
              onChange={(e) => {
                const items = [...content.missionVision.vision.items];
                items[index] = e.target.value;
                setContent((prev) => ({
                  ...prev,
                  missionVision: {
                    ...prev.missionVision,
                    vision: { ...prev.missionVision.vision, items },
                  },
                }));
              }}
            />
            <DeleteButton
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  missionVision: {
                    ...prev.missionVision,
                    vision: {
                      ...prev.missionVision.vision,
                      items: prev.missionVision.vision.items.filter((_, i) => i !== index),
                    },
                  },
                }))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add vision point"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                vision: {
                  ...prev.missionVision.vision,
                  items: [...prev.missionVision.vision.items, ""],
                },
              },
            }))
          }
        />
        <TextField
          label="Footer text"
          multiline
          value={content.missionVision.vision.footer.text}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                vision: {
                  ...prev.missionVision.vision,
                  footer: { ...prev.missionVision.vision.footer, text: v },
                },
              },
            }))
          }
        />
        <TextField
          label="Footer icon (diamond, chart)"
          value={content.missionVision.vision.footer.icon}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              missionVision: {
                ...prev.missionVision,
                vision: {
                  ...prev.missionVision.vision,
                  footer: { ...prev.missionVision.vision.footer, icon: v },
                },
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
            {saving ? "Saving..." : "Save about page"}
          </button>
        </div>
      </div>
    </div>
  );
}
