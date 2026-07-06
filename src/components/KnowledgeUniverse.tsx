"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Brain, Image, Heart, AlertCircle, FileText } from "lucide-react";

export default function KnowledgeUniverse() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Generate 24 floating elements with varied starting positions and parallax speeds
  const floatingAssets = [
    { type: "subject", text: "Biochemistry", icon: Brain, x: "12%", y: "15%", zSpeed: 2.2, color: "text-[#4F8CFF]" },
    { type: "note", text: "Reed-Sternberg Cells", desc: "Hodgkin Lymphoma Marker", icon: FileText, x: "78%", y: "10%", zSpeed: 1.8, color: "text-[#00E5A8]" },
    { type: "ecg", text: "Mobitz Type II Block", icon: Activity, x: "50%", y: "25%", zSpeed: 2.5, color: "text-red-400" },
    { type: "subject", text: "Microbiology", icon: Brain, x: "85%", y: "30%", zSpeed: 1.5, color: "text-purple-400" },
    { type: "note", text: "Aschoff Bodies", desc: "Rheumatic Heart Disease", icon: Heart, x: "10%", y: "45%", zSpeed: 2.0, color: "text-pink-400" },
    { type: "subject", text: "Pharmacology", icon: Brain, x: "65%", y: "50%", zSpeed: 2.4, color: "text-yellow-400" },
    { type: "image", text: "Histology Slide #4", desc: "Glomerulus capsule", icon: Image, x: "32%", y: "38%", zSpeed: 1.7, color: "text-emerald-400" },
    { type: "case", text: "52M, Sudden Chest Pain", desc: "ST-Elevation in II, III, aVF", icon: AlertCircle, x: "88%", y: "55%", zSpeed: 2.6, color: "text-orange-400" },
    { type: "subject", text: "Pathology", icon: Brain, x: "42%", y: "65%", zSpeed: 2.1, color: "text-indigo-400" },
    { type: "note", text: "Koplik Spots", desc: "Pathognomonic for Measles", icon: FileText, x: "15%", y: "70%", zSpeed: 1.9, color: "text-sky-400" },
    { type: "subject", text: "Pediatrics", icon: Brain, x: "75%", y: "75%", zSpeed: 2.3, color: "text-amber-400" },
    { type: "ecg", text: "Ventricular Fibrillation", icon: Activity, x: "48%", y: "82%", zSpeed: 2.8, color: "text-red-500" },
    { type: "image", text: "CT Chest Scan", desc: "Ground-glass opacities", icon: Image, x: "25%", y: "20%", zSpeed: 1.6, color: "text-teal-400" },
    { type: "case", text: "12F, Facial Edema", desc: "Post-streptococcal glomerulonephritis", icon: AlertCircle, x: "62%", y: "18%", zSpeed: 2.0, color: "text-rose-400" },
    { type: "subject", text: "Neurology", icon: Brain, x: "80%", y: "88%", zSpeed: 2.2, color: "text-[#4F8CFF]" },
    { type: "note", text: "Negri Bodies", desc: "Rabies diagnosis hallmark", icon: FileText, x: "8%", y: "90%", zSpeed: 1.8, color: "text-green-400" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[140vh] bg-[#0A0A0A] overflow-hidden flex flex-col justify-start py-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4F8CFF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00E5A8]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header section */}
      <div className="sticky top-28 z-10 w-full text-center max-w-3xl mx-auto px-4 pointer-events-none">
        <div className="text-[#4F8CFF] text-xs font-bold uppercase tracking-widest mb-3">
          Knowledge Universe
        </div>
        <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent font-heading">
          Explore the Clinical Asset Cloud
        </h2>
        <p className="mt-4 text-white/50 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
          Scroll down to fly through thousands of clinical cards, pathology notes, slides, and exam cases mapped in 3D.
        </p>
      </div>

      {/* 3D Asset Canvas */}
      <div className="relative flex-1 w-full min-h-[90vh] mt-12 select-none pointer-events-none">
        {floatingAssets.map((asset, index) => {
          // Compute vertical translation and scaling values based on scroll progression and custom speeds
          // As we scroll, assets should move up/out and scale up, fading in then out
          const yRange = [0, 0.4, 0.7, 1];
          const yTranslate = [
            `calc(${asset.y} + 200px)`,
            `calc(${asset.y} + 50px)`,
            `calc(${asset.y} - 250px)`,
            `calc(${asset.y} - 600px)`
          ];
          const scaleRange = [0.4, 0.8, 1.2, 2.0];
          const opacityRange = [0, 0.8, 0.9, 0];

          // Use Framer Motion hook to convert scroll values to coordinate transforms
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const yVal = useTransform(scrollYProgress, yRange, yTranslate);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scaleVal = useTransform(scrollYProgress, yRange, scaleRange);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacityVal = useTransform(scrollYProgress, yRange, opacityRange);

          const Icon = asset.icon;

          return (
            <motion.div
              key={index}
              style={{
                left: asset.x,
                top: yVal,
                scale: scaleVal,
                opacity: opacityVal,
                transformOrigin: "center center",
              }}
              className="absolute z-10 p-3.5 md:p-5 rounded-2xl glass-card border border-white/10 shadow-2xl flex items-start gap-3 w-56 backdrop-blur-md pointer-events-auto cursor-pointer"
            >
              <div className={`p-2 rounded-lg bg-white/5 ${asset.color} border border-white/5`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                  {asset.type}
                </div>
                <div className="text-xs md:text-sm font-bold text-white mt-0.5 truncate">
                  {asset.text}
                </div>
                {asset.desc && (
                  <div className="text-[9px] text-white/50 mt-1 line-clamp-2 leading-relaxed">
                    {asset.desc}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
