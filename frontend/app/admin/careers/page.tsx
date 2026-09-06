"use client";

import { useEffect, useState } from "react";
import { CareersEditor } from "@/components/admin/CareersEditor";
import {
  fetchCareersContent,
  getFallbackCareersContent,
  type CareersPageContent,
} from "@/lib/careers-content";

export default function AdminCareersPage() {
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
    return <p className="text-sm text-text-body">Loading careers content...</p>;
  }

  return <CareersEditor initialContent={content} />;
}
