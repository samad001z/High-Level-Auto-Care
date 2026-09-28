"use client";
import { useEffect, useState } from "react";
import { links } from "@/content";
import { WhatsAppIcon } from "./icons";

/** Sticky WhatsApp. Hidden while any primary CTA ([data-cta]) is on screen so it never covers one. */
export default function Fab() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setHidden(visible.size > 0);
    });
    document.querySelectorAll("[data-cta]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={links.quote}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className={`fixed right-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-50 grid size-15 place-items-center rounded-full bg-accent text-white shadow-[0_10px_30px_rgba(225,29,46,.35),0_2px_6px_rgba(0,0,0,.5)] transition-[opacity,transform] duration-300 md:right-7 md:bottom-7 ${
        hidden ? "pointer-events-none translate-y-5 scale-90 opacity-0" : ""
      }`}
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
