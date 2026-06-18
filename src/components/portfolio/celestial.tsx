import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Celestial decor primitives — pure SVG/CSS, pointer-events: none   */
/* ------------------------------------------------------------------ */

/** Field of twinkling 4-point stars scattered randomly. */
export function FloatingStars({
  className,
  count = 18,
  seed = 1,
}: {
  className?: string;
  count?: number;
  seed?: number;
}) {
  const stars = useMemo(() => {
    const rng = mulberry32(seed * 9973);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: 6 + rng() * 12,
      delay: rng() * 5,
      duration: 2.4 + rng() * 4,
      tint: rng() > 0.66 ? "lavender" : rng() > 0.33 ? "silver" : "aurora",
    }));
  }, [count, seed]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {stars.map((s) => (
        <motion.svg
          key={s.id}
          width={s.size}
          height={s.size}
          viewBox="0 0 24 24"
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            filter: `drop-shadow(0 0 ${s.size / 2}px ${tintColor(s.tint)})`,
          }}
          animate={{ opacity: [0.15, 1, 0.4], scale: [0.7, 1.1, 0.8] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          <path d="M12 0 L13.2 9.4 L24 12 L13.2 14.6 L12 24 L10.8 14.6 L0 12 L10.8 9.4 Z" fill={tintColor(s.tint)} />
        </motion.svg>
      ))}
    </div>
  );
}

