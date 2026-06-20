"use client";

import AmbientNetworkCanvas from "@/components/ui/AmbientNetworkCanvas";

/** Fixed ambient layers — gradient + living network field across the whole page. */
export default function PageBackdrop() {
  return (
    <div className="page-backdrop" aria-hidden>
      <AmbientNetworkCanvas />
      <div className="page-backdrop__glow page-backdrop__glow--top" />
      <div className="page-backdrop__glow page-backdrop__glow--mid" />
      <div className="page-backdrop__glow page-backdrop__glow--bottom" />
    </div>
  );
}
