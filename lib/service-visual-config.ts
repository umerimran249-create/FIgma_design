export type ServiceVisualKey = "neural" | "cloud" | "emerging" | "design";

export type ServiceVisualConfig = {
  nodes: [number, number, number][];
  edges: [number, number][];
  coreIdx: number;
};

export const serviceVisualConfigs: Record<ServiceVisualKey, ServiceVisualConfig> = {
  neural: {
    nodes: [
      [0, 0.8, 0],
      [-1.1, 0, 0.4],
      [1.0, -0.1, -0.5],
      [0, -0.9, 0.3],
      [1.3, 0.7, -0.7],
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 4],
      [0, 4],
    ],
    coreIdx: 0,
  },
  cloud: {
    nodes: [
      [-1.2, 0.5, 0],
      [0, 0.9, 0.4],
      [1.1, 0.4, -0.3],
      [-0.6, -0.6, 0.5],
      [0.7, -0.7, 0.2],
      [0, 0, 0],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [0, 5],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [3, 4],
    ],
    coreIdx: 5,
  },
  emerging: {
    nodes: [
      [0, 1.0, 0],
      [0.9, 0.3, 0.6],
      [0.6, -0.8, -0.3],
      [-0.6, -0.8, 0.3],
      [-0.9, 0.3, -0.6],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [0, 2],
      [1, 3],
    ],
    coreIdx: 0,
  },
  design: {
    nodes: [
      [-0.9, 0.7, 0],
      [0.9, 0.7, 0],
      [0, 0, 0.7],
      [0, -0.9, -0.3],
      [0, 0.1, -0.8],
    ],
    edges: [
      [0, 2],
      [1, 2],
      [2, 3],
      [2, 4],
      [0, 1],
    ],
    coreIdx: 2,
  },
};

const slugToVisual: Record<string, ServiceVisualKey> = {
  "ai-ml-industry-guidance": "neural",
  "cloud-enablement-for-ai": "cloud",
  "ai-driven-emerging-services": "emerging",
  "digital-experience-design": "design",
};

export function getServiceVisualKey(slug: string): ServiceVisualKey {
  return slugToVisual[slug] ?? "neural";
}
