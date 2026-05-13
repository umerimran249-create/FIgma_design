'use client';

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";
import SplineBackground from "@/components/ui/SplineBackground";

export default function VistaFlairHero() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-32 lg:pt-36">
      <SplineBackground variant="particles" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[rgba(255,222,90,0.14)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] top-40 h-[380px] w-[380px] rounded-full bg-[rgba(255,182,72,0.10)] blur-3xl" />

      <div className="container-vl relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionLabel text="VISTAFLAIR · INSIGHTS" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-5 font-['Syne'] text-[34px] font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hop aboard the
            <br />
            <GradientText>thought leadership</GradientText>
            <br />
            express.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-lg text-base leading-7 text-white/75"
          >
            Cross-industry insights and visionary strategies in every compartment.
            Don&apos;t let the train of thought leadership pass you by — read
            about the innovation that can lead your organisation full steam ahead.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto h-[300px] w-[280px] max-w-full sm:h-[360px] sm:w-[320px] lg:h-[420px] lg:w-[380px]"
        >
          <ArticleStack />
        </motion.div>
      </div>
    </section>
  );
}

function ArticleStack() {
  const cards = [
    { c: "AI", color: "#ffde5a", title: "Responsible AI" },
    { c: "Cloud", color: "#ffb648", title: "Cloud Economics" },
    { c: "Data", color: "#ffe888", title: "Data Monetization" },
  ];
  return (
    <div className="relative h-full w-full">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur sm:h-[240px] sm:w-[240px] sm:p-6 lg:h-[260px] lg:w-[260px]"
          style={{
            transform: `translate(-50%, -50%) translateY(${(i - 1) * 18}px) translateX(${(i - 1) * 14}px) rotate(${(i - 1) * 5}deg)`,
            background: `linear-gradient(160deg, ${card.color}40, #243152 70%)`,
            zIndex: 10 - i,
            animation: `floatY ${3 + i * 0.4}s ease-in-out ${i * 0.4}s infinite`,
          }}
        >
          <span
            className="inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-wider"
            style={{ color: card.color, background: `${card.color}22`, border: `1px solid ${card.color}55` }}
          >
            {card.c}
          </span>
          <p className="mt-6 font-['Syne'] text-2xl font-bold text-white">{card.title}</p>
          <div className="mt-6 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-white/10" />
              <div className="space-y-1">
                <div className="h-1.5 w-16 rounded-full bg-white/15" />
                <div className="h-1 w-10 rounded-full bg-white/10" />
              </div>
            </div>
            <span className="text-xs" style={{ color: card.color }}>
              Read →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
