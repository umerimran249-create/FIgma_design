'use client';

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { easeSmooth, inViewReplay } from "@/lib/motion";
import { servicesData } from "@/lib/site-data";

const ease = easeSmooth;

export default function Services() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="services" className="section-flow relative overflow-hidden">
      <div className="container-vl">
        <Reveal>
          <SectionLabel text="Our services" />
          <h2 className="mt-4 max-w-3xl font-['Syne'] text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.05] text-white">
            Your digital
            <br />
            enablement partner.
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-white/[0.08]">
          {servicesData.map((service, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isHover = hover === i;
            return (
              <Link
                key={service.slug}
                href={`/services`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group relative block border-b border-white/[0.08]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewReplay}
                  transition={{ delay: i * 0.08, duration: 0.6, ease }}
                  className="relative z-10 flex items-center justify-between gap-6 px-1 py-8 sm:py-10"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span
                      className={`font-['Syne'] text-sm font-bold transition-colors ${
                        isHover ? "text-[#1f2942]" : "text-[#ffde5a]/70"
                      }`}
                    >
                      {num}
                    </span>
                    <div>
                      <h3
                        className={`font-['Syne'] text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-tight transition-colors ${
                          isHover ? "text-[#1f2942]" : "text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`mt-1 max-w-md text-sm transition-colors ${
                          isHover ? "text-[#1f2942]/70" : "text-white/45"
                        }`}
                      >
                        {service.short}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={28}
                    className={`shrink-0 transition-all duration-300 ${
                      isHover
                        ? "translate-x-1 -translate-y-1 text-[#1f2942]"
                        : "text-white/40"
                    }`}
                  />
                </motion.div>

                <motion.span
                  className="pointer-events-none absolute inset-0 origin-bottom"
                  style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
                  initial={false}
                  animate={{ scaleY: isHover ? 1 : 0, opacity: isHover ? 1 : 0 }}
                  transition={{ duration: 0.35, ease }}
                />
              </Link>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <Link
            href="/services"
            className="inline-flex h-12 items-center rounded-full px-8 text-sm font-semibold text-[#1f2942]"
            style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
          >
            Book a call →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
