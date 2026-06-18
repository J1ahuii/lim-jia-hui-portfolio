import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, ArrowUpRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SectionStar } from "@/components/portfolio/decor";
import { SparkleParticles, FloatingStars } from "@/components/portfolio/celestial";
import { portfolio } from "@/content/portfolio";

type Win = (typeof portfolio.wins)[number];

export function WinsSection() {
  const [selected, setSelected] = useState<Win | null>(null);

  return (
    <section className="relative mt-32">
      <FloatingStars count={12} seed={131} />
      <SparkleParticles count={16} seed={59} />
      <div className="mb-4 flex items-center gap-3">
        <SectionStar />
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
          Achievements
        </span>
      </div>
      <h2
        className="font-editorial italic silver-foil"
        style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", lineHeight: 1, letterSpacing: "0.01em" }}
      >
        Wins
      </h2>
      <div
        className="mb-12 mt-4 h-px w-28"
        style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.wins.map((win, i) => (
          <motion.button
            key={win.title}
            type="button"
            onClick={() => setSelected(win)}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="crystal-card light-sweep group relative flex flex-col text-left transition-shadow duration-500 hover:[box-shadow:var(--glow-prism)]"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <div
              className="relative flex aspect-[5/4] items-center justify-center overflow-hidden"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 25%, oklch(0.66 0.22 295 / 0.30), transparent 60%), oklch(0.16 0.06 270 / 0.6)",
              }}
            >
              {win.image ? (
                <img src={win.image} alt={win.title} className="h-full w-full object-cover" />
              ) : (
                <>
                  <span
                    className="font-display silver-foil-static text-7xl opacity-30"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Trophy className="absolute right-4 top-4 h-5 w-5 text-silver/60" />
                </>
              )}
              <span
                className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-silver-bright"
                style={{
                  background:
                    "linear-gradient(120deg, oklch(0.66 0.22 295 / 0.4), oklch(0.74 0.16 230 / 0.4))",
                  border: "1px solid oklch(0.86 0.015 270 / 0.45)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {win.award}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-editorial italic text-xl leading-tight text-silver-bright">
                {win.title}
              </h3>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-aurora">
                {win.date}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-silver-dim transition-colors group-hover:text-silver-bright">
                View details <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl border-0 bg-transparent p-0 shadow-none sm:rounded-3xl [&>button]:hidden">
          {selected && (
            <div className="crystal-panel overflow-hidden">
              <div
                className="relative aspect-[16/9] w-full overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 25%, oklch(0.66 0.22 295 / 0.35), transparent 60%), oklch(0.14 0.05 275 / 0.7)",
                }}
              >
                {selected.image ? (
                  <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Trophy className="h-16 w-16 text-silver/40" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full silver-border text-silver-bright backdrop-blur transition hover:[box-shadow:var(--glow-violet)]"
                  style={{ background: "oklch(0.10 0.04 280 / 0.55)" }}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-silver-bright"
                    style={{
                      background:
                        "linear-gradient(120deg, oklch(0.66 0.22 295 / 0.4), oklch(0.74 0.16 230 / 0.4))",
                      border: "1px solid oklch(0.86 0.015 270 / 0.45)",
                    }}
                  >
                    {selected.award}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-aurora">
                    {selected.date}
                  </span>
                </div>
                <DialogTitle
                  className="mt-3 font-editorial italic silver-foil"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
                >
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-relaxed text-silver/85">
                  {selected.description}
                </DialogDescription>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
