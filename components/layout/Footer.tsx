import { Linkedin, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-16" style={{ background: "#1a2238" }}>
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[rgba(255,222,90,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-[rgba(255,222,90,0.06)] blur-3xl" />

      <div className="container-vl relative z-10 grid gap-10 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-['Syne'] text-2xl font-bold text-white">
            Vista<span className="text-[#ffde5a]">Logica</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Optimising business outcomes through technology and digital enablement.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#ffde5a] hover:text-[#ffde5a]"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#ffde5a] hover:text-[#ffde5a]"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffde5a]">Company</p>
          <ul className="space-y-2.5 text-sm text-white/60">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffde5a]">Get in touch</p>
          <p className="flex items-start gap-2 text-sm leading-6 text-white/60">
            <MapPin size={14} className="mt-1 shrink-0 text-[#ffde5a]" />
            Melbourne, Australia
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <Mail size={14} className="text-[#ffde5a]" />
            {siteConfig.email}
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-12 select-none overflow-hidden">
        <p className="whitespace-nowrap text-center font-['Syne'] text-[clamp(3rem,18vw,16rem)] font-bold leading-none text-white/[0.04]">
          Vista Logica
        </p>
      </div>

      <div className="container-vl relative z-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center">
        <p>© Vista Logica Pty Ltd. 2026. All rights reserved.</p>
        <p>Made with care in Melbourne, Australia.</p>
      </div>
    </footer>
  );
}
