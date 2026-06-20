"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Card3DProps = {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  glow?: boolean;
  shine?: boolean;
};

export default function Card3D({
  children,
  className = "",
  accent = "#ffde5a",
  glow = true,
  shine = true,
}: Card3DProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={`group/card3d ${className}`}
      style={{ perspective: "1200px" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div
          className="relative isolate overflow-hidden rounded-[24px] border border-white/[0.12] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300 group-hover/card3d:shadow-[0_32px_80px_rgba(0,0,0,0.5)] sm:p-8"
          style={{
            background:
              "linear-gradient(165deg, rgba(69,85,131,0.95) 0%, rgba(56,71,108,0.98) 42%, rgba(36,49,82,1) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}66, transparent)`,
            }}
          />

          {glow && (
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 transition-opacity duration-300 group-hover/card3d:opacity-70"
              style={{
                background: `radial-gradient(circle, ${accent}30, transparent 70%)`,
              }}
            />
          )}

          {shine && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card3d:opacity-100"
              animate={{ opacity: [0, 0.06, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
              }}
            />
          )}

          <div className="relative z-10">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}
