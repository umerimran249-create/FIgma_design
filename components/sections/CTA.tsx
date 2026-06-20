"use client";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

export default function CTA() {
  return (
    <section id="contact" className="section-flow relative text-center">
      <div className="container-vl">
        <Reveal>
          <SectionLabel text="Let's talk" />
          <h2 className="mt-4 font-['Syne'] text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.05] text-white">
            The time to act
            <br />
            <span className="gradient-text">is now.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-8">
          <Link
            href="/contact"
            className="inline-flex h-14 items-center rounded-full px-10 text-base font-semibold text-[#1f2942]"
            style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
          >
            Book a Free Consultation →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
