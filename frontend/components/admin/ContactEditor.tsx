"use client";

import { useState } from "react";
import {
  normalizeContactContent,
  type ContactAddressEntry,
  type ContactFaqItem,
  type ContactInfoEntry,
  type ContactPageContent,
} from "@/lib/contact-content";
import { saveContactContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export function ContactEditor({
  initialContent,
}: {
  initialContent: ContactPageContent;
}) {
  const [content, setContent] = useState(() =>
    normalizeContactContent(initialContent)
  );
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const saved = await saveContactContent(content);
      setContent(normalizeContactContent(saved));
      setStatus("Contact page saved. Refresh the public Contact page to see changes.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateEmail(id: string, patch: Partial<ContactInfoEntry>) {
    setContent((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        emails: prev.contactInfo.emails.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  function updatePhone(id: string, patch: Partial<ContactInfoEntry>) {
    setContent((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        phones: prev.contactInfo.phones.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  function updateAddress(id: string, patch: Partial<ContactAddressEntry>) {
    setContent((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        addresses: prev.contactInfo.addresses.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    }));
  }

  function updateFaq(id: string, patch: Partial<ContactFaqItem>) {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: prev.faq.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }));
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Contact page</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit hero, form, contact details, office map, and FAQ. Add multiple
            emails, phone numbers, and addresses.
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

      <AdminSection title="Hero">
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
          label="Image"
          value={content.hero.image}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, hero: { ...prev.hero, image: v } }))
          }
        />
      </AdminSection>

      <AdminSection title="Contact form">
        <TextField
          label="Form title"
          value={content.form.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              form: { ...prev.form, title: v },
            }))
          }
        />
        {content.form.enquiryTypes.map((type, index) => (
          <div key={`enquiry-${index}`} className="flex gap-2">
            <input
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
              value={type}
              onChange={(e) => {
                const enquiryTypes = [...content.form.enquiryTypes];
                enquiryTypes[index] = e.target.value;
                setContent((prev) => ({
                  ...prev,
                  form: { ...prev.form, enquiryTypes },
                }));
              }}
            />
            <DeleteButton
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  form: {
                    ...prev.form,
                    enquiryTypes: prev.form.enquiryTypes.filter((_, i) => i !== index),
                  },
                }))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add enquiry type"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              form: {
                ...prev.form,
                enquiryTypes: [...prev.form.enquiryTypes, "New enquiry type"],
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Get in touch (right column)">
        <TextField
          label="Section title"
          value={content.contactInfo.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, title: v },
            }))
          }
        />

        <span className="text-xs font-semibold tracking-wide text-navy uppercase">
          Email addresses
        </span>
        {content.contactInfo.emails.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Email {index + 1}</h3>
              <DeleteButton
                label="Delete"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      emails: prev.contactInfo.emails.filter((e) => e.id !== item.id),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Label"
              value={item.label}
              onChange={(v) => updateEmail(item.id, { label: v })}
            />
            <TextField
              label="Email"
              value={item.value}
              onChange={(v) =>
                updateEmail(item.id, { value: v, href: `mailto:${v}` })
              }
            />
          </div>
        ))}
        <AddButton
          label="Add email"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              contactInfo: {
                ...prev.contactInfo,
                emails: [
                  ...prev.contactInfo.emails,
                  {
                    id: nextId("email"),
                    label: "Email Us",
                    value: "",
                    href: "mailto:",
                  },
                ],
              },
            }))
          }
        />

        <span className="mt-6 block text-xs font-semibold tracking-wide text-navy uppercase">
          Phone numbers
        </span>
        {content.contactInfo.phones.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Phone {index + 1}</h3>
              <DeleteButton
                label="Delete"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      phones: prev.contactInfo.phones.filter((p) => p.id !== item.id),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Label"
              value={item.label}
              onChange={(v) => updatePhone(item.id, { label: v })}
            />
            <TextField
              label="Phone number"
              value={item.value}
              onChange={(v) => updatePhone(item.id, { value: v })}
            />
            <TextField
              label="Phone link (tel:...)"
              value={item.href || ""}
              onChange={(v) => updatePhone(item.id, { href: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add phone number"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              contactInfo: {
                ...prev.contactInfo,
                phones: [
                  ...prev.contactInfo.phones,
                  {
                    id: nextId("phone"),
                    label: "Call Us",
                    value: "",
                    href: "tel:",
                  },
                ],
              },
            }))
          }
        />

        <span className="mt-6 block text-xs font-semibold tracking-wide text-navy uppercase">
          Addresses
        </span>
        {content.contactInfo.addresses.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 rounded-lg border border-border bg-surface-alt p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Address {index + 1}</h3>
              <DeleteButton
                label="Delete"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      addresses: prev.contactInfo.addresses.filter(
                        (a) => a.id !== item.id
                      ),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Label"
              value={item.label}
              onChange={(v) => updateAddress(item.id, { label: v })}
            />
            <TextField
              label="Company name"
              value={item.company}
              onChange={(v) => updateAddress(item.id, { company: v })}
            />
            <TextField
              label="Address"
              multiline
              value={item.value}
              onChange={(v) => updateAddress(item.id, { value: v })}
            />
          </div>
        ))}
        <AddButton
          label="Add address"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              contactInfo: {
                ...prev.contactInfo,
                addresses: [
                  ...prev.contactInfo.addresses,
                  {
                    id: nextId("address"),
                    label: "Our Office",
                    company: "",
                    value: "",
                  },
                ],
              },
            }))
          }
        />

        <TextField
          label="Business hours (use a new line for each line)"
          multiline
          value={content.contactInfo.businessHours}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, businessHours: v },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Office & map">
        <TextField
          label="Title"
          value={content.office.title}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              office: { ...prev.office, title: v },
            }))
          }
        />
        <TextField
          label="Subtitle"
          value={content.office.subtitle}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              office: { ...prev.office, subtitle: v },
            }))
          }
        />
        <TextField
          label="Company"
          value={content.office.company}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              office: { ...prev.office, company: v },
            }))
          }
        />
        <TextField
          label="Address"
          multiline
          value={content.office.address}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              office: { ...prev.office, address: v },
            }))
          }
        />
        <TextField
          label="Directions URL"
          value={content.office.directionsUrl}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              office: { ...prev.office, directionsUrl: v },
            }))
          }
        />
        <TextField
          label="Map embed URL"
          value={content.office.mapEmbedUrl}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              office: { ...prev.office, mapEmbedUrl: v },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="FAQ">
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
        {(content.faq.avatars ?? []).map((avatar, index) => (
          <ImageField
            key={`avatar-${index}`}
            label={`Avatar ${index + 1}`}
            value={avatar}
            onChange={(v) =>
              setContent((prev) => {
                const avatars = [...(prev.faq.avatars ?? [])];
                avatars[index] = v;
                return {
                  ...prev,
                  faq: { ...prev.faq, avatars },
                };
              })
            }
          />
        ))}
        {(content.faq.items ?? []).map((item, index) => (
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
                    id: nextId("faq"),
                    question: "New question",
                    answer: "",
                  },
                ],
              },
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
            {saving ? "Saving..." : "Save contact page"}
          </button>
        </div>
      </div>
    </div>
  );
}
