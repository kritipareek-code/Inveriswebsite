"use client";

import { CareerApplications } from "@/components/admin/CareerApplications";
import { ContactResponses } from "@/components/admin/ContactResponses";
import { NewsletterSubscribers } from "@/components/admin/NewsletterSubscribers";

export default function AdminResponsesPage() {
  return (
    <div className="space-y-12">
      <ContactResponses />
      <div className="border-t border-border pt-10">
        <CareerApplications />
      </div>
      <div className="border-t border-border pt-10">
        <NewsletterSubscribers embedded />
      </div>
    </div>
  );
}
