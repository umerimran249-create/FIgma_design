"use client";

import { motion } from "framer-motion";

type SectionOrbsProps = {
  className?: string;
};

export default function SectionOrbs({ className = "" }: SectionOrbsProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute -left-[8%] top-[12%] h-48 w-48 rounded-full border border-[#ffde5a]/10 sm:h-64 sm:w-64"
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,222,90,0.14), rgba(46,59,91,0.05) 55%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute -right-[6%] bottom-[8%] h-40 w-40 rounded-3xl border border-white/[0.06] sm:h-56 sm:w-56"
        animate={{ y: [0, 14, 0], rotate: [12, -6, 12] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          background:
            "linear-gradient(145deg, rgba(69,85,131,0.35), rgba(31,41,66,0.2))",
        }}
      />
      <motion.div
        className="absolute left-[42%] top-[55%] h-3 w-3 rounded-full bg-[#ffde5a]/50"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
