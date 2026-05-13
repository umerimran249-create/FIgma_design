'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { servicesData } from "@/lib/site-data";

type Service = (typeof servicesData)[number];

export default function ServiceDetail({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [activePillar, setActivePillar] = useState(0);
  const flip = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className={`relative overflow-hidden ${flip ? "bg-[#0D0D1A]" : "bg-[#07070F]"}`}
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `${service.accent}1a` }}
      />
      <div className="container-vl relative z-10">
        <div className={`grid items-start gap-12 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="mb-4 inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider"
              style={{
                color: service.accent,
                borderColor: `${service.accent}66`,
                background: `${service.accent}1F`,
              }}
            >
              0{index + 1} · Service
            </span>
            <h2 className="font-['Syne'] text-4xl font-bold leading-tight text-white max-lg:text-3xl">
              {service.title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-400">
              {service.long}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {service.pillars.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setActivePillar(i)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    activePillar === i
                      ? "text-white"
                      : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                  }`}
                  style={
                    activePillar === i
                      ? {
                          borderColor: service.accent,
                          background: `${service.accent}22`,
                          color: service.accent,
                        }
                      : undefined
                  }
                >
                  {p.name}
                </button>
              ))}
            </div>

            <motion.ul
              key={activePillar}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-3"
            >
              {service.pillars[activePillar].items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                  <CheckCircle2 size={18} style={{ color: service.accent }} className="mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square w-full max-w-[480px] overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_55%),#0B0B16] shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            <ServiceVisual accent={service.accent} gradient={service.gradient} variant={index} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceVisual({
  accent,
  gradient,
  variant,
}: {
  accent: string;
  gradient: string;
  variant: number;
}) {
  if (variant === 0) {
    return <DataVisual accent={accent} gradient={gradient} />;
  }
  if (variant === 1) {
    return <CloudVisual accent={accent} gradient={gradient} />;
  }
  return <DesignVisual accent={accent} gradient={gradient} />;
}

function DataVisual({ accent, gradient }: { accent: string; gradient: string }) {
  const bars = Array.from({ length: 18 }, (_, i) => 30 + Math.sin(i * 0.7) * 40 + Math.random() * 30);
  return (
    <div className="relative h-full w-full p-8">
      <div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accent}44, transparent 70%)`,
          animation: "pulse 3s ease-in-out infinite",
        }}
      />
      <div className="relative flex h-full items-end justify-between gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${h}%`,
              background: gradient,
              opacity: 0.65 + (i % 3) * 0.15,
              animation: `floatY ${2 + (i % 4) * 0.3}s ease-in-out ${i * 0.08}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="absolute left-6 top-6 rounded-md border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">
        Live Dataset · 100k events/s
      </div>
      <div
        className="absolute right-6 top-6 rounded-md border bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur"
        style={{ color: accent, borderColor: `${accent}55` }}
      >
        AI Score · 0.97
      </div>
    </div>
  );
}

function CloudVisual({ accent, gradient }: { accent: string; gradient: string }) {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="cloudStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="100"
            rx={30 + i * 12}
            ry={20 + i * 8}
            fill="none"
            stroke="url(#cloudStroke)"
            strokeWidth="0.5"
            opacity={0.3 - i * 0.04}
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </svg>
      <div
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl text-white shadow-[0_20px_60px_rgba(124,58,237,0.45)]"
        style={{ background: gradient }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 18a4 4 0 0 0 .6-7.96 6 6 0 0 0-11.7 1.4A4.5 4.5 0 0 0 7 19h10z"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {[
        { x: 18, y: 22, label: "EU" },
        { x: 80, y: 18, label: "US" },
        { x: 12, y: 70, label: "AU" },
        { x: 86, y: 76, label: "APAC" },
      ].map((n, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            animation: `floatY ${3 + (i % 2)}s ease-in-out ${i * 0.4}s infinite`,
          }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl border text-[10px] font-bold text-white backdrop-blur"
            style={{ borderColor: `${accent}66`, background: `${accent}22` }}
          >
            {n.label}
          </div>
        </div>
      ))}
      <div
        className="absolute right-6 top-6 rounded-md border bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur"
        style={{ color: accent, borderColor: `${accent}55` }}
      >
        Multi-region · 99.99%
      </div>
    </div>
  );
}

function DesignVisual({ accent, gradient }: { accent: string; gradient: string }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-6 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div
            className="aspect-square rounded-xl"
            style={{ background: gradient, opacity: 0.95 }}
          />
          <div className="space-y-2">
            <div className="h-2 w-16 rounded-full bg-white/20" />
            <div className="h-2 w-24 rounded-full bg-white/15" />
            <div className="h-2 w-20 rounded-full bg-white/10" />
            <div
              className="mt-3 inline-flex h-7 items-center rounded-full px-3 text-[10px] font-semibold text-white"
              style={{ background: gradient }}
            >
              Buy now
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 rounded-lg border border-white/10"
              style={{
                background: i === 2 ? `${accent}33` : "rgba(255,255,255,0.04)",
                animation: `floatY ${2 + i * 0.3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <div
        className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full blur-2xl"
        style={{ background: `${accent}55` }}
      />
    </div>
  );
}
