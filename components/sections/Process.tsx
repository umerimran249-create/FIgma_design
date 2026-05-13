'use client';

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  { title: "Discovery & Assessment", body: "We audit your current tech landscape, identify gaps and opportunities across cloud, data, and digital transformation." },
  { title: "Strategy & Design", body: "Tailored roadmaps built around your goals, constraints, and your team's real capabilities — no generic playbooks." },
  { title: "Build & Deploy", body: "Agile delivery of cloud, data, and digital solutions with embedded quality gates and transparent milestones throughout." },
  { title: "Optimise & Scale", body: "Ongoing support, cost optimisation, and performance tuning to grow your impact sustainably and keep you ahead." },
];

export default function Process() {
  return (
    <section className="bg-[#2e3b5b]">
      <div className="container-vl">
        <SectionLabel text="HOW WE WORK" />
        <h2 className="mt-4 font-['Syne'] text-[26px] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          From vision
          <br />
          to reality.
        </h2>
        <p className="mt-4 text-sm text-white/70">A proven four-phase engagement model that delivers results.</p>
        <div className="mt-10 space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#ffde5a] bg-[rgba(255,222,90,0.12)] font-['Syne'] text-sm font-bold text-[#ffde5a]">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    className="mt-1 h-16 w-0.5 origin-top bg-gradient-to-b from-[rgba(255,222,90,0.55)] to-transparent"
                  />
                )}
              </div>
              <div>
                <h3 className="font-['Syne'] text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-[13px] leading-6 text-white/70">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
