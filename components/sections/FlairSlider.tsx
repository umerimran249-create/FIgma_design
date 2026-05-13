'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { flairs } from "@/lib/site-data";

const featured = flairs.slice(0, 4);

export default function FlairSlider() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const next = () => {
    setDir(1);
    setI((v) => (v + 1) % featured.length);
  };
  const prev = () => {
    setDir(-1);
    setI((v) => (v - 1 + featured.length) % featured.length);
  };

  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, []);

  const current = featured[i];

  return (
    <section className="bg-[#0D0D1A]">
      <div className="container-vl">
        <SectionLabel text="FLAIRS IN FOCUS" />
        <h2 className="mt-4 font-['Syne'] text-4xl font-bold text-white max-lg:text-[28px]">
          Featured insights.
        </h2>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#111122] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current.slug}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * 40 }}
                transition={{ duration: 0.45 }}
              >
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-wider"
                  style={{
                    color: current.accent,
                    background: `${current.accent}22`,
                    border: `1px solid ${current.accent}55`,
                  }}
                >
                  {current.category}
                </span>
                <h3 className="mt-5 font-['Syne'] text-3xl font-bold leading-tight text-white max-lg:text-2xl">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                  {current.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
                  <span className="h-9 w-9 rounded-full" style={{ background: `${current.accent}33` }} />
                  <div>
                    <p className="font-semibold text-white">By {current.author}</p>
                    <p>{current.date}</p>
                  </div>
                </div>
                <a
                  href={`/vista-flair/${current.slug}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    color: current.accent,
                    borderColor: `${current.accent}55`,
                  }}
                >
                  Read more →
                </a>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {featured.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setDir(idx > i ? 1 : -1);
                      setI(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-8 bg-cyan-400" : "w-3 bg-white/15 hover:bg-white/30"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {featured.map((f, idx) => (
              <button
                key={f.slug}
                type="button"
                onClick={() => {
                  setDir(idx > i ? 1 : -1);
                  setI(idx);
                }}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                  idx === i
                    ? "border-white/30 bg-[#161630]"
                    : "border-white/10 bg-[#111122] hover:border-white/20"
                }`}
              >
                <span
                  className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider"
                  style={{
                    color: f.accent,
                    background: `${f.accent}22`,
                    border: `1px solid ${f.accent}55`,
                  }}
                >
                  Slide {idx + 1}
                </span>
                <p className="mt-3 font-['Syne'] text-sm font-bold leading-snug text-white">
                  {f.title}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">By {f.author}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
