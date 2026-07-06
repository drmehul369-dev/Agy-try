"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Check, Filter, Search, Bookmark, ChevronRight, Send, Mic, Play, RefreshCw, Cpu, Award, Target, TrendingUp, BarChart2 } from "lucide-react";

// ==========================================
// SECTION 3: QUESTION BANK SIMULATOR
// ==========================================
export function QBankSimulator() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const subjects = ["All", "Anatomy", "Pathology", "Cardiology", "Neurology", "Pediatrics"];
  
  const mockMCQs = [
    {
      id: 1,
      subject: "Anatomy",
      difficulty: "Hard",
      question: "A 45-year-old male presents with weakness in dorsiflexion and eversion of the left foot. Which nerve is most likely damaged?",
      options: ["A. Common peroneal nerve", "B. Tibial nerve", "C. Deep peroneal nerve", "D. Superficial peroneal nerve"],
      correct: 0,
      pyq: true,
      explanation: "The common peroneal nerve winds around the neck of the fibula. Damage leads to foot drop due to paralysis of muscles in the anterior and lateral compartments.",
    },
    {
      id: 2,
      subject: "Pathology",
      difficulty: "Medium",
      question: "Which of the following is the hallmark histopathological feature of Aschoff bodies in Rheumatic Heart Disease?",
      options: ["A. Langhans giant cells", "B. Anitschkow cells", "C. Reed-Sternberg cells", "D. Touton giant cells"],
      correct: 1,
      pyq: true,
      explanation: "Anitschkow cells (caterpillar cells) are specialized macrophages found in Aschoff nodules, characteristic of rheumatic carditis.",
    },
    {
      id: 3,
      subject: "Cardiology",
      difficulty: "Hard",
      question: "A patient presents with a mid-diastolic murmur with an opening snap. Which valvular lesion is most likely?",
      options: ["A. Mitral regurgitation", "B. Mitral stenosis", "C. Aortic regurgitation", "D. Aortic stenosis"],
      correct: 1,
      pyq: false,
      explanation: "A mid-diastolic murmur with an opening snap is the classic presentation of mitral valve stenosis.",
    },
    {
      id: 4,
      subject: "Neurology",
      difficulty: "Medium",
      question: "Argyll Robertson pupil is characterized by which of the following clinical findings?",
      options: ["A. Accommodation reflex lost, light reflex present", "B. Light reflex lost, accommodation reflex present", "C. Both reflexes lost", "D. Both reflexes present"],
      correct: 1,
      pyq: true,
      explanation: "Argyll Robertson pupil ('prostitute's pupil') accommodates but does not react to light. Classically seen in neurosyphilis.",
    },
    {
      id: 5,
      subject: "Pediatrics",
      difficulty: "Easy",
      question: "Koplik spots are pathognomonic for which of the following childhood exanthems?",
      options: ["A. Rubella", "B. Measles", "C. Chickenpox", "D. Roseola infantum"],
      correct: 1,
      pyq: false,
      explanation: "Koplik spots (small white spots on buccal mucosa opposite lower molars) are pathognomonic for Measles.",
    }
  ];

  const [expandedMcq, setExpandedMcq] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({ 1: true, 4: true });

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAnswerSelect = (mcqId: number, optionIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAnswers[mcqId] !== undefined) return; // Answered already
    setSelectedAnswers(prev => ({ ...prev, [mcqId]: optionIdx }));
  };

  const filteredMCQs = mockMCQs.filter(mcq => {
    const matchesSubject = selectedSubject === "All" || mcq.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === "All" || mcq.difficulty === selectedDifficulty;
    const matchesSearch = mcq.question.toLowerCase().includes(searchQuery.toLowerCase()) || mcq.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = !bookmarkedOnly || bookmarks[mcq.id];
    return matchesSubject && matchesDifficulty && matchesSearch && matchesBookmark;
  });

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F8CFF]/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Control bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Question Bank Explorer</h3>
          <p className="text-white/40 text-xs mt-1">Simulate interactive mock practice & explanation logs.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search concepts or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#4F8CFF]/50"
            />
          </div>

          {/* Bookmarked Filter */}
          <button
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              bookmarkedOnly 
                ? "bg-[#4F8CFF]/15 border-[#4F8CFF] text-[#4F8CFF]" 
                : "border-white/10 text-white/60 hover:text-white"
            }`}
          >
            <Bookmark size={14} fill={bookmarkedOnly ? "currentColor" : "none"} />
            <span>Saved</span>
          </button>
        </div>
      </div>

      {/* Horizontal Subject list */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        {subjects.map(subj => (
          <button
            key={subj}
            onClick={() => setSelectedSubject(subj)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSubject === subj
                ? "bg-[#4F8CFF] text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* MCQ items */}
      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {filteredMCQs.map(mcq => {
            const isExpanded = expandedMcq === mcq.id;
            const isAnswered = selectedAnswers[mcq.id] !== undefined;
            const isBookmarked = !!bookmarks[mcq.id];

            return (
              <motion.div
                key={mcq.id}
                layout
                onClick={() => setExpandedMcq(isExpanded ? null : mcq.id)}
                className={`glass-card rounded-xl p-5 border border-white/5 hover:border-white/15 cursor-pointer relative overflow-hidden transition-all ${
                  isExpanded ? "bg-white/5 border-[#4F8CFF]/30" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Meta details */}
                <div className="flex items-center justify-between mb-3 text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#4F8CFF]/15 text-[#4F8CFF] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {mcq.subject}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      mcq.difficulty === "Hard" ? "bg-red-500/10 text-red-400" :
                      mcq.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" : "bg-green-500/10 text-green-400"
                    }`}>
                      {mcq.difficulty}
                    </span>
                    {mcq.pyq && (
                      <span className="bg-[#00E5A8]/15 text-[#00E5A8] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        PYQ
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={(e) => toggleBookmark(mcq.id, e)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <Bookmark size={14} fill={isBookmarked ? "#4F8CFF" : "none"} className={isBookmarked ? "text-[#4F8CFF]" : ""} />
                  </button>
                </div>

                {/* Question */}
                <h4 className="text-white text-sm md:text-base font-semibold leading-relaxed mb-4">
                  {mcq.question}
                </h4>

                {/* Options Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden space-y-2 mt-4"
                    >
                      {mcq.options.map((opt, idx) => {
                        const isSelected = selectedAnswers[mcq.id] === idx;
                        const isCorrect = mcq.correct === idx;
                        const showCorrectColor = isAnswered && isCorrect;
                        const showWrongColor = isAnswered && isSelected && !isCorrect;

                        return (
                          <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={(e) => handleAnswerSelect(mcq.id, idx, e)}
                            className={`w-full text-left p-3.5 rounded-lg text-xs md:text-sm font-medium border transition-all flex items-center justify-between ${
                              showCorrectColor
                                ? "bg-green-500/15 border-green-500 text-green-400"
                                : showWrongColor
                                ? "bg-red-500/15 border-red-500 text-red-400"
                                : isSelected
                                ? "bg-[#4F8CFF]/20 border-[#4F8CFF] text-[#4F8CFF]"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            <span>{opt}</span>
                            {showCorrectColor && <Check size={14} className="text-green-400" />}
                          </button>
                        );
                      })}

                      {/* Explanation box */}
                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-4 rounded-lg bg-white/5 border-l-2 border-[#00E5A8] text-xs leading-relaxed text-white/70"
                        >
                          <div className="font-bold text-[#00E5A8] mb-1.5 flex items-center gap-1.5">
                            <Cpu size={12} />
                            <span>AI Explanation Module</span>
                          </div>
                          {mcq.explanation}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Click to expand prompt */}
                {!isExpanded && (
                  <div className="flex items-center justify-end text-[10px] text-white/30 group mt-2 font-medium">
                    <span>Click to reveal options</span>
                    <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform ml-0.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==========================================
// SECTION 5: AI MEDICAL TUTOR
// ==========================================
export function AITutorSimulator() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; time: string; typing?: boolean }>>([
    { sender: "user", text: "Explain Nephrotic Syndrome clinical features and etiology briefly.", time: "13:00" },
    {
      sender: "ai",
      text: "Nephrotic Syndrome is a glomerular disorder characterized by the classic triad:\n\n1. **Massive Proteinuria** (&gt;3.5 g/day or protein-to-creatinine ratio &gt;3.0).\n2. **Hypoalbuminemia** (&lt;3.0 g/dL).\n3. **Generalized Edema** (anasarca, starting in periorbital regions).\n\n**Common Etiologies**:\n* **Minimal Change Disease**: Most common in children (foot process effacement under electron microscopy).\n* **Membranous Nephropathy**: Most common primary etiology in adults (spike and dome appearance).\n* **Focal Segmental Glomerulosclerosis (FSGS)**: Common in adults, poor response to steroids.",
      time: "13:01"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setMessages(prev => [...prev, { sender: "user", text: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputText("");

    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      let aiText = "Based on clinical findings, that is associated with ";
      if (userMsg.toLowerCase().includes("viva") || userMsg.toLowerCase().includes("case")) {
        aiText += "the progression of acute coronary syndrome. Specifically, ST-segment elevation suggests complete transmural ischemia, requiring immediate percutaneous coronary intervention (PCI).";
      } else {
        aiText += "glomerular basement membrane disruption. The loss of negative charge on the podocytes allows passage of albumin into the urine, leading to fluid shifts and systemic edema.";
      }
      setMessages(prev => [...prev, { 
        sender: "ai", 
        text: aiText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 2000);
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[500px] shadow-2xl relative">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4F8CFF]/5 via-transparent to-[#00E5A8]/5 pointer-events-none" />

      {/* Header bar */}
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF] border border-[#4F8CFF]/30">
            <Cpu size={16} />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Synapse AI Tutor</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="text-[10px] text-white/40">Custom Clinical Intelligence Module</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            GPT-Med v4.2
          </span>
        </div>
      </div>

      {/* Messages list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 text-xs md:text-sm leading-relaxed border ${
                msg.sender === "user"
                  ? "bg-[#4F8CFF] text-white border-transparent"
                  : "bg-white/5 text-white/80 border-white/10"
              }`}
            >
              <div className="whitespace-pre-line font-medium">{msg.text}</div>
              <div className={`text-[8px] mt-1.5 text-right ${msg.sender === "user" ? "text-white/70" : "text-white/30"}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4F8CFF] rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <span className="w-1.5 h-1.5 bg-[#00E5A8] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-white/5 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything (e.g. explain cardiac cycle, outline renal histology)..."
          className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#4F8CFF]/50"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-[#4F8CFF] hover:bg-[#4F8CFF]/80 text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}

// ==========================================
// SECTION 6: MOCK TEST COMMAND CENTER
// ==========================================
export function CommandCenterSimulator() {
  const stats = [
    { label: "Overall Percentile", val: "99.2%", icon: Award, color: "text-[#00E5A8]" },
    { label: "AIR Prediction", val: "#42", icon: Target, color: "text-[#4F8CFF]" },
    { label: "Tests Attempted", val: "148/150", icon: TrendingUp, color: "text-purple-400" },
    { label: "Average Accuracy", val: "84.5%", icon: BarChart2, color: "text-yellow-400" },
  ];

  // Subject details
  const subjectPerformance = [
    { name: "Anatomy", score: 88, status: "Strong", color: "bg-[#00E5A8]" },
    { name: "Pathology", score: 85, status: "Strong", color: "bg-[#00E5A8]" },
    { name: "Cardiology", score: 92, status: "Strong", color: "bg-[#00E5A8]" },
    { name: "Neurology", score: 78, status: "Moderate", color: "bg-[#4F8CFF]" },
    { name: "Pediatrics", score: 62, status: "Weak", color: "bg-red-400" },
  ];

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5A8]/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Title */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Target className="text-[#4F8CFF]" size={20} />
            <span>Command Center Analytics</span>
          </h3>
          <p className="text-white/40 text-xs mt-1">Real-time AIR projections and predictive student performance maps.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/60 font-semibold">
          Last Sync: 2 Mins Ago
        </div>
      </div>

      {/* Grid numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card rounded-xl p-4 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{stat.label}</span>
                <Icon size={14} className={stat.color} />
              </div>
              <div className="text-xl md:text-2xl font-extrabold text-white mt-1 font-mono tracking-tight">{stat.val}</div>
            </div>
          );
        })}
      </div>

      {/* Detailed panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Graph Simulation */}
        <div className="glass-card rounded-xl p-5 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-white">Rank Improvement Path</span>
            <span className="text-[9px] text-[#00E5A8] font-bold">+184 Ranks (Last Month)</span>
          </div>

          {/* Simple Vector Graph */}
          <div className="w-full h-36 relative flex items-end">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
            </div>

            {/* Custom SVG Line Chart */}
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              {/* Glow filter */}
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,38 Q 20,28 40,32 T 80,12 T 100,5"
                fill="none"
                stroke="#4F8CFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 0,38 Q 20,28 40,32 T 80,12 T 100,5 L 100,40 L 0,40 Z"
                fill="url(#chartGrad)"
              />
              {/* Pulsing endpoint */}
              <circle cx="100" cy="5" r="2.5" fill="#00E5A8" />
              <circle cx="100" cy="5" r="6" fill="#00E5A8" className="animate-ping origin-center" style={{ transformOrigin: '100px 5px' }} opacity="0.4" />
            </svg>
          </div>

          <div className="flex justify-between items-center mt-3 text-[9px] text-white/30 font-mono">
            <span>WEEK 1</span>
            <span>WEEK 2</span>
            <span>WEEK 3</span>
            <span>TODAY</span>
          </div>
        </div>

        {/* Weak/Strong Subject Matrix */}
        <div className="glass-card rounded-xl p-5 border border-white/5">
          <span className="text-xs font-bold text-white block mb-4">Subject-wise Mastery</span>

          <div className="space-y-3">
            {subjectPerformance.map((subj, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/80 font-medium">{subj.name}</span>
                  <span className={`font-bold ${
                    subj.status === "Strong" ? "text-[#00E5A8]" :
                    subj.status === "Moderate" ? "text-[#4F8CFF]" : "text-red-400"
                  }`}>{subj.score}% ({subj.status})</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${subj.color}`} style={{ width: `${subj.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SECTION 7: AI VIVA SIMULATOR
// ==========================================
export function VivaSimulator() {
  const [activeCaseStep, setActiveCaseStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const clinicalCaseSteps = [
    {
      examinerQuestion: "An examiner presents you with a patient: A 62-year-old heavy smoker presents with sudden chest pain radiating to the left shoulder and neck. EKG shows ST elevation in leads II, III, and aVF. What is your immediate diagnosis and initial action?",
      options: [
        "Acute Inferior Wall MI; order urgent cardiac cath lab activation",
        "Acute Anterior Wall MI; prescribe oral beta-blockers immediately",
        "Stable Angina; advise lifestyle modification and rest"
      ],
      correctAnswer: 0,
      successFeedback: "Correct. ST elevation in II, III, and aVF signifies an inferior wall myocardial infarction, typically involving the Right Coronary Artery. Fast activation of the catheterization lab is key.",
      wrongFeedback: "Incorrect. Leads II, III, and aVF trace the inferior wall of the heart. Beta blockers should not be the first action over revascularization. Review inferior wall EKG leads."
    },
    {
      examinerQuestion: "During cardiac catheterization, you find severe occlusion of the Right Coronary Artery (RCA). Suddenly, the patient's heart rate drops to 38 bpm with a transient loss of consciousness. What complication has occurred and what is your immediate drug treatment?",
      options: [
        "Third-degree AV block due to AV nodal artery occlusion; administer Atropine 1mg IV",
        "Atrial fibrillation due to SA nodal ischemia; administer Amiodarone 150mg IV",
        "Ventricular tachycardia; perform immediate synchronized cardioversion"
      ],
      correctAnswer: 0,
      successFeedback: "Perfect. The RCA supplies the AV node in ~90% of individuals. Occlusion leads to bradyarrhythmias like complete heart block, which respond initially to IV Atropine.",
      wrongFeedback: "Incorrect. Occlusion of the RCA frequently cuts off blood flow to the AV node, leading to sinus bradycardia or AV blocks. Atropine is the immediate drug of choice here."
    }
  ];

  const handleOptionSelect = (idx: number) => {
    const isCorrect = idx === clinicalCaseSteps[activeCaseStep].correctAnswer;
    if (isCorrect) {
      setFeedback(clinicalCaseSteps[activeCaseStep].successFeedback);
    } else {
      setFeedback(clinicalCaseSteps[activeCaseStep].wrongFeedback);
    }
  };

  const handleNextStep = () => {
    setFeedback(null);
    if (activeCaseStep < clinicalCaseSteps.length - 1) {
      setActiveCaseStep(prev => prev + 1);
    } else {
      setActiveCaseStep(0); // Reset or loop
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">AI Oral Viva Board Examiner</span>
        </div>
        <div className="text-[10px] text-white/50 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded">
          Active Case: Cardiology #102
        </div>
      </div>

      {/* Case content */}
      <div className="space-y-4">
        {/* Examiner's box */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-red-400 text-xs font-mono font-bold">
            EX
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Clinical Case Presentation</h4>
            <p className="text-white text-xs md:text-sm leading-relaxed font-medium">
              {clinicalCaseSteps[activeCaseStep].examinerQuestion}
            </p>
          </div>
        </div>

        {/* Interactive feedback or options */}
        {!feedback ? (
          <div className="space-y-2 mt-4">
            <h5 className="text-[10px] text-white/40 font-bold uppercase mb-2">Select your clinical response:</h5>
            {clinicalCaseSteps[activeCaseStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className="w-full text-left p-3.5 rounded-lg text-xs md:text-sm font-semibold bg-[#121212] border border-white/10 hover:border-[#4F8CFF]/50 hover:bg-white/5 transition-all text-white/80 hover:text-white cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-xl border bg-white/5 flex flex-col gap-4"
          >
            <div className="text-xs leading-relaxed text-white/70">
              <span className="font-bold text-white block mb-1">Examiner Assessment:</span>
              {feedback}
            </div>

            <button
              onClick={handleNextStep}
              className="self-end px-4 py-2 bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
            >
              {activeCaseStep < clinicalCaseSteps.length - 1 ? "Proceed to Next Case Branch" : "Case Completed - Restart"}
            </button>
          </motion.div>
        )}

        {/* Audio Waveform interface simulation */}
        <div className="flex flex-col items-center justify-center border-t border-white/5 pt-6 mt-6">
          <span className="text-[10px] text-white/30 tracking-widest font-semibold uppercase mb-3">
            Voice Viva Simulator (Optional)
          </span>

          <div className="flex items-center gap-4">
            {/* Waveform visual */}
            <div className="flex items-center gap-1 h-8">
              {[...Array(14)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isRecording 
                      ? [10, Math.random() * 32 + 8, 10] 
                      : [6, Math.random() * 8 + 4, 6]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.04
                  }}
                  className={`w-0.5 rounded-full ${isRecording ? "bg-red-400" : "bg-white/20"}`}
                />
              ))}
            </div>

            {/* Mic button */}
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                isRecording
                  ? "bg-red-500 border-red-400 text-white animate-pulse"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white"
              }`}
            >
              <Mic size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
