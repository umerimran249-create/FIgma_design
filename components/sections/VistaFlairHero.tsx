"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";
import { easeSmooth, viewport } from "@/lib/motion";

const HERO_BG =
  "https://www.figma.com/api/mcp/asset/a32c65c2-f20c-4376-a88a-90b9a43e65d9";

const cards = [
  { c: "AI", color: "#ffde5a", title: "Responsible AI" },
  { c: "Cloud", color: "#ffb648", title: "Cloud Economics" },
  { c: "Data", color: "#ffe888", title: "Data Monetization" },
];

const cardLayout = [
  { x: -96, y: 36, rotate: -14, baseZ: 1 },
  { x: 0, y: -8, rotate: 0, baseZ: 3 },
  { x: 96, y: 36, rotate: 14, baseZ: 2 },
];

export default function VistaFlairHero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden pb-16 pt-24 sm:min-h-[680px] sm:pb-20 sm:pt-32 lg:min-h-[738px] lg:pb-[120px] lg:pt-36">
      <Image
        src={HERO_BG}
        alt=""
        fill
        priority
        className="object-cover object-center opacity-35"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#2e3b5b]/80" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[rgba(255,222,90,0.14)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] top-40 h-[380px] w-[380px] rounded-full bg-[rgba(255,182,72,0.10)] blur-3xl" />

      <div className="container-vl relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            <SectionLabel text="VISTAFLAIR · INSIGHTS" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.1, duration: 0.6, ease: easeSmooth }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.25, ease: easeSmooth }}
            className="mt-6 max-w-lg text-base leading-7 text-white/75"
          >
            Cross-industry insights and visionary strategies in every compartment.
            Don&apos;t let the train of thought leadership pass you by — read
            about the innovation that can lead your organisation full steam ahead.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: easeSmooth }}
          className="relative mx-auto h-[340px] w-full max-w-[520px] sm:h-[380px] lg:h-[420px]"
        >
          <ArticleStack />
        </motion.div>
      </div>
    </section>
  );
}

function ArticleStack() {
  const [active, setActive] = useState(1);

  return (
    <div className="relative h-full w-full" onMouseLeave={() => setActive(1)}>
      {cards.map((card, i) => {
        const layout = cardLayout[i];
        const isActive = active === i;
        const z = isActive ? 10 : layout.baseZ;

        return (
          <motion.div
            key={card.title}
            className="absolute left-1/2 top-1/2 w-[200px] cursor-pointer sm:w-[220px] lg:w-[240px]"
            style={{ zIndex: z }}
            animate={{
              x: `calc(-50% + ${layout.x}px)`,
              y: `calc(-50% + ${layout.y + (isActive ? -12 : 0)}px)`,
              rotate: layout.rotate,
              scale: isActive ? 1.04 : 0.94,
              opacity: isActive ? 1 : 0.82,
            }}
            transition={{ duration: 0.35, ease: easeSmooth }}
            onMouseEnter={() => setActive(i)}
          >
            <motion.div
              animate={{ y: isActive ? [0, -4, 0] : 0 }}
              transition={
                isActive
                  ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              className={`rounded-3xl border p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:p-6 ${
                isActive ? "border-white/20" : "border-white/10"
              }`}
              style={{
                background: `linear-gradient(160deg, ${card.color}${isActive ? "40" : "28"} 0%, #38476c 45%, #243152 100%)`,
              }}
            >
              <span
                className="inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-wider"
                style={{
                  color: card.color,
                  background: `${card.color}22`,
                  border: `1px solid ${card.color}55`,
                }}
              >
                {card.c}
              </span>
              <p className="mt-6 font-['Syne'] text-xl font-bold text-white sm:text-2xl">
                {card.title}
              </p>
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
                <span className="text-xs font-semibold" style={{ color: card.color }}>
                  Read →
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
