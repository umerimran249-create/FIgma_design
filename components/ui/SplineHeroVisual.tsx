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
    <div className="relative h-[360px] w-[320px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0B0B16] shadow-[0_20px_80px_rgba(6,182,212,0.2)] sm:h-[420px] sm:w-[420px]">
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js"
        strategy="afterInteractive"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(7,7,15,0.65)_100%)]" />
      {/*
        Use the web component directly to avoid package export
        incompatibilities in this Next.js environment.
      */}
      {(() => {
        const SplineViewer = "spline-viewer" as keyof JSX.IntrinsicElements;
        return <SplineViewer url={scene} className="h-full w-full" />;
      })()}
    </div>
  );
}
