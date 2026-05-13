'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const faqs = [
  {
    q: "What industries do you specialise in?",
    a: "We serve Telecoms, Financial Services, Retail, Healthcare, and Government sectors — with deep cross-sector expertise in data, cloud, and digital transformation.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "Engagements range from 4-week rapid assessments to multi-year strategic partnerships. We scope collaboratively based on your goals, team size, and complexity.",
  },
  {
    q: "Do you offer post-delivery support?",
    a: "Yes — we offer ongoing optimisation retainers, level 1/2 support, and embedded team models. We don't disappear after launch.",
  },
  {
    q: "How do you handle data security and compliance?",
    a: "Data governance and security architecture are core services. We design with Australian privacy law, ISO 27001, and your specific regulatory requirements from day one.",
  },
  {
    q: "Can you work alongside our existing tech team?",
    a: "Absolutely. We're designed to work in collaboration with your internal teams — upskilling, embedding, or leading specific workstreams as needed.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#1f2942]">
      <div className="container-vl">
        <SectionLabel text="FAQ" />
        <h2 className="mt-4 font-['Syne'] text-[26px] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">Common questions.</h2>
        <div className="mt-8">
          {faqs.map((item, idx) => {
            const isOpen = idx === open;
            return (
              <div key={item.q} className="border-b border-white/10 py-5">
                <button onClick={() => setOpen(isOpen ? -1 : idx)} className="flex w-full items-start justify-between gap-4 text-left">
                  <span className="font-['Syne'] text-[15px] font-semibold leading-snug text-white sm:text-base">{item.q}</span>
                  <span className={`shrink-0 text-2xl leading-none transition-all ${isOpen ? "rotate-45 text-[#ffde5a]" : "text-white/60"}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 text-sm leading-7 text-white/75">
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
