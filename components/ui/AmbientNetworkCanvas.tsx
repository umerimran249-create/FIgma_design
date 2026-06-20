"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; phase: number };

const GRID = 300;
const LINK_DIST = 180;

export default function AmbientNetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    let last = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];

    const buildGrid = (w: number, h: number) => {
      nodes.length = 0;
      const cols = Math.ceil(w / GRID) + 1;
      const rows = Math.ceil(h / GRID) + 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const jitter = () => (Math.random() - 0.5) * 24;
          nodes.push({
            x: col * GRID + jitter(),
            y: row * GRID + jitter(),
            vx: (Math.random() - 0.5) * 0.06,
            vy: (Math.random() - 0.5) * 0.06,
            r: 2 + Math.random() * 1.2,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const drawStatic = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK_DIST) continue;
          const alpha = (1 - dist / LINK_DIST) * 0.12;
          ctx.strokeStyle = `rgba(255, 222, 90, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid(width, height);
      if (reducedMotion) drawStatic(width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      return () => window.removeEventListener("resize", resize);
    }

    const draw = (now: number) => {
      if (document.hidden) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -40 || n.x > width + 40) n.vx *= -1;
        if (n.y < -40 || n.y > height + 40) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK_DIST) continue;
          const alpha = (1 - dist / LINK_DIST) * 0.16;
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + (a.phase + b.phase) * 0.5);
          ctx.strokeStyle = `rgba(255, 222, 90, ${alpha * pulse})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const pulse = 0.45 + 0.55 * Math.sin(t * 2 + n.phase);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * pulse})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
