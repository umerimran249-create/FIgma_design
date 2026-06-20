import ServicesPillarSection from "@/components/sections/ServicesPillarSection";

/** Services page — focused pillar carousel without the homepage CTA. */
export default function ServicesShowcase() {
  return <ServicesPillarSection id="services-pillars" showCta={false} />;
}
