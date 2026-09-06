"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { CareersNetworkContent } from "@/lib/careers-content";

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  location: string;
  interest: string;
  experience: string;
  organization: string;
  designation: string;
  linkedin: string;
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
  organization: "",
  designation: "",
  linkedin: "",
  about: "",
};

export function CareersApplicationForm({
  network,
  className,
}: {
  network: CareersNetworkContent;
  className?: string;
}) {
  const [formState, setFormState] = useState<FormDataState>(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrors([]);
    setSuccessMessage("");

    if (!resume) {
      setErrors(["Please upload your latest resume."]);
      setStatus("error");
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        payload.append(key, value);
      });
      payload.append("resume", resume);

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
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-5", className)}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formState.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your full name"
          />
        </Field>
        <Field label="Email Address" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formState.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your email address"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone Number" htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formState.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your contact number"
          />
        </Field>
        <Field label="Current Location" htmlFor="location" required>
          <input
            id="location"
            name="location"
            type="text"
            required
            value={formState.location}
            onChange={handleChange}
            className={inputClass}
            placeholder="City / Location"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Area of Interest" htmlFor="interest" required>
          <select
            id="interest"
            name="interest"
            required
            value={formState.interest}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Select your preferred area</option>
            {network.interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Years of Experience" htmlFor="experience" required>
          <select
            id="experience"
            name="experience"
            required
            value={formState.experience}
            onChange={handleChange}
            className={selectClass}
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Current / Most Recent Organization" htmlFor="organization">
          <input
            id="organization"
            name="organization"
            type="text"
            value={formState.organization}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your current or most recent organization"
          />
        </Field>
        <Field label="Current / Most Recent Designation" htmlFor="designation">
          <input
            id="designation"
            name="designation"
            type="text"
            value={formState.designation}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter your designation"
          />
        </Field>
      </div>

      <Field label="LinkedIn Profile" htmlFor="linkedin">
        <input
          id="linkedin"
          name="linkedin"
          type="url"
          inputMode="url"
          value={formState.linkedin}
          onChange={handleChange}
          className={inputClass}
          placeholder="Paste your LinkedIn profile URL"
        />
      </Field>

      <div>
        <label htmlFor="resume" className="mb-1.5 block text-sm font-medium text-heading">
          Upload Your Resume <span className="text-gold">*</span>
        </label>
        <input
          ref={fileInputRef}
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {resume ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/12 text-gold">
                <FileText size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-heading">{resume.name}</p>
                <p className="text-xs text-paragraph-muted">{formatFileSize(resume.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setResume(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="rounded-full p-1.5 text-paragraph hover:bg-surface-muted hover:text-heading"
              aria-label="Remove resume"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={cn(
              "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-white px-4 py-8 text-center transition-colors hover:border-gold/50 hover:bg-gold/[0.04]",
              dragging ? "border-gold bg-gold/[0.06]" : "border-border"
            )}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/12 text-gold">
              <Upload size={18} />
            </span>
            <span className="text-sm font-medium text-heading">Upload your latest resume</span>
            <span className="text-xs text-paragraph-muted">PDF or Word · up to 5 MB</span>
          </button>
        )}
      </div>

      <Field label="Tell Us About Yourself" htmlFor="about">
        <textarea
          id="about"
          name="about"
          value={formState.about}
          onChange={handleChange}
          className={`${inputClass} min-h-[120px] resize-none`}
          placeholder="Briefly tell us about your experience, skills, and how you believe you could contribute to Inveris."
        />
      </Field>

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

      <Button type="submit" variant="primary" disabled={status === "loading"} className="shrink-0">
        {status === "loading" ? "Submitting..." : network.submitLabel}
        <ArrowRight size={18} />
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-heading">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
