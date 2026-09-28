// Desktop-only scroll scenes. Loaded by dynamic import behind a media query, so phones never fetch GSAP/Lenis.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function desktopScenes() {
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context(() => {
    // Services: a preview image trails the cursor, clamped inside the list.
    const list = document.querySelector<HTMLElement>("[data-svc-list]");
    const preview = document.querySelector<HTMLElement>("[data-svc-preview]");
    const previewImg = preview?.querySelector("img");
    if (list && preview && previewImg) {
      const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = list.getBoundingClientRect();
        xTo(gsap.utils.clamp(0, r.width - preview.offsetWidth, e.clientX - r.left + 28));
        yTo(gsap.utils.clamp(0, r.height - preview.offsetHeight, e.clientY - r.top - preview.offsetHeight / 2));
      };
      list.addEventListener("pointermove", move);
      list.addEventListener("pointerenter", () => gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3" }));
      list.addEventListener("pointerleave", () => gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.25 }));
      list.querySelectorAll<HTMLElement>("[data-svc]").forEach((row) =>
        row.addEventListener("pointerenter", () => { previewImg.src = row.dataset.svc!; }),
      );
    }

    // Wrap reveal: the "after" frame wipes in over its own frame as you scroll.
    const reveal = document.querySelector("[data-reveal-scene]");
    if (reveal) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: reveal, start: "top 70%", end: "center 40%", scrub: 0.6 } });
      tl.fromTo("[data-after-clip]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0)
        .fromTo("[data-wipe-line]", { xPercent: 0 }, { xPercent: 100, ease: "none" }, 0); // full-width layer, line on its left edge
    }

    // Gallery: pinned horizontal strip; cards scale 0.92 -> 1 as they reach the centre.
    const wrap = document.querySelector<HTMLElement>("[data-strip-wrap]");
    const strip = document.querySelector<HTMLElement>("[data-strip]");
    if (wrap && strip) {
      strip.classList.add("is-pinned");
      const dist = () => strip.scrollWidth - strip.clientWidth;
      const move = gsap.to(strip, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: wrap, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      strip.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        gsap.fromTo(card, { scale: 0.92 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: move, start: "left right", end: "center center", scrub: true },
        });
      });
    }
  });

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);

  return () => {
    window.removeEventListener("load", refresh);
    ctx.revert();
    gsap.ticker.remove(raf);
    lenis.destroy();
    document.querySelector("[data-strip]")?.classList.remove("is-pinned");
  };
}
