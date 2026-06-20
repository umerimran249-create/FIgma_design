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

/** Re-triggers enter/exit animations every time the element scrolls in or out of view. */
export const viewport = { once: false, margin: "-80px" as const, amount: 0.12 };

export const viewportTight = { once: false, margin: "-40px" as const, amount: 0.15 };

export const inViewReplay = { once: false, margin: "-60px" as const, amount: 0.12 };
