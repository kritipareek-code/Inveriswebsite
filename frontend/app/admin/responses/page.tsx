"use client";

import { CareerApplications } from "@/components/admin/CareerApplications";
import { ContactResponses } from "@/components/admin/ContactResponses";
import { NewsletterSubscribers } from "@/components/admin/NewsletterSubscribers";

export default function AdminResponsesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-navy">Form responses</h1>
        <p className="mt-1 text-sm text-text-body">
          Contact, service enquiries, consulting calls, careers, and newsletter submissions are all
          saved here and emailed to the notification inbox.
        </p>
      </div>
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
