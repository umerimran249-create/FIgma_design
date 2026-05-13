import SectionLabel from "@/components/ui/SectionLabel";

const testimonials = [
  {
    quote:
      "Vista Logica transformed how we think about data. Their cloud migration cut our infrastructure costs by 40% while doubling our analytics capability.",
    name: "James M.",
    role: "CTO, Telecom Enterprise",
    init: "JM",
    accent: "#ffde5a",
  },
  {
    quote:
      "The digital experience redesign they delivered increased our mobile conversion rate by 3x in just 6 weeks. Absolutely world-class team and execution.",
    name: "Sarah R.",
    role: "Head of Digital, Retail Group",
    init: "SR",
    accent: "#ffb648",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#1f2942]">
      <div className="container-vl">
        <SectionLabel text="CLIENT VOICES" />
        <h2 className="mt-4 font-['Syne'] text-[26px] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">Trusted by leaders.</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.name} className="relative rounded-2xl border border-white/10 bg-[#38476c] p-6">
              <span className="absolute bottom-5 left-0 top-5 w-[3px] rounded-r" style={{ background: "linear-gradient(180deg,#ffde5a,#ffb648)" }} />
              <p className="mb-4 text-sm text-[#ffde5a]">★★★★★</p>
              <p className="text-sm italic leading-7 text-white/80">{item.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border font-['Syne'] text-sm font-bold"
                  style={{ color: item.accent, borderColor: `${item.accent}66`, background: `${item.accent}1F` }}
                >
                  {item.init}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-white/60">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
