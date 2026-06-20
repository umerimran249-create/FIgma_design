"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

const CAPABILITIES = [
  "Data Strategy",
  "Analytics",
  "Machine Learning",
  "Gen AI",
  "Cloud",
  "Migration",
  "UX Design",
  "Automation",
  "Governance",
  "Digital Products",
  "MLOps",
  "Conversational AI",
];

const N = CAPABILITIES.length;
const IDLE_SPEED = 360 / 90;

type CapabilityOrbitProps = {
  className?: string;
  interactive?: boolean;
};

function OrbitLabel({
  label,
  angleDeg,
  counterRotate,
}: {
  label: string;
  angleDeg: number;
  counterRotate: MotionValue<string>;
}) {
  const rad = (angleDeg * Math.PI) / 180;
  const radius = 44;
  const x = 50 + Math.cos(rad) * radius;
  const y = 50 + Math.sin(rad) * radius;

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        translateX: "-50%",
        translateY: "-50%",
        rotate: counterRotate,
      }}
    >
      <span className="block whitespace-nowrap rounded-full border border-white/10 bg-[#243152] px-2.5 py-1 text-[9px] font-medium text-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:px-3 sm:text-[10px]">
        {label}
      </span>
    </motion.div>
  );
}

export default function CapabilityOrbit({
  className = "",
  interactive = true,
}: CapabilityOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotate = useMotionValue(0);
  const counterRotate = useTransform(rotate, (r) => `${-r}deg`);

  const dragging = useRef(false);
  const center = useRef({ x: 0, y: 0 });
  const lastAngle = useRef(0);
  const velocity = useRef(0);

  useAnimationFrame((_, delta) => {
    if (dragging.current) return;
    velocity.current *= 0.93;
    if (interactive && Math.abs(velocity.current) > 0.02) {
      rotate.set(rotate.get() + velocity.current);
    } else if (interactive) {
      rotate.set(rotate.get() + IDLE_SPEED * (delta / 1000) * 0.4);
    } else {
      rotate.set(rotate.get() + IDLE_SPEED * (delta / 1000));
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
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
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
      className={`relative mx-auto aspect-square w-full max-w-[min(92vw,480px)] select-none ${
        interactive ? "cursor-grab touch-none active:cursor-grabbing" : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,222,90,0.14),transparent_68%)]" />

      {/* Rotating ring, spokes, and nodes */}
      <motion.div
        className="absolute inset-0"
        style={{ rotate, transformOrigin: "center center" }}
      >
        <div className="absolute inset-[4%] rounded-full border border-dashed border-white/[0.1]" />
        <div className="absolute inset-[14%] rounded-full border border-[#ffde5a]/15" />

        {CAPABILITIES.map((label, i) => {
          const angleDeg = (i / N) * 360 - 90;
          return (
            <div
              key={`spoke-${label}`}
              className="absolute inset-0"
              style={{ transform: `rotate(${angleDeg}deg)` }}
            >
              <div
                className="absolute left-1/2 top-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-[#ffde5a]/50 via-[#ffde5a]/10 to-transparent"
                style={{ height: "38%" }}
              >
                <span
                  className="absolute bottom-0 left-1/2 block h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-[#ffde5a] bg-[#1f2942] shadow-[0_0_10px_rgba(255,222,90,0.45)]"
                  aria-hidden
                />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Labels — rotate with ring, counter-rotate to stay readable */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ rotate, transformOrigin: "center center" }}
      >
        {CAPABILITIES.map((label, i) => {
          const angleDeg = (i / N) * 360 - 90;
          return (
            <OrbitLabel
              key={label}
              label={label}
              angleDeg={angleDeg}
              counterRotate={counterRotate}
            />
          );
        })}
      </motion.div>

      {/* Static center hub */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-[18%] min-h-[72px] w-[18%] min-w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#ffde5a]/35 bg-[#243152] shadow-[0_0_40px_rgba(255,222,90,0.15)]">
        <span className="font-['Syne'] text-lg font-bold text-[#ffde5a] sm:text-xl">VL</span>
      </div>
    </div>
  );
}
