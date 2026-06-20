"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type GlassCardProps = HTMLMotionProps<"div"> & {
  glow?: string;
  children: React.ReactNode;
};

export default function GlassCard({
  glow = "rgba(255,222,90,0.08)",
  className = "",
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 24px 60px ${glow}` }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border border-white/10 bg-[rgba(56,71,108,0.72)] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:rounded-[20px] sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