/** Drifting aurora gradient blobs — large blurred background atmosphere. */
export function AuroraStreaks({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "ribbon" | "warm";
}) {
  const palettes = {
    default: ["oklch(0.66 0.22 295 / 0.35)", "oklch(0.74 0.16 230 / 0.30)", "oklch(0.82 0.10 300 / 0.28)"],
    ribbon: ["oklch(0.82 0.10 300 / 0.45)", "oklch(0.74 0.16 230 / 0.35)", "oklch(0.96 0.012 270 / 0.25)"],
    warm: ["oklch(0.74 0.16 60 / 0.25)", "oklch(0.66 0.22 295 / 0.30)", "oklch(0.82 0.10 30 / 0.20)"],
  } as const;
  const [a, b, c] = palettes[variant];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <motion.div
        className="absolute -left-32 top-10 h-[55vmin] w-[55vmin] rounded-full"
        style={{ background: `radial-gradient(circle, ${a}, transparent 65%)`, filter: "blur(60px)" }}
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-[50vmin] w-[50vmin] rounded-full"
        style={{ background: `radial-gradient(circle, ${b}, transparent 65%)`, filter: "blur(70px)" }}
        animate={{ x: [0, -30, 10, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[45vmin] w-[45vmin] rounded-full"
        style={{ background: `radial-gradient(circle, ${c}, transparent 65%)`, filter: "blur(80px)" }}
        animate={{ x: [0, 20, -20, 0], y: [0, -15, 5, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/** Sparse network of constellation lines + dots. */
export function ConstellationField({
  className,
  count = 3,
}: {
  className?: string;
  count?: number;
}) {
  const groups = useMemo(() => {
    const rng = mulberry32(count * 4441);
    return Array.from({ length: count }, (_, gi) => {
      const left = rng() * 70;
      const top = rng() * 70;
      const pts = Array.from({ length: 5 }, () => [rng() * 220, rng() * 120]);
      return { id: gi, left, top, pts };
    });
  }, [count]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {groups.map((g) => (
        <svg
          key={g.id}
          width="220"
          height="120"
          viewBox="0 0 220 120"
          className="absolute opacity-40"
          style={{ left: `${g.left}%`, top: `${g.top}%` }}
        >
          <polyline
            points={g.pts.map((p) => p.join(",")).join(" ")}
            stroke="oklch(0.86 0.015 270 / 0.5)"
            strokeWidth="0.7"
            strokeDasharray="2 3"
            fill="none"
          />
          {g.pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.5} fill="oklch(0.96 0.012 270)" />
          ))}
        </svg>
      ))}
    </div>
  );
}

/** Tiny twinkling sparkle dots. */
export function SparkleParticles({
  className,
  count = 28,
  seed = 7,
}: {
  className?: string;
  count?: number;
  seed?: number;
}) {
  const reduce = useReducedMotion();
  const dots = useMemo(() => {
    const rng = mulberry32(seed * 2113);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: 1 + rng() * 2.5,
      delay: rng() * 5,
      duration: 3 + rng() * 4,
    }));
  }, [count, seed]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: "oklch(0.96 0.012 270)",
            boxShadow: `0 0 ${d.size * 5}px oklch(0.82 0.10 300 / 0.8)`,
          }}
          animate={reduce ? { opacity: 0.5 } : { opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={
            reduce ? undefined : { duration: d.duration, repeat: Infinity, delay: d.delay, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}

/** Concentric ellipses with slow rotation — orbit accent. */
export function OrbitingRings({
  className,
  size = 220,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("pointer-events-none absolute", className)} style={{ width: size, height: size }} aria-hidden>
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <ellipse cx="100" cy="100" rx="90" ry="32" stroke="oklch(0.86 0.015 270 / 0.45)" strokeWidth="0.8" fill="none" />
        <ellipse cx="100" cy="100" rx="90" ry="32" stroke="oklch(0.66 0.22 295 / 0.4)" strokeWidth="0.4" fill="none" transform="rotate(35 100 100)" />
        <ellipse cx="100" cy="100" rx="90" ry="32" stroke="oklch(0.74 0.16 230 / 0.35)" strokeWidth="0.4" fill="none" transform="rotate(70 100 100)" />
      </motion.svg>
    </div>
  );
}

/** Filigree crystal ornament for card corners. */
export function CrystalCornerOrnament({
  className,
  corner = "tl",
  size = 38,
}: {
  className?: string;
  corner?: "tl" | "tr" | "bl" | "br";
  size?: number;
}) {
  const rotate = { tl: 0, tr: 90, br: 180, bl: 270 }[corner];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={cn("pointer-events-none absolute", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d="M2 18 L2 2 L18 2" stroke="oklch(0.86 0.015 270 / 0.6)" strokeWidth="0.8" fill="none" />
      <path d="M6 14 L6 6 L14 6" stroke="oklch(0.66 0.22 295 / 0.55)" strokeWidth="0.6" fill="none" />
      <circle cx="2" cy="2" r="1.8" fill="oklch(0.96 0.012 270)" />
      <path d="M2 2 L8 8" stroke="oklch(0.96 0.012 270 / 0.6)" strokeWidth="0.4" />
    </svg>
  );
}

/** Camera lens flare — concentric rings of warm light. */
export function LensFlare({ className, size = 200 }: { className?: string; size?: number }) {
  return (
    <div className={cn("pointer-events-none absolute", className)} style={{ width: size, height: size }} aria-hidden>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.96 0.012 270 / 0.7), oklch(0.74 0.16 230 / 0.35) 35%, oklch(0.66 0.22 295 / 0.2) 60%, transparent 80%)",
          filter: "blur(6px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[18%] rounded-full"
        style={{
          border: "1px solid oklch(0.96 0.012 270 / 0.5)",
          background: "radial-gradient(circle, oklch(0.96 0.012 270 / 0.4), transparent 70%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/** Crystal trophy silhouette — for wins page. */
export function CrystalTrophy({ className, size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 80"
      className={cn("pointer-events-none drop-shadow-[0_0_12px_oklch(0.66_0.22_295/0.5)]", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="trophyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.96 0.012 270 / 0.85)" />
          <stop offset="60%" stopColor="oklch(0.66 0.22 295 / 0.55)" />
          <stop offset="100%" stopColor="oklch(0.22 0.10 280 / 0.6)" />
        </linearGradient>
      </defs>
      <path
        d="M16 6 L48 6 L48 20 C 48 34, 40 44, 32 44 C 24 44, 16 34, 16 20 Z"
        fill="url(#trophyGrad)"
        stroke="oklch(0.96 0.012 270 / 0.7)"
        strokeWidth="0.8"
      />
      <path d="M8 12 C 8 22, 14 28, 18 28" fill="none" stroke="oklch(0.86 0.015 270 / 0.6)" strokeWidth="1" />
      <path d="M56 12 C 56 22, 50 28, 46 28" fill="none" stroke="oklch(0.86 0.015 270 / 0.6)" strokeWidth="1" />
      <rect x="28" y="44" width="8" height="18" fill="url(#trophyGrad)" stroke="oklch(0.96 0.012 270 / 0.7)" strokeWidth="0.6" />
      <rect x="18" y="62" width="28" height="6" rx="2" fill="url(#trophyGrad)" stroke="oklch(0.96 0.012 270 / 0.7)" strokeWidth="0.6" />
      <circle cx="32" cy="22" r="3" fill="oklch(0.96 0.012 270 / 0.9)" />
    </svg>
  );
}

/** Crystal certification seal. */
export function CrystalSeal({ className, size = 72 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={cn("pointer-events-none drop-shadow-[0_0_14px_oklch(0.74_0.16_230/0.5)]", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id="sealGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.96 0.012 270 / 0.9)" />
          <stop offset="60%" stopColor="oklch(0.66 0.22 295 / 0.55)" />
          <stop offset="100%" stopColor="oklch(0.22 0.10 280 / 0.7)" />
        </radialGradient>
      </defs>
      <g>
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const x = 40 + Math.cos(a) * 32;
          const y = 40 + Math.sin(a) * 32;
          return <circle key={i} cx={x} cy={y} r="2" fill="oklch(0.96 0.012 270 / 0.8)" />;
        })}
      </g>
      <circle cx="40" cy="40" r="22" fill="url(#sealGrad)" stroke="oklch(0.96 0.012 270 / 0.8)" strokeWidth="1.2" />
      <path
        d="M40 28 L43 37 L52 38 L45 44 L47 53 L40 48 L33 53 L35 44 L28 38 L37 37 Z"
        fill="oklch(0.96 0.012 270 / 0.95)"
      />
    </svg>
  );
}

/** Silver ribbon banner. */
export function SilverRibbon({ className, width = 90 }: { className?: string; width?: number }) {
  return (
    <svg
      width={width}
      height={width * 0.4}
      viewBox="0 0 90 36"
      className={cn("pointer-events-none", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.86 0.015 270 / 0.4)" />
          <stop offset="50%" stopColor="oklch(0.96 0.012 270 / 0.9)" />
          <stop offset="100%" stopColor="oklch(0.66 0.22 295 / 0.5)" />
        </linearGradient>
      </defs>
      <path d="M0 8 L20 0 L70 0 L90 8 L70 16 L20 16 Z" fill="url(#ribbonGrad)" stroke="oklch(0.96 0.012 270 / 0.7)" strokeWidth="0.5" />
      <path d="M0 8 L10 22 L20 16 Z" fill="oklch(0.66 0.22 295 / 0.5)" stroke="oklch(0.96 0.012 270 / 0.6)" strokeWidth="0.4" />
      <path d="M90 8 L80 22 L70 16 Z" fill="oklch(0.66 0.22 295 / 0.5)" stroke="oklch(0.96 0.012 270 / 0.6)" strokeWidth="0.4" />
    </svg>
  );
}

/** Mini crystal butterfly accent — small, used across pages. */
export function CrystalButterflyMini({
  className,
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={cn("pointer-events-none drop-shadow-[0_0_8px_oklch(0.66_0.22_295/0.55)]", className)}
      aria-hidden
      animate={reduce ? {} : { y: [0, -6, 0], rotate: [0, 2, -2, 0] }}
      transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id={`mb-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.96 0.012 270 / 0.8)" />
          <stop offset="60%" stopColor="oklch(0.66 0.22 295 / 0.65)" />
          <stop offset="100%" stopColor="oklch(0.74 0.16 230 / 0.55)" />
        </linearGradient>
      </defs>
      <path d="M32 32 C 22 12, 4 8, 4 22 C 4 34, 22 38, 32 32 Z" fill={`url(#mb-${size})`} stroke="oklch(0.96 0.012 270 / 0.7)" strokeWidth="0.6" />
      <path d="M32 32 C 42 12, 60 8, 60 22 C 60 34, 42 38, 32 32 Z" fill={`url(#mb-${size})`} stroke="oklch(0.96 0.012 270 / 0.7)" strokeWidth="0.6" />
      <path d="M32 32 C 26 38, 14 48, 18 58 C 22 62, 30 50, 32 38 Z" fill={`url(#mb-${size})`} opacity="0.85" />
      <path d="M32 32 C 38 38, 50 48, 46 58 C 42 62, 34 50, 32 38 Z" fill={`url(#mb-${size})`} opacity="0.85" />
      <ellipse cx="32" cy="34" rx="1.2" ry="14" fill="oklch(0.96 0.012 270 / 0.9)" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  helpers                                                            */
/* ------------------------------------------------------------------ */
function tintColor(t: string) {
  switch (t) {
    case "lavender": return "oklch(0.82 0.10 300 / 0.9)";
    case "aurora":   return "oklch(0.74 0.16 230 / 0.9)";
    default:         return "oklch(0.96 0.012 270 / 0.95)";
  }
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
