import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vista Logica — Innovate. Collaborate. Accelerate.",
  description:
    "Bringing strategy, technology, and expertise together to help organisations design smarter solutions, scale capabilities, and achieve measurable business outcomes.",
  keywords:
    "data analytics, cloud enablement, digital experience, AI, Melbourne",
  openGraph: {
    title: "Vista Logica",
    description: "Exceptional Services and Innovative Solutions",
    url: "https://vistalogica.com.au",
    siteName: "Vista Logica",
    locale: "en_AU",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2e3b5b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
