"use client";

import { useMemo, useState } from "react";
import { Mail, MapPin } from "lucide-react";
import GlobeCanvas from "@/components/ui/GlobeCanvas";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { locations, siteConfig } from "@/lib/site-data";

export default function LocationsMap() {
  const [active, setActive] = useState(locations[0]?.id ?? "");
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
      <div className="container-vl relative z-10 flex w-full flex-1 flex-col justify-center py-16 sm:py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-14">
          {/* Left — header + globe */}
          <div className="flex flex-col">
            <Reveal>
              <SectionLabel text="WHERE WE WORK" />
              <h2 className="mt-4 font-['Syne'] text-3xl font-bold text-white sm:text-4xl">
                Global presence,
                <br />
                local partnership.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/70">
                Headquartered in Melbourne with engagement studios across the Asia-Pacific.
                Drop us a line — we&apos;ll find the nearest team.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 sm:mt-12 lg:mt-14">
              <GlobeCanvas
                offices={offices}
                activeIndex={activeIndex >= 0 ? activeIndex : 0}
              />
            </Reveal>
          </div>

          {/* Right — location list */}
          <Reveal delay={0.15} className="flex flex-col lg:pt-[12.5rem]">
            <div className="space-y-0 divide-y divide-white/[0.08]">
              {locations.map((loc) => {
                const isActive = active === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActive(loc.id)}
                    onMouseEnter={() => setActive(loc.id)}
                    className={`group relative w-full py-6 text-left transition-all duration-300 first:pt-0 ${
                      isActive ? "pl-2.5" : "hover:pl-2.5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={16}
                        className={`mt-1 shrink-0 transition-colors duration-300 ${
                          isActive ? "text-[#ffde5a]" : "text-white/40 group-hover:text-[#ffde5a]"
                        }`}
                      />
                      <div>
                        <p className="font-['Syne'] text-base font-bold text-white">
                          {loc.city}, {loc.country}
                        </p>
                        <p
                          className={`text-xs uppercase tracking-wider ${
                            isActive ? "text-[#ffde5a]" : "text-white/45"
                          }`}
                        >
                          {loc.role}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/65">{loc.address}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-6 text-sm text-white/70 transition-colors hover:text-[#ffde5a]"
            >
              <span className="flex items-center gap-3">
                <Mail size={16} className="text-[#ffde5a]" />
                {siteConfig.email}
              </span>
              <span className="text-[#ffde5a]">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
