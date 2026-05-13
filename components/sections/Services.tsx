'use client';

import { BarChart2, Cloud, Layers } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionLabel from "@/components/ui/SectionLabel";

const services = [
  {
    title: "Data, Analytics & Insights",
    description: "Architecture, AI and intelligence systems that unlock growth.",
    features: [
      "Data & analytics strategy",
      "Data governance & architecture",
      "Data / AI architecture & design",
      "Gen AI application development",
      "Machine learning & advanced analytics",
      "Data engineering & visualisation",
    ],
    accent: "#2563EB",
    gradient: "linear-gradient(90deg, #2563EB, #06B6D4)",
    Icon: BarChart2,
  },
  {
    title: "Cloud Enablement",
    description: "Scalable cloud foundations designed for speed and resilience.",
    features: [
      "Cloud readiness assessment",
      "Cloud strategy and advisory",
      "Cloud migration & modernisation",
      "Security and architecture design",
      "Automation and tooling",
      "Cost optimisation & workload management",
    ],
    accent: "#7C3AED",
    gradient: "linear-gradient(90deg, #7C3AED, #2563EB)",
    Icon: Cloud,
  },
  {
    title: "Digital Experience & Design",
    description: "Human-centered digital products that convert and retain.",
    features: [
      "Digital strategy and advisory",
      "Product design & market fit simulation",
      "Ad Tech and channel monetisation",
      "UX need and journey mapping",
      "User experience & interface design",
      "Prototyping and integration",
    ],
    accent: "#06B6D4",
    gradient: "linear-gradient(90deg, #06B6D4, #10B981)",
    Icon: Layers,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#07070F]">
      <div className="container-vl">
        <SectionLabel text="OUR SERVICES" />
        <h2 className="mt-4 font-['Syne'] text-4xl font-bold text-white max-lg:text-[28px]">
          Elevated Solutions
          <br />
          for Maximum Impact
        </h2>
        <p className="mt-4 max-w-lg text-[15px] text-slate-400">
          Immersive experiences for both your team and your customers.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a className="inline-flex rounded-[100px] border border-white/20 px-8 py-3.5 text-[15px] font-semibold text-slate-400 transition-colors hover:border-white hover:text-white" href="/services">
            See all services →
          </a>
        </div>
      </div>
    </section>
  );
}
