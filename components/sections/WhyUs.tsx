import SectionLabel from "@/components/ui/SectionLabel";

const items = [
  {
    id: "01",
    title: "Lead the Curve",
    body: "March on an upward trajectory with innovative strategies and seamless integration that propels your business forward consistently.",
  },
  {
    id: "02",
    title: "The Extra Mile",
    body: "Exceed every expectation with a creative and comprehensive customer-centric approach designed entirely around your goals and outcomes.",
  },
  {
    id: "03",
    title: "Collaborate for Excellence",
    body: "Customise your path to success with outcome-based deliveries and dedicated support at every stage of your digital journey.",
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="bg-[#1f2942]">
      <div className="container-vl">
        <SectionLabel text="WHY CHOOSE US" />
        <h2 className="mt-4 font-['Syne'] text-[26px] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Foresight, precision
          <br />
          and creativity.
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#38476c] p-7 transition-colors hover:border-[#ffde5a]/40">
              <span className="pointer-events-none absolute right-5 top-4 font-['Syne'] text-6xl font-bold text-white/10">{item.id}</span>
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-[10px] font-['Syne'] text-sm font-bold text-[#1f2942]" style={{ background: "linear-gradient(135deg,#ffde5a,#ffb648)" }}>
                {item.id}
              </span>
              <h3 className="font-['Syne'] text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
