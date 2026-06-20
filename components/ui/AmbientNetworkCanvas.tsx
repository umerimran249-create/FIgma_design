"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; phase: number };

export default function AmbientNetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    const dpr = window.devicePixelRatio || 1;
    const nodes: Node[] = [];

    const buildGrid = (w: number, h: number) => {
      nodes.length = 0;
      const cols = Math.ceil(w / 220) + 1;
      const rows = Math.ceil(h / 220) + 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const jitter = () => (Math.random() - 0.5) * 28;
          nodes.push({
            x: col * 220 + jitter(),
            y: row * 220 + jitter(),
            vx: (Math.random() - 0.5) * 0.08,
            vy: (Math.random() - 0.5) * 0.08,
            r: 2 + Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid(width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      t += 0.016;

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
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 200) continue;
          const alpha = (1 - dist / 200) * 0.18;
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + (a.phase + b.phase) * 0.5);
          ctx.strokeStyle = `rgba(255, 222, 90, ${alpha * pulse})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          if (dist < 160) {
            const progress = (t * 0.35 + a.phase) % 1;
            const sx = a.x + (b.x - a.x) * progress;
            const sy = a.y + (b.y - a.y) * progress;
            ctx.fillStyle = `rgba(255, 222, 90, ${0.25 * pulse})`;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      for (const n of nodes) {
        const pulse = 0.45 + 0.55 * Math.sin(t * 2 + n.phase);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * pulse})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.6, 0, Math.PI * 2);
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
