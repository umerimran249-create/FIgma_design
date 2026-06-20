declare global {
  interface Window {
    THREE?: ThreeNamespace;
  }
}

// Loaded at runtime from CDN — matches the original hero snippet (r128).
export type ThreeNamespace = Record<string, unknown>;

let loadPromise: Promise<ThreeNamespace> | null = null;

export function loadThree(): Promise<ThreeNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Three.js cannot load during SSR"));
  }

  if (window.THREE) {
    return Promise.resolve(window.THREE);
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById("three-cdn");
    if (existing) {
      existing.addEventListener("load", () => {
        if (window.THREE) resolve(window.THREE);
        else reject(new Error("Three.js failed to initialize"));
      });
      existing.addEventListener("error", () => reject(new Error("Three.js failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.id = "three-cdn";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    script.onload = () => {
      if (window.THREE) resolve(window.THREE);
      else reject(new Error("Three.js failed to initialize"));
    };
    script.onerror = () => reject(new Error("Three.js failed to load"));
    document.body.appendChild(script);
  });

  return loadPromise;
}
