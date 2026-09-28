// Single source for every fact on the site. Items marked CONFIRM are unverified (see CLAUDE.md §1).

const wa = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const AHMED = "971507542987";
export const ABDULRAHMAN = "971506610796";

export const links = {
  quote: wa(AHMED, "Hi High Level, I'd like a quote for my car"),
  ahmed: wa(AHMED, "Hi High Level, I'd like a quote for my car"),
  abdulrahman: wa(ABDULRAHMAN, "Hi High Level, I'd like a quote for my car"),
  calendly: "https://calendly.com/highlevelautocare/30min",
  maps: "https://goo.gl/maps/gLLMGFCoWi7CeknT9",
  review: "https://g.page/r/Cbsb6xobFP0IEBE/review",
  instagram: "https://www.instagram.com/highlevelautocare/",
  tiktok: "https://www.tiktok.com/@highlevelautocare",
  youtube: "https://www.youtube.com/@highlevelautocare",
};

export const askFor = (service: string) =>
  wa(AHMED, `Hi High Level, I'd like a quote for ${service}`);

export const facts = {
  rating: "4.9",
  reviews: 74,
  closes: "10 PM", // opening time and days: CONFIRM
  address: "Next to Al Tayer Motors Parts Center, Industrial Area 4, Sharjah, UAE",
  plusCode: "8CF3+QR Sharjah",
  geo: { lat: 25.32444, lng: 55.40456 }, // decoded from plus code 7HQQ8CF3+QR
};

/** Images are stills from the shop's own YouTube Shorts. See assets/SOURCES.md. */
export type Shot = { src: string; w: number; h: number; car: string; job: string; alt: string };
const shot = (name: string, w: number, h: number, car: string, job: string, alt: string): Shot => ({
  src: name, w, h, car, job, alt,
});

export const img = {
  huracan34: shot("huracan-34", 1080, 1440, "Lamborghini Huracán", "Gloss green wrap", "Green Lamborghini Huracán, front three quarter, in the workshop"),
  huracanFront: shot("huracan-front", 1080, 1200, "Lamborghini Huracán", "Gloss green wrap", "Green Huracán head on under the High Level sign"),
  huracanRear: shot("huracan-rear", 1080, 1440, "Lamborghini Huracán", "Gloss green wrap", "Rear haunch of the green Huracán"),
  huracanTail: shot("huracan-tail", 1080, 1200, "Lamborghini Huracán", "Gloss green wrap", "Tail light and exhausts of the green Huracán"),
  ferrari: shot("ferrari-812", 1080, 1240, "Ferrari 812 Superfast", "Detailing", "Grey Ferrari 812 under the High Level sign"),
  corvette: shot("corvette-studio", 1080, 1240, "Chevrolet Corvette", "Detailing", "Red Corvette in the studio bay"),
  corvetteRear: shot("corvette-rear", 1080, 1440, "Chevrolet Corvette", "Detailing", "Rear of the red Corvette"),
  cullinan: shot("cullinan-front", 1080, 1040, "Rolls-Royce Cullinan", "Detailing", "White Rolls-Royce Cullinan head on"),
  cullinanSide: shot("cullinan", 1080, 1440, "Rolls-Royce Cullinan", "Interior detailing", "White Cullinan with the rear door open"),
  wraith: shot("wraith", 720, 960, "Rolls-Royce", "Detailing", "Black Rolls-Royce in the workshop"),
  wraithInterior: shot("wraith-interior", 720, 960, "Rolls-Royce", "Interior detailing", "Red leather Rolls-Royce dashboard"),
  urus: shot("urus-34", 1080, 1440, "Lamborghini Urus", "Detailing", "Lime Lamborghini Urus under the High Level sign"),
  urusFoam: shot("urus-foam", 1080, 1240, "Lamborghini Urus", "Foam wash", "Lime Urus covered in pink snow foam"),
  urusRear: shot("urus-rear", 1080, 1200, "Lamborghini Urus", "Detailing", "Rear of the lime Urus"),
  rangeRover: shot("rangerover", 1080, 1080, "Range Rover", "Detailing", "Silver Range Rover in the workshop"),
  ppf: shot("ppf-hood", 720, 960, "Nissan Maxima", "Full body PPF", "Technician squeegeeing clear protection film onto a black bonnet"),
  before: shot("before", 1080, 1440, "Chrysler 200", "Before", "Chrysler 200 covered in thick dust"),
  after: shot("after", 1080, 1440, "Chrysler 200", "After", "The same Chrysler 200 clean and glossy"),
};

// CONFIRM the list with Ahmed. Evidence: Google category "vehicle wrapping", YouTube titles (wrap, PPF, ceramic, detailing).
export const services = [
  { name: "Full wrap", ask: "a full wrap", img: img.huracan34 },
  { name: "Colour change", ask: "a colour change", img: img.huracanTail },
  { name: "Paint protection film", ask: "paint protection film", img: img.ppf },
  { name: "Ceramic coating", ask: "ceramic coating", img: img.ferrari },
  { name: "Detailing and polish", ask: "detailing", img: img.urusFoam },
];

export const gallery = [
  img.huracan34, img.ferrari, img.urus, img.cullinan, img.corvette,
  img.huracanTail, img.wraith, img.urusFoam, img.rangeRover, img.wraithInterior,
];

// Prices blank until Ahmed fills them in. CONFIRM package names.
export const packages = [
  { name: "Full wrap", img: img.huracanFront, ask: "a full wrap" },
  { name: "Paint protection film", img: img.ppf, ask: "paint protection film" },
  { name: "Colour change", img: img.huracanTail, ask: "a colour change" },
];


// The "-1080" file is the largest export; for 720px sources it is 720 wide, hence s.w.
export const srcSet = (s: Shot) => `/img/${s.src}-640.webp 640w, /img/${s.src}-1080.webp ${s.w}w`;
