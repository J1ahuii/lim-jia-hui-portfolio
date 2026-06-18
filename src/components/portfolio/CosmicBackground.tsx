import { useEffect, useMemo, useState } from "react";

/**
 * Global celestial atmosphere — mounted once in __root.
 * Layers (back → front):
 *   1. Deep space gradient base
 *   2. Drifting nebula clouds (radial blobs)
 *   3. Two parallaxed star fields (deep + near)
 *   4. Constellation SVG overlay
 *   5. Aurora gradient sweep across the top
 *   6. Floating ambient particles
 */
export function CosmicBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const deepStars = useMemo(() => makeStars(120, 1), []);
  const nearStars = useMemo(() => makeStars(70, 2), []);
  const particles = useMemo(() => makeParticles(22), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, oklch(0.20 0.10 270) 0%, oklch(0.12 0.06 275) 35%, oklch(0.08 0.04 280) 80%)",
        }}
      />

      {/* Nebula clouds */}
      <div
        className="absolute -top-32 -left-32 h-[60vh] w-[60vh] rounded-full blur-3xl animate-aurora"
        style={{
          background:
            "radial-gradient(circle, oklch(0.66 0.22 295 / 0.35), transparent 65%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[70vh] w-[70vh] rounded-full blur-3xl animate-drift"
        style={{
          background:
            "radial-gradient(circle, oklch(0.74 0.16 230 / 0.30), transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-1/4 h-[50vh] w-[50vh] rounded-full blur-3xl animate-aurora"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.10 300 / 0.22), transparent 65%)",
          animationDelay: "4s",
        }}
      />

      {/* Aurora gradient sweep — top of viewport */}
      <div
        className="absolute inset-x-0 top-0 h-[40vh] opacity-60"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.74 0.16 230 / 0.22), transparent 60%)",
        }}
      />

      {/* Star fields — parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
      >
        <StarField stars={deepStars} />
      </div>
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${scrollY * -0.16}px, 0)` }}
      >
        <StarField stars={nearStars} />
      </div>

      {/* Constellation overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{ transform: `translate3d(0, ${scrollY * -0.04}px, 0)` }}
      >
        {CONSTELLATIONS.map((c, i) => (
          <g key={i} stroke="oklch(0.86 0.015 270 / 0.45)" strokeWidth="0.6" strokeDasharray="2 3" fill="none">
            <polyline points={c.map((p) => p.join(",")).join(" ")} />
            {c.map(([x, y], j) => (
              <circle key={j} cx={x} cy={y} r="1.8" fill="oklch(0.96 0.012 270)" stroke="none" />
            ))}
          </g>
        ))}
      </svg>

      {/* Floating ambient particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-soft"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, oklch(0.96 0.012 270 / 0.9), transparent 70%)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.55,
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, oklch(0.06 0.03 280 / 0.55) 100%)",
        }}
      />
    </div>
  );
}

/* ------------------------------ helpers ------------------------------ */

type StarSpec = { x: number; y: number; size: number; delay: number };

function makeStars(count: number, baseSize: number): StarSpec[] {
  const arr: StarSpec[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: baseSize + Math.random() * 1.6,
      delay: Math.random() * 4,
    });
  }
  return arr;
}

function StarField({ stars }: { stars: StarSpec[] }) {
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "oklch(0.96 0.012 270)",
            boxShadow:
              "0 0 4px oklch(0.96 0.012 270 / 0.9), 0 0 8px oklch(0.74 0.16 230 / 0.45)",
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}

function makeParticles(count: number) {
  const arr: { x: number; y: number; size: number; delay: number; duration: number }[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 6,
    });
  }
  return arr;
}

const CONSTELLATIONS: number[][][] = [
  [
    [120, 140], [180, 200], [260, 180], [310, 240], [380, 210],
  ],
  [
    [700, 120], [760, 160], [820, 130], [880, 200], [820, 260],
  ],
  [
    [150, 720], [220, 760], [300, 740], [360, 800],
  ],
  [
    [620, 760], [690, 720], [760, 780], [820, 740], [880, 800],
  ],
];
