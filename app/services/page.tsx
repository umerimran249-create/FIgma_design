import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBackdrop from "@/components/ui/PageBackdrop";
import ServicesHero from "@/components/sections/ServicesHero";
import ServicesSpine from "@/components/sections/ServicesSpine";
import ServicesProcessStrip from "@/components/sections/ServicesProcessStrip";
import ServicesBottomHero from "@/components/sections/ServicesBottomHero";
import ExploreActivities from "@/components/sections/ExploreActivities";
import { servicePillars } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services — Vista Logica",
  description:
    "Capability that compounds at every layer. AI, cloud, emerging services, and digital experience from Vista Logica.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBackdrop />
      <Navbar />
      <main className="page-flow seamless-scroll">
        <ServicesHero />
        <ServicesSpine pillars={servicePillars} />
        <ServicesProcessStrip />
        <ServicesBottomHero />
        <ExploreActivities />
      </main>
      <Footer />
    </>
  );
}
