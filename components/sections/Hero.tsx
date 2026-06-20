"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SplineOrbHero from "@/components/ui/SplineOrbHero";
import SectionLabel from "@/components/ui/SectionLabel";
import { easeSmooth, viewport } from "@/lib/motion";
import { homeHero } from "@/lib/site-data";

export default function Hero() {
  return (
    <section
      id="home"
      className="section-flow section-flow--hero relative flex min-h-[100svh] min-h-[100dvh] items-center overflow-hidden pb-12 pt-[96px] sm:pt-28"
      style={{ perspective: "1400px" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_40%,rgba(255,222,90,0.1),transparent_60%)]" />

      <div className="container-vl relative z-10 grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          className="order-2 text-left lg:order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: easeSmooth }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionLabel text="Vista Logica" />

          <motion.h1
            className="mt-5 font-['Syne'] font-bold leading-[0.92] tracking-tight"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
          >
            {homeHero.lines.map((line, i) => (
              <motion.span
                key={line}
                variants={{
                  hidden: { opacity: 0, y: 36, rotateX: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.65, ease: easeSmooth },
                  },
                }}
                className={`block text-[clamp(2.5rem,8vw,4.75rem)] ${
                  i === homeHero.lines.length - 1 ? "gradient-text" : "text-white"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.55, duration: 0.6, ease: easeSmooth }}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/65 sm:text-base"
          >
            {homeHero.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.7, duration: 0.5, ease: easeSmooth }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full px-8 text-sm font-semibold text-[#1f2942] shadow-[0_8px_32px_rgba(255,222,90,0.35)] transition-shadow hover:shadow-[0_12px_40px_rgba(255,222,90,0.45)] sm:h-14"
              style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
            >
              Start a conversation
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center rounded-full border border-white/20 px-8 text-sm font-semibold text-white/80 transition-colors hover:border-[#ffde5a] hover:text-[#ffde5a]"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.88, rotateY: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={viewport}
          transition={{ duration: 1.1, ease: easeSmooth }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <SplineOrbHero className="max-w-[min(92vw,580px)]" />
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/30" size={20} />
        </motion.div>
      </div>
    </section>
  );
}

