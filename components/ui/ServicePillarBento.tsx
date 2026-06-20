"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Brain, Cloud, PenTool, Sparkles } from "lucide-react";
import Card3D from "@/components/ui/Card3D";
import type { ServicePillar } from "@/lib/site-data";
import { easeSmooth, viewport } from "@/lib/motion";

const pillarIcons: Record<string, LucideIcon> = {
  "ai-ml-industry-guidance": Brain,
  "cloud-enablement-for-ai": Cloud,
  "ai-driven-emerging-services": Sparkles,
  "digital-experience-design": PenTool,
};

type ServicePillarBentoProps = {
  pillars: ServicePillar[];
};

export default function ServicePillarBento({ pillars }: ServicePillarBentoProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <svg viewBox="0 0 100 100" className="h-full w-full opacity-40" aria-hidden>
          <line x1="50" y1="8" x2="50" y2="92" stroke="rgba(255,222,90,0.08)" strokeWidth="0.4" />
          <line x1="8" y1="50" x2="92" y2="50" stroke="rgba(255,222,90,0.08)" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        </svg>
      </div>

      <motion.div
        className="relative grid gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {pillars.map((pillar, i) => {
          const Icon = pillarIcons[pillar.slug] ?? Sparkles;

          return (
            <motion.div
              key={pillar.slug}
              variants={{
                hidden: { opacity: 0, y: 28, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.55, ease: easeSmooth },
                },
              }}
            >
              <Link href={`/services#${pillar.slug}`} className="group block h-full">
                <Card3D accent={pillar.accent} className="h-full">
                  <div className="flex h-full flex-col">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
                        style={{ background: pillar.gradient }}
                      >
                        <Icon size={24} className="text-[#1f2942]" strokeWidth={2.2} />
                      </div>
                      <span className="font-['Syne'] text-[11px] font-bold tracking-[0.2em] text-white/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-['Syne'] text-lg font-bold leading-snug text-white sm:text-xl">
                      {pillar.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-white/55 transition-colors duration-300 group-hover:text-white/70">
                      {pillar.tagline}
                    </p>

                    <span
                      className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-2"
                      style={{ color: pillar.accent }}
                    >
                      Explore capability
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Card3D>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
