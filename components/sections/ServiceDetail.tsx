'use client';

import { motion } from "framer-motion";
import ScrollSection3D from "@/components/ui/ScrollSection3D";
import Card3D from "@/components/ui/Card3D";
import type { ServicePillar } from "@/lib/site-data";
import { easeSmooth, viewport, viewportTight } from "@/lib/motion";

export default function ServiceDetail({
  service,
  index,
}: {
  service: ServicePillar;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <ScrollSection3D
      id={service.slug}
      fill
      className="section-flow"
      tilt={flip ? -4 : 4}
    >
      <div className="container-vl flex w-full flex-1 flex-col justify-center">
        <div
          className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-14 ${
            flip ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: easeSmooth }}
          >
            <span
              className="mb-4 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: service.accent }}
            >
              0{index + 1} · Capability
            </span>
            <h2 className="font-['Syne'] text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white">
              {service.title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/70">{service.tagline}</p>
          </motion.div>

          <div className="space-y-4">
            {service.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportTight}
                transition={{ delay: i * 0.08, duration: 0.5, ease: easeSmooth }}
              >
                <Card3D accent={service.accent}>
                  <h3 className="font-['Syne'] text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{item.summary}</p>
                  <p className="mt-3 text-xs leading-6 text-white/50 sm:text-sm">{item.detail}</p>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection3D>
  );
}
