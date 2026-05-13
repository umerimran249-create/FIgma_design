import type { DetailedHTMLProps, HTMLAttributes } from "react";

type SplineViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  url?: string;
  "events-target"?: string;
  "loading-anim-type"?: string;
  "background-color"?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": SplineViewerAttributes;
    }
  }
}

export {};
