"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { CareersApplicationForm } from "@/components/careers/CareersApplicationForm";
import { FaqSection } from "@/components/contact/FaqSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import type { CareersCtaContent, CareersNetworkContent } from "@/lib/careers-content";
import type { ContactFaqContent } from "@/lib/contact-content";

const CareersFormContext = createContext<{ openForm: () => void } | null>(null);

export function useCareersForm() {
  const ctx = useContext(CareersFormContext);
  if (!ctx) {
    throw new Error("useCareersForm must be used within CareersFormProvider");
  }
  return ctx;
}

export function CareersFormProvider({
  network,
  children,
}: {
  network: CareersNetworkContent;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <CareersFormContext.Provider value={{ openForm: () => setOpen(true) }}>
      {children}
      <CareersApplicationModal network={network} open={open} onClose={() => setOpen(false)} />
    </CareersFormContext.Provider>
  );
}

function CareersApplicationModal({
  network,
  open,
  onClose,
}: {
  network: CareersNetworkContent;
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[min(100dvh-2rem,52rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-[var(--shadow-card)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex shrink-0 items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">CAREERS</p>
            <h2 id={titleId} className="mt-1 text-xl font-bold text-navy md:text-2xl">
              {network.formTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-navy hover:bg-surface-muted"
            aria-label="Close application form"
          >
            <X size={20} />
          </button>
        </div>
        <CareersApplicationForm
          network={network}
          idPrefix="modal-"
          animated={false}
          compact
        />
      </div>
    </div>
  );
}

export function CareersFaqSection({ content }: { content: ContactFaqContent }) {
  const { openForm } = useCareersForm();
  return <FaqSection content={content} onCtaClick={openForm} />;
}

export function CareersCtaBanner({ content }: { content: CareersCtaContent }) {
  const { openForm } = useCareersForm();
  return (
    <PageCtaBanner
      title={content.title}
      description={content.description}
      cta={content.cta}
      onCtaClick={openForm}
    />
  );
}
