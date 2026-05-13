import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
      <Navbar />
      <main>
        <ContactHero />
        <LocationsMap />
      </main>
      <Footer />
    </>
  );
}
