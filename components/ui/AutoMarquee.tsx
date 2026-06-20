"use client";

type AutoMarqueeProps = {
  children: React.ReactNode;
  speed?: "slow" | "normal" | "fast";
  className?: string;
  gapClass?: string;
};

export default function AutoMarquee({
  children,
  speed = "normal",
  className = "",
  gapClass = "gap-12",
}: AutoMarqueeProps) {
  const speedClass =
    speed === "slow" ? "marquee-track--slow" : speed === "fast" ? "marquee-track--fast" : "";

  return (
    <div className={`marquee-pause overflow-hidden ${className}`}>
      <div className={`marquee-track flex w-max ${speedClass} ${gapClass}`}>
        <div className={`flex shrink-0 ${gapClass}`}>{children}</div>
        <div className={`flex shrink-0 ${gapClass}`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
