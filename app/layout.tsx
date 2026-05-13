import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vista Logica — Optimize. Innovate. Lead.",
  description:
    "Optimising business outcomes through technology and digital enablement. Cloud, data, and digital solutions from Melbourne, Australia.",
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
