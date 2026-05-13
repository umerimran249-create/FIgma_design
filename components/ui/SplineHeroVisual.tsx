'use client';

import Script from "next/script";
import OrbAnimation from "@/components/ui/OrbAnimation";

type SplineHeroVisualProps = {
  scene?: string;
};

export default function SplineHeroVisual({ scene }: SplineHeroVisualProps) {
  if (!scene) {
    return (
      <div className="relative">
        <OrbAnimation />
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[280px] w-[280px] max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#243152] shadow-[0_20px_80px_rgba(255,222,90,0.18)] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px]">
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js"
        strategy="afterInteractive"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(31,41,66,0.7)_100%)]" />
      <spline-viewer url={scene} className="h-full w-full" />
    </div>
  );
}
