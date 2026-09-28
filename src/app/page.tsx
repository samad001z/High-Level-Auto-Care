import Header from "@/components/Header";
import HeroScroll from "@/components/HeroScroll";
import Fab from "@/components/Fab";
import Effects from "@/components/Effects";
import BookButton from "@/components/BookButton";
import { Arrow, WhatsAppIcon } from "@/components/icons";
import { askFor, facts, gallery, img, links, packages, services, srcSet, type Shot } from "@/content";

const Photo = ({ s, sizes, className = "" }: { s: Shot; sizes: string; className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element -- static export; images pre-optimised to WebP
  <img
    src={`/img/${s.src}-640.webp`}
    srcSet={srcSet(s)}
    sizes={sizes}
    width={s.w}
    height={s.h}
    alt={s.alt}
    loading="lazy"
    decoding="async"
    className={`h-full w-full object-cover ${className}`}
  />
);

const Eyebrow = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <p className="eyebrow"><b>{n}</b> / {children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 data-reveal className="wide mt-5 text-[clamp(2rem,8.2vw,3.9rem)] leading-[1] font-medium">{children}</h2>
);

const mosaic = ["col-span-2 row-span-2", "row-span-2", "", "", "", "row-span-2", "", "col-span-2 row-span-2", "", ""];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroScroll />

        {/* ---------------- STATS ---------------- */}
        <section aria-label="At a glance" className="border-y border-line">
          <dl className="shell grid grid-cols-3">
            {[
              [facts.rating, "Google rating", "4.9"],
              [String(facts.reviews), "Reviews", "74"],
              [facts.closes, "Open till", ""],
            ].map(([v, label, count], i) => (
              <div key={label} className={`py-6 md:py-9 ${i ? "border-l border-line pl-4 md:pl-10" : ""}`}>
                <dd className="wide text-[clamp(1.6rem,7vw,3.4rem)] leading-none font-light tabular-nums" data-count={count || undefined}>{v}</dd>
                <dt className="mt-2 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------- SERVICES ---------------- */}
        <section id="services" className="pt-28 md:pt-44">
          <div className="shell grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <div className="flex items-center justify-between gap-3"><Eyebrow n="01">Services</Eyebrow><span className="draft">Draft</span></div>
                <H2>One roof.<br />Every <span className="serif-i">finish.</span></H2>
              </div>
            </div>
            <div data-svc-list className="relative md:col-span-7">
              <ul className="border-t border-line">
                {services.map((s, i) => (
                  <li key={s.name} data-reveal style={{ "--d": i } as React.CSSProperties}>
                    <a
                      href={askFor(s.ask)}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Ask about ${s.name} on WhatsApp`}
                      data-svc={`/img/${s.img.src}-640.webp`}
                      className="group grid grid-cols-[56px_1fr_44px] items-center gap-4 border-b border-line py-4 transition-colors md:-mx-5 md:grid-cols-[64px_1fr_44px] md:px-5 md:py-8 md:hover:bg-surface"
                    >
                      {/* Mobile: thumbnail. Desktop: number (the cursor preview carries the image). */}
                      <span className="size-14 overflow-hidden rounded-xl bg-surface md:hidden">
                        <Photo s={s.img} sizes="56px" />
                      </span>
                      <span className="hidden font-mono text-xs text-muted tabular-nums md:block">0{i + 1}</span>
                      <span className="wide text-[19px] leading-tight font-medium md:text-[28px]">{s.name}</span>
                      <span className="ring-arrow group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-focus-visible:-rotate-45">
                        <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div data-svc-preview aria-hidden className="pointer-events-none invisible absolute top-0 left-0 z-10 hidden aspect-[3/4] w-[220px] scale-90 overflow-hidden rounded-2xl opacity-0 shadow-2xl md:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/${services[0].img.src}-640.webp`} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- THE REVEAL ---------------- */}
        <section data-reveal-scene className="pt-28 md:pt-44">
          <div className="shell grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
            <div className="md:col-span-4">
              <Eyebrow n="02">The reveal</Eyebrow>
              <H2>Dusty to <span className="serif-i">classy.</span></H2>
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:col-span-8 md:gap-4">
              <figure data-reveal className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
                <Photo s={img.before} sizes="(min-width: 900px) 34vw, 50vw" />
                <figcaption className="eyebrow absolute top-3 left-3 rounded-full bg-bg/70 px-3 py-1.5 backdrop-blur">Before</figcaption>
              </figure>
              <figure data-reveal style={{ "--d": 2 } as React.CSSProperties} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
                <div data-after-clip className="absolute inset-0">
                  <Photo s={img.after} sizes="(min-width: 900px) 34vw, 50vw" />
                </div>
                <div data-wipe-line aria-hidden className="pointer-events-none absolute inset-0 hidden border-l-2 border-accent md:block" />
                <figcaption className="eyebrow absolute top-3 left-3 rounded-full bg-accent px-3 py-1.5 !text-white">After</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------------- WORK ---------------- */}
        <section id="work" data-strip-wrap className="relative isolate pt-28 md:flex md:h-svh md:flex-col md:justify-center md:overflow-hidden md:pt-20">
          <div className="shell flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow n="03">Our work</Eyebrow>
              <H2>Cars that left<br />our <span className="serif-i">workshop.</span></H2>
            </div>
            <a href={links.instagram} target="_blank" rel="noopener" className="eyebrow -my-3 inline-flex min-h-11 items-center transition-colors hover:text-ink">@highlevelautocare ↗</a>
          </div>
          <div data-strip className="strip shell mt-10 grid auto-rows-[46vw] grid-cols-2 gap-2 md:mt-12 md:max-w-none md:pr-[var(--gutter)]">
            {gallery.map((s, i) => (
              <figure
                key={s.src}
                data-card
                data-reveal
                style={{ "--ar": s.w / s.h, "--d": i % 2 } as React.CSSProperties}
                className={`relative overflow-hidden rounded-2xl bg-surface ${mosaic[i]}`}
              >
                <Photo s={s} sizes="(min-width: 900px) 40vw, 50vw" />
                <figcaption className="absolute inset-x-2 bottom-2 rounded-xl bg-bg/60 px-3 py-2 backdrop-blur-md">
                  <span className="block text-[13px] leading-tight font-medium">{s.car}</span>
                  <span className="font-mono text-[10.5px] tracking-[0.06em] text-muted uppercase">{s.job}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---------------- PACKAGES ---------------- */}
        <section id="packages" className="pt-28 md:pt-44">
          <div className="shell">
            <div className="flex items-center justify-between gap-3"><Eyebrow n="04">Packages</Eyebrow><span className="draft">Prices to fill in</span></div>
            <H2>Pick a starting <span className="serif-i">point.</span></H2>
            <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
              {packages.map((p, i) => (
                <article key={p.name} data-reveal style={{ "--d": i } as React.CSSProperties}
                  className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[22px] border border-line bg-surface p-5 md:p-6">
                  <div className="absolute inset-0 -z-10">
                    <Photo s={p.img} sizes="(min-width: 900px) 30vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0a0b_12%,rgba(10,10,11,.55)_45%,transparent_75%)]" />
                  </div>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <h3 className="wide mt-1 text-[24px] font-medium md:text-[26px]">{p.name}</h3>
                  <p className="mt-1 font-mono text-sm text-muted">From AED <span className="text-ink">___</span></p>
                  <a data-cta href={askFor(p.ask)} target="_blank" rel="noopener" className="btn btn-primary mt-5">
                    <WhatsAppIcon />Ask on WhatsApp
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- REVIEWS ---------------- */}
        {/* TODO: add three real quotes copied exactly from Google (first name only). Never write them. */}
        <section className="pt-28 md:pt-44">
          <div className="shell">
            <a href={links.maps} target="_blank" rel="noopener" data-reveal
              className="group flex flex-wrap items-center justify-between gap-6 rounded-[28px] border border-line bg-[radial-gradient(70%_120%_at_0%_0%,rgba(225,29,46,.14),transparent_60%),var(--color-surface)] p-6 transition-colors hover:border-[#3a3a40] md:p-10">
              <span className="wide flex items-end gap-4 leading-none">
                <span className="text-[clamp(4.5rem,22vw,9rem)] font-extrabold tracking-[-0.06em]">{facts.rating}</span>
                <span className="mb-[0.5em]">
                  <span className="block text-lg tracking-[0.1em] text-accent" aria-hidden>★★★★★</span>
                  <span className="mt-1 block font-sans text-base text-muted">{facts.reviews} Google reviews</span>
                </span>
              </span>
              <span className="ring-arrow !size-14 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent"><Arrow /></span>
            </a>
          </div>
        </section>

        {/* ---------------- VISIT ---------------- */}
        <section id="visit" className="pt-28 md:pt-44">
          <div className="shell">
            <Eyebrow n="05">Visit</Eyebrow>
            <H2>Come see the <span className="serif-i">workshop.</span></H2>
            <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-12">
              <div data-reveal className="grid content-start gap-2.5 md:col-span-5">
                <dl className="mb-2 rounded-2xl border border-line px-5">
                  {[
                    ["Address", facts.address],
                    ["Plus code", facts.plusCode],
                    ["Hours", `Open till ${facts.closes}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-line py-4 text-[15px] last:border-0">
                      <dt className="flex-none font-mono text-xs tracking-[0.08em] text-muted uppercase">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a data-cta href={links.maps} target="_blank" rel="noopener" className="btn btn-primary">Get directions</a>
                <div className="grid grid-cols-2 gap-2.5">
                  <a href={links.ahmed} target="_blank" rel="noopener" className="btn btn-ghost !px-3"><WhatsAppIcon />Ahmed</a>
                  <a href={links.abdulrahman} target="_blank" rel="noopener" className="btn btn-ghost !px-3"><WhatsAppIcon />Abdulrahman</a>
                </div>
                <BookButton className="btn btn-ghost">Book a slot</BookButton>
              </div>
              <div data-reveal style={{ "--d": 1 } as React.CSSProperties}
                className="relative h-72 overflow-hidden rounded-2xl border border-line bg-surface md:col-span-7 md:h-auto md:min-h-[440px]">
                <p className="absolute inset-0 grid place-items-center font-mono text-xs tracking-[0.08em] text-muted">● {facts.plusCode}</p>
                <iframe
                  title="Map to High Level Auto Care"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=8CF3%2BQR%20Sharjah&z=15&output=embed"
                  className="map-dark relative h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="mt-28 overflow-hidden border-t border-line pt-12 pb-[calc(100px+env(safe-area-inset-bottom))] md:mt-44 md:pb-12">
        <div className="shell">
          <p aria-hidden className="giant text-[17.5vw] md:text-[min(17.5vw,250px)]">High Level</p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {[["Instagram", links.instagram], ["TikTok", links.tiktok], ["YouTube", links.youtube], ["Leave us a review", links.review]].map(([l, h]) => (
              <a key={l} href={h} target="_blank" rel="noopener" className="btn btn-ghost">{l}</a>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-xs text-muted">
            <span>© High Level Auto Care</span>
            <span>
              3D model:{" "}
              <a className="underline underline-offset-2 hover:text-ink" href="https://sketchfab.com/3d-models/lamborghini-huracan-green-829bcc7978b74f419a4d4d3bd685b08e" target="_blank" rel="noopener">
                &ldquo;lamborghini huracan green&rdquo;
              </a>{" "}
              by{" "}
              <a className="underline underline-offset-2 hover:text-ink" href="https://sketchfab.com/0dede0" target="_blank" rel="noopener">0dede0</a>,{" "}
              <a className="underline underline-offset-2 hover:text-ink" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>
            </span>
            <span>Site by BrassNorth</span>
          </div>
        </div>
      </footer>

      <Fab />
      <Effects />
    </>
  );
}
