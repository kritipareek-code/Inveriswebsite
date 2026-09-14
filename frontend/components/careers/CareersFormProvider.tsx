"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { CareersApplicationForm } from "@/components/careers/CareersApplicationForm";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import type {
  CareersCtaContent,
  CareersNetworkContent,
  CareersOpportunity,
} from "@/lib/careers-content";

type CareersFormContextValue = {
  openForm: (job?: CareersOpportunity) => void;
};

const CareersFormContext = createContext<CareersFormContextValue | null>(null);

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
  const [job, setJob] = useState<CareersOpportunity | null>(null);

  function openForm(nextJob?: CareersOpportunity) {
    setJob(nextJob ?? null);
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
    setJob(null);
  }

  return (
    <CareersFormContext.Provider value={{ openForm }}>
      {children}
      <CareersApplicationModal
        network={network}
        job={job}
        open={open}
        onClose={closeForm}
      />
    </CareersFormContext.Provider>
  );
}

function CareersApplicationModal({
  network,
  job,
  open,
  onClose,
}: {
  network: CareersNetworkContent;
  job: CareersOpportunity | null;
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex h-[calc(100dvh-1.5rem)] max-h-[calc(100dvh-1.5rem)] min-h-0 w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-[var(--shadow-card)] sm:h-[calc(100dvh-3rem)] sm:max-h-[calc(100dvh-3rem)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex shrink-0 items-start justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">
              {network.tag || "CAREERS"}
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-bold text-navy md:text-2xl">
              {job ? `Apply for ${job.title}` : network.formTitle}
            </h2>
            {job ? (
              <p className="mt-1 text-sm text-text-body">
                {job.location}
                {job.lineOfService ? ` · ${job.lineOfService}` : ""}
              </p>
            ) : null}
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
          job={job}
          idPrefix="modal-"
          animated={false}
          compact
          includeResume
        />
      </div>
    </div>
  );
}

export function CareersCtaBanner({ content }: { content: CareersCtaContent }) {
  return (
    <PageCtaBanner
      title={content.title}
      description={content.description}
      cta={content.cta}
      target="_blank"
    />
  );
}
