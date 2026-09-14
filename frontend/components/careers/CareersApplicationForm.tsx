"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/magic/reveal";
import type { CareersNetworkContent } from "@/lib/careers-content";

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  location: string;
  interest: string;
  experience: string;
  about: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-white text-heading text-sm placeholder:text-paragraph-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-shadow";

const selectClass = `${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748b%27 stroke-width=%272%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10`;

const initialForm: FormDataState = {
  name: "",
  email: "",
  phone: "",
  location: "",
  interest: "",
  experience: "",
  about: "",
};

export function CareersApplicationForm({
  network,
  className,
  idPrefix = "",
  animated = true,
  compact = false,
}: {
  network: CareersNetworkContent;
  className?: string;
  idPrefix?: string;
  animated?: boolean;
  compact?: boolean;
}) {
  const [formState, setFormState] = useState<FormDataState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = (name: string) => `${idPrefix}${name}`;
  const fieldClass = cn(inputClass, compact && "px-3 py-2 text-[13px]");
  const selectFieldClass = cn(selectClass, compact && "px-3 py-2 pr-9 text-[13px]");
  const compactGap = compact ? "gap-4" : "gap-5";

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
      const res = await fetch(`${apiUrl}/api/careers`, {
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
      }, 6000);
    } catch {
      setErrors(["Unable to reach the server. Please try again later."]);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col", compactGap, compact && "min-h-0 flex-1 overflow-y-auto", className)}
    >
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", compactGap)}>
        <Field label="Full Name" htmlFor={id("name")} required compact={compact}>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            value={formState.name}
            onChange={handleChange}
            className={fieldClass}
            placeholder={compact ? "Full name" : "Enter your full name"}
          />
        </Field>
        <Field label="Email Address" htmlFor={id("email")} required compact={compact}>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            value={formState.email}
            onChange={handleChange}
            className={fieldClass}
            placeholder={compact ? "Email address" : "Enter your email address"}
          />
        </Field>
      </div>

      <div className={cn("grid grid-cols-1 sm:grid-cols-2", compactGap)}>
        <Field label="Phone Number" htmlFor={id("phone")} required compact={compact}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            required
            value={formState.phone}
            onChange={handleChange}
            className={fieldClass}
            placeholder={compact ? "Contact number" : "Enter your contact number"}
          />
        </Field>
        <Field label="Current Location" htmlFor={id("location")} required compact={compact}>
          <input
            id={id("location")}
            name="location"
            type="text"
            required
            value={formState.location}
            onChange={handleChange}
            className={fieldClass}
            placeholder="City / Location"
          />
        </Field>
      </div>

      <div className={cn("grid grid-cols-1 sm:grid-cols-2", compactGap)}>
        <Field label="Area of Interest" htmlFor={id("interest")} required compact={compact}>
          <select
            id={id("interest")}
            name="interest"
            required
            value={formState.interest}
            onChange={handleChange}
            className={selectFieldClass}
          >
            <option value="">{compact ? "Select area" : "Select your preferred area"}</option>
            {network.interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Years of Experience" htmlFor={id("experience")} required compact={compact}>
          <select
            id={id("experience")}
            name="experience"
            required
            value={formState.experience}
            onChange={handleChange}
            className={selectFieldClass}
          >
            <option value="">Select experience</option>
            {network.experienceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Tell Us About Yourself"
        htmlFor={id("about")}
        compact={compact}
        className={compact ? "flex min-h-0 flex-1 flex-col" : undefined}
      >
        <textarea
          id={id("about")}
          name="about"
          value={formState.about}
          onChange={handleChange}
          className={cn(fieldClass, "resize-none", compact ? "min-h-32 flex-1" : "min-h-30")}
          placeholder={
            compact
              ? "Share your experience, skills, and how you could contribute to Inveris."
              : "Briefly tell us about your experience, skills, and how you believe you could contribute to Inveris."
          }
        />
      </Field>

      {status === "success" && (
        <div className="shrink-0 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          {successMessage}
        </div>
      )}

      {status === "error" && errors.length > 0 && (
        <div className="shrink-0 space-y-1 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}

      {animated ? (
        <Reveal direction="up" delay={0.12} className="w-fit shrink-0">
          <Button type="submit" variant="primary" disabled={status === "loading"} className="shrink-0">
            {status === "loading" ? "Submitting..." : network.submitLabel}
            <ArrowRight size={18} />
          </Button>
        </Reveal>
      ) : (
        <Button
          type="submit"
          variant="primary"
          disabled={status === "loading"}
          className={cn("shrink-0", compact && "w-full")}
        >
          {status === "loading" ? "Submitting..." : network.submitLabel}
          <ArrowRight size={compact ? 16 : 18} />
        </Button>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  compact,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={htmlFor}
        className={cn("mb-1 block font-medium text-heading", compact ? "text-xs" : "text-sm")}
      >
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

