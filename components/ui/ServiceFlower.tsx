"use client";

import { useId, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

/** Every core activity Vista Logica delivers — one petal each. */
const ACTIVITIES = [
  "Data Strategy",
  "Analytics",
  "Machine Learning",
  "Gen AI",
  "Data Governance",
  "Cloud Strategy",
  "Cloud Migration",
  "Cost Optimisation",
  "UX Design",
  "Digital Products",
  "Automation",
  "Security",
];

const N = ACTIVITIES.length;
const AUTO_SPEED = 360 / 80; // degrees per second (full turn in 80s)
const ease = [0.25, 0.46, 0.45, 0.94] as const;

type ServiceFlowerProps = {
  className?: string;
  interactive?: boolean;
};

export default function ServiceFlower({ className = "", interactive = false }: ServiceFlowerProps) {
  const uid = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const rotate = useMotionValue(0);
  const counter = useTransform(rotate, (r) => -r);

  const dragging = useRef(false);
  const center = useRef({ x: 0, y: 0 });
  const lastAngle = useRef(0);
  const velocity = useRef(0);

  useAnimationFrame((_, delta) => {
    if (dragging.current) return;
    if (interactive) {
      // Momentum spin after a drag, decaying toward a gentle idle rotation.
      velocity.current *= 0.94;
      if (Math.abs(velocity.current) > 0.02) {
        rotate.set(rotate.get() + velocity.current);
      } else {
        rotate.set(rotate.get() + AUTO_SPEED * (delta / 1000) * 0.35);
      }
    } else {
      rotate.set(rotate.get() + AUTO_SPEED * (delta / 1000));
    }
  });

  const angleFromPointer = (clientX: number, clientY: number) =>
    Math.atan2(clientY - center.current.y, clientX - center.current.x);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    center.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    lastAngle.current = angleFromPointer(e.clientX, e.clientY);
    dragging.current = true;
    velocity.current = 0;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const a = angleFromPointer(e.clientX, e.clientY);
    let d = a - lastAngle.current;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    const deg = (d * 180) / Math.PI;
    rotate.set(rotate.get() + deg);
    velocity.current = deg;
    lastAngle.current = a;
  };

  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className={`relative aspect-square w-full select-none ${
        interactive ? "cursor-grab touch-none active:cursor-grabbing" : ""
      } ${className}`}
    >
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={`petalGrad-${uid}`} cx="50%" cy="18%" r="85%">
            <stop offset="0%" stopColor="#fff2b8" />
            <stop offset="45%" stopColor="#ffde5a" />
            <stop offset="100%" stopColor="#f5a020" />
          </radialGradient>
          <radialGradient id={`hubGrad-${uid}`} cx="50%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#fff2b8" />
            <stop offset="100%" stopColor="#ffb648" />
          </radialGradient>
          <filter id={`petalGlow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rotating bloom */}
        <motion.g style={{ rotate, transformBox: "fill-box", transformOrigin: "center" }}>
          {Array.from({ length: N }).map((_, i) => (
            <g key={`in-${i}`} transform={`rotate(${i * (360 / N) + 180 / N} 200 200)`}>
              <motion.ellipse
                cx={200}
                cy={132}
                rx={14}
                ry={50}
                fill={`url(#petalGrad-${uid})`}
                opacity={0.3}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.04, duration: 0.6, ease }}
              />
            </g>
          ))}

          {ACTIVITIES.map((activity, i) => (
            <g key={`p-${i}`} transform={`rotate(${i * (360 / N)} 200 200)`}>
              <motion.ellipse
                cx={200}
                cy={106}
                rx={22}
                ry={74}
                fill={`url(#petalGrad-${uid})`}
                opacity={0.9}
                filter={`url(#petalGlow-${uid})`}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease }}
              />
            </g>
          ))}
        </motion.g>

        {/* Center hub */}
        <motion.circle
          cx="200"
          cy="200"
          r="36"
          fill={`url(#hubGrad-${uid})`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="36"
          fill="none"
          stroke="#fff2b8"
          strokeWidth="1.5"
          animate={{ r: [36, 46, 36], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <text
          x="200"
          y="209"
          textAnchor="middle"
          fontFamily="Syne, sans-serif"
          fontWeight="700"
          fontSize="26"
          fill="#1f2942"
        >
          VL
        </text>
      </svg>

      {/* Upright orbiting labels */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ rotate }}>
        {ACTIVITIES.map((activity, i) => {
          const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
          const radius = 47;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <motion.span
              key={activity}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#ffde5a]/30 bg-[#1f2942]/85 px-2 py-0.5 text-[9px] font-semibold text-[#ffde5a] backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-[10px]"
              style={{ left: `${x}%`, top: `${y}%`, rotate: counter }}
            >
              {activity}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
