"use client";

import Link from "next/link";
import ScrollSection3D from "@/components/ui/ScrollSection3D";
import Card3D from "@/components/ui/Card3D";
import Reveal from "@/components/ui/Reveal";
import SectionOrbs from "@/components/ui/SectionOrbs";
import { servicesBottomHero } from "@/lib/site-data";

export default function ServicesBottomHero() {
  return (
    <ScrollSection3D fill className="section-flow" tilt={6}>
      <SectionOrbs />
      <div className="container-vl relative flex w-full flex-1 flex-col justify-center">
        <Reveal>
          <Card3D className="mx-auto max-w-4xl text-center">
            <h2 className="font-['Syne'] text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.05] text-white">
              {servicesBottomHero.headline}
              <br />
              <span className="gradient-text">{servicesBottomHero.headlineAccent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              {servicesBottomHero.body}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-14 items-center rounded-full px-10 text-base font-semibold text-[#1f2942]"
              style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
            >
              Start A Conversation →
            </Link>
          </Card3D>
        </Reveal>
      </div>
    </ScrollSection3D>
  );
}
