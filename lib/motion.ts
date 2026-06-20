/** Motion presets aligned with Figma homepage specs (fade-up, stagger, scale-in). */
export const easeSmooth = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: easeSmooth },
  },
};

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeSmooth },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

/** Play enter animations once when scrolling into view (avoids re-trigger jank). */
export const viewport = { once: true, margin: "-80px" as const, amount: 0.12 };

export const viewportTight = { once: true, margin: "-40px" as const, amount: 0.15 };

export const inViewReplay = { once: true, margin: "-60px" as const, amount: 0.12 };
