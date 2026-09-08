import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/content";
import { fetchFooterContent } from "@/lib/footer-content";
import { seoConfig } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoConfig.home.title,
    template: `%s`,
  },
  description: seoConfig.home.description,
  keywords: [...seoConfig.brand.keywords],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: seoConfig.home.title,
    description: seoConfig.home.description,
    siteName: seoConfig.brand.name,
    type: "website",
    url: siteConfig.url,
    locale: "en_IN",
    images: [
      {
        url: "/images/Logo.jpeg",
        alt: seoConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: seoConfig.home.title,
    description: seoConfig.home.description,
    images: ["/images/Logo.jpeg"],
  },
  icons: {
    icon: "/images/Logo.jpeg",
    apple: "/images/Logo.jpeg",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const footer = await fetchFooterContent();

  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        <SiteFrame footer={footer}>{children}</SiteFrame>
      </body>
    </html>
  );
}
