import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "vl-bg": "#07070F",
        "vl-bg2": "#0D0D1A",
        "vl-card": "#111122",
        "vl-blue": "#2563EB",
        "vl-cyan": "#06B6D4",
        "vl-violet": "#7C3AED",
        "vl-teal": "#10B981",
        "vl-slate": "#94A3B8",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        pill: "100px",
      },
    },
  },
  plugins: [],
};

export default config;
