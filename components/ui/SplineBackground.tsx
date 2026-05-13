'use client';

import { useEffect, useRef } from "react";

type SplineBackgroundProps = {
  scene?: string;
  className?: string;
  variant?: "particles" | "grid" | "orbits";
};

export default function SplineBackground({
  scene,
  className = "",
  variant = "particles",
}: SplineBackgroundProps) {
  useEffect(() => {
    if (!scene) return;
    if (document.querySelector("#spline-viewer-script")) return;
    const s = document.createElement("script");
    s.id = "spline-viewer-script";
    s.type = "module";
    s.src =
      "https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js";
    document.body.appendChild(s);
  }, [scene]);

  if (scene) {
    return (
      <div className={`pointer-events-none absolute inset-0 ${className}`}>
        <spline-viewer
          url={scene}
          events-target="global"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(31,41,66,0.88)_100%)]" />
      </div>
    );
  }

  return <CanvasVisual variant={variant} className={className} />;
}

function CanvasVisual({
  variant,
  className,
}: {
  variant: "particles" | "grid" | "orbits";
  className: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007,
      r: Math.random() * 1.6 + 0.4,
    }));

    const palette = ["#ffde5a", "#ffb648", "#ffe888", "#ffffff"];

    const drawParticles = (w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const alpha = 1 - d2 / 14000;
            ctx.strokeStyle = `rgba(255, 222, 90, ${alpha * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const color = palette[i % palette.length];
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.001 + i);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.35 + 0.4 * pulse;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r + pulse, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawGrid = (w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      const grid = 48;
      ctx.strokeStyle = "rgba(255, 222, 90, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      const cx = w / 2;
      const cy = h / 2;
      for (let i = 0; i < 4; i++) {
        const r = 80 + i * 60 + Math.sin(t * 0.001 + i) * 12;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, "rgba(255, 222, 90, 0.14)");
        grad.addColorStop(1, "rgba(255, 222, 90, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawOrbits = (w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${i % 2 ? "255,182,72" : "255,222,90"}, ${
          0.06 + i * 0.04
        })`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          80 + i * 60,
          40 + i * 30,
          (i * Math.PI) / 5 + t * 0.0002,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
      for (let i = 0; i < 8; i++) {
        const angle = t * 0.0006 + (i * Math.PI) / 4;
        const rx = 80 + (i % 5) * 60;
        const ry = 40 + (i % 5) * 30;
        const x = cx + Math.cos(angle) * rx;
        const y = cy + Math.sin(angle) * ry;
        ctx.fillStyle = palette[i % palette.length];
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (t: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      if (variant === "grid") drawGrid(width, height, t);
      else if (variant === "orbits") drawOrbits(width, height, t);
      else drawParticles(width, height, t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
