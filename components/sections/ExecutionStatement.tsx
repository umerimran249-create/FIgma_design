"use client";

import Link from "next/link";
import ScrollSection3D from "@/components/ui/ScrollSection3D";
import Card3D from "@/components/ui/Card3D";
import Reveal from "@/components/ui/Reveal";
import SectionOrbs from "@/components/ui/SectionOrbs";
import { executionStatement } from "@/lib/site-data";

export default function ExecutionStatement() {
  return (
    <ScrollSection3D fill className="section-flow" tilt={5}>
      <SectionOrbs />
      <div className="container-vl relative flex w-full flex-1 flex-col justify-center">
        <Reveal>
          <Card3D className="mx-auto max-w-4xl text-center">
            <h2 className="font-['Syne'] text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-[1.08] text-white">
              {executionStatement.headline}
              <br />
              <span className="gradient-text">{executionStatement.headlineAccent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              {executionStatement.body}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center rounded-full px-8 text-sm font-semibold text-[#1f2942]"
              style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
            >
              {executionStatement.cta}
            </Link>
          </Card3D>
        </Reveal>
      </div>
    </ScrollSection3D>
  );
}
