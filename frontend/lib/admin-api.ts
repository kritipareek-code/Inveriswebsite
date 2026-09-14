import type { AboutPageContent } from "@/lib/about-content";
import type { ApproachPageContent } from "@/lib/approach-content";
import {
  normalizeCareersContent,
  type CareersPageContent,
} from "@/lib/careers-content";
import {
  normalizeContactContent,
  type ContactPageContent,
} from "@/lib/contact-content";
import type { LeadershipPageContent } from "@/lib/leadership-content";
import type { ServicesPageContent } from "@/lib/services-content";
import type { IndustriesPageContent } from "@/lib/industries-content";
import { getApiBaseUrl, type HomeContent } from "@/lib/home-content";
import type { FooterContent } from "@/lib/footer-content";

const TOKEN_KEY = "inveris-admin-token";

export function getAdminToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function adminFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  const token = getAdminToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function loginAdmin(email: string, password: string) {
  const data = await adminFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAdminToken(data.token);
  return data.admin as { email: string };
}

export async function fetchAdminSession() {
  const data = await adminFetch("/api/auth/me");
  return data.admin as { email: string };
}

export async function saveHomeContent(content: HomeContent) {
  const data = await adminFetch("/api/content/home", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return data.content as HomeContent;
}

export async function saveAboutContent(content: AboutPageContent) {
  const data = await adminFetch("/api/content/about", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return data.content as AboutPageContent;
}

export async function saveServicesContent(content: ServicesPageContent) {
  const data = await adminFetch("/api/content/services", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return data.content as ServicesPageContent;
}

export async function saveIndustriesContent(content: IndustriesPageContent) {
  const data = await adminFetch("/api/content/industries", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return data.content as IndustriesPageContent;
}

export async function saveApproachContent(content: ApproachPageContent) {
  const data = await adminFetch("/api/content/approach", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return data.content as ApproachPageContent;
}

export async function saveLeadershipContent(content: LeadershipPageContent) {
  const data = await adminFetch("/api/content/leadership", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return data.content as LeadershipPageContent;
}

export async function saveContactContent(content: ContactPageContent) {
  const data = await adminFetch("/api/content/contact", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return normalizeContactContent(data.content);
}

export async function saveCareersContent(content: CareersPageContent) {
  const data = await adminFetch("/api/content/careers", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return normalizeCareersContent(data.content);
}

export async function saveFooterContent(content: FooterContent) {
  const data = await adminFetch("/api/content/footer", {
    method: "PUT",
    body: JSON.stringify(content),
  });
  return data.content as FooterContent;
}

export async function uploadAdminImage(file: File) {
  const form = new FormData();
  form.append("image", file);
  const data = await adminFetch("/api/upload", {
    method: "POST",
    body: form,
  });
  return data.url as string;
}

export async function deleteAdminImage(url: string) {
  if (!url || !/^https?:\/\/[^/]*imagekit\.io\//i.test(url)) return;
  await adminFetch("/api/upload/delete", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  enquiryType: string;
  subject: string;
  source?: string;
  message: string;
  read: boolean;
  emailSent: boolean;
  createdAt: string;
};

export async function fetchContactSubmissions() {
  const data = await adminFetch("/api/contact/submissions");
  return {
    submissions: (data.submissions || []) as ContactSubmission[],
    unread: Number(data.unread || 0),
  };
}

export async function fetchContactUnreadCount() {
  const data = await adminFetch("/api/contact/submissions/unread-count");
  return Number(data.unread || 0);
}

export async function fetchCareerUnreadCount() {
  const data = await adminFetch("/api/careers/applications/unread-count");
  return Number(data.unread || 0);
}

export async function markContactSubmissionRead(id: string, read = true) {
  const data = await adminFetch(`/api/contact/submissions/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ read }),
  });
  return data.submission as ContactSubmission;
}

export async function deleteContactSubmission(id: string) {
  await adminFetch(`/api/contact/submissions/${id}`, { method: "DELETE" });
}

export type CareerApplication = {
  id: string;
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
  jobId: string;
  jobTitle: string;
  jobLocation: string;
  jobLineOfService: string;
  resumeUrl: string;
  resumeName: string;
  read: boolean;
  emailSent: boolean;
  createdAt: string;
};

export async function fetchCareerApplications() {
  const data = await adminFetch("/api/careers/applications");
  return {
    applications: (data.applications || []) as CareerApplication[],
    unread: Number(data.unread || 0),
  };
}

export async function markCareerApplicationRead(id: string, read = true) {
  const data = await adminFetch(`/api/careers/applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ read }),
  });
  return data.application as CareerApplication;
}

export async function deleteCareerApplication(id: string) {
  await adminFetch(`/api/careers/applications/${id}`, { method: "DELETE" });
}

export type NewsletterSubscriber = {
  id: string;
  email: string;
  emailSent: boolean;
  createdAt: string;
};

export async function fetchNewsletterSubscribers() {
  const data = await adminFetch("/api/newsletter/subscribers");
  return (data.subscribers || []) as NewsletterSubscriber[];
}

export async function deleteNewsletterSubscriber(id: string) {
  await adminFetch(`/api/newsletter/subscribers/${id}`, { method: "DELETE" });
}
