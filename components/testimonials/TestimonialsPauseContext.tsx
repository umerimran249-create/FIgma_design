"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type TestimonialsPauseContextValue = {
  paused: boolean;
  setPaused: (value: boolean) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
};

const TestimonialsPauseContext = createContext<TestimonialsPauseContextValue | null>(null);

export function TestimonialsPauseProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <TestimonialsPauseContext.Provider value={{ paused, setPaused, hoveredId, setHoveredId }}>
      {children}
    </TestimonialsPauseContext.Provider>
  );
}

export function useTestimonialsPause() {
  const ctx = useContext(TestimonialsPauseContext);
  if (!ctx) {
    throw new Error("useTestimonialsPause must be used within TestimonialsPauseProvider");
  }
  return ctx;
}
