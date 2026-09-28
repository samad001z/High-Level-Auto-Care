"use client";
import { links } from "@/content";

declare global {
  interface Window { Calendly?: { initPopupWidget: (o: { url: string }) => void } }
}

let loading: Promise<void> | null = null;
function loadCalendly() {
  loading ??= new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return loading;
}

/** Calendly loads only on click; the href is the no-JS / failure fallback. */
export default function BookButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={links.calendly}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={async (e) => {
        e.preventDefault();
        try {
          await loadCalendly();
          window.Calendly!.initPopupWidget({ url: links.calendly });
        } catch {
          window.open(links.calendly, "_blank", "noopener");
        }
      }}
    >
      {children}
    </a>
  );
}
