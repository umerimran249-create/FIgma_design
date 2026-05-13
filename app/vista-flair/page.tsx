import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VistaFlairHero from "@/components/sections/VistaFlairHero";
import FlairSlider from "@/components/sections/FlairSlider";
import FlairGrid from "@/components/sections/FlairGrid";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "VistaFlair — Vista Logica",
  description:
    "Cross-industry insights and visionary strategies from Vista Logica. AI governance, cloud economics, telecoms PMF, and more.",
};

export default function VistaFlairPage() {
  return (
    <>
      <Navbar />
      <main>
        <VistaFlairHero />
        <FlairSlider />
        <FlairGrid />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
