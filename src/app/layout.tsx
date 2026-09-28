import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { facts, links } from "@/content";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-serif", display: "swap" });

// og:image must be absolute or the WhatsApp preview breaks. Set NEXT_PUBLIC_SITE_URL once the domain exists.
const site =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = "High Level Auto Care | Car Wrapping in Industrial Area 4, Sharjah";
const description =
  "Car wraps and paint protection in Industrial Area 4, Sharjah. Rated 4.9 by 74 customers on Google. Get a quote on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: "High Level Auto Care", type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0A0A0B", viewportFit: "cover" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  name: "High Level Auto Care",
  url: site,
  image: `${site}/og.jpg`,
  telephone: "+971507542987",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Next to Al Tayer Motors Parts Center, Industrial Area 4",
    addressLocality: "Sharjah",
    addressCountry: "AE",
  },
  geo: { "@type": "GeoCoordinates", latitude: facts.geo.lat, longitude: facts.geo.lng },
  hasMap: links.maps,
  sameAs: [links.instagram, links.tiktok, links.youtube],
  // Re-check against Google before each publish; remove if it drifts.
  aggregateRating: { "@type": "AggregateRating", ratingValue: facts.rating, reviewCount: facts.reviews },
  // openingHours omitted until confirmed.
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        {/* Gate enter-animations on JS so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
