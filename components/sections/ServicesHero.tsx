'use client';

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";
import SplineBackground from "@/components/ui/SplineBackground";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden pt-32 lg:pt-36">
      <SplineBackground variant="orbits" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[rgba(37,99,235,0.12)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] top-40 h-[380px] w-[380px] rounded-full bg-[rgba(124,58,237,0.1)] blur-3xl" />
      <div className="container-vl relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionLabel text="OUR EXPERTISE" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-5 font-['Syne'] text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            Explore our
            <br />
            <GradientText>expertise.</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-lg text-base leading-7 text-slate-400"
          >
            Discover our digital ecosystem of bespoke services. From expert
            consulting to flawless execution, we are here to help you take the
            leap forward.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex gap-3"
          >
            <a href="#data-analytics-insights" className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300">
              Data &amp; AI
            </a>
            <a href="#cloud-enablement" className="rounded-full border border-violet-400/40 bg-violet-400/10 px-4 py-2 text-xs text-violet-300">
              Cloud
            </a>
            <a href="#digital-experience-design" className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300">
              Digital
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto h-[360px] w-[360px] sm:h-[420px] sm:w-[420px]"
        >
          <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.25),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.2),transparent_55%),#0B0B16]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FloatingNodes />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingNodes() {
  const nodes = [
    { x: 50, y: 50, size: 80, label: "VL", main: true },
    { x: 18, y: 28, size: 44, label: "AI", color: "#2563EB" },
    { x: 82, y: 30, size: 48, label: "API", color: "#7C3AED" },
    { x: 12, y: 72, size: 42, label: "DBT", color: "#06B6D4" },
    { x: 86, y: 70, size: 46, label: "K8s", color: "#10B981" },
    { x: 50, y: 12, size: 38, label: "ML", color: "#06B6D4" },
    { x: 50, y: 88, size: 38, label: "UX", color: "#7C3AED" },
  ];
  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.slice(1).map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="url(#linkGrad)"
            strokeWidth="0.25"
            strokeDasharray="0.6 0.4"
            opacity="0.55"
          />
        ))}
        <defs>
          <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            animation: `floatY ${3 + (i % 3)}s ease-in-out ${i * 0.2}s infinite`,
          }}
        >
          <div
            className={`flex items-center justify-center rounded-full font-['Syne'] font-bold ${
              n.main ? "text-white text-xl" : "text-white text-xs"
            }`}
            style={{
              width: n.size,
              height: n.size,
              background: n.main
                ? "linear-gradient(135deg,#2563EB,#06B6D4)"
                : `radial-gradient(circle, ${n.color}66, ${n.color}22)`,
              border: n.main ? "1px solid rgba(255,255,255,0.2)" : `1px solid ${n.color}55`,
              boxShadow: n.main ? "0 0 50px rgba(6,182,212,0.45)" : `0 0 24px ${n.color}33`,
            }}
          >
            {n.label}
          </div>
        </div>
      ))}
    </div>
  );
}
