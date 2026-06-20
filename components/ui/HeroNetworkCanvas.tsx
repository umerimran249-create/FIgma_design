"use client";

import { useEffect, useRef } from "react";
import { loadThree } from "@/lib/load-three";

type HeroNetworkCanvasProps = {
  className?: string;
};

const GOLD = 0xf2b632;
const GOLD_LIGHT = 0xffd98c;
const SILVER = 0xe7eaf5;

type NodeType = "silver" | "gold" | "gold-core" | "gold-small";

const nodeDefs: { p: [number, number, number]; type: NodeType }[] = [
  { p: [-3.2, 2.3, 0.4], type: "silver" },
  { p: [0.1, 2.6, -1.1], type: "silver" },
  { p: [2.6, 2.2, 0.9], type: "silver" },
  { p: [-3.0, 0.0, 1.2], type: "silver" },
  { p: [-1.0, 0.1, 0.6], type: "gold" },
  { p: [1.1, -0.1, -0.5], type: "gold-core" },
  { p: [3.1, 0.1, 1.0], type: "silver" },
  { p: [-2.7, -2.4, -0.6], type: "silver" },
  { p: [0.0, -2.5, 0.8], type: "silver" },
  { p: [2.8, -2.2, -0.3], type: "silver" },
  { p: [1.8, 1.1, -1.4], type: "gold-small" },
  { p: [-1.6, -1.2, 1.6], type: "gold-small" },
];

