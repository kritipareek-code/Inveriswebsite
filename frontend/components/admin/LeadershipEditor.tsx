"use client";

import { useState } from "react";
import {
  type LeadershipPageContent,
  type LeadershipPhilosophyItem,
  type LeadershipTeamMember,
  type LeadershipValueItem,
} from "@/lib/leadership-content";
import { saveLeadershipContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

const philosophyIcons = ["user", "target", "shield", "chart"] as const;
const valueIcons = [
  "handshake",
  "users",
  "award",
  "lightbulb",
  "mountain",
  "target",
] as const;

export function LeadershipEditor({
  initialContent,
}: {
  initialContent: LeadershipPageContent;
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
      const saved = await saveLeadershipContent(content);
      setContent(saved);
      setStatus(
        "Leadership page saved. Refresh the public Leadership page to see changes."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateMember(id: string, patch: Partial<LeadershipTeamMember>) {
    setContent((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.map((member) =>
          member.id === id ? { ...member, ...patch } : member
        ),
      },
    }));
  }

  function updatePhilosophyItem(
    id: string,
    patch: Partial<LeadershipPhilosophyItem>
  ) {
    setContent((prev) => ({
      ...prev,
      philosophy: {
        ...prev.philosophy,
        items: prev.philosophy.items.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  function updateValueItem(id: string, patch: Partial<LeadershipValueItem>) {
    setContent((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        items: prev.values.items.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Leadership page</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit every section on Leadership, including hero and team images,
            values background, and all copy.
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
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wide text-navy uppercase">
            Paragraphs
          </span>
          {content.hero.paragraphs.map((paragraph, index) => (
            <div key={`hero-p-${index}`} className="flex gap-2">
              <textarea
                className="min-h-24 w-full rounded-md border border-border px-3 py-2 text-sm"
                value={paragraph}
                onChange={(e) => {
                  const paragraphs = [...content.hero.paragraphs];
                  paragraphs[index] = e.target.value;
                  setContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, paragraphs },
                  }));
                }}
              />
              <DeleteButton
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      paragraphs: prev.hero.paragraphs.filter(
                        (_, i) => i !== index
                      ),
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
                hero: {
                  ...prev.hero,
                  paragraphs: [...prev.hero.paragraphs, ""],
                },
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection title="Leadership philosophy">
        <TextField
          label="Tag"
          value={content.philosophy.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              philosophy: { ...prev.philosophy, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.philosophy.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              philosophy: { ...prev.philosophy, title: v },
            }))
          }
        />
        <TextField
          label="Description"
          multiline
          value={content.philosophy.description}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              philosophy: { ...prev.philosophy, description: v },
            }))
          }
        />
        {content.philosophy.items.map((item, index) => (
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
                    philosophy: {
                      ...prev.philosophy,
                      items: prev.philosophy.items.filter(
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
              onChange={(v) => updatePhilosophyItem(item.id, { title: v })}
            />
            <TextField
              label="Description"
              multiline
              value={item.description}
              onChange={(v) =>
                updatePhilosophyItem(item.id, { description: v })
              }
            />
            <TextField
              label="Icon (user, target, shield, chart)"
              value={item.icon}
              onChange={(v) => updatePhilosophyItem(item.id, { icon: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add philosophy item"
          onClick={() =>
            setContent((prev) => {
              const nextIndex = prev.philosophy.items.length;
              return {
                ...prev,
                philosophy: {
                  ...prev.philosophy,
                  items: [
                    ...prev.philosophy.items,
                    {
                      id: nextId("philosophy"),
                      title: "New item",
                      description: "",
                      icon: philosophyIcons[nextIndex % philosophyIcons.length],
                    } satisfies LeadershipPhilosophyItem,
                  ],
                },
              };
            })
          }
        />
      </AdminSection>

      <AdminSection title="Leadership team">
        <TextField
          label="Tag"
          value={content.team.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              team: { ...prev.team, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.team.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              team: { ...prev.team, title: v },
            }))
          }
        />
        {content.team.members.map((member, index) => (
          <div
            key={member.id}
            className="space-y-4 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">
                Person {index + 1}
              </h3>
              <DeleteButton
                label="Delete person"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    team: {
                      ...prev.team,
                      members: prev.team.members.filter(
                        (entry) => entry.id !== member.id
                      ),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Name"
              value={member.name}
              onChange={(v) => updateMember(member.id, { name: v })}
            />
            <TextField
              label="Role"
              value={member.role}
              onChange={(v) => updateMember(member.id, { role: v })}
            />
            <TextField
              label="Bio"
              multiline
              value={member.bio}
              onChange={(v) => updateMember(member.id, { bio: v })}
            />
            <ImageField
              label="Photo"
              value={member.image}
              onChange={(v) => updateMember(member.id, { image: v })}
            />
            <TextField
              label="LinkedIn URL"
              value={member.linkedin}
              onChange={(v) => updateMember(member.id, { linkedin: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add person"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              team: {
                ...prev.team,
                members: [
                  ...prev.team.members,
                  {
                    id: nextId("member"),
                    name: "NEW PERSON",
                    role: "Role",
                    bio: "",
                    image: "",
                    linkedin: "https://linkedin.com",
                  } satisfies LeadershipTeamMember,
                ],
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Core values">
        <TextField
          label="Tag"
          value={content.values.tag}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              values: { ...prev.values, tag: v },
            }))
          }
        />
        <TextField
          label="Title"
          value={content.values.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              values: { ...prev.values, title: v },
            }))
          }
        />
        <ImageField
          label="Background image"
          value={content.values.backgroundImage}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              values: { ...prev.values, backgroundImage: v },
            }))
          }
        />
        {content.values.items.map((item, index) => (
          <div
            key={item.id}
            className="space-y-4 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Value {index + 1}</h3>
              <DeleteButton
                label="Delete value"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    values: {
                      ...prev.values,
                      items: prev.values.items.filter(
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
              onChange={(v) => updateValueItem(item.id, { title: v })}
            />
            <TextField
              label="Description"
              multiline
              value={item.description}
              onChange={(v) => updateValueItem(item.id, { description: v })}
            />
            <TextField
              label="Icon (handshake, users, award, lightbulb, mountain, target)"
              value={item.icon}
              onChange={(v) => updateValueItem(item.id, { icon: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add value"
          onClick={() =>
            setContent((prev) => {
              const nextIndex = prev.values.items.length;
              return {
                ...prev,
                values: {
                  ...prev.values,
                  items: [
                    ...prev.values.items,
                    {
                      id: nextId("value"),
                      title: "New value",
                      description: "",
                      icon: valueIcons[nextIndex % valueIcons.length],
                    } satisfies LeadershipValueItem,
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
        <TextField
          label="Button link"
          value={content.cta.cta.href}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              cta: { ...prev.cta, cta: { ...prev.cta.cta, href: v } },
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
            {saving ? "Saving..." : "Save leadership page"}
          </button>
        </div>
      </div>
    </div>
  );
}
