'use client';

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07070Fd9] backdrop-blur-xl"
        style={{ boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none" }}
      >
        <div className="container-vl flex h-[68px] items-center justify-between lg:h-[72px]">
          <Link href="/" className="flex items-start font-['Syne'] text-xl font-bold">
            <span className="text-white">Vista</span>
            <span className="text-cyan-400">Logica</span>
            <span className="ml-1 mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[15px] transition-colors ${
                    active ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full bg-[linear-gradient(90deg,#2563EB,#06B6D4)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-[100px] bg-[linear-gradient(135deg,#2563EB,#06B6D4)] px-5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(6,182,212,0.45)] md:flex"
          >
            Get in Touch
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="text-white md:hidden" aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#07070Ffa] md:hidden"
          >
            {navLinks.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-['Syne'] text-3xl font-bold text-white"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
