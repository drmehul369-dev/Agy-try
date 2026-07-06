"use client";

import { motion } from "framer-motion";
import { Cpu, ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-[#0A0A0A]/40 backdrop-blur-md flex items-center justify-between px-6 md:px-12"
    >
      {/* Brand logo */}
      <a href="#" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4F8CFF] to-[#00E5A8] p-[1px] shadow-lg">
          <div className="w-full h-full bg-[#0A0A0A] rounded-[11px] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Cpu size={16} className="text-[#00E5A8]" />
          </div>
        </div>
        <span className="text-white font-extrabold tracking-tight text-lg font-heading">
          SYNAPSE<span className="text-[#4F8CFF]">.AI</span>
        </span>
      </a>

      {/* Nav items */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-white/60">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#qbank" className="hover:text-white transition-colors">Q-Bank</a>
        <a href="#lectures" className="hover:text-white transition-colors">Lectures</a>
        <a href="#tutor" className="hover:text-white transition-colors">AI Tutor</a>
        <a href="#viva" className="hover:text-white transition-colors">AI Viva</a>
      </nav>

      {/* Action button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            const target = document.getElementById("qbank");
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
        >
          Watch Demo
        </button>
        <button
          onClick={() => {
            const target = document.getElementById("cta");
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0A0A0A] bg-white hover:bg-white/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-white/10"
        >
          <span>Start Learning</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.header>
  );
}
