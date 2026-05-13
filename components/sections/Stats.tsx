'use client';

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: 12, suffix: "+", label: "Industries Served", sublabel: "Cross-sector impact" },
  { number: 50, suffix: "+", label: "Solutions Delivered", sublabel: "End-to-end projects" },
  { number: 95, suffix: "%", label: "Client Retention", sublabel: "Long-term partnerships" },
  { number: 3, suffix: "×", label: "Average ROI Boost", sublabel: "Via data intelligence" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / 2000, 1);
      const eased = 1 - (1 - p) ** 3;
      setCounts(stats.map((s) => Math.round(s.number * eased)));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView]);

  return (
    <section ref={ref} className="border-y border-white/10 bg-[#1f2942] py-8 sm:py-10 lg:py-14">
      <div className="container-vl grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="lg:border-r lg:border-white/10 lg:last:border-r-0 lg:pr-8">
            <p className="font-['Syne'] text-3xl font-bold text-[#ffde5a] [text-shadow:0_0_20px_rgba(255,222,90,0.35)] sm:text-4xl">
              {counts[i]}
              {stat.suffix}
            </p>
            <p className="mt-1 text-[13px] text-white/80">{stat.label}</p>
            <p className="text-[11px] text-white/45">{stat.sublabel}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
