import type { GalleryTone, Motif, PaletteName } from "@/lib/types";

interface Palette {
  skyTop: string;
  skyBottom: string;
  orb: string;
  far: string;
  mid: string;
  near: string;
  fore: string;
  water: string;
}

const PALETTES: Record<PaletteName, Palette> = {
  sunlit: {
    skyTop: "#f6c99a",
    skyBottom: "#fce9d6",
    orb: "#ffdca8",
    far: "#e0a98a",
    mid: "#c98363",
    near: "#a15c46",
    fore: "#6f3a2c",
    water: "#e8b894",
  },
  ember: {
    skyTop: "#e8a06a",
    skyBottom: "#fbe2c6",
    orb: "#ffcf8f",
    far: "#c8875c",
    mid: "#9d6242",
    near: "#74432f",
    fore: "#4a2a1e",
    water: "#d9a172",
  },
  fjord: {
    skyTop: "#a8c4d6",
    skyBottom: "#e4eef3",
    orb: "#f4f0e4",
    far: "#7e9bb2",
    mid: "#54728c",
    near: "#354c62",
    fore: "#1e2f3f",
    water: "#6d90a8",
  },
  saffron: {
    skyTop: "#eab066",
    skyBottom: "#fbe8c8",
    orb: "#ffdf9e",
    far: "#d19458",
    mid: "#ab6f3e",
    near: "#7f4e2a",
    fore: "#55321a",
    water: "#dda866",
  },
  arctic: {
    skyTop: "#9fb6cc",
    skyBottom: "#e6edf2",
    orb: "#f6f2e8",
    far: "#7b93ac",
    mid: "#526a84",
    near: "#33465c",
    fore: "#1c2836",
    water: "#6a869e",
  },
  alpine: {
    skyTop: "#b6cadd",
    skyBottom: "#f0f4f7",
    orb: "#fdf8ec",
    far: "#93a9c0",
    mid: "#6c839c",
    near: "#4a5f77",
    fore: "#2c3b4c",
    water: "#8aa2ba",
  },
  moss: {
    skyTop: "#bccbb4",
    skyBottom: "#eef2e6",
    orb: "#f6f4e0",
    far: "#8ba181",
    mid: "#5f7659",
    near: "#3d5039",
    fore: "#24321f",
    water: "#7b9274",
  },
  aegean: {
    skyTop: "#8fbcd4",
    skyBottom: "#e8f2f5",
    orb: "#fdeecb",
    far: "#6fa1bd",
    mid: "#4a7b99",
    near: "#2f5570",
    fore: "#1b3548",
    water: "#5f95b4",
  },
  slate: {
    skyTop: "#aab3bd",
    skyBottom: "#e9ecef",
    orb: "#f4f1ea",
    far: "#87919d",
    mid: "#5f6975",
    near: "#414953",
    fore: "#272d35",
    water: "#77828e",
  },
  dusk: {
    skyTop: "#c99ba8",
    skyBottom: "#f7e5e2",
    orb: "#ffd9b8",
    far: "#a97e8e",
    mid: "#7f5b6c",
    near: "#573e4c",
    fore: "#34252f",
    water: "#a3818f",
  },
};

interface ToneShift {
  skyTop: string;
  skyBottom: string;
  orbOpacity: number;
  orbY: number;
  haze: number;
  darken: number;
}

const TONES: Record<GalleryTone, ToneShift> = {
  day: { skyTop: "", skyBottom: "", orbOpacity: 0.5, orbY: 96, haze: 0.06, darken: 0 },
  golden: { skyTop: "#f0a765", skyBottom: "#fde6cd", orbOpacity: 0.9, orbY: 178, haze: 0.14, darken: 0 },
  dusk: { skyTop: "#7c6b91", skyBottom: "#e7b79c", orbOpacity: 0.75, orbY: 214, haze: 0.1, darken: 0.16 },
  night: { skyTop: "#1e2740", skyBottom: "#4a5878", orbOpacity: 0.42, orbY: 84, haze: 0.05, darken: 0.42 },
  mist: { skyTop: "#d5dade", skyBottom: "#f2f4f4", orbOpacity: 0.22, orbY: 120, haze: 0.34, darken: 0 },
};

