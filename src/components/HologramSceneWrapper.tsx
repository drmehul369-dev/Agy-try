"use client";

import dynamic from "next/dynamic";

const HologramScene = dynamic(() => import("./HologramScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent z-0">
      {/* Premium subtle pulsing loading indicator */}
      <div className="w-16 h-16 rounded-full border border-[#4F8CFF]/30 border-t-[#4F8CFF] animate-spin" />
    </div>
  ),
});

export default function HologramSceneWrapper() {
  return <HologramScene />;
}
