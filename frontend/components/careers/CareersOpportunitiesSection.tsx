"use client";

import { Container } from "@/components/ui/Container";
import { useCareersForm } from "@/components/careers/CareersFormProvider";
import type { CareersOpportunitiesContent, CareersOpportunity } from "@/lib/careers-content";
import { cn } from "@/lib/cn";

export function CareersOpportunitiesSection({
  content,
}: {
  content: CareersOpportunitiesContent;
}) {
  const { openForm } = useCareersForm();

  return (
    <section
      id="current-opportunities"
      className="scroll-mt-28 bg-surface py-16 lg:py-24"
    >
      <Container>
        <h2 className="text-3xl font-medium tracking-tight text-heading md:text-4xl lg:text-[2.75rem]">
          {content.title}
        </h2>

        {content.items.length ? (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-160 border-collapse text-left">
              <thead>
                <tr className="border-b border-navy/15">
                  <th className="py-3 pr-6 text-sm font-bold text-heading">Job title</th>
                  <th className="py-3 pr-6 text-sm font-bold text-heading">Location</th>
                  <th className="py-3 pr-6 text-sm font-bold text-heading">
                    Line of service
                  </th>
                  <th className="py-3 text-sm font-bold text-heading">
                    <span className="sr-only">Apply</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.items.map((job, index) => (
                  <OpportunityRow
                    key={job.id}
                    job={job}
                    striped={index % 2 === 0}
                    onApply={() => openForm(job)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-paragraph">
            {content.emptyMessage || "No job openings for now."}
          </p>
        )}
      </Container>
    </section>
  );
}

function OpportunityRow({
  job,
  striped,
  onApply,
}: {
  job: CareersOpportunity;
  striped: boolean;
  onApply: () => void;
}) {
  const applyClass =
    "font-medium text-heading underline decoration-heading/70 underline-offset-4 transition-colors hover:text-navy";

  return (
    <tr className={cn("border-b border-navy/8", striped ? "bg-surface-muted" : "bg-white")}>
      <td className="py-4 pr-6 align-middle">
        <button type="button" onClick={onApply} className={applyClass}>
          {job.title}
        </button>
      </td>
      <td className="py-4 pr-6 align-middle text-sm text-paragraph">{job.location}</td>
      <td className="py-4 pr-6 align-middle text-sm text-paragraph">
        {job.lineOfService}
      </td>
      <td className="py-4 text-right align-middle">
        <button type="button" onClick={onApply} className={applyClass}>
          Apply
        </button>
      </td>
    </tr>
  );
}
