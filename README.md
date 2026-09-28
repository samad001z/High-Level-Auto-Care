# High Level Auto Care

One-page site. Next.js (App Router) static export, Tailwind v4, GSAP + ScrollTrigger + Lenis on desktop only.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # writes the static site to ./out
```

## Deploy (any host)

`npm run build` produces plain HTML/CSS/JS in `out/`. No server needed.

- **Vercel:** import the repo (framework: Next.js). Zero config. Set `NEXT_PUBLIC_SITE_URL=https://<domain>` once a domain is attached so share previews use it.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `out`.
- **Any static host (cPanel, S3, nginx):** upload the contents of `out/`.

Always set `NEXT_PUBLIC_SITE_URL` on non-Vercel hosts: `og:image` must be an absolute URL or the WhatsApp preview breaks.

## Editing content

Every fact, link, service, package and caption is in `src/content.ts`. Items marked CONFIRM are unverified.
Prices are blank (`From AED ___`) on purpose until the client fills them in.

## Images

All photos are stills from the shop's own YouTube Shorts (see `assets/SOURCES.md`). Written permission is still needed before launch.
To regenerate: frames in `assets/video/best/`, exported to `public/img/` as WebP (640 and 1080 wide); hero cutout as AVIF + WebP with alpha.

## Motion

- Mobile: CSS-only hero intro (half length), IntersectionObserver fade-and-rise. GSAP and Lenis are never downloaded.
- Desktop (≥900px, fine pointer): `src/components/desktopScenes.ts` adds Lenis smooth scroll, hero parallax, sliding section words,
  cursor-following service previews, the before/after wipe and the pinned horizontal gallery.
- `prefers-reduced-motion: reduce` turns all of it off.

## 3D hero

- Model: "lamborghini huracan green" by 0dede0 on Sketchfab, **CC BY 4.0** (credit in the footer, required by the license).
- Source: `assets/model/lamborghini_huracan_green.glb` (6 MB). Served: `public/models/huracan.glb` (~876 KB), made with
  `npx gltf-transform optimize assets/model/lamborghini_huracan_green.glb public/models/huracan.glb --compress meshopt --texture-compress webp --texture-size 1024 --palette false`
- `src/components/car3d.ts` loads it after page load (never blocks first paint), repaints the `CSR2_CarPaint` material to their green,
  and orbits the camera with scroll progress. Until it loads, and always with Save-Data or reduced motion, the hero shows the real photo cutout.
