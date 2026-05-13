import SectionLabel from "@/components/ui/SectionLabel";
import BlogCard from "@/components/ui/BlogCard";

const blogs = [
  { category: "AI & Governance", title: "Responsible AI by Design: A Framework for Execution", author: "Laura Bennett", accent: "#2563EB" },
  { category: "Telecoms", title: "Simulating product market fit for targeted product design in Telecoms", author: "James Calder", accent: "#7C3AED" },
  { category: "Data Strategy", title: "Harnessing Data as a Strategic Asset: The Emerging Power of AI-Driven Monetization", author: "Madi Almadi", accent: "#06B6D4" },
  { category: "Cloud", title: "Cloud economics assessment — a pathway to cost/benefit analysis for cloud migration", author: "Hammad Khan", accent: "#10B981" },
];

export default function VistaFlair() {
  return (
    <section id="vistaflair" className="bg-[#07070F]">
      <div className="container-vl">
        <SectionLabel text="VISTAFLAIR" />
        <h2 className="mt-4 font-['Syne'] text-4xl font-bold text-white max-lg:text-[28px]">
          Thought leadership,
          <br />
          delivered.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
          Cross-industry insights and visionary strategies. Don&apos;t let the train of thought leadership pass you by.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.title} {...blog} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a className="inline-flex rounded-[100px] border border-white/20 px-8 py-3.5 text-[15px] font-semibold text-slate-400 transition-colors hover:border-white hover:text-white" href="/vista-flair">
            See all blogs →
          </a>
        </div>
      </div>
    </section>
  );
}
