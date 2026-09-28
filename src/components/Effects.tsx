"use client";
import { useEffect } from "react";

const DESKTOP = "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export default function Effects() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Enter reveals (all sizes): IntersectionObserver, CSS does the motion.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // Hero stats count up once the car has landed.
    const timers: number[] = [];
    if (!reduced) {
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const to = parseFloat(el.dataset.count!);
        const dec = el.dataset.count!.includes(".") ? 1 : 0;
        el.textContent = (0).toFixed(dec);
        timers.push(
          window.setTimeout(() => {
            const t0 = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - t0) / 1100);
              el.textContent = (to * (1 - Math.pow(1 - p, 4))).toFixed(dec);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, matchMedia("(min-width: 900px)").matches ? 1150 : 600),
        );
      });
    }

    // Desktop scroll scenes: GSAP + Lenis are only downloaded here.
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    if (matchMedia(DESKTOP).matches) {
      import("./desktopScenes").then((m) => {
        if (!cancelled) cleanup = m.default();
      });
    }

    return () => {
      cancelled = true;
      io.disconnect();
      timers.forEach(clearTimeout);
      cleanup?.();
    };
  }, []);

  return null;
}
