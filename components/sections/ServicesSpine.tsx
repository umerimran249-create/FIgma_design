"use client";

import { useEffect, useRef, useState } from "react";
import type { ServicePillar } from "@/lib/site-data";
import { getServiceVisualKey, serviceVisualConfigs } from "@/lib/service-visual-config";
import { buildPanelScene, type PanelScene } from "@/lib/service-panel-scene";
import { loadThree } from "@/lib/load-three";

function pillarTags(pillar: ServicePillar) {
  return pillar.items.slice(0, 3).map((item) => {
    const short = item.title.split(/[&/]/)[0]?.trim() ?? item.title;
    return short.length > 22 ? `${short.slice(0, 20)}…` : short;
  });
}

type ServicesSpineProps = {
  pillars: ServicePillar[];
};

export default function ServicesSpine({ pillars }: ServicesSpineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [fillPct, setFillPct] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const panelScenesRef = useRef<{ scene: PanelScene; index: number }[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateSpine = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const scrolled = Math.min(Math.max(vh * 0.5 - rect.top, 0), total);
      setFillPct(total > 0 ? (scrolled / total) * 100 : 0);

      const focusY = vh * 0.45;
      let bestIdx = 0;
      let bestDist = Infinity;

      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const r = panel.getBoundingClientRect();
        const inView = r.top < vh * 0.65 && r.bottom > vh * 0.2;
        if (!inView) return;
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });

      activeIndexRef.current = bestIdx;
      setActiveIndex(bestIdx);
    };

    updateSpine();
    window.addEventListener("scroll", updateSpine, { passive: true });
    window.addEventListener("resize", updateSpine);
    return () => {
      window.removeEventListener("scroll", updateSpine);
      window.removeEventListener("resize", updateSpine);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let frameId = 0;
    let cleanupScenes: (() => void) | undefined;

    loadThree()
      .then((THREE) => {
        if (cancelled) return;

        const panelScenes: { scene: PanelScene; panel: HTMLDivElement; index: number }[] = [];

        canvasRefs.current.forEach((canvas, i) => {
          const panel = panelRefs.current[i];
          if (!canvas || !panel) return;
          const visualKey = getServiceVisualKey(pillars[i].slug);
          const config = serviceVisualConfigs[visualKey];
          panelScenes.push({ scene: buildPanelScene(THREE, canvas, config), panel, index: i });
        });

        panelScenesRef.current = panelScenes;
        panelScenes.find((p) => p.index === activeIndexRef.current)?.scene.resize();

        const onResize = () => {
          panelScenes.forEach(({ scene }) => scene.resize());
        };
        window.addEventListener("resize", onResize);

        const start = performance.now();
        const animate = () => {
          frameId = requestAnimationFrame(animate);
          const t = (performance.now() - start) / 1000;
          const idx = activeIndexRef.current;

          panelScenes.forEach(({ scene, index }) => {
            if (index !== idx) return;

            scene.group.rotation.y = t * 0.25;
            scene.group.rotation.x = Math.sin(t * 0.3) * 0.15;

            scene.meshes.forEach(({ mesh, sprite, isCore }) => {
              if (!isCore) return;
              const pulse = 1 + Math.sin(t * 1.8) * 0.15;
              mesh.scale.setScalar(pulse);
              sprite.material.opacity = 0.5 + Math.sin(t * 1.8) * 0.12;
            });

            scene.renderer.render(scene.scene, scene.camera);
          });
        };
        animate();

        cleanupScenes = () => {
          cancelAnimationFrame(frameId);
          window.removeEventListener("resize", onResize);
          panelScenes.forEach(({ scene }) => scene.dispose());
          panelScenesRef.current = [];
        };
      })
      .catch((err) => console.error("Service spine visuals failed:", err));

    return () => {
      cancelled = true;
      cleanupScenes?.();
    };
  }, [pillars]);

  useEffect(() => {
    panelScenesRef.current
      .find((p) => p.index === activeIndex)
      ?.scene.resize();
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-[1300px] px-6 py-10 sm:px-10">
      {/* spine track */}
      <div
        className="pointer-events-none absolute bottom-0 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-[rgba(242,182,50,0.12)] to-transparent left-[30px] sm:left-1/2"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#FFD98C] to-[#F2B632] shadow-[0_0_16px_2px_rgba(242,182,50,0.5)] transition-[height] duration-100 ease-linear left-[30px] sm:left-1/2"
        style={{ height: `${fillPct}%` }}
        aria-hidden
      />

      {pillars.map((pillar, i) => {
        const flip = i % 2 === 1;
        const isActive = i === activeIndex;
        const tags = pillarTags(pillar);

        const copyBlock = (
          <div
            key="copy"
            className={`col-start-2 sm:col-start-auto ${flip ? "text-left sm:text-right" : ""} pl-5 sm:px-9 sm:pl-9`}
          >
            <div
              className={`mb-2.5 text-xs font-bold tracking-[0.1em] text-[#F2B632] transition-opacity duration-500 ${
                isActive ? "opacity-100" : "opacity-50"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h2
              className={`mb-3 font-['Syne'] text-2xl font-bold tracking-tight text-white transition-all duration-[600ms] ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"
              }`}
            >
              {pillar.title}
            </h2>
            <p
              className={`max-w-[360px] text-[14.5px] leading-relaxed text-white/60 transition-all duration-[600ms] ${
                flip ? "sm:ml-auto" : ""
              } ${isActive ? "translate-y-0 opacity-100 delay-100" : "translate-y-2 opacity-0"}`}
            >
              {pillar.tagline}
            </p>
            <div
              className={`mt-4 flex flex-wrap gap-2 transition-opacity duration-[600ms] ${
                flip ? "sm:justify-end" : ""
              } ${isActive ? "opacity-100 delay-200" : "opacity-0"}`}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(242,182,50,0.3)] bg-[rgba(242,182,50,0.06)] px-3 py-1 text-[11.5px] text-[#F2B632]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );

        const nodeBlock = (
          <div
            key="node"
            className="relative col-start-1 flex h-[60px] w-[60px] items-center justify-center sm:col-start-auto sm:h-[90px] sm:w-[90px]"
          >
            {isActive && (
              <span
                className="absolute h-[18px] w-[18px] animate-[spine-pulse_2.4s_ease-out_infinite] rounded-full border border-[#F2B632]"
                aria-hidden
              />
            )}
            <span
              className={`relative z-[2] h-[18px] w-[18px] rounded-full border-2 transition-all duration-500 ${
                isActive
                  ? "border-[#F2B632] bg-[#F2B632] shadow-[0_0_18px_4px_rgba(242,182,50,0.55)]"
                  : "border-[#5D6585] bg-[#0A0E1C]"
              }`}
            />
          </div>
        );

        const visualBlock = (
          <div
            key="visual"
            className={`relative hidden h-[220px] w-full transition-opacity duration-500 sm:block ${
              isActive ? "opacity-100" : "pointer-events-none invisible opacity-0"
            }`}
          >
            <canvas
              ref={(el) => {
                canvasRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full"
              aria-hidden={!isActive}
            />
          </div>
        );

        return (
          <div
            key={pillar.slug}
            id={pillar.slug}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className={`relative grid min-h-[260px] grid-cols-[60px_1fr] items-center py-12 sm:grid-cols-[1fr_90px_1fr] sm:py-[50px] ${
              flip ? "sm:[direction:rtl] sm:[&>*]:[direction:ltr]" : ""
            } ${isActive ? "in-view" : ""}`}
          >
            {flip ? (
              <>
                {visualBlock}
                {nodeBlock}
                {copyBlock}
              </>
            ) : (
              <>
                {copyBlock}
                {nodeBlock}
                {visualBlock}
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
