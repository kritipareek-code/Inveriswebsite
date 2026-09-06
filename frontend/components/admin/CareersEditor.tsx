"use client";

import { useState } from "react";
import {
  type CareersExpectItem,
  type CareersNextStep,
  type CareersPageContent,
} from "@/lib/careers-content";
import type { ContactFaqItem } from "@/lib/contact-content";
import { saveCareersContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

const expectIcons = ["briefcase", "network", "handshake", "growth"] as const;

export function CareersEditor({
  initialContent,
}: {
  initialContent: CareersPageContent;
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
      const saved = await saveCareersContent(content);
      setContent(saved);
      setStatus("Careers page saved. Refresh the public Careers page to see changes.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateExpectItem(id: string, patch: Partial<CareersExpectItem>) {
    setContent((prev) => ({
      ...prev,
      expect: {
        ...prev.expect,
        items: prev.expect.items.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  function updateNextStep(id: string, patch: Partial<CareersNextStep>) {
    setContent((prev) => ({
      ...prev,
      next: {
        ...prev.next,
        steps: prev.next.steps.map((step) =>
          step.id === id ? { ...step, ...patch } : step
        ),
      },
    }));
  }

  function updateFaq(id: string, patch: Partial<ContactFaqItem>) {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: prev.faq.items.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  function updateOptionList(
    key: "interestOptions" | "experienceOptions",
    index: number,
    value: string
  ) {
    setContent((prev) => {
      const list = [...prev.network[key]];
      list[index] = value;
      return {
        ...prev,
        network: { ...prev.network, [key]: list },
      };
    });
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Careers page</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit every section on Careers, including hero and FAQ images, form
            options, and all copy.
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

      <AdminSection title="Hero" defaultOpen>
        <TextField
          label="Tag"
          value={content.hero.tag}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, hero: { ...prev.hero, tag: v } }))
          }
        />
        <TextField
          label="Title (white)"
          value={content.hero.titleWhite}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              hero: { ...prev.hero, titleWhite: v },
            }))
          }
        />
        <TextField
          label="Title (accent)"
          value={content.hero.titleAccent}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              hero: { ...prev.hero, titleAccent: v },
            }))
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
          label="Hero image"
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
        <TextField
          label="Button"
          value={content.hero.cta.label}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              hero: { ...prev.hero, cta: { ...prev.hero.cta, label: v } },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Intro statement">
        <TextField
          label="Statement"
          multiline
          value={content.intro.statement}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              intro: { ...prev.intro, statement: v },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="What you can expect">
        <TextField
          label="Tag"
          value={content.expect.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              expect: { ...prev.expect, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.expect.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              expect: { ...prev.expect, title: v },
            }))
          }
        />
        {content.expect.items.map((item, index) => (
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
                    expect: {
                      ...prev.expect,
                      items: prev.expect.items.filter((entry) => entry.id !== item.id),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Title"
              value={item.title}
              onChange={(v) => updateExpectItem(item.id, { title: v })}
            />
            <TextField
              label="Description"
              multiline
              value={item.description}
              onChange={(v) => updateExpectItem(item.id, { description: v })}
            />
            <TextField
              label="Icon (briefcase, network, handshake, growth)"
              value={item.icon}
              onChange={(v) => updateExpectItem(item.id, { icon: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add expect item"
          onClick={() =>
            setContent((prev) => {
              const nextIndex = prev.expect.items.length;
              return {
                ...prev,
                expect: {
                  ...prev.expect,
                  items: [
                    ...prev.expect.items,
                    {
                      id: nextId("expect"),
                      title: "New item",
                      description: "",
                      icon: expectIcons[nextIndex % expectIcons.length],
                    } satisfies CareersExpectItem,
                  ],
                },
              };
            })
          }
        />
      </AdminSection>

      <AdminSection title="Opportunity banner">
        <TextField
          label="Title"
          value={content.opportunity.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              opportunity: { ...prev.opportunity, title: v },
            }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.opportunity.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              opportunity: { ...prev.opportunity, description: v },
            }))
          }
        />
        <TextField
          label="Email label"
          value={content.opportunity.emailLabel}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              opportunity: { ...prev.opportunity, emailLabel: v },
            }))
          }
        />
        <TextField
          label="Email"
          value={content.opportunity.email}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              opportunity: { ...prev.opportunity, email: v },
            }))
          }
        />
        <TextField
          label="Button"
          value={content.opportunity.cta.label}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              opportunity: {
                ...prev.opportunity,
                cta: { ...prev.opportunity.cta, label: v },
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Talent network">
        <TextField
          label="Tag"
          value={content.network.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              network: { ...prev.network, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.network.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              network: { ...prev.network, title: v },
            }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.network.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              network: { ...prev.network, description: v },
            }))
          }
        />
        <TextField
          label="Form title"
          value={content.network.formTitle}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              network: { ...prev.network, formTitle: v },
            }))
          }
        />
        <TextField
          label="Submit button"
          value={content.network.submitLabel}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              network: { ...prev.network, submitLabel: v },
            }))
          }
        />

        <span className="text-xs font-semibold tracking-wide text-navy uppercase">
          Areas of interest
        </span>
        {content.network.interestOptions.map((option, index) => (
          <div key={`interest-${index}`} className="flex gap-2">
            <input
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
              value={option}
              onChange={(e) =>
                updateOptionList("interestOptions", index, e.target.value)
              }
            />
            <DeleteButton
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  network: {
                    ...prev.network,
                    interestOptions: prev.network.interestOptions.filter(
                      (_, i) => i !== index
                    ),
                  },
                }))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add interest option"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              network: {
                ...prev.network,
                interestOptions: [...prev.network.interestOptions, "New area"],
              },
            }))
          }
        />

        <span className="text-xs font-semibold tracking-wide text-navy uppercase">
          Experience options
        </span>
        {content.network.experienceOptions.map((option, index) => (
          <div key={`experience-${index}`} className="flex gap-2">
            <input
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
              value={option}
              onChange={(e) =>
                updateOptionList("experienceOptions", index, e.target.value)
              }
            />
            <DeleteButton
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  network: {
                    ...prev.network,
                    experienceOptions: prev.network.experienceOptions.filter(
                      (_, i) => i !== index
                    ),
                  },
                }))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add experience option"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              network: {
                ...prev.network,
                experienceOptions: [...prev.network.experienceOptions, "New option"],
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="What happens next">
        <TextField
          label="Title"
          value={content.next.title}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, next: { ...prev.next, title: v } }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.next.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              next: { ...prev.next, description: v },
            }))
          }
        />
        {content.next.steps.map((step, index) => (
          <div
            key={step.id}
            className="space-y-4 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Step {index + 1}</h3>
              <DeleteButton
                label="Delete step"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    next: {
                      ...prev.next,
                      steps: prev.next.steps.filter((entry) => entry.id !== step.id),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Title"
              value={step.title}
              onChange={(v) => updateNextStep(step.id, { title: v })}
            />
            <TextField
              label="Description"
              multiline
              value={step.description}
              onChange={(v) => updateNextStep(step.id, { description: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add step"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              next: {
                ...prev.next,
                steps: [
                  ...prev.next.steps,
                  {
                    id: nextId("next"),
                    title: "New step",
                    description: "",
                  } satisfies CareersNextStep,
                ],
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="FAQ">
        <TextField
          label="Tag"
          value={content.faq.tag || ""}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              faq: { ...prev.faq, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.faq.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              faq: { ...prev.faq, title: v },
            }))
          }
        />
        <TextField
          label="Still have questions text"
          value={content.faq.stillHaveQuestions}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              faq: { ...prev.faq, stillHaveQuestions: v },
            }))
          }
        />
        <TextField
          label="Button label"
          value={content.faq.ctaLabel}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              faq: { ...prev.faq, ctaLabel: v },
            }))
          }
        />
        <span className="text-xs font-semibold tracking-wide text-navy uppercase">
          Team avatars
        </span>
        {content.faq.avatars.map((avatar, index) => (
          <div key={`avatar-${index}`} className="space-y-2">
            <ImageField
              label={`Avatar ${index + 1}`}
              value={avatar}
              onChange={(v) =>
                setContent((prev) => {
                  const avatars = [...prev.faq.avatars];
                  avatars[index] = v;
                  return {
                    ...prev,
                    faq: { ...prev.faq, avatars },
                  };
                })
              }
            />
            <DeleteButton
              label="Remove avatar"
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  faq: {
                    ...prev.faq,
                    avatars: prev.faq.avatars.filter((_, i) => i !== index),
                  },
                }))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add avatar"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              faq: {
                ...prev.faq,
                avatars: [...prev.faq.avatars, ""],
              },
            }))
          }
        />
        {content.faq.items.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">FAQ {index + 1}</h3>
              <DeleteButton
                label="Delete"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    faq: {
                      ...prev.faq,
                      items: prev.faq.items.filter((entry) => entry.id !== item.id),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Question"
              value={item.question}
              onChange={(v) => updateFaq(item.id, { question: v })}
            />
            <TextField
              label="Answer"
              multiline
              value={item.answer}
              onChange={(v) => updateFaq(item.id, { answer: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add FAQ"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              faq: {
                ...prev.faq,
                items: [
                  ...prev.faq.items,
                  {
                    id: nextId("careers-faq"),
                    question: "New question",
                    answer: "",
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
            {saving ? "Saving..." : "Save careers page"}
          </button>
        </div>
      </div>
    </div>
  );
}
