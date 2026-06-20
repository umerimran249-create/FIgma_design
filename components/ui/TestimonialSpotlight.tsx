"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/site-data";
import { easeSmooth } from "@/lib/motion";

const CARD_SHIFT_SM = 268;
const CARD_SHIFT_LG = 320;

type TestimonialSpotlightProps = {
  items: Testimonial[];
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function getOffset(i: number, active: number, n: number) {
  let offset = i - active;
  if (offset > n / 2) offset -= n;
  if (offset < -n / 2) offset += n;
  return offset;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialSpotlight({ items }: TestimonialSpotlightProps) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shift, setShift] = useState(CARD_SHIFT_LG);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setShift(mq.matches ? CARD_SHIFT_LG : CARD_SHIFT_SM);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || n <= 1) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % n), 5500);
    return () => window.clearInterval(id);
  }, [paused, n]);

  const go = useCallback(
    (delta: number) => setActive((a) => wrapIndex(a + delta, n)),
    [n]
  );

  if (n === 0) return null;

  const current = items[active]!;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[min(480px,80vw)] w-[min(800px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${current.accent}16, transparent 68%)`,
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 bg-[#243152]/60 p-2.5 text-white/70 backdrop-blur-sm transition-colors hover:border-[#ffde5a]/40 hover:text-[#ffde5a] sm:flex"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 bg-[#243152]/60 p-2.5 text-white/70 backdrop-blur-sm transition-colors hover:border-[#ffde5a]/40 hover:text-[#ffde5a] sm:flex"
        aria-label="Next testimonial"
      >
        <ChevronRight size={20} />
      </button>

      <div
        className="services-carousel-mask relative px-2 py-8 sm:px-14 sm:py-10"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          className="relative mx-auto flex min-h-[340px] max-w-[1000px] items-center justify-center sm:min-h-[360px]"
          style={{ transformStyle: "preserve-3d" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) go(1);
            else if (info.offset.x > 50) go(-1);
          }}
        >
          {items.map((t, i) => {
            const offset = getOffset(i, active, n);
            if (Math.abs(offset) > 1) return null;

            const isCenter = offset === 0;
            const abs = Math.abs(offset);

            return (
              <motion.figure
                key={t.id}
                animate={{
                  x: offset * shift,
                  z: isCenter ? 100 : 30,
                  rotateY: offset * -12,
                  scale: isCenter ? 1 : 0.9,
                  opacity: isCenter ? 1 : 0.55,
                }}
                transition={{ duration: 0.5, ease: easeSmooth }}
                style={{ transformStyle: "preserve-3d", zIndex: 10 - abs }}
                className={`absolute w-[min(88vw,380px)] sm:w-[360px] ${
                  isCenter ? "" : "pointer-events-none"
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-[28px] border p-7 sm:p-8 ${
                    isCenter
                      ? "border-white/15 shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
                      : "border-white/[0.07] shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
                  }`}
                  style={{
                    background:
                      "linear-gradient(165deg, rgba(69,85,131,0.9) 0%, rgba(56,71,108,0.94) 48%, rgba(36,49,82,0.98) 100%)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${t.accent}66, transparent)`,
                    }}
                  />

                  <Quote
                    size={isCenter ? 36 : 28}
                    className="mb-4 opacity-80"
                    style={{ color: t.accent }}
                    fill={`${t.accent}22`}
                  />

                  {isCenter && (
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, si) => (
                        <Star key={si} size={14} className="fill-[#ffde5a] text-[#ffde5a]" />
                      ))}
                    </div>
                  )}

                  <blockquote
                    className={`leading-relaxed text-white/80 ${
                      isCenter
                        ? "text-[17px] sm:text-lg sm:leading-8"
                        : "line-clamp-3 text-sm leading-6"
                    }`}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-['Syne'] text-sm font-bold text-[#1f2942]"
                      style={{ background: t.accent }}
                    >
                      {initials(t.name)}
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="font-['Syne'] text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-white/50">{t.role}</p>
                      <p className="text-xs font-medium" style={{ color: t.accent }}>
                        {t.company}
                      </p>
                    </div>
                  </figcaption>
                </div>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>

      <div className="relative z-10 mt-4 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[#ffde5a]" : "w-1.5 bg-white/25 hover:bg-white/45"
              }`}
              aria-label={`Show testimonial from ${t.name}`}
            />
          ))}
        </div>
        <motion.p
          animate={{ opacity: paused ? 1 : 0.45 }}
          className="text-[10px] uppercase tracking-[0.22em] text-[#ffde5a]"
        >
          {paused ? "● Paused" : "● Auto-playing"}
        </motion.p>
      </div>
    </div>
  );
}

export const featuredTestimonials = (all: Testimonial[]): Testimonial[] =>
  [0, 1, 2, 8]
    .map((i) => all[i])
    .filter((t): t is Testimonial => t != null);
