export type LandPoint = [number, number];

/**
 * Natural Earth 2° coastline grid (same points as the HTML reference).
 * Generated offline via `node scripts/extract-land-points.mjs` → lib/globe-land-points.json
 * Fallback mask keeps the globe working if the JSON is missing.
 */
import bundledLandPoints from "./globe-land-points.json";

const LAND_REGIONS: { latMin: number; latMax: number; lonMin: number; lonMax: number }[] = [
  { latMin: 15, latMax: 72, lonMin: -168, lonMax: -52 },
  { latMin: -56, latMax: 13, lonMin: -82, lonMax: -34 },
  { latMin: 36, latMax: 71, lonMin: -10, lonMax: 40 },
  { latMin: -35, latMax: 37, lonMin: -18, lonMax: 52 },
  { latMin: 5, latMax: 77, lonMin: 40, lonMax: 180 },
  { latMin: -44, latMax: -10, lonMin: 112, lonMax: 154 },
  { latMin: -11, latMax: 20, lonMin: 92, lonMax: 141 },
];

function buildFallbackLandPoints(): LandPoint[] {
  const pts: LandPoint[] = [];
  for (let lat = -80; lat <= 80; lat += 2) {
    for (let lon = -180; lon <= 180; lon += 2) {
      const inRegion = LAND_REGIONS.some(
        (r) => lat >= r.latMin && lat <= r.latMax && lon >= r.lonMin && lon <= r.lonMax
      );
      if (inRegion) pts.push([lat, lon]);
    }
  }
  return pts;
}

let cached: LandPoint[] | null = null;

export function getLandPoints(): LandPoint[] {
  if (cached) return cached;
  const bundled = bundledLandPoints as LandPoint[];
  cached = bundled.length > 0 ? bundled : buildFallbackLandPoints();
  return cached;
}
