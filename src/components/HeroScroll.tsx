"use client";
import { useEffect, useRef, useState } from "react";
import { links } from "@/content";
import { WhatsAppIcon } from "./icons";

// CONFIRM the three services and lines with Ahmed.
const phases = [
  { word: "Wrap", label: "Full wrap · Colour change", size: "min(23vw,30vh)" },
  { word: "Protect", label: "Paint protection film", size: "min(13.5vw,30vh)" },
  { word: "Finish", label: "Ceramic · Detailing", size: "min(16vw,30vh)" },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** 1 inside phase i's third of the scroll, fading over 0.07 either side. */
const phaseOpacity = (p: number, i: number) => {
  const a = i / 3, b = (i + 1) / 3;
  const d = p < a ? a - p : p > b ? p - b : 0;
  return i === 0 && p < a ? 1 : clamp(1 - d / 0.07);
};

export default function HeroScroll() {
  const section = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [ready3d, setReady3d] = useState(false);

  useEffect(() => {
    const el = section.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = !matchMedia("(min-width: 900px)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let car: Awaited<ReturnType<typeof import("./car3d").mountCar>> | undefined;
    let raf = 0, disposed = false, last = -1;

    const progress = () => {
      const r = el.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - innerHeight));
    };
    const update = () => {
      raf = 0;
      const p = progress();
      if (p === last) return;
      last = p;
      el.style.setProperty("--p", p.toFixed(4));
      el.querySelectorAll<HTMLElement>("[data-phase]").forEach((n) => {
        const o = phaseOpacity(p, Number(n.dataset.phase));
        n.style.opacity = String(o);
        n.style.visibility = o < 0.01 ? "hidden" : "visible";
      });
      car?.render(p);
    };
    const onScroll = () => { raf ||= requestAnimationFrame(update); };
    const onResize = () => { car?.resize(); last = -1; onScroll(); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    update();

    // 3D after the page has loaded and gone idle; never with Save-Data or reduced motion.
    const start = () => {
      if (reduced || saveData || disposed) return;
      import("./car3d")
        .then((m) => m.mountCar(host.current!, mobile))
        .then((c) => {
          if (disposed) return c.dispose();
          car = c;
          last = -1;
          update();
          setReady3d(true);
        })
        .catch(() => { /* no WebGL or no model yet: the photo poster stays */ });
    };
    const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200));
    if (document.readyState === "complete") idle();
    else addEventListener("load", idle, { once: true });

    return () => {
      disposed = true;
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      car?.dispose();
    };
  }, []);

  return (
    <section ref={section} id="top" data-hero className="relative h-[280svh] md:h-[340svh] motion-reduce:h-auto">
      <div className="sticky top-0 isolate h-svh overflow-hidden motion-reduce:relative">
        <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(55%_40%_at_50%_45%,rgba(225,29,46,.16),transparent_70%),radial-gradient(90%_60%_at_50%_55%,#17171b,transparent_75%)]" />

        {/* Giant outlined words, one per phase */}
        <div aria-hidden className="absolute inset-x-0 top-[17%] -z-10 flex justify-center md:top-[13%]">
          {phases.map((ph, i) => (
            <span
              key={ph.word}
              data-phase={i}
              style={{ opacity: i ? 0 : 1, fontSize: ph.size }}
              className="giant absolute [-webkit-text-stroke-color:#4a4a52]"
            >
              {i === 0
                ? ph.word.split("").map((l, j) => <span key={j} className="hero-letter" style={{ "--i": j } as React.CSSProperties}>{l}</span>)
                : ph.word}
            </span>
          ))}
        </div>

        {/* Car: real photo first (LCP), 3D model fades in over it once loaded */}
        <div className="absolute inset-x-0 top-[20%] h-[50%] md:top-[18%] md:h-[58%]">
          <div style={{ transform: "scale(calc(1 - var(--p, 0) * 0.12))" }} className={`absolute inset-0 flex origin-bottom items-end justify-center transition-opacity duration-700 ${ready3d ? "opacity-0" : ""}`}>
            <picture className="contents">
              <source srcSet="/img/hero-car.avif" type="image/avif" />
              <img src="/img/hero-car.webp" width={983} height={569} alt="Green Lamborghini Huracán, gloss green wrap" fetchPriority="high"
                className="hero-car max-h-full w-[min(92vw,820px)] object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,.8)]" />
            </picture>
          </div>
          <div ref={host} aria-hidden className={`absolute inset-0 transition-opacity duration-700 ${ready3d ? "opacity-100" : "opacity-0"}`} />
          <div aria-hidden className={`absolute bottom-[2%] left-1/2 -z-10 h-[10%] w-[min(80vw,720px)] -translate-x-1/2 rounded-[50%] bg-black/80 blur-2xl transition-opacity duration-700 ${ready3d ? "opacity-0" : ""}`} />
        </div>

        {/* Bottom: one line per phase, CTAs always reachable */}
        <div className="shell absolute inset-x-0 bottom-0 pb-[calc(24px+env(safe-area-inset-bottom))] md:pb-10">
          <div className="grid gap-5 md:grid-cols-12 md:items-end">
            <div className="relative md:col-span-7">
              <h1 className="wide text-[8.4vw] leading-[1.02] font-medium md:text-[clamp(2.6rem,4.3vw,4.3rem)]">
                Wraps that turn <br />
                <span className="accent-serif pr-[0.12em] text-[1.18em] leading-none">heads</span> in Sharjah.
              </h1>
            </div>
            <div className="md:col-span-5">
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-5 flex-1 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                  {phases.map((ph, i) => (
                    <span key={ph.word} data-phase={i} style={{ opacity: i ? 0 : 1 }} className="absolute inset-0">
                      <b className="text-ink">0{i + 1}</b> / {ph.label}
                    </span>
                  ))}
                </div>
                <div className="h-px w-20 bg-line md:w-28">
                  <div className="h-px origin-left bg-accent" style={{ transform: "scaleX(var(--p, 0))" }} />
                </div>
              </div>
              <div data-cta className="grid grid-cols-[1fr_auto] gap-2.5">
                <a href={links.quote} target="_blank" rel="noopener" className="btn btn-primary !px-4">
                  <WhatsAppIcon />Get a quote
                </a>
                <a href="#work" className="btn btn-ghost">Our work</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
