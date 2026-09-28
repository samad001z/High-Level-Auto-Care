"use client";
import { useEffect, useState } from "react";
import { links } from "@/content";
import { WhatsAppIcon } from "./icons";
import BookButton from "./BookButton";

const nav = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Packages", "#packages"],
  ["Visit", "#visit"],
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid ? "border-line bg-bg/85 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <a href="#top" aria-label="High Level Auto Care, back to top" className="-my-2 flex min-h-11 flex-col justify-center py-2 leading-none">
          <span className="wide text-[19px] font-extrabold tracking-[-0.02em]">
            HIGH<span className="text-accent">/</span>LEVEL
          </span>
          <span className="mt-1 font-mono text-[9px] tracking-[0.46em] text-muted">AUTO CARE</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-2">
          <ul className="mr-6 hidden gap-8 text-sm text-muted lg:flex">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-ink">{label}</a>
              </li>
            ))}
          </ul>
          <BookButton className="btn btn-ghost !min-h-11 !px-5 text-sm">Book</BookButton>
          <a href={links.quote} target="_blank" rel="noopener" aria-label="WhatsApp us" className="ring-arrow hover:border-muted">
            <WhatsAppIcon width={20} height={20} />
          </a>
        </nav>
      </div>
    </header>
  );
}
