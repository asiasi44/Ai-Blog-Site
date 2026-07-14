// lib/data/bestSoundbarsForGaming.ts

export type SpecItem = {
  label: string;
  value: string;
};

export type Highlight = {
  label: string; // e.g. "The Sound Experience", "The Verdict", "The Catch"
  text: string;
};

export type RankedItem = {
  rank: number;
  medal?: string; // "🥇" | "🥈" | "🥉" — omit for rank 4+, component falls back to "4."
  name: string;
  tagline: string;
  price: string;
  imageUrl?: string; // optional per-item product shot
  specs: SpecItem[]; // e.g. Channels, Best For
  score: number; // out of 10
  scoreLabel: string; // "Gaming Pro Score"
  description: string[]; // "why it made the list" paragraph(s)
  highlights?: Highlight[]; // bolded mini-callouts within the writeup
};

export type ComparisonRow = {
  name: string;
  price: string;
  values: Record<string, string>; // keyed by comparisonColumns below
};

export const BEST_X_FOR_Y_DATA = {
  contentType: "best-x-for-y" as const,
  section: "Buying Guide",
  category: "Soundbars",
  useCase: "Gaming",
  headline: "Top 5 Premium Soundbars for Gaming (2026 Ultimate Guide)",
  deck: "We scanned the market, cross-checked real user feedback, and filtered out the budget pretenders to find the soundbars built for next-gen gaming.",
  authors: ["Editorial Team"],
  date: "June 21, 2026",
  readingTime: 7,
  heroImage: {
    url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80", // swap for your own shot
    caption: "A high-end gaming setup demands a soundbar built for low-latency, spatial audio.",
    credit: "Editorial Team",
  },
  intro: [
    "If you have managed to secure a next-gen console or a killer PC rig, you are only experiencing half the game if you are still relying on your TV's built-in speakers. Gaming audio isn't like movie audio — gamers need near-zero latency, precise spatial tracking to pinpoint footsteps, and advanced video pass-through features.",
    "We scanned the market, cross-checked real user feedback, and filtered out the budget pretenders. If you want the absolute best, most immersive gaming experience, these are the top 5 soundbars worth your money.",
  ],
  items: [
    {
      rank: 1,
      medal: "🥇",
      name: "Samsung HW-Q990D 11.1.4ch System",
      tagline: "The Undisputed King of Next-Gen Gaming",
      price: "~$1,097",
      specs: [
        { label: "Channels", value: "11.1.4 (Wireless Subwoofer & Rear Speakers)" },
        { label: "Best For", value: "Hardcore PS5, Xbox Series X, and PC Gamers" },
      ],
      score: 9.8,
      scoreLabel: "Gaming Pro Score",
      description: [
        "The Samsung Q990D is the holy grail for gamers. Unlike almost every other soundbar on the market, Samsung explicitly upgraded this flagship with dual HDMI 2.1 inputs, meaning you can plug your console directly into the soundbar and pass through a flawless 4K/120Hz signal with VRR and ALLM activated.",
      ],
      highlights: [
        { label: "The Sound Experience", text: "With 11 discrete channels, its Game Pro Mode dynamically tracks objects on screen — an enemy sneaking up behind you or an engine roaring past sounds terrifyingly accurate." },
        { label: "The Verdict", text: "Zero audio lag, no screen tearing, and absolute sonic dominance." },
      ],
    },
    {
      rank: 2,
      medal: "🥈",
      name: "Sonos Arc Ultra",
      tagline: "The Ultimate Sleek, All-In-One Powerhouse",
      price: "~$899",
      specs: [
        { label: "Channels", value: "9.1.4 (Sound Motion™ Technology)" },
        { label: "Best For", value: "Gamers who want massive sound without rear speakers" },
      ],
      score: 9.2,
      scoreLabel: "Gaming Pro Score",
      description: [
        "Sonos completely re-engineered their acoustic architecture with the Arc Ultra. Thanks to proprietary Sound Motion™ tech, this single bar packs clean, deep bass and wide spatial projection without a separate floor subwoofer.",
      ],
      highlights: [
        { label: "The Sound Experience", text: "AI Speech Enhancement keeps dialogue isolated and clear even amidst booming orchestral scores in heavy RPGs." },
        { label: "Note for Gamers", text: "Relies entirely on your TV's HDMI eARC port — plug your console into the TV directly for lag-free audio." },
      ],
    },
    {
      rank: 3,
      medal: "🥉",
      name: "Sony BRAVIA Theater Bar 9 / System 6",
      tagline: "The PlayStation 5 Perfect Match",
      price: "~$798",
      specs: [
        { label: "Channels", value: "5.1ch (Expandable Acoustic Architecture)" },
        { label: "Best For", value: "Sony PS5 ecosystem purists" },
      ],
      score: 8.9,
      scoreLabel: "Gaming Pro Score",
      description: [
        "If you own a modern Sony BRAVIA TV and a PS5, the integration is seamless. Acoustic Center Sync lets your TV's built-in speakers act as the center dialogue channel alongside the soundbar.",
      ],
      highlights: [
        { label: "The Sound Experience", text: "Spatial sound mapping creates phantom speakers around the room, with full uncompressed LPCM surround sound from the PS5." },
        { label: "The Verdict", text: "Exceptionally low latency over eARC and an incredibly natural, wide soundstage." },
      ],
    },
    {
      rank: 4,
      name: "Klipsch Flexus CORE 200",
      tagline: "The Audiophile's Choice for Brute Force & Power",
      price: "~$518",
      specs: [
        { label: "Channels", value: "3.1.2 (Powered by Onkyo)" },
        { label: "Best For", value: "Gamers who also stream music on a high-end hub" },
      ],
      score: 8.5,
      scoreLabel: "Gaming Pro Score",
      description: [
        "Built in collaboration with Onkyo, the Flexus Core 200 is a heavy, beautifully constructed MDF-wood soundbar engineered for raw dynamic punch.",
      ],
      highlights: [
        { label: "The Sound Experience", text: "Explosions feel punchy and physical even without an external sub; upward-firing drivers handle Dolby Atmos beautifully." },
        { label: "The Catch", text: "No built-in Wi-Fi or advanced software suite — a pure, hard-wired sonic tank. Plug into the TV first for zero lip-sync delay via eARC." },
      ],
    },
    {
      rank: 5,
      name: "Bose Smart Ultra Soundbar",
      tagline: "The Best for Spatial Tracking & AI Voice Clarity",
      price: "~$719",
      specs: [
        { label: "Channels", value: "Multi-directional Spatial Array" },
        { label: "Best For", value: "Competitive multiplayer gamers using voice chat" },
      ],
      score: 8.3,
      scoreLabel: "Gaming Pro Score",
      description: [
        "Bose brings its legendary computational audio processing to the table. AI Dialogue Mode automatically separates teammates' voice chat and in-game dialogue from gunfire and environmental noise.",
      ],
      highlights: [
        { label: "The Sound Experience", text: "TrueSpace technology upscales non-Atmos legacy games into fully immersive spatial audio, with remarkably sharp tracking." },
        { label: "The Verdict", text: "A premium, compact bar that fits easily under any monitor or TV." },
      ],
    },
  ] as RankedItem[],
  comparisonColumns: ["HDMI 2.1 Pass-through?", "Best Feature"],
  comparisonTable: [
    { name: "Samsung Q990D", price: "~$1,097", values: { "HDMI 2.1 Pass-through?": "Yes (4K/120Hz)", "Best Feature": "Best 3D Spatial Tracking & Latency" } },
    { name: "Sonos Arc Ultra", price: "~$899", values: { "HDMI 2.1 Pass-through?": "No (Requires eARC)", "Best Feature": "Massive Single-Bar Bass" } },
    { name: "Sony Bravia System 6", price: "~$798", values: { "HDMI 2.1 Pass-through?": "No (Requires eARC)", "Best Feature": "Flawless PS5 Integration" } },
    { name: "Klipsch Flexus 200", price: "~$518", values: { "HDMI 2.1 Pass-through?": "No (Requires eARC)", "Best Feature": "Raw Audiophile Punch" } },
    { name: "Bose Smart Ultra", price: "~$719", values: { "HDMI 2.1 Pass-through?": "No (Requires eARC)", "Best Feature": "AI Chat Isolation" } },
  ] as ComparisonRow[],
  tags: ["Soundbars", "Gaming", "Home Theater", "Tech Reviews", "Buying Guide"],
};