type SectionLabelProps = {
  text: string;
  color?: string;
  className?: string;
};

export default function SectionLabel({
  text,
  color = "#ffde5a",
  className = "",
}: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-[11px] font-semibold uppercase tracking-[0.2em] ${className}`}
      style={{ color }}
    >
      {text}
    </span>
  );
}
