"use client";

import { useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import {
  type FooterContent,
  type FooterLinkGroup,
  type FooterLinkItem,
  type FooterSocialItem,
} from "@/lib/footer-content";
import { saveFooterContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function withoutYouTube(content: FooterContent): FooterContent {
  return {
    ...content,
    contact: {
      ...content.contact,
      social: content.contact.social.filter(
        (item) => String(item.icon) !== "youtube" && item.label.toLowerCase() !== "youtube"
      ),
    },
  };
}

export function FooterEditor({ initialContent }: { initialContent: FooterContent }) {
  const [content, setContent] = useState(() => withoutYouTube(initialContent));
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const saved = await saveFooterContent(withoutYouTube(content));
      setContent(withoutYouTube(saved));
      setStatus("Footer saved. Refresh any page to see changes.");
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
          <h1 className="text-2xl font-bold text-navy">Footer</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit footer brand, link columns, contact details, and social URLs. Changes go live after you save.
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

      <AdminSection title="Brand">
        <TextField
          label="Company name"
          value={content.companyName}
          onChange={(v) => setContent((prev) => ({ ...prev, companyName: v }))}
        />
        <TextField
          label="Description"
          multiline
          value={content.description}
          onChange={(v) => setContent((prev) => ({ ...prev, description: v }))}
        />
      </AdminSection>

      <AdminSection title="Link columns">
        <div className="space-y-4">
          {content.links.map((group, groupIndex) => (
            <Card key={group.id}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy">Column {groupIndex + 1}</h3>
                <DeleteButton
                  label="Delete column"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      links: prev.links.filter((g) => g.id !== group.id),
                    }))
                  }
                />
              </div>
              <TextField
                label="Column title"
                value={group.title}
                onChange={(v) => updateLinkGroup(setContent, group.id, { title: v })}
              />
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wide text-navy uppercase">
                  Links
                </span>
                {group.items.map((item) => (
                  <div key={item.id} className="flex gap-2">
                    <input
                      className="w-full rounded-md border border-border px-3 py-2 text-sm"
                      value={item.label}
                      onChange={(e) =>
                        updateLinkItem(setContent, group.id, item.id, {
                          label: e.target.value,
                        })
                      }
                      placeholder="Link label"
                    />
                    <DeleteButton
                      onClick={() =>
                        updateLinkGroup(setContent, group.id, {
                          items: group.items.filter((link) => link.id !== item.id),
                        })
                      }
                    />
                  </div>
                ))}
                <AddButton
                  label="Add link"
                  onClick={() =>
                    updateLinkGroup(setContent, group.id, {
                      items: [
                        ...group.items,
                        {
                          id: nextId("link"),
                          label: "New link",
                          href: "/",
                        } satisfies FooterLinkItem,
                      ],
                    })
                  }
                />
              </div>
            </Card>
          ))}
          <AddButton
            label="Add column"
            onClick={() =>
              setContent((prev) => ({
                ...prev,
                links: [
                  ...prev.links,
                  {
                    id: nextId("link-group"),
                    title: "New column",
                    items: [],
                  } satisfies FooterLinkGroup,
                ],
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection title="Contact">
        <TextField
          label="Section title"
          value={content.contact.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              contact: { ...prev.contact, title: v },
            }))
          }
        />
        <TextField
          label="Location"
          multiline
          value={content.contact.location}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              contact: { ...prev.contact, location: v },
            }))
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Mobile"
            value={content.contact.mobile}
            onChange={(v) =>
              setContent((prev) => ({
                ...prev,
                contact: { ...prev.contact, mobile: v },
              }))
            }
          />
          <TextField
            label="Email"
            value={content.contact.email}
            onChange={(v) =>
              setContent((prev) => ({
                ...prev,
                contact: { ...prev.contact, email: v },
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection title="Social links">
        <div className="space-y-4">
          {content.contact.social.map((item) => (
            <Card key={item.id}>
              <h3 className="text-sm font-bold text-navy">{item.label}</h3>
              <TextField
                label="URL"
                value={item.href}
                onChange={(v) => updateSocial(setContent, item.id, { href: v })}
              />
            </Card>
          ))}
          <p className="text-xs text-text-muted">
            Icons stay fixed. Only social profile URLs are editable.
          </p>
        </div>
      </AdminSection>

      <AdminSection title="Copyright">
        <TextField
          label="Copyright text"
          value={content.copyright}
          onChange={(v) => setContent((prev) => ({ ...prev, copyright: v }))}
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
            {saving ? "Saving..." : "Save footer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="space-y-4 rounded-lg border border-border bg-surface-alt p-4">{children}</div>;
}

function updateLinkGroup(
  setContent: Dispatch<SetStateAction<FooterContent>>,
  id: string,
  patch: Partial<FooterLinkGroup>
) {
  setContent((prev) => ({
    ...prev,
    links: prev.links.map((group) => (group.id === id ? { ...group, ...patch } : group)),
  }));
}

function updateLinkItem(
  setContent: Dispatch<SetStateAction<FooterContent>>,
  groupId: string,
  itemId: string,
  patch: Partial<FooterLinkItem>
) {
  setContent((prev) => ({
    ...prev,
    links: prev.links.map((group) =>
      group.id === groupId
        ? {
            ...group,
            items: group.items.map((item) =>
              item.id === itemId ? { ...item, ...patch } : item
            ),
          }
        : group
    ),
  }));
}

function updateSocial(
  setContent: Dispatch<SetStateAction<FooterContent>>,
  id: string,
  patch: Partial<FooterSocialItem>
) {
  setContent((prev) => ({
    ...prev,
    contact: {
      ...prev.contact,
      social: prev.contact.social.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    },
  }));
}
