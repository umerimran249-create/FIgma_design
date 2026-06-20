'use client';

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import ScrollSection3D from "@/components/ui/ScrollSection3D";
import Card3D from "@/components/ui/Card3D";
import { easeSmooth, inViewReplay, viewportTight } from "@/lib/motion";

const stats = [
  { number: 12, suffix: "+", label: "Industries", accent: "#ffde5a" },
  { number: 50, suffix: "+", label: "Solutions", accent: "#ffe888" },
  { number: 95, suffix: "%", label: "Retention", accent: "#ffb648" },
  { number: 3, suffix: "×", label: "ROI", accent: "#f5a020" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, inViewReplay);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView) {
      setCounts(stats.map(() => 0));
      return;
    }

    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      const eased = 1 - (1 - p) ** 3;
      setCounts(stats.map((s) => Math.round(s.number * eased)));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <ScrollSection3D fillMin className="section-flow section-flow--tight" tilt={3}>
      <div ref={ref} className="container-vl flex w-full flex-1 flex-col justify-center">
        <Reveal>
          <SectionLabel text="Key metrics" />
          <h2 className="mt-3 font-['Syne'] text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-white">
            Metrics that define
            <br />
            our excellence.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportTight}
              transition={{ delay: i * 0.08, duration: 0.6, ease: easeSmooth }}
            >
              <Card3D accent={stat.accent} className="text-center">
                <p
                  className="font-['Syne'] text-[clamp(2rem,6vw,3.5rem)] font-bold leading-none"
                  style={{ color: stat.accent }}
                >
                  {counts[i]}
                  <span className="text-[0.5em]">{stat.suffix}</span>
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-white/50">
                  {stat.label}
                </p>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection3D>
  );
}