const MOTIF_LAYERS: Record<Motif, string[]> = {
  peaks: [
    "M0 268 L118 168 L196 236 L286 132 L392 244 L470 190 L560 262 L648 196 L740 268 L800 232 L800 420 L0 420 Z",
    "M0 318 L96 240 L188 300 L276 214 L372 306 L468 246 L556 320 L664 252 L756 322 L800 296 L800 420 L0 420 Z",
    "M0 366 L104 300 L212 356 L318 286 L430 360 L540 306 L648 368 L748 318 L800 350 L800 420 L0 420 Z",
  ],
  coast: [
    "M0 286 L142 254 L268 276 L410 240 L548 272 L676 246 L800 268 L800 420 L0 420 Z",
    "M0 322 Q126 298 246 318 T486 314 T738 326 L800 318 L800 420 L0 420 Z",
    "M0 372 Q160 352 322 370 T646 366 L800 376 L800 420 L0 420 Z",
  ],
  forest: [
    "M0 300 L60 232 L120 300 L180 226 L240 300 L300 238 L360 300 L420 222 L480 300 L540 240 L600 300 L660 230 L720 300 L780 244 L800 300 L800 420 L0 420 Z",
    "M0 336 L72 274 L144 336 L216 268 L288 336 L360 276 L432 336 L504 264 L576 336 L648 280 L720 336 L792 272 L800 336 L800 420 L0 420 Z",
    "M0 378 L88 322 L176 378 L264 314 L352 378 L440 326 L528 378 L616 318 L704 378 L792 330 L800 378 L800 420 L0 420 Z",
  ],
  dunes: [
    "M0 296 Q150 246 320 292 T640 286 T800 300 L800 420 L0 420 Z",
    "M0 340 Q180 288 360 338 T720 330 L800 344 L800 420 L0 420 Z",
    "M0 384 Q210 336 420 382 T800 374 L800 420 L0 420 Z",
  ],
  islands: [
    "M0 300 L88 300 L150 236 L214 300 L352 300 L420 218 L494 300 L622 300 L688 244 L752 300 L800 300 L800 420 L0 420 Z",
    "M0 340 L120 340 L186 282 L256 340 L430 340 L506 268 L584 340 L708 340 L764 296 L800 340 L800 420 L0 420 Z",
    "M0 380 L800 380 L800 420 L0 420 Z",
  ],
  skyline: [
    "M0 320 L0 250 L48 250 L48 288 L96 288 L96 218 L152 218 L152 286 L214 286 L214 242 L272 242 L272 300 L340 300 L340 206 L400 206 L400 292 L468 292 L468 250 L524 250 L524 296 L590 296 L590 228 L648 228 L648 290 L716 290 L716 258 L772 258 L772 300 L800 300 L800 420 L0 420 Z",
    "M0 356 L0 306 L64 306 L64 340 L132 340 L132 296 L198 296 L198 344 L270 344 L270 312 L342 312 L342 350 L416 350 L416 300 L488 300 L488 348 L562 348 L562 316 L634 316 L634 352 L706 352 L706 320 L776 320 L776 354 L800 354 L800 420 L0 420 Z",
    "M0 390 L800 390 L800 420 L0 420 Z",
  ],
  tundra: [
    "M0 306 Q120 288 244 302 T496 296 T800 308 L800 420 L0 420 Z",
    "M0 344 L104 330 L206 348 L318 332 L428 350 L540 334 L652 350 L760 336 L800 346 L800 420 L0 420 Z",
    "M0 386 Q200 372 400 386 T800 382 L800 420 L0 420 Z",
  ],
  vines: [
    "M0 292 Q140 258 286 288 T572 280 T800 296 L800 420 L0 420 Z",
    "M0 334 Q160 302 330 332 T660 324 L800 338 L800 420 L0 420 Z",
    "M0 378 Q180 350 380 378 T800 370 L800 420 L0 420 Z",
  ],
};

const HAS_WATER: Motif[] = ["coast", "islands", "peaks", "tundra"];

