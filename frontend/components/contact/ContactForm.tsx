"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/magic/reveal";
import type { ContactFormContent } from "@/lib/contact-content";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  enquiryType: string;
  subject: string;
  message: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-white text-heading text-sm placeholder:text-paragraph-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-shadow";

export function ContactForm({
  form,
  className,
}: {
  form: ContactFormContent;
  className?: string;
}) {
  const initialForm: FormData = {
    name: "",
    email: "",
    company: "",
    phone: "",
    enquiryType: "",
    subject: "",
    message: "",
  };

  const [formState, setFormState] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrors([]);
    setSuccessMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || [data.message || "Something went wrong."]);
        setStatus("error");
        return;
      }

      setSuccessMessage(data.message);
      setFormState(initialForm);
      setStatus("success");
      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => {
        setStatus("idle");
        setSuccessMessage("");
      }, 5000);
    } catch {
      setErrors(["Unable to reach the server. Please try again later."]);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex min-h-0 flex-1 flex-col gap-5", className)}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-heading">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formState.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-heading">
            Work Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formState.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-heading">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+91 00000 00000"
          />
        </div>
        <div>
          <label htmlFor="enquiryType" className="mb-1.5 block text-sm font-medium text-heading">
            Enquiry Type
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formState.enquiryType}
            onChange={handleChange}
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748b%27 stroke-width=%272%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10`}
          >
            <option value="">Select enquiry type</option>
            {form.enquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-heading">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formState.company}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your company"
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-heading">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formState.subject}
            onChange={handleChange}
            className={inputClass}
            placeholder="What is this regarding?"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-heading">
          How can we help you?
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formState.message}
          onChange={handleChange}
          className={`${inputClass} min-h-[120px] flex-1 resize-none lg:min-h-0`}
          placeholder="Tell us about your business needs..."
        />
      </div>

      {status === "success" && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          {successMessage}
        </div>
      )}

      {status === "error" && errors.length > 0 && (
        <div className="space-y-1 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}

      <Reveal direction="up" delay={0.12} className="w-fit">
        <Button type="submit" variant="primary" disabled={status === "loading"} className="shrink-0">
          {status === "loading" ? "Sending..." : "Send Message"}
          <ArrowRight size={18} />
        </Button>
      </Reveal>
    </form>
  );
}
