"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Layers, Activity, ShieldAlert } from "lucide-react";

export default function Laptop3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animate rotation, zoom and folding of the laptop based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [60, 20, 10, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.95]);
  const lidRotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [-90, -110, -95, -90]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-20"
      style={{ perspective: 1200 }}
    >
      <div className="text-center mb-16 max-w-2xl z-10 px-4">
        <div className="text-[#00E5A8] text-xs font-bold uppercase tracking-widest mb-3">
          Interactive Video Experience
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent font-heading">
          Cinematic Surgical & Anatomy Lectures
        </h2>
        <p className="mt-4 text-white/60 text-sm md:text-base leading-relaxed">
          High-definition virtual lectures, 3D anatomical walkthroughs, and live-recorded clinical operations from global experts.
        </p>
      </div>

      {/* Main 3D Scene Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[650px] aspect-[16/10] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Shadow under the laptop */}
        <div className="absolute -bottom-10 left-[10%] right-[10%] h-8 bg-black/80 blur-2xl rounded-full transform scale-x-95 z-0" />

        {/* Floating Lesson Cards beside the laptop */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute -left-12 top-10 w-44 p-3 glass-card rounded-xl border border-white/10 shadow-2xl hidden md:block z-20"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded bg-[#00E5A8]/10 text-[#00E5A8]">
              <Layers size={14} />
            </div>
            <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">
              Anatomy Module
            </div>
          </div>
          <div className="text-xs font-bold text-white mb-1">
            Section 1.4: Cranial Nerves
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
            <div className="bg-[#00E5A8] h-full w-[78%]" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute -right-16 bottom-16 w-48 p-3 glass-card rounded-xl border border-white/10 shadow-2xl hidden md:block z-20"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded bg-[#4F8CFF]/10 text-[#4F8CFF]">
              <Activity size={14} />
            </div>
            <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">
              Surgical Case
            </div>
          </div>
          <div className="text-xs font-bold text-white mb-1">
            Mitral Valve Repair
          </div>
          <div className="text-[10px] text-[#00E5A8] font-medium">
            Live Case Walkthrough
          </div>
        </motion.div>

        {/* LAPTOP SCREEN (LID) */}
        <motion.div
          style={{
            rotateX: lidRotateX,
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
          className="absolute bottom-0 w-full h-[95%] bg-[#0f0f0f] border-2 border-white/10 rounded-t-2xl shadow-inner z-10"
        >
          {/* Outer lid cover reflection / grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-2xl" />

          {/* Screen Content Panel */}
          <div className="absolute inset-1 bg-black rounded-t-[14px] overflow-hidden border border-white/5 flex flex-col justify-between">
            {/* Header bar of the simulated app */}
            <div className="w-full h-7 bg-[#121212]/80 border-b border-white/5 flex items-center justify-between px-3 text-[10px] text-white/50">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
              </div>
              <div className="font-semibold text-white/80 bg-white/5 px-2 py-0.5 rounded">
                Live Surgery Case 402
              </div>
              <div className="w-8" />
            </div>

            {/* Video Canvas Simulation */}
            <div className="relative flex-1 bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
              {/* Medical grid background */}
              <div className="absolute inset-0 dot-grid opacity-30" />

              {/* Pulsing circular surgical display simulation */}
              <div className="relative w-44 h-44 rounded-full border border-white/10 flex items-center justify-center">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#00E5A8]/30 animate-spin" style={{ animationDuration: "12s" }} />
                <div className="absolute inset-6 rounded-full border border-dashed border-[#4F8CFF]/30 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
                <div className="w-28 h-28 rounded-full bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center gap-1 text-center shadow-lg relative">
                  <Play size={20} className="text-[#00E5A8] filter drop-shadow-[0_0_8px_rgba(0,229,168,0.5)] animate-pulse" />
                  <span className="text-[8px] text-white/40 tracking-wider">AORTIC STENOSIS</span>
                  <span className="text-[10px] text-white font-mono font-bold tracking-tight">120 bpm</span>
                </div>
              </div>

              {/* Simulated patient vitals panel overlays */}
              <div className="absolute top-3 right-3 flex flex-col gap-1 text-[8px] text-right font-mono">
                <div className="text-white/60">SYS: <span className="text-[#00E5A8] font-bold">118</span></div>
                <div className="text-white/60">DIA: <span className="text-[#00E5A8] font-bold">75</span></div>
                <div className="text-white/60">SPO2: <span className="text-[#4F8CFF] font-bold">99%</span></div>
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#121212]/80 border border-white/10 rounded px-2 py-1">
                <ShieldAlert size={10} className="text-yellow-500" />
                <span className="text-[8px] font-mono text-white/80">RISK FACTOR: MODERATE</span>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="w-full h-8 bg-[#121212]/80 border-t border-white/5 flex items-center justify-between px-3 text-[10px]">
              <div className="flex items-center gap-3 text-[#00E5A8]">
                <Play size={10} fill="#00E5A8" />
                <span className="text-[9px] text-white font-mono">03:45 / 15:20</span>
              </div>
              <div className="flex-1 max-w-[200px] bg-white/10 h-1 rounded-full mx-4 overflow-hidden relative">
                <div className="bg-[#00E5A8] h-full w-[24%]" />
              </div>
              <span className="text-[8px] text-white/40 font-mono">1080p HD</span>
            </div>
          </div>
        </motion.div>

        {/* LAPTOP BASE */}
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(90deg) translateZ(-15px)",
            transformOrigin: "bottom center",
          }}
          className="absolute bottom-0 w-full h-[95%] bg-[#1a1a1a] border-t-2 border-white/20 rounded-b-2xl shadow-2xl flex flex-col justify-end p-2 border-b-4 border-black"
        >
          {/* Keypad indent simulation */}
          <div className="w-[85%] h-[60%] bg-[#0d0d0d] rounded-lg mx-auto mb-2 border border-white/5 p-1 flex flex-col justify-between">
            {/* Grid of keys representation */}
            <div className="w-full flex-1 flex flex-col gap-0.5 opacity-40">
              <div className="flex gap-0.5 h-1.5"><div className="flex-1 bg-white/10 rounded-sm" /><div className="flex-1 bg-white/10 rounded-sm" /><div className="flex-1 bg-white/10 rounded-sm" /><div className="flex-1 bg-white/10 rounded-sm" /></div>
              <div className="flex gap-0.5 h-1.5"><div className="flex-[2] bg-white/10 rounded-sm" /><div className="flex-1 bg-white/10 rounded-sm" /><div className="flex-1 bg-white/10 rounded-sm" /><div className="flex-[2] bg-white/10 rounded-sm" /></div>
              <div className="flex gap-0.5 h-1.5"><div className="flex-[3] bg-white/10 rounded-sm" /><div className="flex-[4] bg-white/10 rounded-sm" /><div className="flex-[2] bg-white/10 rounded-sm" /></div>
            </div>
            {/* Trackpad */}
            <div className="w-[30%] h-[35%] bg-white/5 rounded-md mx-auto border border-white/5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
