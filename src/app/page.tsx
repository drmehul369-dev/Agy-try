"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, Video, Layers, Zap, Award, TrendingUp, Bookmark, 
  Calendar, ListTodo, UserCheck, Volume2, Cpu, ChevronRight, 
  Play, MessageSquare, ArrowRight, ShieldAlert, CheckCircle 
} from "lucide-react";

import Header from "../components/Header";
import CustomCursor from "../components/CustomCursor";
import SmoothScroll from "../components/SmoothScroll";
import HologramSceneWrapper from "../components/HologramSceneWrapper";
import KnowledgeUniverse from "../components/KnowledgeUniverse";
import Laptop3D from "../components/Laptop3D";
import { 
  QBankSimulator, 
  AITutorSimulator, 
  CommandCenterSimulator, 
  VivaSimulator 
} from "../components/DashboardMockups";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Bento layout feature data
  const bentoFeatures = [
    { 
      title: "AI Clinical Tutor", 
      desc: "Instant answers to complex pathology and diagnosis flows.", 
      icon: Cpu, 
      size: "col-span-1 md:col-span-2", 
      color: "from-blue-500/20 to-indigo-500/20 text-[#4F8CFF]" 
    },
    { 
      title: "AI Viva Board", 
      desc: "Simulate oral examinations with voice-recognition reasoning feedback.", 
      icon: Volume2, 
      size: "col-span-1", 
      color: "from-[#00E5A8]/20 to-emerald-500/20 text-[#00E5A8]" 
    },
    { 
      title: "25k+ MCQ Bank", 
      desc: "Expert-curated medical questions with active clinical integration.", 
      icon: BookOpen, 
      size: "col-span-1", 
      color: "from-purple-500/20 to-pink-500/20 text-purple-400" 
    },
    { 
      title: "Cinematic Video Library", 
      desc: "3D surgical walkthroughs, cardiology diagrams, and anatomy animations.", 
      icon: Video, 
      size: "col-span-1 md:col-span-2", 
      color: "from-amber-500/20 to-orange-500/20 text-amber-400" 
    },
    { 
      title: "High-Yield Notes", 
      desc: "Compressed clinical bullet points and disease pathways.", 
      icon: Layers, 
      size: "col-span-1", 
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400" 
    },
    { 
      title: "Active Recall Flashcards", 
      desc: "Spaced-repetition card decks covering all 19 subjects.", 
      icon: Zap, 
      size: "col-span-1", 
      color: "from-red-500/20 to-rose-500/20 text-red-400" 
    },
    { 
      title: "National PYQ Archive", 
      desc: "10+ years of previous year papers with interactive concept tagging.", 
      icon: Bookmark, 
      size: "col-span-1", 
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400" 
    },
    { 
      title: "AIR Rank Predictor", 
      desc: "Track percentiles, predictive score ranges, and national mock rank standings.", 
      icon: Award, 
      size: "col-span-1 md:col-span-2", 
      color: "from-indigo-500/20 to-purple-500/20 text-indigo-400" 
    },
    { 
      title: "Interactive Analytics", 
      desc: "In-depth graphs pinpointing weak segments and strong modules.", 
      icon: TrendingUp, 
      size: "col-span-1", 
      color: "from-sky-500/20 to-blue-500/20 text-sky-400" 
    },
    { 
      title: "Smart Bookmarks", 
      desc: "Save custom concepts and flag high-risk questions for quick access.", 
      icon: Bookmark, 
      size: "col-span-1", 
      color: "from-violet-500/20 to-fuchsia-500/20 text-violet-400" 
    },
    { 
      title: "Revision Planner", 
      desc: "Intelligent scheduling cycles ensuring long-term retention maps.", 
      icon: ListTodo, 
      size: "col-span-1", 
      color: "from-teal-500/20 to-green-500/20 text-teal-400" 
    },
    { 
      title: "Study Scheduler", 
      desc: "Personalized study calendars syncing directly with clinical rotations.", 
      icon: Calendar, 
      size: "col-span-1", 
      color: "from-pink-500/20 to-rose-500/20 text-pink-400" 
    }
  ];

  const successStories = [
    { name: "Dr. Rohan Verma", rank: "AIR 8 (NEET PG)", score: "712/800", college: "AIIMS New Delhi", improve: "+182 Ranks in 3 Months" },
    { name: "Dr. Ananya Rao", rank: "AIR 14 (INI-CET)", score: "99.85 Percentile", college: "PGI Chandigarh", improve: "2x Recall Speed" },
    { name: "Dr. Aditi Sharma", rank: "AIR 23 (NEET PG)", score: "695/800", college: "MAMC Delhi", improve: "100% Viva Score" },
    { name: "Dr. Siddharth Sen", rank: "AIR 41 (INI-CET)", score: "99.4 Percentile", college: "JIPMER Puducherry", improve: "Q-Bank Mastery" },
    { name: "Dr. Meera Nair", rank: "AIR 56 (NEET PG)", score: "680/800", college: "KGMU Lucknow", improve: "+92% Test Accuracy" },
  ];

  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* ==========================================
          SECTION 1: HERO EXPERIENCE
      ========================================== */}
      <section className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden flex flex-col justify-center pt-24 pb-12">
        {/* Hologram scene background */}
        <HologramSceneWrapper />

        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-35 z-0" />

        {/* Center Contents */}
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00E5A8] text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Cpu size={14} />
              <span>Next-Gen Medical Prep</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-heading"
            >
              CRACK NEET PG & INI-CET WITH <span className="bg-gradient-to-r from-[#4F8CFF] to-[#00E5A8] bg-clip-text text-transparent">AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-white/60 text-sm sm:text-lg leading-relaxed"
            >
              25,000+ MCQs, Video Lectures, AI Viva Simulator, Mock Tests and Personalized Learning. The visual precision of a surgeon meets clinical-grade intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  const target = document.getElementById("cta");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-gradient-to-r from-[#4F8CFF] to-[#00E5A8] text-[#0A0A0A] font-extrabold text-sm uppercase tracking-widest rounded-full hover:scale-102 hover:shadow-lg hover:shadow-[#4F8CFF]/20 transition-all cursor-pointer text-center"
              >
                Start Learning Free
              </button>
              <button
                onClick={() => {
                  const target = document.getElementById("qbank");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 border border-white/10 hover:border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-full transition-all cursor-pointer text-center hover:bg-white/5"
              >
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Floating UI Cards */}
          <div className="lg:col-span-5 relative w-full h-[400px] flex items-center justify-center lg:block">
            {/* Card 1: NEET Rank Predictor */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: 0, scale: 1.05 }}
              className="absolute top-4 right-10 w-64 glass-card p-4 rounded-xl border border-white/10 shadow-2xl z-20 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-[#00E5A8] font-bold uppercase tracking-wider">AIR Predictor</span>
                <Award size={14} className="text-[#00E5A8]" />
              </div>
              <div className="text-2xl font-black text-white font-mono tracking-tight">AIR #12</div>
              <div className="text-[10px] text-white/50 mt-1">99.93 Percentile (INI-CET Target)</div>
            </motion.div>

            {/* Card 2: AI Tutor Notification */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              animate={{ opacity: 1, x: 0, y: 160 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: 140, scale: 1.05 }}
              className="absolute top-4 left-4 w-60 glass-card p-4 rounded-xl border border-[#4F8CFF]/30 shadow-2xl z-30 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#4F8CFF] animate-pulse" />
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">AI Tutor Active</span>
              </div>
              <p className="text-xs text-white/80 font-medium">Explain pathophysiology of minimal change disease.</p>
              <div className="text-[9px] text-[#4F8CFF] font-semibold mt-2 flex items-center gap-1">
                <span>View Solution</span>
                <ChevronRight size={10} />
              </div>
            </motion.div>

            {/* Card 3: MCQ Score */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 280, x: 60 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ y: 260, scale: 1.05 }}
              className="absolute top-4 left-4 w-56 glass-card p-4 rounded-xl border border-white/10 shadow-2xl z-10 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Mock Score</span>
                <TrendingUp size={14} className="text-[#4F8CFF]" />
              </div>
              <div className="text-xl font-bold text-white font-mono">188 / 200 Correct</div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
                <div className="bg-[#4F8CFF] h-full w-[94%]" />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 2: FLOATING KNOWLEDGE UNIVERSE
      ========================================== */}
      <KnowledgeUniverse />

      {/* ==========================================
          SECTION 3: QUESTION BANK EXPERIENCE
      ========================================== */}
      <section id="qbank" className="relative w-full py-24 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="text-[#4F8CFF] text-xs font-bold uppercase tracking-widest">
              Advanced Practice Q-Bank
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Active Recall & Clinical MCQs
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Explore 25,000+ clinical-vignette questions with immediate AI assessments. Filter by subject, flag topics, and reveal real-time explanation pathways on every single option.
            </p>
            <ul className="space-y-3 text-xs md:text-sm font-semibold text-white/70">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#00E5A8]" />
                <span>Subject-wise and Unit-wise filtering</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#00E5A8]" />
                <span>Previous Year Questions (PYQs) marked automatically</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#00E5A8]" />
                <span>Custom lists & review logs</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <QBankSimulator />
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 4: VIDEO LEARNING EXPERIENCE
      ========================================== */}
      <section id="lectures" className="relative w-full bg-[#0A0A0A] overflow-hidden">
        <Laptop3D />
      </section>

      {/* ==========================================
          SECTION 5: AI MEDICAL TUTOR
      ========================================== */}
      <section id="tutor" className="relative w-full py-24 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <AITutorSimulator />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="text-[#00E5A8] text-xs font-bold uppercase tracking-widest">
              Futuristic AI Assistant
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Personalized Medical Mentoring
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Get clinical breakdowns, differential diagnoses, or simplified anatomical concepts instantly. Synapse AI understands medical terminology, lab values, and symptom progressions.
            </p>
            <div className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-start gap-3">
              <ShieldAlert className="text-yellow-500 flex-shrink-0" size={18} />
              <p className="text-[10px] text-white/50 leading-normal">
                Expert knowledge mapping compiled with direct oversight from top medical faculty, fully aligned with standard textbooks like Robbins, Harrison, and Bailey & Love.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 6: MOCK TEST COMMAND CENTER
      ========================================== */}
      <section className="relative w-full py-24 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="text-[#4F8CFF] text-xs font-bold uppercase tracking-widest">
              Analytics Engine
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Command Center Performance Map
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Understand your rank path. The dashboard maps your weak subjects, strong concepts, and projects your National All India Rank (AIR) in real time after every mock exam.
            </p>
          </div>

          <div className="lg:col-span-7">
            <CommandCenterSimulator />
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 7: AI VIVA SIMULATOR
      ========================================== */}
      <section id="viva" className="relative w-full py-24 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <VivaSimulator />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="text-red-400 text-xs font-bold uppercase tracking-widest">
              Viva Examiner Board
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Immersive Oral Cases
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Step into a virtual medical board room. Solve decision trees, present cases verbally or via multi-choice clinical choices, and receive immediate feedback on diagnosis accuracy.
            </p>
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 8: SUCCESS STORIES (INFINITE SCROLL)
      ========================================== */}
      <section className="relative w-full py-24 bg-[#0A0A0A] overflow-hidden border-t border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center px-6 mb-16">
          <div className="text-[#00E5A8] text-xs font-bold uppercase tracking-widest mb-3">
            Elite Ranks
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-heading">
            Synapse Success Stories
          </h2>
        </div>

        {/* Infinite scrolling marquee */}
        <div className="w-full flex overflow-hidden select-none relative">
          {/* Gradient shades overlay on left/right for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

          {/* Marquee track */}
          <div className="flex gap-6 py-4 animate-infinite-marquee whitespace-nowrap min-w-full">
            {/* Set 1 */}
            {successStories.map((story, i) => (
              <div key={`s1-${i}`} className="inline-block w-80 glass-card p-6 rounded-xl border border-white/5 text-left shrink-0">
                <div className="text-xs font-bold text-[#00E5A8] uppercase tracking-wider mb-1">{story.rank}</div>
                <div className="text-base font-extrabold text-white">{story.name}</div>
                <div className="text-xs text-white/50 mt-1">{story.college}</div>
                <div className="text-[10px] font-semibold text-[#4F8CFF] mt-4 flex items-center gap-1 bg-[#4F8CFF]/10 px-2 py-1 rounded w-fit">
                  <TrendingUp size={10} />
                  <span>{story.improve}</span>
                </div>
              </div>
            ))}
            {/* Set 2 (for infinite loop) */}
            {successStories.map((story, i) => (
              <div key={`s2-${i}`} className="inline-block w-80 glass-card p-6 rounded-xl border border-white/5 text-left shrink-0">
                <div className="text-xs font-bold text-[#00E5A8] uppercase tracking-wider mb-1">{story.rank}</div>
                <div className="text-base font-extrabold text-white">{story.name}</div>
                <div className="text-xs text-white/50 mt-1">{story.college}</div>
                <div className="text-[10px] font-semibold text-[#4F8CFF] mt-4 flex items-center gap-1 bg-[#4F8CFF]/10 px-2 py-1 rounded w-fit">
                  <TrendingUp size={10} />
                  <span>{story.improve}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 9: FEATURE GRID (BENTO)
      ========================================== */}
      <section id="features" className="relative w-full py-24 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[#4F8CFF] text-xs font-bold uppercase tracking-widest mb-3">
              Full Suite Ecosystem
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent font-heading">
              A Complete Medical Workspace
            </h2>
            <p className="mt-4 text-white/50 text-sm md:text-base leading-relaxed">
              Every specialized tool and resource a high-achieving medical student needs to dominate national entrance assessments.
            </p>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl p-6 md:p-8 border border-white/5 hover:border-white/15 flex flex-col justify-between group transition-all relative overflow-hidden ${feat.size}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/[0.02] pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feat.color} border border-white/5`}>
                      <Icon size={20} />
                    </div>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="space-y-2 mt-auto">
                    <h3 className="text-base md:text-lg font-bold text-white tracking-tight">{feat.title}</h3>
                    <p className="text-xs md:text-sm text-white/50 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 10: FINAL CTA
      ========================================== */}
      <section id="cta" className="relative w-full py-32 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
        {/* Glowing Network Nodes background */}
        <div className="absolute inset-0 radial-glow-accent opacity-45 pointer-events-none" />
        <div className="absolute inset-0 radial-glow-green opacity-25 pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10 space-y-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4F8CFF] to-[#00E5A8] p-[1px] mx-auto shadow-2xl"
          >
            <div className="w-full h-full bg-[#0A0A0A] rounded-full flex items-center justify-center text-white">
              <Cpu size={24} className="text-[#00E5A8] animate-pulse" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white font-heading">
            Your PG Seat Starts Here.
          </h2>
          <p className="text-white/60 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            Gain immediate access to premium mock boards, active recall Q-Banks, and clinical-grade medical AI tutorials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-white/90 text-[#0A0A0A] font-extrabold text-sm uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-lg hover:shadow-white/10 flex items-center justify-center gap-2">
              <span>Start Free Trial</span>
              <ArrowRight size={14} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center justify-center hover:bg-white/5">
              Join Top Rankers
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#0A0A0A] border-t border-white/5 px-6 md:px-12 text-center text-white/30 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-[#00E5A8]" />
            <span className="text-white font-bold tracking-tight">SYNAPSE<span className="text-[#4F8CFF]">.AI</span></span>
          </div>
          <p className="md:order-first">© 2026 Synapse Medical Education Platforms Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </SmoothScroll>
  );
}
