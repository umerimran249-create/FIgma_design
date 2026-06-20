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
    <section className="bg-[#1f2942] py-20 sm:py-24 lg:py-[120px]">
      <div className="container-vl">
        <SectionLabel text="FLAIRS IN FOCUS" />
        <h2 className="mt-4 font-['Syne'] text-[26px] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Featured insights.
        </h2>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#38476c] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:rounded-[24px] sm:p-8">
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
                <h3 className="mt-5 font-['Syne'] text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                  {current.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-white/65">
                  <span className="h-9 w-9 rounded-full" style={{ background: `${current.accent}40` }} />
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
                      idx === i ? "w-8 bg-[#ffde5a]" : "w-3 bg-white/15 hover:bg-white/30"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#ffde5a] hover:text-[#ffde5a]"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#ffde5a] hover:text-[#ffde5a]"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
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
                    ? "border-[#ffde5a]/50 bg-[#455583]"
                    : "border-white/10 bg-[#38476c] hover:border-white/25"
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
                <p className="mt-1 text-[11px] text-white/65">By {f.author}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
