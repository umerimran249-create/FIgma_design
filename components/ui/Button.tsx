import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
  href?: string;
  className?: string;
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href = "#",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[100px] font-semibold transition-all";
  const sizing = size === "lg" ? "h-[60px] px-8 text-[17px]" : "h-14 px-8 text-base";
  const style =
    variant === "primary"
      ? "text-white shadow-[0_12px_40px_rgba(6,182,212,0.4)] bg-[linear-gradient(135deg,#2563EB,#06B6D4)] hover:-translate-y-0.5"
      : "border border-white/20 text-slate-300 hover:border-white hover:text-white";

  return (
    <Link href={href} className={`${base} ${sizing} ${style} ${className}`}>
      {children}
    </Link>
  );
}
