'use client';

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { Mail, MapPin, Send, Linkedin, CheckCircle2 } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";
import SplineBackground from "@/components/ui/SplineBackground";
import { siteConfig } from "@/lib/site-data";

export default function ContactHero() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [topic, setTopic] = useState("General");

  const topics = ["General", "Data & AI", "Cloud", "Digital Experience"];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden pt-32 lg:pt-36">
      <SplineBackground variant="particles" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[rgba(6,182,212,0.15)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] top-60 h-[380px] w-[380px] rounded-full bg-[rgba(124,58,237,0.12)] blur-3xl" />

      <div className="container-vl relative z-10 grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SectionLabel text="GET IN TOUCH" />
          <h1 className="mt-5 font-['Syne'] text-5xl font-bold leading-[1.02] sm:text-6xl">
            Let&apos;s build the
            <br />
            <GradientText>next great thing.</GradientText>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
            Whether you&apos;re scoping a discovery, a delivery, or a long-term
            partnership — we&apos;ll get you to the right team within 24 hours.
          </p>

          <ul className="mt-10 space-y-4 text-sm text-slate-300">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                <Mail size={16} />
              </span>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                <MapPin size={16} />
              </span>
              Melbourne, Australia
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                <Linkedin size={16} />
              </span>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Vista Logica on LinkedIn
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#111122] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[rgba(6,182,212,0.12)] blur-3xl" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                <CheckCircle2 size={28} />
              </span>
              <h3 className="mt-5 font-['Syne'] text-2xl font-bold text-white">
                Message received.
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                Thanks {form.name || "there"} — a Vista Logica strategist will be in touch with you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", company: "", message: "" });
                }}
                className="mt-6 text-sm text-cyan-400 hover:text-white"
              >
                Send another →
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <p className="font-['Syne'] text-sm font-bold uppercase tracking-wider text-cyan-400">
                Project enquiry
              </p>

              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                      topic === t
                        ? "border-cyan-400/60 bg-cyan-400/15 text-cyan-300"
                        : "border-white/10 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Jane Smith"
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="jane@company.com"
                  required
                />
              </div>
              <Field
                label="Company"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
                placeholder="Acme Pty Ltd"
              />
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-slate-400">
                  How can we help?
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="Tell us about your project, timeline, and goals..."
                  className="w-full rounded-2xl border border-white/10 bg-[#0d0d1a] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2563EB,#06B6D4)] px-6 py-4 text-base font-semibold text-white shadow-[0_12px_40px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-0.5"
              >
                Send message
                <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="text-[11px] text-[#4B5563]">
                By submitting, you agree to be contacted regarding your enquiry.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/10 bg-[#0d0d1a] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
      />
    </div>
  );
}
