"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ScrollSection3DProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tilt?: number;
  fill?: boolean;
  fillMin?: boolean;
  /** Subtle scroll-linked glow behind content */
  ambient?: boolean;
};

export default function ScrollSection3D({
  children,
  className = "",
  id,
  fill = false,
  fillMin = false,
  ambient = true,
}: ScrollSection3DProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [56, 0, 0, -56]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.82, 1, 1, 0.82]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.94, 1, 1, 0.94]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0, 0.55, 0.55, 0]);

  const fillClass = fill
    ? "section-flow--fill"
    : fillMin
      ? "section-flow--fill-min"
      : "";

  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-section-3d ${fillClass} ${className}`}
    >
      {ambient && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ opacity: glowOpacity }}
        >
          <div className="absolute left-1/2 top-1/2 h-[min(70vh,520px)] w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,222,90,0.08),transparent_65%)]" />
        </motion.div>
      )}

      <motion.div
        style={{ y, opacity, scale }}
        className={`scroll-section-3d__inner relative z-[1] ${fill || fillMin ? "scroll-section-3d__inner--fill" : ""}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
