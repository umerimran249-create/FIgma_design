import type { ServiceVisualConfig } from "@/lib/service-visual-config";

const GOLD = 0xf2b632;
const GOLD_LIGHT = 0xffd98c;
const SILVER = 0xcbd1e8;
const VIOLET = 0x4c5fe8;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeGlowTexture(THREE: any) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(c);

  const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.4, "rgba(255,255,255,0.45)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export type PanelScene = {
  renderer: { render: (scene: unknown, camera: unknown) => void; dispose: () => void };
  scene: unknown;
  camera: unknown;
  group: { rotation: { x: number; y: number } };
  meshes: {
    mesh: { scale: { setScalar: (n: number) => void } };
    sprite: { material: { opacity: number } };
    isCore: boolean;
  }[];
  resize: () => void;
  dispose: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildPanelScene(THREE: any, canvas: HTMLCanvasElement, config: ServiceVisualConfig): PanelScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 0, 4.2);

  const disposables: { dispose: () => void }[] = [];
  const group = new THREE.Group();
  scene.add(group);

  const glowTex = makeGlowTexture(THREE);
  disposables.push(glowTex);

  const meshes: PanelScene["meshes"] = [];

  config.nodes.forEach((p, i) => {
    const isCore = i === config.coreIdx;
    const radius = isCore ? 0.16 : 0.1;
    const geo = new THREE.SphereGeometry(radius, 20, 20);
    disposables.push(geo);

    const mat = new THREE.MeshStandardMaterial({
      color: isCore ? GOLD_LIGHT : SILVER,
      emissive: isCore ? GOLD_LIGHT : SILVER,
      emissiveIntensity: isCore ? 1.2 : 0.35,
      roughness: 0.35,
    });
    disposables.push(mat);

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...p);
    group.add(mesh);

    const spriteMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: isCore ? GOLD_LIGHT : SILVER,
      transparent: true,
      opacity: isCore ? 0.55 : 0.18,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(spriteMat);

    const sprite = new THREE.Sprite(spriteMat);
    const sc = isCore ? 0.9 : 0.5;
    sprite.scale.set(sc, sc, 1);
    sprite.position.copy(mesh.position);
    group.add(sprite);

    meshes.push({ mesh, sprite, isCore });
  });

  config.edges.forEach(([a, b]) => {
    const pA = new THREE.Vector3(...config.nodes[a]);
    const pB = new THREE.Vector3(...config.nodes[b]);
    const geo = new THREE.BufferGeometry().setFromPoints([pA, pB]);
    disposables.push(geo);

    const isCoreEdge = a === config.coreIdx || b === config.coreIdx;
    const mat = new THREE.LineBasicMaterial({
      color: isCoreEdge ? GOLD : SILVER,
      transparent: true,
      opacity: isCoreEdge ? 0.55 : 0.22,
    });
    disposables.push(mat);
    group.add(new THREE.Line(geo, mat));
  });

  scene.add(new THREE.AmbientLight(0x4a5380, 1.3));
  const key = new THREE.PointLight(GOLD_LIGHT, 1.8, 15);
  key.position.set(2, 2, 3);
  scene.add(key);
  const rim = new THREE.PointLight(VIOLET, 1.0, 15);
  rim.position.set(-2, -1, -2);
  scene.add(rim);

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };
  resize();

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };

  return { renderer, scene, camera, group, meshes, resize, dispose };
}
