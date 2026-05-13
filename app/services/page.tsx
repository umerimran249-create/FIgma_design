import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHero from "@/components/sections/ServicesHero";
import ServiceDetail from "@/components/sections/ServiceDetail";
import CTA from "@/components/sections/CTA";
import { servicesData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services — Vista Logica",
  description:
    "Cloud, data, AI, and digital experience services from Vista Logica. Strategy through to delivery, with measurable outcomes.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        {servicesData.map((s, i) => (
          <ServiceDetail key={s.slug} service={s} index={i} />
        ))}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
