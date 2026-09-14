"use client";

import { useEffect, useState } from "react";
import { JobsEditor } from "@/components/admin/JobsEditor";
import {
  fetchCareersContent,
  getFallbackCareersContent,
  type CareersPageContent,
} from "@/lib/careers-content";

export default function AdminJobsPage() {
  const [content, setContent] = useState<CareersPageContent | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setContent(await fetchCareersContent());
      } catch {
        setContent(getFallbackCareersContent());
      }
    }
    void load();
  }, []);

  if (!content) {
    return <p className="text-sm text-text-body">Loading jobs...</p>;
  }

  return <JobsEditor initialContent={content} />;
}
