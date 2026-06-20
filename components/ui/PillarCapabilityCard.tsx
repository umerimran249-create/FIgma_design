"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Brain, Cloud, Sparkles, PenTool } from "lucide-react";
import Card3D from "@/components/ui/Card3D";
import type { ServicePillar } from "@/lib/site-data";

const pillarIcons: Record<string, LucideIcon> = {
  "ai-ml-industry-guidance": Brain,
  "cloud-enablement-for-ai": Cloud,
  "ai-driven-emerging-services": Sparkles,
  "digital-experience-design": PenTool,
};

const bentoSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

type PillarCapabilityCardProps = {
  pillar: ServicePillar;
  index: number;
  isActive: boolean;
  onActivate: () => void;
};

export function bentoSpanClass(index: number) {
  return bentoSpans[index] ?? "lg:col-span-6";
}

export default function PillarCapabilityCard({
  pillar,
  index,
  isActive,
  onActivate,
}: PillarCapabilityCardProps) {
  const Icon = pillarIcons[pillar.slug] ?? Sparkles;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      onMouseEnter={onActivate}
      onFocus={onActivate}
      animate={{
        scale: isActive ? 1 : 0.98,
        opacity: isActive ? 1 : 0.72,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full min-h-[380px] w-[min(88vw,520px)] shrink-0 snap-center lg:w-auto lg:min-h-[340px]"
    >
      <Card3D accent={pillar.accent} className="flex h-full flex-col">
        <div
          className="relative mb-5 h-32 overflow-hidden rounded-2xl sm:h-36"
          style={{
            background: `linear-gradient(145deg, ${pillar.accent}28 0%, rgba(31,41,66,0.6) 50%, rgba(36,49,82,0.95) 100%)`,
          }}
        >
          <span
            className="pointer-events-none absolute -right-2 -top-4 font-['Syne'] text-[5.5rem] font-bold leading-none opacity-[0.07]"
            aria-hidden
          >
            {num}
          </span>

          <motion.div
            className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 22 + index * 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
            animate={{ rotate: -360 }}
            transition={{ duration: 16 + index * 3, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl shadow-lg sm:h-16 sm:w-16"
            style={{ background: pillar.gradient }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={26} className="text-[#1f2942]" strokeWidth={2.2} />
          </motion.div>

          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{ background: pillar.accent, left: `${22 + dot * 28}%`, top: `${18 + (dot % 2) * 55}%` }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: dot * 0.4 }}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col">
          <div
            className="mb-3 h-1 w-14 rounded-full"
            style={{ background: pillar.gradient }}
          />
          <h3 className="font-['Syne'] text-xl font-bold text-white sm:text-2xl">{pillar.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">{pillar.tagline}</p>

          <motion.div
            className="mt-5 flex-1 space-y-3 border-t border-white/[0.08] pt-5"
            animate={{ opacity: isActive ? 1 : 0.85 }}
          >
            {pillar.items.map((item, ii) => (
              <motion.div
                key={item.title}
                initial={false}
                animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0.75 }}
                transition={{ delay: ii * 0.04, duration: 0.3 }}
                className="group/item rounded-xl border border-transparent px-2 py-1.5 transition-colors hover:border-white/[0.08] hover:bg-white/[0.03]"
              >
                <p className="font-['Syne'] text-sm font-semibold" style={{ color: pillar.accent }}>
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-white/55 sm:text-sm">{item.summary}</p>
              </motion.div>
            ))}
          </motion.div>

          <Link
            href={`/services#${pillar.slug}`}
            className="mt-5 inline-flex text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white"
            style={{ color: pillar.accent }}
          >
            Explore →
          </Link>
        </div>
      </Card3D>
    </motion.div>
  );
}
