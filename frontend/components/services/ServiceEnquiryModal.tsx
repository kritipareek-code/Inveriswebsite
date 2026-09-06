"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getApiBaseUrl } from "@/lib/home-content";

const inputClass =
  "w-full px-4 py-3 rounded border border-border bg-white text-heading text-sm placeholder:text-paragraph-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ServiceEnquiryModal({
  service,
  onClose,
}: {
  service: string | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setForm(emptyForm);
    setStatus("idle");
    setErrors([]);
  }, [service]);

  useEffect(() => {
    if (!service) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, [service]);

  if (!service) return null;

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrors([]);

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          enquiryType: service,
          subject: `Service enquiry: ${service}`,
          source: "service-enquiry",
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || [data.message || "Something went wrong."]);
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(emptyForm);
      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => {
        onCloseRef.current();
      }, 5000);
    } catch {
      setErrors(["Unable to reach the server. Please try again later."]);
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 px-4 py-8"
      onClick={() => {
        if (status !== "loading") onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">ENQUIRE</p>
            <h2 id={titleId} className="mt-1 text-2xl font-bold text-navy">
              {service}
            </h2>
            <p className="mt-1 text-sm text-text-body">
              Share a few details and our team will get back to you.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={status === "loading"}
            className="rounded-md p-1 text-navy hover:bg-surface-muted disabled:opacity-50"
            aria-label="Close enquiry form"
          >
            <X size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Our team will contact you within 24 hours.
          </div>
        ) : (
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
            <div>
              <label htmlFor="service-name" className="mb-1.5 block text-sm font-medium text-heading">
                Name *
              </label>
              <input
                id="service-name"
                name="name"
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="service-email" className="mb-1.5 block text-sm font-medium text-heading">
                Email *
              </label>
              <input
                id="service-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="service-phone" className="mb-1.5 block text-sm font-medium text-heading">
                Phone no. *
              </label>
              <input
                id="service-phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+91 00000 00000"
              />
            </div>
            <div>
              <label htmlFor="service-message" className="mb-1.5 block text-sm font-medium text-heading">
                Message *
              </label>
              <textarea
                id="service-message"
                name="message"
                required
                minLength={10}
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
                placeholder="Tell us how we can help..."
              />
            </div>

            {status === "error" && errors.length > 0 ? (
              <div className="space-y-1 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {errors.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            ) : null}

            <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Sending..." : "Send enquiry"}
              <ArrowRight size={18} />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
