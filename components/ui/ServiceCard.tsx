'use client';

import { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
  accent: string;
  gradient: string;
  Icon: LucideIcon;
  index?: number;
};

export default function ServiceCard({
  title,
  description,
  features,
  accent,
  Icon,
  index = 0,
}: ServiceCardProps) {
  return (
    <div className={`h-full ${index > 0 ? "lg:border-l lg:border-white/[0.08] lg:pl-8" : ""}`}>
      <Icon size={22} color={accent} className="mb-4" />
      <h3 className="font-['Syne'] text-lg font-bold text-white sm:text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/70">{description}</p>
      <ul className="mt-5 space-y-2 border-t border-white/[0.08] pt-5">
        {features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs text-white/75 sm:text-sm">
            <span
              className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
