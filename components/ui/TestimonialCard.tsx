"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/site-data";
import { useTestimonialsPause } from "@/components/testimonials/TestimonialsPauseContext";

type TestimonialCardProps = {
  testimonial: Testimonial;
  variant?: "marquee" | "featured" | "compact";
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialCard({
  testimonial,
  variant = "marquee",
}: TestimonialCardProps) {
  const { setPaused, setHoveredId, hoveredId } = useTestimonialsPause();
  const isHovered = hoveredId === testimonial.id;
  const isDimmed = hoveredId !== null && !isHovered;

  const widthClass =
    variant === "marquee"
      ? "w-[min(88vw,400px)]"
      : variant === "featured"
        ? "w-full"
        : "w-[min(72vw,320px)]";

  return (
    <motion.figure
      layout
      onMouseEnter={() => {
        setPaused(true);
        setHoveredId(testimonial.id);
      }}
      onMouseLeave={() => {
        setPaused(false);
        setHoveredId(null);
      }}
      onFocus={() => {
        setPaused(true);
        setHoveredId(testimonial.id);
      }}
      onBlur={() => {
        setPaused(false);
        setHoveredId(null);
      }}
      tabIndex={0}
      animate={{
        scale: isHovered ? 1.04 : 1,
        opacity: isDimmed ? 0.45 : 1,
        y: isHovered ? -6 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative shrink-0 cursor-default outline-none ${widthClass}`}
    >
      <div
        className={`relative overflow-hidden rounded-[24px] border p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow duration-300 sm:p-8 ${
          isHovered
            ? "border-white/20 shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
            : "border-white/[0.08]"
        }`}
        style={{
          background:
            "linear-gradient(165deg, rgba(69,85,131,0.95) 0%, rgba(56,71,108,0.98) 42%, rgba(36,49,82,1) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${testimonial.accent}88, transparent)`,
          }}
        />

        {isHovered && (
          <motion.div
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl"
            style={{ background: `${testimonial.accent}30` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between gap-3">
            <Quote
              size={28}
              className="shrink-0 opacity-80"
              style={{ color: testimonial.accent }}
              fill={`${testimonial.accent}33`}
            />
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                color: testimonial.accent,
                background: `${testimonial.accent}18`,
                border: `1px solid ${testimonial.accent}44`,
              }}
            >
              {testimonial.industry}
            </span>
          </div>

          <div className="mb-4 flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-[#ffde5a] text-[#ffde5a]"
                aria-hidden
              />
            ))}
          </div>

          <blockquote className="text-[15px] leading-7 text-white/80 sm:text-base sm:leading-8">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-['Syne'] text-sm font-bold text-[#1f2942]"
              style={{ background: testimonial.accent }}
            >
              {initials(testimonial.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-['Syne'] text-sm font-bold text-white">
                {testimonial.name}
              </p>
              <p className="truncate text-xs text-white/55">{testimonial.role}</p>
              <p className="truncate text-xs font-medium" style={{ color: testimonial.accent }}>
                {testimonial.company}
              </p>
            </div>
          </figcaption>
        </div>
      </div>

      {isHovered && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-white/40"
        >
          Scroll paused — read on
        </motion.p>
      )}
    </motion.figure>
  );
}
