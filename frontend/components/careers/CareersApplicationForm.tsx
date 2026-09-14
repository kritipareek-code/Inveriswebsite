"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/magic/reveal";
import type { CareersNetworkContent, CareersOpportunity } from "@/lib/careers-content";

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

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_ACCEPT = ".pdf,.doc,.docx,application/pdf";

function isAllowedResume(file: File) {
  const name = file.name.toLowerCase();
  return (
    name.endsWith(".pdf") ||
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    file.type === "application/pdf" ||
    file.type === "application/msword" ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
}

export function CareersApplicationForm({
  network,
  job = null,
  className,
  idPrefix = "",
  animated = true,
  compact = false,
  includeResume = false,
}: {
  network: CareersNetworkContent;
  job?: CareersOpportunity | null;
  className?: string;
  idPrefix?: string;
  animated?: boolean;
  compact?: boolean;
  includeResume?: boolean;
}) {
  const [formState, setFormState] = useState<FormDataState>(initialForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
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

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setResumeFile(null);
      return;
    }
    if (!isAllowedResume(file)) {
      setResumeFile(null);
      e.target.value = "";
      setErrors(["Resume must be a PDF or Word document."]);
      setStatus("error");
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setResumeFile(null);
      e.target.value = "";
      setErrors(["Resume must be 5MB or smaller."]);
      setStatus("error");
      return;
    }
    setErrors([]);
    setStatus("idle");
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrors([]);
    setSuccessMessage("");

    if (includeResume && !resumeFile) {
      setErrors(["Please upload your resume."]);
      setStatus("error");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formState.name);
      payload.append("email", formState.email);
      payload.append("phone", formState.phone);
      payload.append("location", formState.location);
      payload.append("interest", formState.interest);
      payload.append("experience", formState.experience);
      payload.append("about", formState.about);
      if (job) {
        payload.append("jobId", job.id);
        payload.append("jobTitle", job.title);
        payload.append("jobLocation", job.location);
        payload.append("jobLineOfService", job.lineOfService);
      }
      if (resumeFile) payload.append("resume", resumeFile);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const res = await fetch(`${apiUrl}/api/careers`, {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || [data.message || "Something went wrong."]);
        setStatus("error");
        return;
      }

      setSuccessMessage(data.message);
      setFormState(initialForm);
      setResumeFile(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
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

      {includeResume ? (
        <Field label="Resume" htmlFor={id("resume")} required compact={compact}>
          <label
            htmlFor={id("resume")}
            className={cn(
              fieldClass,
              "flex cursor-pointer items-center gap-3",
              resumeFile ? "text-heading" : "text-paragraph-muted"
            )}
          >
            <Upload size={compact ? 15 : 16} className="shrink-0 text-gold" />
            <span className="min-w-0 truncate">
              {resumeFile
                ? resumeFile.name
                : compact
                  ? "PDF or Word, up to 5MB"
                  : "Upload your resume (PDF or Word, up to 5MB)"}
            </span>
          </label>
          <input
            ref={resumeInputRef}
            id={id("resume")}
            name="resume"
            type="file"
            accept={RESUME_ACCEPT}
            required={includeResume}
            onChange={handleResumeChange}
            className="sr-only"
          />
        </Field>
      ) : null}

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

