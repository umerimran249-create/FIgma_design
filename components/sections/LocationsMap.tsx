"use client";

import { useMemo, useState } from "react";
import { Mail, MapPin } from "lucide-react";
import GlobeCanvas from "@/components/ui/GlobeCanvas";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { locations, siteConfig } from "@/lib/site-data";

export default function LocationsMap() {
  const [active, setActive] = useState(locations[0].id);
  const activeIndex = locations.findIndex((l) => l.id === active);

  const offices = useMemo(
    () =>
      locations.map((loc, i) => ({
        lat: loc.lat,
        lng: loc.lng,
        primary: i === 0,
      })),
    []
  );

  return (
    <section
      id="locations"
      className="section-flow section-flow--fill-min relative flex flex-col justify-center overflow-hidden"
    >
      <div className="container-vl relative z-10 w-full py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionLabel text="WHERE WE WORK" />
          <h2 className="mt-4 max-w-[480px] font-['Syne'] text-[clamp(30px,3.4vw,42px)] font-bold leading-[1.14] tracking-tight text-white">
            Global presence, local partnership.
          </h2>
          <p className="mt-5 max-w-[460px] text-base leading-[1.65] text-[#9099B8]">
            Headquartered in Melbourne with engagement studios across the Asia-Pacific. Drop us a line
            — we&apos;ll find the nearest team.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[50px]">
          <Reveal delay={0.08}>
            <GlobeCanvas offices={offices} activeIndex={activeIndex >= 0 ? activeIndex : 0} />
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col">
            <div>
              {locations.map((loc, i) => {
                const isActive = active === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActive(loc.id)}
                    onMouseEnter={() => setActive(loc.id)}
                    className={`flex w-full gap-4 border-t border-white/[0.08] py-[22px] text-left transition-[padding-left] duration-[250ms] ${
                      isActive ? "pl-2.5" : "hover:pl-2.5"
                    } ${i === locations.length - 1 ? "border-b border-white/[0.08]" : ""}`}
                  >
                    <MapPin
                      size={18}
                      className={`mt-0.5 shrink-0 transition-colors duration-[250ms] ${
                        isActive ? "text-[#F2B632]" : "text-[#5D6585] group-hover:text-[#F2B632]"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-lg font-bold tracking-tight transition-colors duration-[250ms] ${
                          isActive ? "text-[#F2B632]" : "text-white"
                        }`}
                      >
                        {loc.city}, {loc.country}
                      </p>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#F2B632] opacity-85">
                        {loc.role}
                      </p>
                      <p className="text-sm leading-[1.55] text-[#9099B8]">{loc.address}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-[30px] flex items-center justify-between border-t border-white/[0.08] pt-[26px]">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-[15.5px] font-semibold text-white transition-colors hover:text-[#F2B632]"
              >
                <Mail size={16} className="text-[#F2B632]" />
                {siteConfig.email}
              </a>
              <span className="text-[#F2B632]">→</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
