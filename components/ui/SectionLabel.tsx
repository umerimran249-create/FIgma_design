type SectionLabelProps = {
  text: string;
  color?: string;
};

export default function SectionLabel({
  text,
  color = "#ffde5a",
}: SectionLabelProps) {
  return (
    <span
      className="inline-flex rounded-pill border px-4 py-1.5 text-[11px] font-semibold tracking-[0.12em]"
      style={{
        color,
        borderColor: "rgba(255, 222, 90, 0.35)",
        background: "rgba(255, 222, 90, 0.08)",
      }}
    >
      {text}
    </span>
  );
}
