"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import ScrollSection3D from "@/components/ui/ScrollSection3D";
import Card3D from "@/components/ui/Card3D";
import { easeSmooth, viewportTight } from "@/lib/motion";
import { flairs } from "@/lib/site-data";

const featured = flairs.slice(0, 5);

export default function FeaturedInsights() {
  return (
    <ScrollSection3D fillMin className="section-flow overflow-hidden" tilt={4}>
      <div className="container-vl mb-6 flex w-full shrink-0 flex-col justify-center sm:mb-8">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <SectionLabel text="Featured insights" />
            <h2 className="mt-3 font-['Syne'] text-[clamp(2rem,6vw,3.25rem)] font-bold leading-tight text-white">
              Work that redefines
              <br />
              what&apos;s possible.
            </h2>
          </Reveal>
          <Link href="/vista-flair" className="hidden shrink-0 text-sm text-[#ffde5a] sm:block">
            See more →
          </Link>
        </div>
      </div>

      <div className="-mx-4 flex min-h-[280px] flex-1 snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-4 pb-4 scrollbar-none sm:-mx-0 sm:min-h-[320px] sm:gap-6 sm:px-[max(1rem,calc((100vw-1200px)/2+1rem))]">
        {featured.map((item, i) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportTight}
            transition={{ delay: i * 0.08, duration: 0.6, ease: easeSmooth }}
            className="w-[min(78vw,340px)] shrink-0 snap-center sm:w-[300px]"
          >
            <Link href={`/vista-flair#${item.slug}`} className="block h-full">
              <Card3D accent={item.accent} className="h-full">
                <div
                  className="-mx-2 -mt-2 mb-5 h-28 overflow-hidden rounded-2xl sm:-mx-4 sm:-mt-4 sm:h-32"
                  style={{
                    background: `linear-gradient(135deg, ${item.accent}35 0%, rgba(36,49,82,0.9) 55%, #1f2942 100%)`,
                  }}
                >
                  <motion.div
                    className="flex h-full items-end p-4"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                      style={{
                        color: item.accent,
                        background: `${item.accent}22`,
                        border: `1px solid ${item.accent}44`,
                      }}
                    >
                      {item.category}
                    </span>
                  </motion.div>
                </div>

                <h3 className="font-['Syne'] text-lg font-bold leading-snug text-white sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/50">
                  {item.excerpt}
                </p>
                <p className="mt-4 text-xs text-white/40">{item.author}</p>
                <span className="mt-4 inline-flex text-xs font-semibold" style={{ color: item.accent }}>
                  Read insight →
                </span>
              </Card3D>
            </Link>
          </motion.div>
        ))}
      </div>
    </ScrollSection3D>
  );
}
