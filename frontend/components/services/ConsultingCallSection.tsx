"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionTag } from "@/components/ui/SectionTag";
import { getApiBaseUrl } from "@/lib/home-content";
import { Reveal } from "@/components/magic/reveal";
import type { ServicesConsultingCallContent } from "@/lib/services-content";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-white text-heading text-sm placeholder:text-paragraph-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredTime: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  preferredTime: "",
  message: "",
};

export function ConsultingCallSection({
  content,
}: {
  content: ServicesConsultingCallContent;
}) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const images = content.images.filter((image) => image.src);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrors([]);
    setSuccessMessage("");

    const details = [
      form.preferredTime ? `Preferred time: ${form.preferredTime}` : "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          enquiryType: "Consulting Call",
          subject: "Book a consulting call",
          message: details,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || [data.message || "Something went wrong."]);
        setStatus("error");
        return;
      }

      setSuccessMessage(data.message);
      setForm(emptyForm);
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
  }

  return (
    <section id="book-a-call" className="scroll-mt-28 overflow-hidden bg-surface-muted py-20 lg:py-28">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center lg:mb-14">
          <Reveal direction="down">
            <SectionTag withLine className="justify-center">
              {content.tag}
            </SectionTag>
          </Reveal>
          <Reveal direction="left" delay={0.08}>
            <h2 className="text-3xl font-bold leading-tight text-heading md:text-5xl">
              {content.title}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.18}>
            <p className="text-paragraph leading-relaxed">{content.description}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal direction="left" delay={0.12} className="h-full">
            <Card className="border-0 p-6 lg:p-8">
              <form onSubmit={(event) => void handleSubmit(event)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="consult-name" className="mb-1.5 block text-sm font-medium text-heading">
                      Full Name *
                    </label>
                    <input
                      id="consult-name"
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
                    <label htmlFor="consult-email" className="mb-1.5 block text-sm font-medium text-heading">
                      Work Email *
                    </label>
                    <input
                      id="consult-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="consult-phone" className="mb-1.5 block text-sm font-medium text-heading">
                      Phone Number *
                    </label>
                    <input
                      id="consult-phone"
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
                    <label htmlFor="consult-company" className="mb-1.5 block text-sm font-medium text-heading">
                      Company
                    </label>
                    <input
                      id="consult-company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="consult-time" className="mb-1.5 block text-sm font-medium text-heading">
                    Preferred date / time
                  </label>
                  <input
                    id="consult-time"
                    name="preferredTime"
                    type="text"
                    value={form.preferredTime}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Tue 10:00 AM IST"
                  />
                </div>

                <div>
                  <label htmlFor="consult-message" className="mb-1.5 block text-sm font-medium text-heading">
                    How can we help? *
                  </label>
                  <textarea
                    id="consult-message"
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                    placeholder="Tell us about your goals or the challenge you'd like to discuss..."
                  />
                </div>

                {status === "success" && successMessage ? (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                    {successMessage}
                  </div>
                ) : null}

                {status === "error" && errors.length > 0 ? (
                  <div className="space-y-1 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    {errors.map((err) => (
                      <p key={err}>{err}</p>
                    ))}
                  </div>
                ) : null}

                <Reveal direction="up" delay={0.2} className="w-fit">
                  <Button type="submit" variant="gold" disabled={status === "loading"} className="self-start">
                    {status === "loading" ? "Sending..." : content.submitLabel || "Request a call"}
                    <ArrowRight size={18} />
                  </Button>
                </Reveal>
              </form>
            </Card>
          </Reveal>

          <div className="grid min-h-95 grid-cols-2 grid-rows-2 gap-4 lg:min-h-full">
            {images[0] ? (
              <Reveal direction="right" delay={0.1} className="relative col-span-2 overflow-hidden rounded-2xl">
                <CmsImage
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </Reveal>
            ) : null}
            {images[1] ? (
              <Reveal direction="up" delay={0.18} className="relative overflow-hidden rounded-2xl">
                <CmsImage
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                />
              </Reveal>
            ) : null}
            {images[2] ? (
              <Reveal direction="down" delay={0.26} className="relative overflow-hidden rounded-2xl">
                <CmsImage
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                />
              </Reveal>
            ) : images[1] ? (
              <Reveal direction="down" delay={0.26} className="relative overflow-hidden rounded-2xl bg-navy">
                {images[0] ? (
                  <CmsImage
                    src={images[0].src}
                    alt=""
                    fill
                    className="object-cover opacity-40"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                  />
                ) : null}
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
