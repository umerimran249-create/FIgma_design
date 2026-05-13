'use client';

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { flairs } from "@/lib/site-data";

export default function FlairGrid() {
  return (
    <section className="bg-[#07070F]">
      <div className="container-vl">
        <SectionLabel text="FLAIRS YOU MIGHT HAVE MISSED" />
        <h2 className="mt-4 font-['Syne'] text-4xl font-bold text-white max-lg:text-[28px]">
          Explore the archive.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
          Six in-depth pieces across AI governance, cloud, data strategy and
          beyond.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flairs.map((f, i) => (
            <motion.article
              key={f.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111122]"
            >
              <div
                className="relative h-44 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${f.accent}55, ${f.accent}10)`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-['Syne'] text-5xl font-bold text-white/15">
                    VL
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/80">
                  <span
                    className="rounded-full px-2.5 py-0.5"
                    style={{
                      background: `${f.accent}33`,
                      border: `1px solid ${f.accent}66`,
                      color: f.accent,
                    }}
                  >
                    {f.category}
                  </span>
                  <span>{f.date}</span>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <h3 className="font-['Syne'] text-base font-semibold leading-6 text-white">
                  {f.title}
                </h3>
                <p className="line-clamp-3 text-xs leading-6 text-slate-400">
                  {f.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">By {f.author}</span>
                  <span
                    className="font-semibold"
                    style={{ color: f.accent }}
                  >
                    Read more →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