const edgeDefs: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 6],
  [3, 4],
  [4, 5],
  [5, 6],
  [3, 7],
  [4, 8],
  [5, 9],
  [6, 9],
  [7, 8],
  [8, 9],
  [5, 10],
  [1, 10],
  [4, 11],
  [7, 11],
  [5, 11],
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeGlowTexture(THREE: any) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(c);

  const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.4, "rgba(255,255,255,0.5)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initScene(THREE: any, stage: HTMLCanvasElement, container: HTMLDivElement) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas: stage, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const disposables: { dispose: () => void }[] = [];

  const resize = () => {
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };
  resize();

  const glowTexture = makeGlowTexture(THREE);
  disposables.push(glowTexture);

  const group = new THREE.Group();
  scene.add(group);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeMeshes: { mesh: any; sprite: any; def: (typeof nodeDefs)[number] }[] = [];

  const makeNode = (def: (typeof nodeDefs)[number]) => {
    let radius: number;
    let color: number;
    let emissiveIntensity: number;
    let glowScale: number;

    if (def.type === "gold-core") {
      radius = 0.34;
      color = GOLD_LIGHT;
      emissiveIntensity = 1.4;
      glowScale = 3.4;
    } else if (def.type === "gold") {
      radius = 0.22;
      color = GOLD;
      emissiveIntensity = 1.1;
      glowScale = 2.6;
    } else if (def.type === "gold-small") {
      radius = 0.13;
      color = GOLD;
      emissiveIntensity = 0.9;
      glowScale = 2.2;
    } else {
      radius = 0.16;
      color = SILVER;
      emissiveIntensity = 0.5;
      glowScale = 2.0;
    }

    const geo = new THREE.SphereGeometry(radius, 24, 24);
    disposables.push(geo);

    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity,
      roughness: 0.3,
      metalness: 0.2,
    });
    disposables.push(mat);

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...def.p);
    group.add(mesh);

    const spriteMat = new THREE.SpriteMaterial({
      map: glowTexture,
      color,
      transparent: true,
      opacity: def.type.startsWith("gold") ? 0.55 : 0.25,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(spriteMat);

    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(radius * glowScale * 2.2, radius * glowScale * 2.2, 1);
    sprite.position.copy(mesh.position);
    group.add(sprite);

    if (def.type === "silver") {
      const ringGeo = new THREE.TorusGeometry(radius * 1.8, 0.018, 8, 32);
      disposables.push(ringGeo);

      const ringMat = new THREE.MeshBasicMaterial({
        color: SILVER,
        transparent: true,
        opacity: 0.55,
      });
      disposables.push(ringMat);

      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(mesh.position);
      ring.lookAt(camera.position);
      group.add(ring);
      mesh.userData.ring = ring;
    }

    nodeMeshes.push({ mesh, sprite, def });
    return mesh;
  };

  nodeDefs.forEach(makeNode);

  edgeDefs.forEach(([a, b]) => {
    const nodeA = nodeDefs[a];
    const nodeB = nodeDefs[b];
    if (!nodeA || !nodeB) return;

    const pA = new THREE.Vector3(...nodeA.p);
    const pB = new THREE.Vector3(...nodeB.p);
    const isGoldEdge =
      nodeA.type.startsWith("gold") && nodeB.type.startsWith("gold");
    const midGold =
      nodeA.type.startsWith("gold") || nodeB.type.startsWith("gold");

    const geo = new THREE.BufferGeometry().setFromPoints([pA, pB]);
    disposables.push(geo);

    const mat = new THREE.LineBasicMaterial({
      color: isGoldEdge ? GOLD_LIGHT : midGold ? GOLD : SILVER,
      transparent: true,
      opacity: isGoldEdge ? 0.9 : midGold ? 0.55 : 0.22,
    });
    disposables.push(mat);

    group.add(new THREE.Line(geo, mat));
  });

  const wireGeo = new THREE.IcosahedronGeometry(5.6, 1);
  disposables.push(wireGeo);

  const wireMat = new THREE.MeshBasicMaterial({
    color: GOLD,
    wireframe: true,
    transparent: true,
    opacity: 0.045,
  });
  disposables.push(wireMat);

  const wireSphere = new THREE.Mesh(wireGeo, wireMat);
  group.add(wireSphere);

  const ringGeo2 = new THREE.TorusGeometry(4.4, 0.006, 8, 80);
  disposables.push(ringGeo2);

  const ringMat2 = new THREE.MeshBasicMaterial({
    color: GOLD,
    transparent: true,
    opacity: 0.18,
  });
  disposables.push(ringMat2);

  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.x = Math.PI / 2.4;
  group.add(ring2);

  const dustCount = 60;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    const r = 5.5 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    dustPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    dustPositions[i * 3 + 2] = r * Math.cos(phi);
  }

  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  disposables.push(dustGeo);

  const dustMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.035,
    transparent: true,
    opacity: 0.35,
  });
  disposables.push(dustMat);

  const dust = new THREE.Points(dustGeo, dustMat);
  group.add(dust);

  scene.add(new THREE.AmbientLight(0x445080, 1.1));

  const keyLight = new THREE.PointLight(GOLD_LIGHT, 2.2, 20);
  keyLight.position.set(3, 3, 6);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x4c5fe8, 1.4, 20);
  rimLight.position.set(-4, -2, -4);
  scene.add(rimLight);

  let targetRotX = 0;
  let targetRotY = 0;
  let curRotX = 0;
  let curRotY = 0;

  const onMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    targetRotY = (px - 0.5) * 0.9;
    targetRotX = (py - 0.5) * -0.6;
  };

  const onLeave = () => {
    targetRotX = 0;
    targetRotY = 0;
  };

  container.addEventListener("mousemove", onMove);
  container.addEventListener("mouseleave", onLeave);
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let frameId = 0;

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!reducedMotion) {
      curRotX += (targetRotX - curRotX) * 0.04;
      curRotY += (targetRotY - curRotY) * 0.04;

      group.rotation.y = t * 0.12 + curRotY;
      group.rotation.x = Math.sin(t * 0.25) * 0.08 + curRotX;

      nodeMeshes.forEach(({ mesh, sprite, def }) => {
        if (def.type.startsWith("gold")) {
          const pulse = 1 + Math.sin(t * 1.6 + mesh.position.x) * 0.12;
          mesh.scale.setScalar(pulse);
          sprite.material.opacity =
            (def.type === "gold-core" ? 0.55 : 0.45) +
            Math.sin(t * 1.6 + mesh.position.x) * 0.12;
        }
        if (mesh.userData.ring) {
          mesh.userData.ring.lookAt(camera.position);
        }
      });

      wireSphere.rotation.y = -t * 0.04;
      ring2.rotation.z = t * 0.06;
      dust.rotation.y = t * 0.02;
    }

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(frameId);
    container.removeEventListener("mousemove", onMove);
    container.removeEventListener("mouseleave", onLeave);
    window.removeEventListener("resize", resize);
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
  };
}

export default function HeroNetworkCanvas({ className = "" }: HeroNetworkCanvasProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = canvasRef.current;
    const container = stageRef.current;
    if (!stage || !container) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    loadThree()
      .then((THREE) => {
        if (cancelled) return;
        cleanup = initScene(THREE, stage, container);
      })
      .catch((err) => {
        console.error("Failed to load Three.js hero visual:", err);
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={`relative h-[380px] w-full sm:h-[480px] lg:h-[580px] ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
        aria-hidden
      />
    </div>
  );
}
