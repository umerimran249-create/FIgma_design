"use client";

import { motion } from "framer-motion";
import { AnimatedBlock, AnimatedSection } from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import BlogCard from "@/components/ui/BlogCard";
import { fadeUp, viewport } from "@/lib/motion";

const blogs = [
  { category: "AI & Governance", title: "Responsible AI by Design: A Framework for Execution", author: "Laura Bennett", accent: "#ffde5a" },
  { category: "Telecoms", title: "Simulating product market fit for targeted product design in Telecoms", author: "James Calder", accent: "#ffe888" },
  { category: "Data Strategy", title: "Harnessing Data as a Strategic Asset: The Emerging Power of AI-Driven Monetization", author: "Madi Almadi", accent: "#ffb648" },
  { category: "Cloud", title: "Cloud economics assessment — a pathway to cost/benefit analysis for cloud migration", author: "Hammad Khan", accent: "#f5a020" },
];

export default function VistaFlair() {
  return (
    <AnimatedSection id="vistaflair" className="bg-[#2e3b5b]">
      <div className="container-vl">
        <AnimatedBlock>
          <SectionLabel text="VISTAFLAIR" />
          <h2 className="mt-4 font-['Syne'] text-[26px] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            Thought leadership,
            <br />
            delivered.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
            Cross-industry insights and visionary strategies. Don&apos;t let the train of thought leadership pass you by.
          </p>
        </AnimatedBlock>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-10 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <a className="inline-flex rounded-[100px] border border-white/25 px-8 py-3.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-[#ffde5a] hover:text-[#ffde5a]" href="/vista-flair">
            See all blogs →
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
