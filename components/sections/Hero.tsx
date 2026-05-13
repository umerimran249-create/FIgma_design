'use client';

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SplineHeroVisual from "@/components/ui/SplineHeroVisual";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";

export default function Hero() {
  const splineSceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;

  return (
    <section id="home" className="relative flex min-h-svh items-center pt-28">
      <div className="pointer-events-none absolute -left-[150px] -top-[100px] h-[500px] w-[500px] rounded-full bg-[rgba(37,99,235,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-[-100px] h-[400px] w-[400px] rounded-full bg-[rgba(124,58,237,0.06)] blur-3xl" />
      <div className="container-vl relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <SectionLabel text="DIGITAL ENABLEMENT FOR GROWTH" />
          <h1 className="mt-6 font-['Syne'] text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>Optimize.</motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>Innovate.</motion.span>
            <motion.span className="block [text-shadow:0_0_60px_rgba(6,182,212,0.3)]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}><GradientText>Lead.</GradientText></motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-6 max-w-md text-base leading-7 text-slate-400">
            Utilise analytics and technology to redefine industry standards with tailored solutions and unparalleled expertise.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#services" className="flex h-14 items-center justify-center rounded-[100px] bg-[linear-gradient(135deg,#2563EB,#06B6D4)] px-8 text-base font-semibold text-white shadow-[0_8px_24px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-0.5">
              Explore Our Services →
            </a>
            <a href="#vistaflair" className="flex h-14 items-center justify-center rounded-[100px] border border-white/20 bg-white/5 px-8 text-base font-semibold text-slate-400 transition-colors hover:border-white/40 hover:text-white">
              See Our Insights
            </a>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="mx-auto">
          <SplineHeroVisual scene={splineSceneUrl} />
        </motion.div>
      </div>
      <ChevronDown className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400" style={{ animation: "floatY 1.6s ease-in-out infinite" }} />
    </section>
  );
}
