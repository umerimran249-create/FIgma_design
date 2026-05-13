'use client';

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
        className="fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl"
        style={{
          background: "rgba(31, 41, 66, 0.85)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="container-vl flex h-[64px] items-center justify-between lg:h-[72px]">
          <Link href="/" className="flex items-center" aria-label="Vista Logica">
            <Image
              src="/logo-color.svg"
              alt="Vista Logica"
              width={3162}
              height={645}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[15px] transition-colors ${
                    active ? "text-[#ffde5a]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full"
                      style={{ background: "linear-gradient(90deg,#ffde5a,#ffb648)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-[100px] px-5 text-[13px] font-semibold text-[#1f2942] shadow-[0_4px_16px_rgba(255,222,90,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,222,90,0.5)] md:flex"
            style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "rgba(31, 41, 66, 0.97)" }}
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
                  className={`font-['Syne'] text-3xl font-bold ${
                    pathname === item.href ? "text-[#ffde5a]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full px-7 py-3 text-sm font-semibold text-[#1f2942]"
              style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
            >
              Get in Touch
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
