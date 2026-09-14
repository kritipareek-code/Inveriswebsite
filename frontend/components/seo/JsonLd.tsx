import { getOrganizationJsonLd } from "@/lib/seo";

export function JsonLd({ data }: { data?: unknown }) {
  const payload = data === undefined ? getOrganizationJsonLd() : data;
  if (!payload) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
