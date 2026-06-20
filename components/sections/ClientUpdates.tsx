"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Mail, FileText, CheckCircle2 } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import ScrollSection3D from "@/components/ui/ScrollSection3D";

const updates = [
  {
    Icon: MessageSquare,
    app: "Slack",
    accent: "#ffde5a",
    body: "Discovery wrapped — roadmap shared with your team for sign-off.",
    date: "Mon",
  },
  {
    Icon: Mail,
    app: "Email",
    accent: "#ffe888",
    body: "Sprint 3 shipped. Staging link and release notes are in your inbox.",
    date: "Wed",
  },
  {
    Icon: FileText,
    app: "Notion",
    accent: "#ffb648",
    body: "Design system documented. Components ready for review and handoff.",
    date: "Thu",
  },
  {
    Icon: CheckCircle2,
    app: "Status",
    accent: "#f5a020",
    body: "Cloud migration at 90% — final cutover scheduled with stakeholders.",
    date: "Fri",
  },
];

export default function ClientUpdates() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % updates.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <ScrollSection3D fill className="section-flow overflow-hidden" tilt={4}>
      <div className="container-vl grid w-full flex-1 items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto h-[300px] w-full max-w-[420px]">
            {updates.map((u, i) => {
              const offset = (i - active + updates.length) % updates.length;
              const isVisible = offset < 3;
              return (
                <AnimatePresence key={u.app}>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 40, scale: 0.92 }}
                      animate={{
                        opacity: offset === 0 ? 1 : 0.5 - offset * 0.12,
                        y: offset * 18,
                        scale: 1 - offset * 0.05,
                        zIndex: 10 - offset,
                      }}
                      exit={{ opacity: 0, y: -40, scale: 0.92 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute inset-x-0 top-0 rounded-2xl border border-white/10 p-5"
                      style={{
                        background:
                          "linear-gradient(165deg, rgba(69,85,131,0.96) 0%, rgba(36,49,82,0.98) 100%)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-xl"
                            style={{ background: `${u.accent}1f`, border: `1px solid ${u.accent}55` }}
                          >
                            <u.Icon size={16} style={{ color: u.accent }} />
                          </span>
                          <span className="text-sm font-semibold text-white">{u.app}</span>
                        </div>
                        <span className="text-xs text-white/40">{u.date}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/70">{u.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <SectionLabel text="Seamless updates" />
          <h2 className="mt-4 font-['Syne'] text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.05] text-white">
            Always in
            <br />
            the loop.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
            Progress, effortlessly shared. Updates land where your team already works —
            no chasing, no surprises, just clarity at every step.
          </p>
        </Reveal>
      </div>
    </ScrollSection3D>
  );
}
