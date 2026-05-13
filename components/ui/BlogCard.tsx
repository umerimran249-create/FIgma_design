'use client';

import { motion } from "framer-motion";

type BlogCardProps = {
  category: string;
  title: string;
  author: string;
  accent: string;
};

export default function BlogCard({ category, title, author, accent }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#111122]"
    >
      <div
        className="flex h-[140px] items-center justify-center text-xs text-white/30 lg:h-[180px]"
        style={{ background: `linear-gradient(135deg, ${accent}33, ${accent}14)` }}
      >
        [ Article Cover ]
      </div>
      <div className="space-y-2 p-5">
        <span
          className="inline-flex rounded-[100px] border px-3 py-1 text-[11px]"
          style={{ color: accent, borderColor: `${accent}66`, background: `${accent}1F` }}
        >
          {category}
        </span>
        <h3 className="font-['Syne'] text-[15px] font-semibold leading-6 text-white">{title}</h3>
        <div className="flex items-center text-xs text-slate-400">
          <span>By {author}</span>
          <span className="ml-auto" style={{ color: accent }}>
            Read more →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
