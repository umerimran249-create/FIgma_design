"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import { servicesPageHero } from "@/lib/site-data";

export default function ServicesHero() {
  return (
    <header className="section-flow section-flow--hero mx-auto max-w-[1300px] px-6 pb-12 pt-[100px] text-center sm:px-10 sm:pt-28">
      <SectionLabel text="Services" className="justify-center" />
      <h1 className="mx-auto mt-4 max-w-[760px] font-['Syne'] text-[clamp(2.25rem,4.6vw,3.625rem)] font-bold leading-[1.08] tracking-tight text-white">
        {servicesPageHero.title}{" "}
        <span className="gradient-text">{servicesPageHero.titleAccent}</span>
      </h1>
      <p className="mx-auto mt-5 max-w-[540px] text-base leading-relaxed text-white/60 sm:text-[16.5px]">
        {servicesPageHero.subtext}
      </p>
    </header>
  );
}
