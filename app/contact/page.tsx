import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBackdrop from "@/components/ui/PageBackdrop";
import ContactHero from "@/components/sections/ContactHero";
import LocationsMap from "@/components/sections/LocationsMap";

export const metadata: Metadata = {
  title: "Contact — Vista Logica",
  description:
    "Get in touch with Vista Logica. Headquartered in Melbourne, serving the Asia-Pacific.",
};

export default function ContactPage() {
  return (
    <>
      <PageBackdrop />
      <Navbar />
      <main className="page-flow seamless-scroll">
        <ContactHero />
        <LocationsMap />
      </main>
      <Footer />
    </>
  );
}
