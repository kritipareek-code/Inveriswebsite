"use client";

import { useState } from "react";
import {
  type ApproachExpertiseNode,
  type ApproachFourStepItem,
  type ApproachPageContent,
  type ApproachPathStep,
} from "@/lib/approach-content";
import { saveApproachContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

const stepIcons = ["search", "pen", "play", "chart"] as const;
const nodeIcons = ["users", "finance", "compliance", "risk", "strategy"] as const;
const nodePositions = [
  "top",
  "top-right",
  "bottom-right",
  "bottom-left",
  "top-left",
] as const;

export function ApproachEditor({
  initialContent,
}: {
  initialContent: ApproachPageContent;
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
      const saved = await saveApproachContent(content);
      setContent(saved);
      setStatus(
        "Approach page saved. Refresh the public Approach page to see changes."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updatePathStep(id: string, patch: Partial<ApproachPathStep>) {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        pathSteps: prev.hero.pathSteps.map((step) =>
          step.id === id ? { ...step, ...patch } : step
        ),
      },
    }));
  }

  function updateStep(id: string, patch: Partial<ApproachFourStepItem>) {
    setContent((prev) => ({
      ...prev,
      fourSteps: {
        ...prev.fourSteps,
        steps: prev.fourSteps.steps.map((step) =>
          step.id === id ? { ...step, ...patch } : step
        ),
      },
    }));
  }

  function updateNode(id: string, patch: Partial<ApproachExpertiseNode>) {
    setContent((prev) => ({
      ...prev,
      connectedExpertise: {
        ...prev.connectedExpertise,
        nodes: prev.connectedExpertise.nodes.map((node) =>
          node.id === id ? { ...node, ...patch } : node
        ),
      },
    }));
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Approach page</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit every section on Approach, including images and labels.
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
          label="Image"
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
        <div className="space-y-4">
          <span className="text-xs font-semibold tracking-wide text-navy uppercase">
            Path step labels
          </span>
          {content.hero.pathSteps.map((step, index) => (
            <div
              key={step.id}
              className="space-y-3 rounded-lg border border-border bg-surface-alt p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy">
                  Path step {index + 1}
                </h3>
                <DeleteButton
                  label="Delete"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        pathSteps: prev.hero.pathSteps.filter(
                          (entry) => entry.id !== step.id
                        ),
                      },
                    }))
                  }
                />
              </div>
              <TextField
                label="Number"
                value={step.number}
                onChange={(v) => updatePathStep(step.id, { number: v })}
              />
              <TextField
                label="Title"
                value={step.title}
                onChange={(v) => updatePathStep(step.id, { title: v })}
              />
            </div>
          ))}
          <AddButton
            label="Add path step"
            onClick={() =>
              setContent((prev) => ({
                ...prev,
                hero: {
                  ...prev.hero,
                  pathSteps: [
                    ...prev.hero.pathSteps,
                    {
                      id: nextId("path"),
                      number: String(prev.hero.pathSteps.length + 1).padStart(
                        2,
                        "0"
                      ),
                      title: "New step",
                      position: "bottom-[50%] left-[40%]",
                    },
                  ],
                },
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection title="Four-step approach">
        <TextField
          label="Tag"
          value={content.fourSteps.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              fourSteps: { ...prev.fourSteps, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.fourSteps.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              fourSteps: { ...prev.fourSteps, title: v },
            }))
          }
        />
        <TextField
          label="Subtitle"
          multiline
          value={content.fourSteps.subtitle}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              fourSteps: { ...prev.fourSteps, subtitle: v },
            }))
          }
        />
        {content.fourSteps.steps.map((step, index) => (
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
                    fourSteps: {
                      ...prev.fourSteps,
                      steps: prev.fourSteps.steps.filter(
                        (entry) => entry.id !== step.id
                      ),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Number"
              value={step.number}
              onChange={(v) => updateStep(step.id, { number: v })}
            />
            <TextField
              label="Title"
              value={step.title}
              onChange={(v) => updateStep(step.id, { title: v })}
            />
            <TextField
              label="Description"
              multiline
              value={step.description}
              onChange={(v) => updateStep(step.id, { description: v })}
            />
            <TextField
              label="Icon (search, pen, play, chart)"
              value={step.icon}
              onChange={(v) => updateStep(step.id, { icon: v })}
            />
            <ImageField
              label="Icon image (optional, overrides icon name)"
              value={step.image}
              onChange={(v) => updateStep(step.id, { image: v })}
            />
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wide text-navy uppercase">
                Bullet points
              </span>
              {step.items.map((item, itemIndex) => (
                <div key={`${step.id}-${itemIndex}`} className="flex gap-2">
                  <input
                    className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    value={item}
                    onChange={(e) => {
                      const items = [...step.items];
                      items[itemIndex] = e.target.value;
                      updateStep(step.id, { items });
                    }}
                  />
                  <DeleteButton
                    onClick={() =>
                      updateStep(step.id, {
                        items: step.items.filter((_, i) => i !== itemIndex),
                      })
                    }
                  />
                </div>
              ))}
              <AddButton
                label="Add bullet"
                onClick={() =>
                  updateStep(step.id, { items: [...step.items, ""] })
                }
              />
            </div>
          </div>
        ))}
        <AddButton
          label="Add step"
          onClick={() =>
            setContent((prev) => {
              const nextIndex = prev.fourSteps.steps.length;
              return {
                ...prev,
                fourSteps: {
                  ...prev.fourSteps,
                  steps: [
                    ...prev.fourSteps.steps,
                    {
                      id: nextId("step"),
                      number: String(nextIndex + 1).padStart(2, "0"),
                      title: "New step",
                      description: "",
                      icon: stepIcons[nextIndex % stepIcons.length],
                      image: "",
                      items: [],
                    } satisfies ApproachFourStepItem,
                  ],
                },
              };
            })
          }
        />
      </AdminSection>

      <AdminSection title="Connected expertise">
        <TextField
          label="Title"
          value={content.connectedExpertise.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              connectedExpertise: {
                ...prev.connectedExpertise,
                title: v,
              },
            }))
          }
        />
        <TextField
          label="Title accent"
          value={content.connectedExpertise.titleAccent}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              connectedExpertise: {
                ...prev.connectedExpertise,
                titleAccent: v,
              },
            }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.connectedExpertise.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              connectedExpertise: {
                ...prev.connectedExpertise,
                description: v,
              },
            }))
          }
        />
        <TextField
          label="Quote"
          multiline
          value={content.connectedExpertise.quote}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              connectedExpertise: {
                ...prev.connectedExpertise,
                quote: v,
              },
            }))
          }
        />
        <ImageField
          label="Diagram center image"
          value={content.connectedExpertise.image}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              connectedExpertise: {
                ...prev.connectedExpertise,
                image: v,
              },
            }))
          }
        />
        <TextField
          label="Diagram image alt text"
          value={content.connectedExpertise.imageAlt}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              connectedExpertise: {
                ...prev.connectedExpertise,
                imageAlt: v,
              },
            }))
          }
        />
        {content.connectedExpertise.nodes.map((node, index) => (
          <div
            key={node.id}
            className="space-y-4 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Node {index + 1}</h3>
              <DeleteButton
                label="Delete node"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    connectedExpertise: {
                      ...prev.connectedExpertise,
                      nodes: prev.connectedExpertise.nodes.filter(
                        (entry) => entry.id !== node.id
                      ),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Label"
              value={node.label}
              onChange={(v) => updateNode(node.id, { label: v })}
            />
            <TextField
              label="Description"
              value={node.description}
              onChange={(v) => updateNode(node.id, { description: v })}
            />
            <TextField
              label="Icon (users, finance, compliance, risk, strategy)"
              value={node.icon}
              onChange={(v) => updateNode(node.id, { icon: v })}
            />
            <TextField
              label="Position (top, top-right, bottom-right, bottom-left, top-left)"
              value={node.position}
              onChange={(v) => updateNode(node.id, { position: v })}
            />
            <TextField
              label="Align (left, right)"
              value={node.align}
              onChange={(v) => updateNode(node.id, { align: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add node"
          onClick={() =>
            setContent((prev) => {
              const nextIndex = prev.connectedExpertise.nodes.length;
              return {
                ...prev,
                connectedExpertise: {
                  ...prev.connectedExpertise,
                  nodes: [
                    ...prev.connectedExpertise.nodes,
                    {
                      id: nextId("node"),
                      label: "NEW",
                      description: "",
                      icon: nodeIcons[nextIndex % nodeIcons.length],
                      position:
                        nodePositions[nextIndex % nodePositions.length],
                      align: nextIndex % 2 === 0 ? "right" : "left",
                    } satisfies ApproachExpertiseNode,
                  ],
                },
              };
            })
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
            {saving ? "Saving..." : "Save approach page"}
          </button>
        </div>
      </div>
    </div>
  );
}
