"use client";

import { useTestimonialsPause } from "@/components/testimonials/TestimonialsPauseContext";

type PausableMarqueeProps = {
  children: React.ReactNode;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  className?: string;
  gapClass?: string;
};

export default function PausableMarquee({
  children,
  speed = "normal",
  reverse = false,
  className = "",
  gapClass = "gap-6 sm:gap-8",
}: PausableMarqueeProps) {
  const { paused } = useTestimonialsPause();

  const speedClass =
    speed === "slow" ? "marquee-track--slow" : speed === "fast" ? "marquee-track--fast" : "";

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max ${speedClass} ${reverse ? "marquee-track--reverse" : ""} ${paused ? "marquee-track--paused" : ""} ${gapClass}`}
      >
        <div className={`flex shrink-0 ${gapClass}`}>{children}</div>
        <div className={`flex shrink-0 ${gapClass}`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
