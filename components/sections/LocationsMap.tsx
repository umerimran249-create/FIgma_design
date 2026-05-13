'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Mail } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SplineBackground from "@/components/ui/SplineBackground";
import { locations, siteConfig } from "@/lib/site-data";

export default function LocationsMap() {
  const [active, setActive] = useState(locations[0].id);
  const current = locations.find((l) => l.id === active) ?? locations[0];

  return (
    <section id="locations" className="relative overflow-hidden bg-[#07070F]">
      <SplineBackground variant="grid" />
      <div className="container-vl relative z-10">
        <div className="flex flex-col items-start gap-4">
          <SectionLabel text="WHERE WE WORK" />
          <h2 className="font-['Syne'] text-4xl font-bold text-white max-lg:text-[28px]">
            Global presence,
            <br />
            local partnership.
          </h2>
          <p className="max-w-xl text-[15px] leading-7 text-slate-400">
            Headquartered in Melbourne with engagement studios across the Asia-Pacific.
            Drop us a line — we&apos;ll find the nearest team.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(124,58,237,0.18),transparent_55%),#0B0B16] p-6 shadow-[0_20px_60px_rgba(6,182,212,0.08)]"
          >
            <div className="relative aspect-[16/9] w-full">
              <WorldMapSvg />
              {locations.map((loc) => (
                <MapPinMark
                  key={loc.id}
                  loc={loc}
                  active={active === loc.id}
                  onClick={() => setActive(loc.id)}
                />
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {locations.map((loc, i) => {
              const isActive = active === loc.id;
              return (
                <motion.button
                  key={loc.id}
                  type="button"
                  onClick={() => setActive(loc.id)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                    isActive
                      ? "border-cyan-400/60 bg-[#111122] shadow-[0_8px_32px_rgba(6,182,212,0.18)]"
                      : "border-white/10 bg-[#0d0d1a] hover:border-white/20"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-[3px] transition-all ${
                      isActive
                        ? "bg-[linear-gradient(180deg,#2563EB,#06B6D4)]"
                        : "bg-transparent"
                    }`}
                  />
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                      <MapPin size={16} />
                    </span>
                    <div>
                      <p className="font-['Syne'] text-base font-bold text-white">
                        {loc.city}, {loc.country}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-cyan-400">
                        {loc.role}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {loc.address}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#0d0d1a] p-4 text-sm text-slate-400 transition-all hover:border-white/30 hover:text-white"
            >
              <span className="flex items-center gap-3">
                <Mail size={16} className="text-cyan-400" />
                {siteConfig.email}
              </span>
              <span className="text-cyan-400">→</span>
            </a>
          </div>
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-[24px] border border-white/10"
        >
          <iframe
            title={`${current.city} office`}
            src={`https://maps.google.com/maps?q=${current.lat},${current.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            className="h-[360px] w-full grayscale-[0.4]"
            style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.8)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

function MapPinMark({
  loc,
  active,
  onClick,
}: {
  loc: (typeof locations)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{ left: `${loc.mapX}%`, top: `${loc.mapY}%` }}
      aria-label={`${loc.city}, ${loc.country}`}
    >
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{
            background: active ? "#06B6D4" : "#2563EB",
            animation: "pulse 1.6s ease-out infinite",
          }}
        />
        <span
          className="absolute inline-flex h-7 w-7 rounded-full"
          style={{
            background: active
              ? "radial-gradient(circle, rgba(6,182,212,0.45), transparent 70%)"
              : "radial-gradient(circle, rgba(37,99,235,0.35), transparent 70%)",
          }}
        />
        <span
          className="relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-white/30"
          style={{ background: active ? "#06B6D4" : "#2563EB" }}
        />
      </span>
      <span
        className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0d0d1a]/90 px-2 py-1 text-[11px] font-semibold backdrop-blur transition-opacity ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{ color: active ? "#06B6D4" : "white" }}
      >
        {loc.city}
      </span>
    </button>
  );
}

function WorldMapSvg() {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a1a35" />
          <stop offset="100%" stopColor="#0a0a18" />
        </radialGradient>
        <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(6,182,212,0.45)" />
        </pattern>
        <mask id="continentMask">
          <rect width="1000" height="500" fill="black" />
          {/* North America */}
          <path
            d="M120,120 C180,90 240,95 280,110 C320,120 340,140 350,170 C360,210 340,250 310,260 C280,275 240,270 200,260 C160,250 130,225 115,195 C100,170 95,140 120,120 Z"
            fill="white"
          />
          {/* South America */}
          <path
            d="M280,280 C310,275 340,290 350,320 C360,360 345,400 320,430 C300,450 285,455 275,440 C260,420 270,380 275,340 C277,315 275,295 280,280 Z"
            fill="white"
          />
          {/* Europe */}
          <path
            d="M470,130 C510,125 545,135 565,155 C575,170 565,190 540,200 C510,210 475,200 460,180 C450,160 455,140 470,130 Z"
            fill="white"
          />
          {/* Africa */}
          <path
            d="M490,210 C530,205 570,220 585,255 C600,300 590,350 565,385 C545,410 520,418 505,400 C490,380 485,345 485,310 C485,270 480,225 490,210 Z"
            fill="white"
          />
          {/* Asia */}
          <path
            d="M580,140 C660,125 760,140 815,170 C855,190 870,220 850,245 C825,270 770,275 715,265 C660,255 610,235 585,210 C570,190 570,160 580,140 Z"
            fill="white"
          />
          {/* India */}
          <path
            d="M700,230 C720,225 740,245 745,275 C745,290 730,300 715,295 C695,285 685,255 690,240 C692,235 696,231 700,230 Z"
            fill="white"
          />
          {/* SE Asia */}
          <path
            d="M770,280 C795,275 815,290 815,310 C815,330 795,340 775,335 C755,328 745,310 750,295 C753,287 760,282 770,280 Z"
            fill="white"
          />
          {/* Australia */}
          <path
            d="M820,370 C850,360 890,365 905,385 C915,405 900,425 870,430 C840,432 810,422 800,400 C795,385 805,375 820,370 Z"
            fill="white"
          />
        </mask>
      </defs>
      <rect width="1000" height="500" fill="url(#bgGrad)" />
      <rect width="1000" height="500" fill="url(#dots)" mask="url(#continentMask)" />
      <rect width="1000" height="500" fill="none" stroke="rgba(255,255,255,0.04)" />
    </svg>
  );
}
