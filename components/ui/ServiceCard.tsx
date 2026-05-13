'use client';

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
  accent: string;
  gradient: string;
  Icon: LucideIcon;
};

export default function ServiceCard({
  title,
  description,
  features,
  accent,
  gradient,
  Icon,
}: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-[20px] border border-white/10 bg-[#111122] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      style={{ transition: "all 0.3s ease" }}
    >
      <div className="h-[3px] w-full" style={{ background: gradient }} />
      <div className="p-6">
        <div
          className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border"
          style={{ background: `${accent}1F`, borderColor: `${accent}66` }}
        >
          <Icon size={22} color={accent} />
        </div>
        <h3 className="mt-4 font-['Syne'] text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        <hr className="my-5 border-white/10" />
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-400">
              <span
                className="mt-2 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
