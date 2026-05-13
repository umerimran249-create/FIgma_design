type SectionLabelProps = {
  text: string;
  color?: string;
};

export default function SectionLabel({
  text,
  color = "var(--color-cyan)",
}: SectionLabelProps) {
  return (
    <span
      className="inline-flex rounded-pill border px-4 py-1.5 text-[11px] tracking-[0.1em]"
      style={{
        color,
        borderColor: "rgba(6,182,212,0.25)",
        background: "rgba(37,99,235,0.08)",
      }}
    >
      {text}
    </span>
  );
}
