"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger if GSAP is loaded
    import("gsap")
      .then((gsapModule) => {
        const gsap = gsapModule.default || gsapModule.gsap;
        return import("gsap/ScrollTrigger").then((triggerModule) => {
          const ScrollTrigger = triggerModule.default || triggerModule.ScrollTrigger;
          
          if (gsap && ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);

            lenis.on("scroll", ScrollTrigger.update);

            ScrollTrigger.scrollerProxy(document.body, {
              scrollTop(value) {
                if (arguments.length) {
                  lenis.scrollTo(value!);
                }
                return lenis.scroll;
              },
              getBoundingClientRect() {
                return {
                  top: 0,
                  left: 0,
                  width: window.innerWidth,
                  height: window.innerHeight,
                };
              },
            });

            ScrollTrigger.addEventListener("refresh", () => lenis.resize());
            ScrollTrigger.refresh();
          }
        });
      })
      .catch((err) => {
        console.warn("GSAP / ScrollTrigger failed to load or initialize:", err);
      });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
