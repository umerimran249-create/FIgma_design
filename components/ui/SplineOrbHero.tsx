"use client";

import HeroNetworkCanvas from "@/components/ui/HeroNetworkCanvas";

type SplineOrbHeroProps = {
  className?: string;
};

export default function SplineOrbHero({ className = "" }: SplineOrbHeroProps) {
  return <HeroNetworkCanvas className={className} />;
}
