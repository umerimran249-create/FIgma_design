import { Linkedin, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#03030A] py-14">
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[rgba(6,182,212,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-[rgba(124,58,237,0.08)] blur-3xl" />
      <div className="container-vl relative z-10 grid gap-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-start font-['Syne'] text-2xl font-bold">
            <span className="text-white">Vista</span>
            <span className="text-cyan-400">Logica</span>
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Optimising business outcomes through technology and digital enablement.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan-400 hover:text-cyan-400"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan-400 hover:text-cyan-400"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
        <div>
          <p className="mb-3 font-['Syne'] text-sm font-bold uppercase tracking-wider text-white/80">Navigate</p>
          <ul className="space-y-2 text-sm text-slate-400">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-['Syne'] text-sm font-bold uppercase tracking-wider text-white/80">Get in touch</p>
          <p className="flex items-start gap-2 text-sm leading-6 text-slate-400">
            <MapPin size={14} className="mt-1 shrink-0 text-cyan-400" />
            Melbourne, Australia
          </p>
          <a href={`mailto:${siteConfig.email}`} className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
            <Mail size={14} className="text-cyan-400" />
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="container-vl relative z-10 mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-[#4B5563] md:flex-row md:items-center">
        <p>© Vista Logica Pty Ltd. 2026. All rights reserved.</p>
        <p>Made with care in Melbourne, Australia.</p>
      </div>
    </footer>
  );
}
