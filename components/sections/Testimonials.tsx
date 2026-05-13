import SectionLabel from "@/components/ui/SectionLabel";

const testimonials = [
  {
    quote:
      "Vista Logica transformed how we think about data. Their cloud migration cut our infrastructure costs by 40% while doubling our analytics capability.",
    name: "James M.",
    role: "CTO, Telecom Enterprise",
    init: "JM",
    accent: "#2563EB",
  },
  {
    quote:
      "The digital experience redesign they delivered increased our mobile conversion rate by 3x in just 6 weeks. Absolutely world-class team and execution.",
    name: "Sarah R.",
    role: "Head of Digital, Retail Group",
    init: "SR",
    accent: "#10B981",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0D0D1A]">
      <div className="container-vl">
        <SectionLabel text="CLIENT VOICES" />
        <h2 className="mt-4 font-['Syne'] text-4xl font-bold text-white max-lg:text-[28px]">Trusted by leaders.</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.name} className="relative rounded-2xl border border-white/10 bg-[#111122] p-6">
              <span className="absolute bottom-5 left-0 top-5 w-[3px] rounded-r bg-[linear-gradient(180deg,#2563EB,#06B6D4)]" />
              <p className="mb-4 text-sm text-[#EF9F27]">★★★★★</p>
              <p className="text-sm italic leading-7 text-slate-400">{item.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border font-['Syne'] text-sm font-bold"
                  style={{ color: item.accent, borderColor: `${item.accent}66`, background: `${item.accent}1F` }}
                >
                  {item.init}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
