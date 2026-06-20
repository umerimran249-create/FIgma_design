"use client";

import ScrollSection3D from "@/components/ui/ScrollSection3D";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionOrbs from "@/components/ui/SectionOrbs";
import Reveal from "@/components/ui/Reveal";
import TestimonialSpotlight, { featuredTestimonials } from "@/components/ui/TestimonialSpotlight";
import { testimonials } from "@/lib/site-data";

const featured = featuredTestimonials(testimonials);

export default function Testimonials() {
  return (
    <ScrollSection3D id="clients" fillMin className="section-flow overflow-hidden" tilt={4}>
      <SectionOrbs />
      <div className="relative flex w-full flex-1 flex-col justify-center py-6 sm:py-10">
        <div className="container-vl relative z-10 mb-6 text-center sm:mb-8">
          <Reveal>
            <SectionLabel text="Client voices" />
            <h2 className="mx-auto mt-4 max-w-2xl font-['Syne'] text-[clamp(2rem,6vw,3.25rem)] font-bold leading-tight text-white">
              Hear it from
              <br />
              <span className="gradient-text">our clients.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/55 sm:text-base">
              Four leaders. Four industries. One thing in common — execution that delivered.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-8 sm:gap-12">
            {[
              { value: "95%", label: "Would recommend" },
              { value: "4.9", label: "Client rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-['Syne'] text-2xl font-bold text-[#ffde5a] sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/40">
                  {s.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative z-10 w-full">
          <TestimonialSpotlight items={featured} />
        </div>
      </div>
    </ScrollSection3D>
  );
}
