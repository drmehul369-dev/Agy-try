"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.getAttribute("data-hoverable") === "true"
      ) {
        setHovered(true);
        const text = target.getAttribute("data-cursor-text") || "";
        setCursorText(text);
      } else {
        setHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Outer Glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#4F8CFF]/50 bg-[#4F8CFF]/5 pointer-events-none z-9998 mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 2.5 : 1,
          backgroundColor: hovered ? "rgba(0, 229, 168, 0.15)" : "rgba(79, 140, 255, 0.05)",
          borderColor: hovered ? "rgba(0, 229, 168, 0.8)" : "rgba(79, 140, 255, 0.5)",
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#4F8CFF] rounded-full pointer-events-none z-9999 hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
          backgroundColor: hovered ? "#00E5A8" : "#4F8CFF",
        }}
      />
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 px-3 py-1 bg-[#121212] text-white border border-white/10 text-xs font-semibold rounded pointer-events-none z-9999 hidden lg:block shadow-xl"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "15px",
            translateY: "15px",
          }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
}
