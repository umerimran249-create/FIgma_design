"use client";

import { useId, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { inViewReplay } from "@/lib/motion";

/** 3×3 node grid matching the Vista Logica network mark. */
const NODES = [
  { id: "n00", x: 22, y: 22, tier: 1 },
  { id: "n10", x: 50, y: 22, tier: 1 },
  { id: "n20", x: 78, y: 22, tier: 1 },
  { id: "n01", x: 22, y: 50, tier: 2 },
  { id: "n11", x: 50, y: 50, hub: true, tier: 0 },
  { id: "n21", x: 78, y: 50, tier: 2 },
  { id: "n02", x: 22, y: 78, tier: 3 },
  { id: "n12", x: 50, y: 78, tier: 3 },
  { id: "n22", x: 78, y: 78, tier: 3 },
] as const;

const EDGES = [
  { id: "e1", from: "n00", to: "n01", delay: 0, dur: 2.4 },
  { id: "e2", from: "n10", to: "n20", delay: 0.15, dur: 2.8 },
  { id: "e3", from: "n11", to: "n12", delay: 0.3, dur: 2.2 },
  { id: "e4", from: "n11", to: "n22", delay: 0.45, dur: 3.1 },
  { id: "e5", from: "n01", to: "n11", delay: 0.55, dur: 2.6 },
  { id: "e6", from: "n11", to: "n21", delay: 0.65, dur: 2.5 },
  { id: "e7", from: "n10", to: "n11", delay: 0.75, dur: 2.3 },
  { id: "e8", from: "n02", to: "n12", delay: 0.85, dur: 3.2 },
] as const;

const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

type NetworkGraphVisualProps = {
  className?: string;
  accent?: string;
  bare?: boolean;
};

function EdgeLayer({
  path,
  delay,
  dur,
  inView,
  accent,
  glowId,
  gradientId,
  bare,
}: {
  path: string;
  delay: number;
  dur: number;
  inView: boolean;
  accent: string;
  glowId: string;
  gradientId: string;
  bare: boolean;
}) {
  return (
    <g>
      <motion.path
        d={path}
        fill="none"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity={bare ? 0.12 : 0.08}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.6"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: inView ? 1 : 0,
          opacity: inView ? [0.75, 0.3, 0.75] : 0,
        }}
        transition={{
          pathLength: { duration: 0.9, delay, ease: "easeOut" },
          opacity: inView
            ? { duration: 2.4, delay: delay + 0.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 },
        }}
      />
      {inView && (
        <motion.path
          d={path}
          fill="none"
          stroke="#ffde5a"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity={0.55}
          strokeDasharray="3 9"
          initial={{ pathLength: 0, strokeDashoffset: 0 }}
          animate={{ pathLength: 1, strokeDashoffset: [0, -24] }}
          transition={{
            pathLength: { duration: 0.9, delay, ease: "easeOut" },
            strokeDashoffset: {
              duration: dur,
              delay: delay + 1,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      )}
      {inView &&
        [0, dur * 0.45].map((offset, pi) => (
          <g key={pi} filter={`url(#${glowId})`}>
            <circle r={pi === 0 ? 2.6 : 1.8} fill="#ffde5a">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${delay + 0.9 + offset}s`}
                path={path}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0.2;0"
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${delay + 0.9 + offset}s`}
              />
            </circle>
            {pi === 0 && (
              <circle r="5" fill="#ffde5a" opacity="0">
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${delay + 0.9}s`}
                  path={path}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.35;0"
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${delay + 0.9}s`}
                />
                <animate
                  attributeName="r"
                  values="2;6;2"
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${delay + 0.9}s`}
                />
              </circle>
            )}
          </g>
        ))}
    </g>
  );
}

export default function NetworkGraphVisual({
  className = "",
  accent = "#ffffff",
  bare = false,
}: NetworkGraphVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, inViewReplay);
  const uid = useId().replace(/:/g, "");
  const glowId = `network-glow-${uid}`;
  const goldGlowId = `network-gold-${uid}`;
  const bgGlowId = `network-bg-glow-${uid}`;
  const gradientId = `edge-flow-gradient-${uid}`;
  const nodeFill = bare ? "transparent" : "#1f2942";

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  return (
    <div
      ref={ref}
      className={`relative h-full w-full ${className}`}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="h-full w-full"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden role="presentation">
          <defs>
            <radialGradient id={`network-bg-glow-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffde5a" stopOpacity={bare ? 0.14 : 0.08} />
              <stop offset="55%" stopColor="#ffffff" stopOpacity={bare ? 0.04 : 0.02} />
              <stop offset="100%" stopColor="#1f2942" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`edge-flow-gradient-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#ffde5a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
            </linearGradient>
            <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={goldGlowId} x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.circle
            cx={50}
            cy={50}
            r={42}
            fill={`url(#${bgGlowId})`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {inView && (
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 50px" }}
            >
              <circle
                cx={50}
                cy={50}
                r={38}
                fill="none"
                stroke="#ffde5a"
                strokeWidth="0.25"
                strokeDasharray="2 8"
                opacity={0.25}
              />
            </motion.g>
          )}

          {NODES.map((node) => (
            <motion.circle
              key={`grid-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={1.2}
              fill="#ffffff"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 0.08 : 0 }}
              transition={{ duration: 0.4, delay: node.tier * 0.08 }}
            />
          ))}

          {EDGES.map((edge) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
            return (
              <EdgeLayer
                key={edge.id}
                path={path}
                delay={edge.delay}
                dur={edge.dur}
                inView={inView}
                accent={accent}
                glowId={glowId}
                gradientId={gradientId}
                bare={bare}
              />
            );
          })}

          {NODES.map((node, i) => (
            <g key={node.id}>
              {node.hub && inView && (
                <>
                  {[12, 17, 22].map((r, ri) => (
                    <motion.circle
                      key={r}
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      fill="none"
                      stroke="#ffde5a"
                      strokeWidth="0.5"
                      animate={{ r: [r, r + 6, r], opacity: [0.35, 0, 0.35] }}
                      transition={{
                        duration: 3.2,
                        delay: ri * 0.9,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  >
                    {[0, 120, 240].map((deg) => (
                      <circle
                        key={deg}
                        cx={node.x + 14 * Math.cos((deg * Math.PI) / 180)}
                        cy={node.y + 14 * Math.sin((deg * Math.PI) / 180)}
                        r={1.1}
                        fill="#ffde5a"
                        opacity={0.7}
                        filter={`url(#${goldGlowId})`}
                      />
                    ))}
                  </motion.g>
                </>
              )}
              <motion.circle
                cx={node.x}
                cy={node.y}
                fill={node.hub ? "#ffde5a" : nodeFill}
                stroke={node.hub ? "#ffde5a" : accent}
                strokeWidth={node.hub ? 2.4 : 2.4}
                filter={node.hub ? `url(#${goldGlowId})` : `url(#${glowId})`}
                initial={{ r: 0, opacity: 0 }}
                animate={{
                  r: inView ? (node.hub ? 4.2 : 4) : 0,
                  opacity: inView ? 1 : 0,
                  strokeOpacity: inView && !node.hub ? [0.95, 0.35, 0.95] : 1,
                  scale: inView && !node.hub ? [1, 1.12, 1] : 1,
                }}
                transition={{
                  r: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
                  opacity: { duration: 0.35, delay: i * 0.06 },
                  strokeOpacity: inView
                    ? {
                        duration: 2.8 + i * 0.15,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0.2 },
                  scale: inView
                    ? {
                        duration: 2.4,
                        delay: 1.2 + i * 0.35,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0.2 },
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              {!node.hub && inView && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={1.4}
                  fill="#ffffff"
                  animate={{ opacity: [0.2, 0.75, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 2.6,
                    delay: i * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