function mix(hex: string, target: string, amount: number) {
  const from = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const to = [1, 3, 5].map((i) => parseInt(target.slice(i, i + 2), 16));
  const blended = from.map((channel, index) =>
    Math.round(channel + (to[index] - channel) * amount),
  );
  return "#" + blended.map((value) => value.toString(16).padStart(2, "0")).join("");
}

interface SceneryProps {
  motif: Motif;
  palette: PaletteName;
  tone?: GalleryTone;
  className?: string;
  seed?: number;
}

export function Scenery({
  motif,
  palette,
  tone = "day",
  className = "",
  seed = 0,
}: SceneryProps) {
  const base = PALETTES[palette];
  const shift = TONES[tone];
  const id = `${motif}-${palette}-${tone}-${seed}`;

  const skyTop = shift.skyTop || base.skyTop;
  const skyBottom = shift.skyBottom || base.skyBottom;
  const layers = MOTIF_LAYERS[motif];
  const showsWater = HAS_WATER.includes(motif);

  const ridgeColors = [base.far, base.mid, base.near].map((color) =>
    shift.darken > 0 ? mix(color, "#141a24", shift.darken) : color,
  );
  const orbX = 160 + ((seed * 97) % 480);

  return (
    <svg
      viewBox="0 0 800 420"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={base.orb} stopOpacity="0.95" />
          <stop offset="55%" stopColor={base.orb} stopOpacity="0.28" />
          <stop offset="100%" stopColor={base.orb} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`water-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mix(base.water, skyBottom, 0.35)} />
          <stop offset="100%" stopColor={base.water} />
        </linearGradient>
        <linearGradient id={`haze-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={shift.haze * 2.4} />
        </linearGradient>
      </defs>

      <rect width="800" height="420" fill={`url(#sky-${id})`} />

      <circle cx={orbX} cy={shift.orbY} r="150" fill={`url(#glow-${id})`} />
      <circle
        cx={orbX}
        cy={shift.orbY}
        r="30"
        fill={base.orb}
        opacity={shift.orbOpacity}
      />

      {tone === "night" ? (
        <g fill="#ffffff" opacity="0.65">
          {Array.from({ length: 22 }).map((_, index) => (
            <circle
              key={index}
              cx={(index * 137 + seed * 41) % 790 + 5}
              cy={((index * 61 + seed * 23) % 190) + 12}
              r={index % 4 === 0 ? 1.9 : 1.1}
            />
          ))}
        </g>
      ) : null}

      {showsWater ? (
        <>
          <path d={layers[0]} fill={ridgeColors[0]} />
          <path d={layers[1]} fill={ridgeColors[1]} />

          <rect y="316" width="800" height="104" fill={`url(#water-${id})`} />
          <g stroke={mix(base.water, "#ffffff", 0.5)} strokeWidth="2" opacity="0.5">
            <line x1="80" y1="336" x2="230" y2="336" strokeLinecap="round" />
            <line x1="300" y1="352" x2="510" y2="352" strokeLinecap="round" />
            <line x1="560" y1="340" x2="700" y2="340" strokeLinecap="round" />
            <line x1="150" y1="368" x2="420" y2="368" strokeLinecap="round" />
          </g>

          <path d={layers[2]} fill={mix(ridgeColors[2], base.fore, 0.45)} />
        </>
      ) : (
        <>
          {layers.map((path, index) => (
            <path key={index} d={path} fill={ridgeColors[index]} />
          ))}
          <path
            d={layers[layers.length - 1]}
            fill={shift.darken > 0 ? mix(base.fore, "#141a24", shift.darken) : base.fore}
            opacity="0.32"
          />
        </>
      )}

      <rect
        y="180"
        width="800"
        height="240"
        fill={`url(#haze-${id})`}
        opacity={shift.haze > 0.2 ? 1 : 0.5}
      />
    </svg>
  );
}

interface MarkProps {
  className?: string;
}

export function WanderstayMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" role="presentation" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="#d0512a" />
      <path d="M6 21.5 L11 11 L16 19 L21 9 L26 21.5" fill="none" stroke="#fdf2ec" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23.5" cy="12" r="2.4" fill="#ffd9c2" />
    </svg>
  );
}
