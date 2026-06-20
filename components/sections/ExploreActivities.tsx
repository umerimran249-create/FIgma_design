"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import ScrollSection3D from "@/components/ui/ScrollSection3D";
import CapabilityOrbit from "@/components/ui/CapabilityOrbit";
import SectionOrbs from "@/components/ui/SectionOrbs";

export default function ExploreActivities() {
  return (
    <ScrollSection3D fill className="section-flow overflow-hidden text-center" tilt={5}>
      <SectionOrbs />
      <div className="container-vl relative flex w-full flex-1 flex-col justify-center">
        <Reveal>
          <SectionLabel text="Everything we do" />
          <h2 className="mx-auto mt-4 max-w-2xl font-['Syne'] text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.05] text-white">
            Your capability,
            <br />
            in orbit.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
            Drag the ring to explore every discipline we deliver.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-10 w-full max-w-[520px] px-2 sm:px-0">
            <CapabilityOrbit interactive />
            <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-white/35">
              Drag to spin
            </p>
          </div>
        </Reveal>
      </div>
    </ScrollSection3D>
  );
}
