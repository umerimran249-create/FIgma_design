"use client";

import { motion } from "framer-motion";
import {
  Database,
  Cloud,
  Cpu,
  BarChart3,
  Boxes,
  GitBranch,
  Workflow,
  ShieldCheck,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import ScrollSection3D from "@/components/ui/ScrollSection3D";
import SectionOrbs from "@/components/ui/SectionOrbs";

const inner = [
  { Icon: Database, label: "Data" },
  { Icon: Cloud, label: "Cloud" },
  { Icon: Cpu, label: "AI" },
  { Icon: BarChart3, label: "Analytics" },
];

const outer = [
  { Icon: Boxes, label: "Platforms" },
  { Icon: GitBranch, label: "Pipelines" },
  { Icon: Workflow, label: "Automation" },
  { Icon: ShieldCheck, label: "Governance" },
  { Icon: Database, label: "Warehouse" },
  { Icon: Cloud, label: "Multi-cloud" },
];

function OrbitRing({
  items,
  radius,
  duration,
  reverse = false,
}: {
  items: { Icon: typeof Database; label: string }[];
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.06]"
        style={{
          width: radius * 2,
          height: radius * 2,
          transform: "translate(-50%, -50%)",
        }}
      />
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.div
            key={`${item.label}-${i}`}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#243152] sm:h-14 sm:w-14"
            style={{ x, y }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.15, borderColor: "rgba(255,222,90,0.6)" }}
          >
            <item.Icon size={20} className="text-[#ffde5a]" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function Integrations() {
  return (
    <ScrollSection3D fill className="section-flow overflow-hidden" tilt={4}>
      <SectionOrbs />
      <div className="container-vl relative grid w-full flex-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionLabel text="Integration is key" />
          <h2 className="mt-4 font-['Syne'] text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.05] text-white">
            One connected
            <br />
            ecosystem.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
            Data, cloud, and intelligence working as one — every layer wired together
            so insight flows where you need it.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            {/* glow */}
            <div className="pointer-events-none absolute inset-[20%] rounded-full bg-[radial-gradient(circle,rgba(255,222,90,0.18),transparent_70%)] blur-2xl" />

            <OrbitRing items={outer} radius={170} duration={42} />
            <OrbitRing items={inner} radius={96} duration={28} reverse />

            {/* center hub */}
            <motion.div
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl"
              style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
              animate={{ boxShadow: ["0 0 30px rgba(255,222,90,0.4)", "0 0 60px rgba(255,222,90,0.7)", "0 0 30px rgba(255,222,90,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-['Syne'] text-xl font-bold text-[#1f2942]">VL</span>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </ScrollSection3D>
  );
}
