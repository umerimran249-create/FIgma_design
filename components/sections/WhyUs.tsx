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
    <section id="about" className="bg-[#0D0D1A]">
      <div className="container-vl">
        <SectionLabel text="WHY CHOOSE US" />
        <h2 className="mt-4 font-['Syne'] text-4xl font-bold text-white max-lg:text-[28px]">
          Foresight, precision
          <br />
          and creativity.
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111122] p-7">
              <span className="pointer-events-none absolute right-5 top-4 font-['Syne'] text-6xl font-bold text-white/5">{item.id}</span>
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#2563EB,#06B6D4)] font-['Syne'] text-sm font-bold text-white">
                {item.id}
              </span>
              <h3 className="font-['Syne'] text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
