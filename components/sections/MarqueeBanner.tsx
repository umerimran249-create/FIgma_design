"use client";

import type { CSSProperties } from "react";
import AutoMarquee from "@/components/ui/AutoMarquee";
import { techStack } from "@/components/ui/TechLogos";

export default function MarqueeBanner() {
  return (
    <section
      className="section-flow--tight relative overflow-hidden py-8 sm:py-10"
      aria-label="Technologies we work with"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,rgba(255,222,90,0.04),transparent_70%)]" />

      <p className="container-vl relative mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
        Platforms &amp; tools we work with
      </p>

      <AutoMarquee speed="slow" gapClass="gap-5 sm:gap-8">
        {techStack.map(({ name, Icon, color }) => (
          <div
            key={name}
            className="group flex shrink-0 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] sm:px-5 sm:py-3.5"
            title={name}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-white/40 transition-colors duration-300 group-hover:[color:var(--logo-color)]"
              style={{ "--logo-color": color } as CSSProperties}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span className="hidden font-['Syne'] text-sm font-semibold text-white/50 transition-colors duration-300 group-hover:text-white/80 sm:block">
              {name}
            </span>
          </div>
        ))}
      </AutoMarquee>
    </section>
  );
}
