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
    accent: "#ffde5a",
    gradient: "linear-gradient(90deg, #ffde5a, #ffb648)",
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
    accent: "#ffe888",
    gradient: "linear-gradient(90deg, #ffe888, #ffde5a)",
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
    accent: "#ffb648",
    gradient: "linear-gradient(90deg, #ffb648, #f5a020)",
    Icon: Layers,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#2e3b5b]">
      <div className="container-vl">
        <SectionLabel text="OUR SERVICES" />
        <h2 className="mt-4 font-['Syne'] text-[26px] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Elevated Solutions
          <br />
          for Maximum Impact
        </h2>
        <p className="mt-4 max-w-lg text-[15px] text-white/70">
          Immersive experiences for both your team and your customers.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a className="inline-flex rounded-[100px] border border-white/25 px-8 py-3.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-[#ffde5a] hover:text-[#ffde5a]" href="/services">
            See all services →
          </a>
        </div>
      </div>
    </section>
  );
}
