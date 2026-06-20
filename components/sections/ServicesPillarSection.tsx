"use client";

import Link from "next/link";
import ScrollSection3D from "@/components/ui/ScrollSection3D";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionOrbs from "@/components/ui/SectionOrbs";
import Reveal from "@/components/ui/Reveal";
import ServicePillarBento from "@/components/ui/ServicePillarBento";
import { servicePillars } from "@/lib/site-data";

type ServicesPillarSectionProps = {
  id?: string;
  showCta?: boolean;
};

export default function ServicesPillarSection({
  id = "how-we-help",
  showCta = true,
}: ServicesPillarSectionProps) {
  return (
    <ScrollSection3D id={id} fill className="section-flow overflow-hidden" tilt={4}>
      <SectionOrbs />

      <div className="relative flex w-full flex-1 flex-col justify-center py-6 sm:py-10">
        <div className="container-vl relative z-10">
          <Reveal>
            <SectionLabel text="Here's how we can help" />
            <h2 className="mt-4 max-w-3xl font-['Syne'] text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.05] text-white">
              Capability that compounds at
              <br />
              <span className="gradient-text">every layer.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Four ways we turn AI, cloud, and digital ambition into systems your business can
              run on.
            </p>
          </Reveal>

          <div className="relative z-10 mt-10 sm:mt-12">
            <ServicePillarBento pillars={servicePillars} />
          </div>

          {showCta && (
            <Reveal delay={0.15} className="relative z-10 mt-10 shrink-0 pb-2 text-center sm:mt-12">
              <Link
                href="/services"
                className="inline-flex h-12 items-center rounded-full border border-white/20 px-8 text-sm font-semibold text-white/80 transition-colors hover:border-[#ffde5a] hover:text-[#ffde5a]"
              >
                View all services
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </ScrollSection3D>
  );
}
