"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import AutoMarquee from "@/components/ui/AutoMarquee";

const pillars = ["Lead the curve", "Go the extra mile", "Build together", "Ship faster", "Scale smarter"];

export default function WhyUs() {
  return (
    <section id="about" className="section-flow overflow-hidden">
      <div className="container-vl">
        <Reveal>
          <SectionLabel text="Why us" />
          <h2 className="mt-4 font-['Syne'] text-[clamp(2rem,6vw,3.5rem)] font-bold leading-tight text-white">
            Cutting-edge
            <br />
            technology.
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 border-y border-white/[0.06] py-6">
        <AutoMarquee speed="slow" gapClass="gap-16 sm:gap-24">
          {pillars.map((p) => (
            <span
              key={p}
              className="whitespace-nowrap font-['Syne'] text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white/25 transition-colors hover:text-[#ffde5a]/60"
            >
              {p}
            </span>
          ))}
        </AutoMarquee>
      </div>
    </section>
  );
}
