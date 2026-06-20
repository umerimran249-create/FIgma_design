"use client";

import { useEffect, useRef } from "react";
import { getLandPoints } from "@/lib/globe-land-points";
import { loadThree } from "@/lib/load-three";

export type GlobeOffice = {
  lat: number;
  lng: number;
  primary?: boolean;
};

type GlobeCanvasProps = {
  offices: GlobeOffice[];
  activeIndex: number;
  className?: string;
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initGlobe(
  THREE: any,
  canvas: HTMLCanvasElement,
  container: HTMLDivElement,
  offices: GlobeOffice[],
  landPoints: [number, number][],
  focusRef: React.MutableRefObject<(idx: number) => void>
) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.4, 9.5);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const disposables: { dispose: () => void }[] = [];

  const resize = () => {
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };
  resize();

  const GOLD = 0xf2b632;
  const GOLD_LIGHT = 0xffd98c;
  const DOT_COLOR = 0xc9cee0;
  const GLOBE_R = 3.2;

  const group = new THREE.Group();
  scene.add(group);

  const latLonToVec3 = (lat: number, lon: number, r: number) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  };

  const coreGeo = new THREE.SphereGeometry(GLOBE_R * 0.985, 48, 48);
  disposables.push(coreGeo);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x141c3a,
    transparent: true,
    opacity: 0.55,
  });
  disposables.push(coreMat);
  group.add(new THREE.Mesh(coreGeo, coreMat));

  const dotPositions: number[] = [];
  landPoints.forEach(([lat, lon]) => {
    const jitterLat = lat + (Math.random() - 0.5) * 0.6;
    const jitterLon = lon + (Math.random() - 0.5) * 0.6;
    const v = latLonToVec3(jitterLat, jitterLon, GLOBE_R);
    dotPositions.push(v.x, v.y, v.z);
  });

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(dotPositions), 3));
  disposables.push(dotGeo);

  const dotMat = new THREE.PointsMaterial({
    color: DOT_COLOR,
    size: 0.042,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });
  disposables.push(dotMat);
  group.add(new THREE.Points(dotGeo, dotMat));

  const wireGeo = new THREE.SphereGeometry(GLOBE_R, 24, 16);
  disposables.push(wireGeo);
  const wireMat = new THREE.MeshBasicMaterial({
    color: GOLD,
    wireframe: true,
    transparent: true,
    opacity: 0.04,
  });
  disposables.push(wireMat);
  group.add(new THREE.Mesh(wireGeo, wireMat));

  const glowGeo = new THREE.SphereGeometry(GLOBE_R * 1.04, 32, 32);
  disposables.push(glowGeo);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x4c5fe8,
    transparent: true,
    opacity: 0.06,
    side: THREE.BackSide,
  });
  disposables.push(glowMat);
  const glow = new THREE.Mesh(glowGeo, glowMat);
  group.add(glow);

  const glowTex = makeGlowTexture(THREE);
  disposables.push(glowTex);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pinMeshes: { pin: any; sprite: any; pos: any; def: GlobeOffice & { size: number }; index: number }[] =
    [];

  offices.forEach((o, i) => {
    const size = o.primary ? 0.11 : 0.075;
    const pos = latLonToVec3(o.lat, o.lng, GLOBE_R * 1.01);

    const geo = new THREE.SphereGeometry(size, 16, 16);
    disposables.push(geo);
    const mat = new THREE.MeshStandardMaterial({
      color: o.primary ? GOLD_LIGHT : GOLD,
      emissive: o.primary ? GOLD_LIGHT : GOLD,
      emissiveIntensity: 1.2,
      roughness: 0.3,
    });
    disposables.push(mat);

    const pin = new THREE.Mesh(geo, mat);
    pin.position.copy(pos);
    group.add(pin);

    const spriteMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: GOLD_LIGHT,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(spriteMat);

    const sprite = new THREE.Sprite(spriteMat);
    const sc = o.primary ? 0.85 : 0.6;
    sprite.scale.set(sc, sc, 1);
    sprite.position.copy(pos);
    group.add(sprite);

    pinMeshes.push({ pin, sprite, pos, def: { ...o, size }, index: i });
  });

  const makeArc = (vA: unknown, vB: unknown, segments = 48) => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const p = new THREE.Vector3().lerpVectors(vA, vB, t).normalize();
      const lift = Math.sin(t * Math.PI) * 0.55;
      p.multiplyScalar(GLOBE_R + lift);
      points.push(p);
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  };

  const arcPairs = [
    [0, 1],
    [0, 2],
    [1, 2],
  ];
  arcPairs.forEach(([a, b]) => {
    if (!pinMeshes[a] || !pinMeshes[b]) return;
    const geo = makeArc(
      pinMeshes[a].pos.clone().normalize().multiplyScalar(GLOBE_R),
      pinMeshes[b].pos.clone().normalize().multiplyScalar(GLOBE_R)
    );
    disposables.push(geo);
    const mat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.4 });
    disposables.push(mat);
    group.add(new THREE.Line(geo, mat));
  });

  scene.add(new THREE.AmbientLight(0x4a5380, 1.3));
  const key = new THREE.PointLight(GOLD_LIGHT, 1.6, 25);
  key.position.set(4, 3, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0x4c5fe8, 1.1, 25);
  rim.position.set(-5, -2, -5);
  scene.add(rim);

  let targetRotY = 0.5;
  let curRotY = 0.5;
  let targetRotX = -0.15;
  let curRotX = -0.15;
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  let autoSpin = true;

  const focusOffice = (idx: number) => {
    const o = offices[idx];
    if (!o) return;
    const theta = ((o.lng + 180) * Math.PI) / 180;
    targetRotY = -theta + Math.PI / 2;
    targetRotX = -(o.lat * Math.PI) / 180 * 0.5;
    autoSpin = false;
  };

  focusRef.current = focusOffice;
  focusOffice(0);

  const onPointerDown = (e: PointerEvent) => {
    isDragging = true;
    autoSpin = false;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent) => {
    isDragging = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    targetRotY += dx * 0.005;
    targetRotX += dy * 0.005;
    targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX));
    lastX = e.clientX;
    lastY = e.clientY;
  };

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointerleave", onPointerUp);
  canvas.addEventListener("pointermove", onPointerMove);
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let frameId = 0;

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (autoSpin) targetRotY += 0.0022;

    curRotY += (targetRotY - curRotY) * 0.06;
    curRotX += (targetRotX - curRotX) * 0.06;
    group.rotation.y = curRotY;
    group.rotation.x = curRotX;

    pinMeshes.forEach(({ pin, sprite, def }) => {
      const pulse = 1 + Math.sin(t * 1.8 + pin.position.x) * (def.primary ? 0.18 : 0.12);
      pin.scale.setScalar(pulse);
      sprite.material.opacity = 0.5 + Math.sin(t * 1.8 + pin.position.x) * 0.15;
    });

    glow.rotation.y = t * 0.02;
    renderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(frameId);
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointerleave", onPointerUp);
    canvas.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", resize);
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
  };
}

export default function GlobeCanvas({ offices, activeIndex, className = "" }: GlobeCanvasProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef<(idx: number) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = stageRef.current;
    if (!canvas || !container) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    loadThree()
      .then((THREE) => {
        if (cancelled) return;
        cleanup = initGlobe(THREE, canvas, container, offices, getLandPoints(), focusRef);
        focusRef.current(activeIndex);
      })
      .catch((err) => {
        console.error("Failed to load globe visual:", err);
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
    // offices are stable from site-data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    focusRef.current(activeIndex);
  }, [activeIndex]);

  return (
    <div
      ref={stageRef}
      className={`relative h-[320px] w-full sm:h-[380px] lg:h-[460px] ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing"
        aria-hidden
      />
    </div>
  );
}
