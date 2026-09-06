"use client";

import { useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import {
  type HomeAboutFeature,
  type HomeApproachStep,
  type HomeContent,
  type HomeServiceItem,
  type HomeValueItem,
} from "@/lib/home-content";
import { saveHomeContent } from "@/lib/admin-api";
import { AdminSection } from "./AdminSection";
import { AddButton, DeleteButton, ImageField, TextField } from "./Fields";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export function HomeEditor({ initialContent }: { initialContent: HomeContent }) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateHero<K extends keyof HomeContent["hero"]>(
    key: K,
    value: HomeContent["hero"][K]
  ) {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const saved = await saveHomeContent(content);
      setContent(saved);
      setStatus("Home page saved. Refresh the public homepage to see changes.");
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
          <h1 className="text-2xl font-bold text-navy">Home page</h1>
          <p className="mt-1 text-sm text-text-body">
            Edit every section on Home, including images, links, icons, and SEO.
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

      <AdminSection title="Page SEO">
        <TextField
          label="Browser title"
          value={content.seo.title}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, seo: { ...prev.seo, title: v } }))
          }
        />
        <TextField
          label="Meta description"
          multiline
          value={content.seo.description}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, seo: { ...prev.seo, description: v } }))
          }
        />
      </AdminSection>

      <AdminSection title="Hero">
        <TextField label="Tag" value={content.hero.tag} onChange={(v) => updateHero("tag", v)} />
        <TextField label="Title" value={content.hero.title} onChange={(v) => updateHero("title", v)} />
        <TextField
          label="Description"
          multiline
          value={content.hero.description}
          onChange={(v) => updateHero("description", v)}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Primary button"
            value={content.hero.primaryCta.label}
            onChange={(v) =>
              updateHero("primaryCta", { ...content.hero.primaryCta, label: v })
            }
          />
          <TextField
            label="Primary button link"
            value={content.hero.primaryCta.href}
            onChange={(v) =>
              updateHero("primaryCta", { ...content.hero.primaryCta, href: v })
            }
          />
          <TextField
            label="Secondary button"
            value={content.hero.secondaryCta.label}
            onChange={(v) =>
              updateHero("secondaryCta", { ...content.hero.secondaryCta, label: v })
            }
          />
          <TextField
            label="Secondary button link"
            value={content.hero.secondaryCta.href}
            onChange={(v) =>
              updateHero("secondaryCta", { ...content.hero.secondaryCta, href: v })
            }
          />
        </div>
        <ImageField
          label="Background image"
          value={content.hero.backgroundImage}
          onChange={(v) => updateHero("backgroundImage", v)}
        />
        <TextField
          label="Background image alt text"
          value={content.hero.backgroundImageAlt}
          onChange={(v) => updateHero("backgroundImageAlt", v)}
        />
      </AdminSection>

      <AdminSection title="Value propositions">
        <TextField
          label="Section heading"
          value={content.valueBarTitle}
          onChange={(v) => setContent((prev) => ({ ...prev, valueBarTitle: v }))}
        />
        <div className="space-y-4">
          {content.valuePropositions.map((item, index) => (
            <Card key={item.id}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy">Item {index + 1}</h3>
                <DeleteButton
                  label="Delete item"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      valuePropositions: prev.valuePropositions.filter((v) => v.id !== item.id),
                    }))
                  }
                />
              </div>
              <TextField
                label="Title"
                value={item.title}
                onChange={(v) => updateValue(setContent, item.id, { title: v })}
              />
              <TextField
                label="Description"
                multiline
                value={item.description}
                onChange={(v) => updateValue(setContent, item.id, { description: v })}
              />
              <TextField
                label="Icon (user, network, layers, trending, clock, handshake)"
                value={item.icon}
                onChange={(v) => updateValue(setContent, item.id, { icon: v })}
              />
              <ImageField
                label="Icon image (optional, overrides icon name)"
                value={item.image}
                onChange={(v) => updateValue(setContent, item.id, { image: v })}
              />
            </Card>
          ))}
          <AddButton
            label="Add value proposition"
            onClick={() =>
              setContent((prev) => ({
                ...prev,
                valuePropositions: [
                  ...prev.valuePropositions,
                  {
                    id: nextId("vp"),
                    title: "New value",
                    description: "",
                    icon: "user",
                    image: "",
                  } satisfies HomeValueItem,
                ],
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection title="About">
        <TextField
          label="Tag"
          value={content.about.tag}
          onChange={(v) => setContent((prev) => ({ ...prev, about: { ...prev.about, tag: v } }))}
        />
        <TextField
          label="Title"
          value={content.about.title}
          onChange={(v) => setContent((prev) => ({ ...prev, about: { ...prev.about, title: v } }))}
        />
        <TextField
          label="Description"
          multiline
          value={content.about.description}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, about: { ...prev.about, description: v } }))
          }
        />
        <TextField
          label="Button"
          value={content.about.cta.label}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              about: { ...prev.about, cta: { ...prev.about.cta, label: v } },
            }))
          }
        />
        <TextField
          label="Button link"
          value={content.about.cta.href}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              about: { ...prev.about, cta: { ...prev.about.cta, href: v } },
            }))
          }
        />
        <ImageField
          label="Background image"
          value={content.about.backgroundImage}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, about: { ...prev.about, backgroundImage: v } }))
          }
        />
        <TextField
          label="Background image alt text"
          value={content.about.backgroundImageAlt}
          onChange={(v) =>
            setContent((prev) => ({
              ...prev,
              about: { ...prev.about, backgroundImageAlt: v },
            }))
          }
        />

        <h3 className="pt-2 text-sm font-bold text-navy">Feature cards</h3>
        {content.about.features.map((feature, index) => (
          <Card key={feature.id}>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-navy">Feature {index + 1}</h4>
              <DeleteButton
                label="Delete feature"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    about: {
                      ...prev.about,
                      features: prev.about.features.filter((f) => f.id !== feature.id),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Title"
              value={feature.title}
              onChange={(v) => updateFeature(setContent, feature.id, { title: v })}
            />
            <TextField
              label="Description"
              multiline
              value={feature.description}
              onChange={(v) => updateFeature(setContent, feature.id, { description: v })}
            />
            <ImageField
              label="Image"
              value={feature.image}
              onChange={(v) => updateFeature(setContent, feature.id, { image: v })}
            />
            <TextField
              label="Image alt text"
              value={feature.imageAlt}
              onChange={(v) => updateFeature(setContent, feature.id, { imageAlt: v })}
            />
            <TextField
              label="Icon (puzzle, target, shield, growth)"
              value={feature.icon}
              onChange={(v) => updateFeature(setContent, feature.id, { icon: v })}
            />
          </Card>
        ))}
        <AddButton
          label="Add feature card"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              about: {
                ...prev.about,
                features: [
                  ...prev.about.features,
                  {
                    id: nextId("feat"),
                    title: "New feature",
                    description: "",
                    image: "",
                    imageAlt: "",
                    icon: "puzzle",
                  } satisfies HomeAboutFeature,
                ],
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Services">
        <TextField
          label="Tag"
          value={content.services.tag}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, services: { ...prev.services, tag: v } }))
          }
        />
        <TextField
          label="Title"
          value={content.services.title}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, services: { ...prev.services, title: v } }))
          }
        />
        {content.services.services.map((service, index) => (
          <Card key={service.id}>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-navy">Service {index + 1}</h4>
              <DeleteButton
                label="Delete service"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    services: {
                      ...prev.services,
                      services: prev.services.services.filter((s) => s.id !== service.id),
                    },
                  }))
                }
              />
            </div>
            <TextField
              label="Title"
              value={service.title}
              onChange={(v) => updateService(setContent, service.id, { title: v })}
            />
            <ImageField
              label="Image"
              value={service.image}
              onChange={(v) => updateService(setContent, service.id, { image: v })}
            />
            <TextField
              label="Image alt text"
              value={service.imageAlt}
              onChange={(v) => updateService(setContent, service.id, { imageAlt: v })}
            />
            <TextField
              label="Icon (briefcase, users, chart, search)"
              value={service.icon}
              onChange={(v) => updateService(setContent, service.id, { icon: v })}
            />
            <TextField
              label="Link"
              value={service.href}
              onChange={(v) => updateService(setContent, service.id, { href: v })}
            />
            <TextField
              label="Link label"
              value={service.linkLabel}
              onChange={(v) => updateService(setContent, service.id, { linkLabel: v })}
            />
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wide text-navy uppercase">
                Bullet points
              </span>
              {service.items.map((item, itemIndex) => (
                <div key={`${service.id}-${itemIndex}`} className="flex gap-2">
                  <input
                    className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    value={item}
                    onChange={(e) => {
                      const items = [...service.items];
                      items[itemIndex] = e.target.value;
                      updateService(setContent, service.id, { items });
                    }}
                  />
                  <DeleteButton
                    onClick={() =>
                      updateService(setContent, service.id, {
                        items: service.items.filter((_, i) => i !== itemIndex),
                      })
                    }
                  />
                </div>
              ))}
              <AddButton
                label="Add bullet"
                onClick={() =>
                  updateService(setContent, service.id, {
                    items: [...service.items, "New item"],
                  })
                }
              />
            </div>
          </Card>
        ))}
        <AddButton
          label="Add service"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              services: {
                ...prev.services,
                services: [
                  ...prev.services.services,
                  {
                    id: nextId("svc"),
                    title: "New service",
                    icon: "briefcase",
                    image: "",
                    imageAlt: "",
                    items: [],
                    href: "/services",
                    linkLabel: "Learn More",
                  } satisfies HomeServiceItem,
                ],
              },
            }))
          }
        />
      </AdminSection>

      <AdminSection title="Approach">
        <TextField
          label="Tag"
          value={content.approach.tag}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, approach: { ...prev.approach, tag: v } }))
          }
        />
        <TextField
          label="Title"
          value={content.approach.title}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, approach: { ...prev.approach, title: v } }))
          }
        />
        {content.approach.steps.map((step, index) => (
          <Card key={step.id}>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-navy">Step {index + 1}</h4>
              <DeleteButton
                label="Delete step"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    approach: {
                      ...prev.approach,
                      steps: prev.approach.steps.filter((s) => s.id !== step.id),
                    },
                  }))
                }
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Number"
                value={step.number}
                onChange={(v) => updateStep(setContent, step.id, { number: v })}
              />
              <TextField
                label="Title"
                value={step.title}
                onChange={(v) => updateStep(setContent, step.id, { title: v })}
              />
            </div>
            <TextField
              label="Description"
              multiline
              value={step.description}
              onChange={(v) => updateStep(setContent, step.id, { description: v })}
            />
            <TextField
              label="Icon (search, pen, play, chart)"
              value={step.icon}
              onChange={(v) => updateStep(setContent, step.id, { icon: v })}
            />
            <ImageField
              label="Icon image (optional, overrides icon name)"
              value={step.image}
              onChange={(v) => updateStep(setContent, step.id, { image: v })}
            />
          </Card>
        ))}
        <AddButton
          label="Add step"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              approach: {
                ...prev.approach,
                steps: [
                  ...prev.approach.steps,
                  {
                    id: nextId("step"),
                    number: String(prev.approach.steps.length + 1).padStart(2, "0"),
                    title: "New step",
                    description: "",
                    icon: "search",
                    image: "",
                  } satisfies HomeApproachStep,
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
        <ImageField
          label="Image"
          value={content.cta.image}
          onChange={(v) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, image: v } }))}
        />
        <TextField
          label="Image alt text"
          value={content.cta.imageAlt}
          onChange={(v) =>
            setContent((prev) => ({ ...prev, cta: { ...prev.cta, imageAlt: v } }))
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
            {saving ? "Saving..." : "Save home page"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="space-y-4 rounded-lg border border-border bg-surface-alt p-4">{children}</div>;
}

function updateValue(
  setContent: Dispatch<SetStateAction<HomeContent>>,
  id: string,
  patch: Partial<HomeValueItem>
) {
  setContent((prev) => ({
    ...prev,
    valuePropositions: prev.valuePropositions.map((item) =>
      item.id === id ? { ...item, ...patch } : item
    ),
  }));
}

function updateFeature(
  setContent: Dispatch<SetStateAction<HomeContent>>,
  id: string,
  patch: Partial<HomeAboutFeature>
) {
  setContent((prev) => ({
    ...prev,
    about: {
      ...prev.about,
      features: prev.about.features.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    },
  }));
}

function updateService(
  setContent: Dispatch<SetStateAction<HomeContent>>,
  id: string,
  patch: Partial<HomeServiceItem>
) {
  setContent((prev) => ({
    ...prev,
    services: {
      ...prev.services,
      services: prev.services.services.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    },
  }));
}

function updateStep(
  setContent: Dispatch<SetStateAction<HomeContent>>,
  id: string,
  patch: Partial<HomeApproachStep>
) {
  setContent((prev) => ({
    ...prev,
    approach: {
      ...prev.approach,
      steps: prev.approach.steps.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    },
  }));
}
