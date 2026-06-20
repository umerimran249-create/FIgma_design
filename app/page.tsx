import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBackdrop from "@/components/ui/PageBackdrop";
import Hero from "@/components/sections/Hero";
import ExecutionStatement from "@/components/sections/ExecutionStatement";
import HowWeHelp from "@/components/sections/HowWeHelp";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import Stats from "@/components/sections/Stats";
import Integrations from "@/components/sections/Integrations";
import ClientUpdates from "@/components/sections/ClientUpdates";
import Testimonials from "@/components/sections/Testimonials";
import ExploreActivities from "@/components/sections/ExploreActivities";
import FeaturedInsights from "@/components/sections/FeaturedInsights";
import ServicesBottomHero from "@/components/sections/ServicesBottomHero";
import LocationsMap from "@/components/sections/LocationsMap";

export default function Home() {
  return (
    <>
      <PageBackdrop />
      <Navbar />
      <main className="page-flow seamless-scroll">
        <Hero />
        <MarqueeBanner />
        <ExecutionStatement />
        <Stats />
        <HowWeHelp />
        <Integrations />
        <ClientUpdates />
        <Testimonials />
        <FeaturedInsights />
        <ServicesBottomHero />
        <ExploreActivities />
        <LocationsMap />
      </main>
      <Footer />
    </>
  );
}
