import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import VistaFlair from "@/components/sections/VistaFlair";
import LocationsMap from "@/components/sections/LocationsMap";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <Process />
        <Testimonials />
        <VistaFlair />
        <LocationsMap />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
