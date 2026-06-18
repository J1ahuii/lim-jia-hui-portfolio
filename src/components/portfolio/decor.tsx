import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Cosmic decorative primitives                                      */
/* ------------------------------------------------------------------ */

type ColorKey = "silver" | "violet" | "aurora" | "lavender";

function resolve(color: ColorKey) {
  switch (color) {
    case "violet":   return "var(--color-violet)";
    case "aurora":   return "var(--color-aurora)";
    case "lavender": return "var(--color-lavender)";
    default:         return "var(--color-silver-bright)";
  }
}

export function Star({
  className,
  color = "silver",
  size = 22,
}: {
  className?: string;
  color?: ColorKey;
  size?: number;
}) {
  const fill = resolve(color);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("pointer-events-none drop-shadow-[0_0_6px_rgba(186,160,255,0.55)]", className)}
      aria-hidden
    >
      <path
        d="M12 0 L13.2 9.4 L24 12 L13.2 14.6 L12 24 L10.8 14.6 L0 12 L10.8 9.4 Z"
        fill={fill}
      />
    </svg>
  );
}

export function Sparkle({
  className,
  color = "lavender",
  size = 16,
}: {
  className?: string;
  color?: ColorKey;
  size?: number;
}) {
  const fill = resolve(color);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={cn("pointer-events-none animate-sparkle", className)}
      aria-hidden
    >
      <path d="M10 0 L11 9 L20 10 L11 11 L10 20 L9 11 L0 10 L9 9 Z" fill={fill} />
    </svg>
  );
}

export function SectionStar({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 36 36"
      fill="none"
      className={cn("drop-shadow-[0_0_8px_rgba(160,130,255,0.6)]", className)}
      aria-hidden
    >
      <path
        d="M18 0 L20 14 L34 16 L20 22 L18 36 L16 22 L2 16 L16 14 Z"
        fill="url(#sectionStarGrad)"
      />
      <defs>
        <linearGradient id="sectionStarGrad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0%"  stopColor="oklch(0.96 0.012 270)" />
          <stop offset="100%" stopColor="oklch(0.66 0.22 295)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Planet with thin ring — for editorial accents */
export function PlanetRing({
  className,
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={cn("pointer-events-none", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id="planetCore" cx="40%" cy="35%" r="65%">
          <stop offset="0%"  stopColor="oklch(0.78 0.12 295)" />
          <stop offset="55%" stopColor="oklch(0.42 0.16 280)" />
          <stop offset="100%" stopColor="oklch(0.18 0.08 275)" />
        </radialGradient>
      </defs>
      <ellipse
        cx="60" cy="62" rx="56" ry="14"
        stroke="oklch(0.86 0.015 270 / 0.55)"
        strokeWidth="1.2"
        fill="none"
        transform="rotate(-18 60 62)"
      />
      <circle cx="60" cy="60" r="26" fill="url(#planetCore)" />
      <ellipse
        cx="60" cy="62" rx="56" ry="14"
        stroke="oklch(0.86 0.015 270 / 0.35)"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        fill="none"
        transform="rotate(-18 60 62)"
      />
    </svg>
  );
}

/* Long thin crystal ribbon decoration */
export function CrystalRibbon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "crystal-ribbon h-[2px] w-full rounded-full",
        className
      )}
      aria-hidden
    />
  );
}

/* Constellation line cluster (decorative) */
export function Constellation({
  className,
  width = 220,
  height = 120,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const points = [
    [12, 88], [54, 62], [98, 80], [134, 40], [178, 60], [208, 24],
  ];
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 120"
      fill="none"
      className={cn("pointer-events-none opacity-60", className)}
      aria-hidden
    >
      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        stroke="oklch(0.86 0.015 270 / 0.55)"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        fill="none"
      />
      {points.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 2 ? 1.6 : 2.4}
          fill="oklch(0.96 0.012 270)"
        />
      ))}
    </svg>
  );
}

/* Light trail streak — diagonal across decoration spots */
export function LightTrail({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none overflow-hidden h-px w-40",
        className
      )}
      aria-hidden
    >
      <div
        className="animate-light-trail h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.96 0.012 270 / 0.85), transparent)",
          filter: "blur(0.5px)",
        }}
      />
    </div>
  );
}

/* Floating butterfly — small lavender silhouette */
export function Butterfly({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn("pointer-events-none drop-shadow-[0_0_8px_rgba(186,160,255,0.5)]", className)}
      aria-hidden
    >
      <path
        d="M16 16 C 12 8, 4 6, 4 14 C 4 20, 12 22, 16 16 Z"
        fill="oklch(0.86 0.015 270 / 0.75)"
      />
      <path
        d="M16 16 C 20 8, 28 6, 28 14 C 28 20, 20 22, 16 16 Z"
        fill="oklch(0.74 0.16 230 / 0.7)"
      />
      <path d="M16 9 L16 24" stroke="oklch(0.96 0.012 270)" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
