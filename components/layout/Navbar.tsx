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
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
      >
        <div
          className={`flex w-full max-w-[1100px] items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-white/[0.08] bg-transparent backdrop-blur-md"
              : "border-transparent bg-transparent backdrop-blur-none"
          }`}
        >
          <Link href="/" className="flex items-center" aria-label="Vista Logica">
            <Image
              src="/logo-color.svg"
              alt="Vista Logica"
              width={3162}
              height={645}
              priority
              className="h-6 w-auto sm:h-7"
            />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                    active ? "text-[#1f2942]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="hidden h-9 items-center rounded-full border border-white/20 px-5 text-[13px] font-semibold text-white transition-all hover:border-[#ffde5a] hover:text-[#ffde5a] md:flex"
          >
            Get In Touch
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "rgba(26, 34, 56, 0.98)" }}
          >
            {navLinks.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-['Syne'] text-4xl font-bold ${
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
              className="mt-2 rounded-full px-8 py-3.5 text-sm font-semibold text-[#1f2942]"
              style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}
            >
              Get In Touch
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
