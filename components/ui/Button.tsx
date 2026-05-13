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
      ? "text-[#1f2942] shadow-[0_12px_40px_rgba(255,222,90,0.4)] hover:-translate-y-0.5"
      : "border border-white/25 text-white/85 hover:border-white hover:text-white";

  const inlineStyle =
    variant === "primary"
      ? { background: "linear-gradient(135deg,#ffde5a,#ffb648)" }
      : undefined;

  return (
    <Link href={href} className={`${base} ${sizing} ${style} ${className}`} style={inlineStyle}>
      {children}
    </Link>
  );
}
