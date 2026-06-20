"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import { servicesProcessSteps } from "@/lib/site-data";

export default function ServicesProcessStrip() {
  return (
    <section className="mx-auto mt-20 max-w-[1300px] px-6 pb-[90px] sm:px-10">
      <div className="mb-12 text-center">
        <SectionLabel text="HOW WE WORK" className="justify-center" />
        <h2 className="mt-3.5 font-['Syne'] text-[clamp(26px,3vw,36px)] font-bold tracking-tight text-white">
          A practice that moves in sequence.
        </h2>
      </div>
      <div className="grid border-y border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
        {servicesProcessSteps.map((step, i) => (
          <div
            key={step.title}
            className={`border-white/[0.08] px-5 py-7 sm:border-r sm:px-[22px] sm:py-7 ${
              i === servicesProcessSteps.length - 1 ? "sm:border-r-0" : ""
            } max-sm:border-b max-sm:last:border-b-0`}
          >
            <div className="mb-3.5 text-xs font-bold tracking-[0.08em] text-[#F2B632]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-2 font-['Syne'] text-base font-bold text-white sm:text-[16.5px]">
              {step.title}
            </h3>
            <p className="text-[13px] leading-snug text-white/60">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
