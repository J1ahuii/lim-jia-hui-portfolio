import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { SectionStar } from "@/components/portfolio/decor";
import { AuroraStreaks, FloatingStars, SparkleParticles } from "@/components/portfolio/celestial";

export const Route = createFileRoute("/others/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Lim Jia Hui" },
      { name: "description", content: "Photography — travel and sky frames." },
      { property: "og:title", content: "Photography — Lim Jia Hui" },
      { property: "og:description", content: "Photography — travel and sky frames." },
    ],
  }),
  component: PhotographyPage,
});

type Slide = { 
  id: number;
  image: string;
};
const travelSlides: Slide[] = [{ id:1,image: "/others/travel1.JPG" }, { id: 2, image: "/others/travel2.JPG" }, { id: 3, image: "/others/travel3.JPG" }, { id: 4, image: "/others/travel4.JPG" }];
const skySlides: Slide[] = [{ id: 1, image: "/others/sky1.JPG" }, { id: 2, image: "/others/sky2.JPG" }, { id: 3, image: "/others/sky3.JPG" }, { id: 4, image: "/others/sky4.JPG" }];

function PlaceholderFrame({
  image,
  className = "",
}: {
  image: string;
  className?: string;
}) {
  return (
    <div
      className={`crystal-card overflow-hidden ${className}`}
      style={{
        aspectRatio: "4 / 3",
      }}
    >
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function PhotoCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prevIdx = (index - 1 + slides.length) % slides.length;
  const nextIdx = (index + 1) % slides.length;

  return (
    <div className="mt-8">
      <div className="relative mx-auto flex h-[clamp(240px,42vw,440px)] w-full items-center justify-center">
        {/* Previous peek */}
        <div
          key={`prev-${prevIdx}`}
          className="pointer-events-none absolute left-0 hidden h-[70%] w-[28%] -translate-x-[10%] scale-90 opacity-40 blur-[1px] sm:block"
          aria-hidden
        >
          <PlaceholderFrame
            image={slides[prevIdx].image}
            className="h-full"
          />
        </div>

        {/* Center */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`center-${index}`}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.45 }}
            className="relative z-10 h-full w-[80%] max-w-[640px] sm:w-[55%]"
          >
            <PlaceholderFrame
  image={slides[index].image}
  className="h-full"
/>
          </motion.div>
        </AnimatePresence>

        {/* Next peek */}
        <div
          key={`next-${nextIdx}`}
          className="pointer-events-none absolute right-0 hidden h-[70%] w-[28%] translate-x-[10%] scale-90 opacity-40 blur-[1px] sm:block"
          aria-hidden
        >
          <PlaceholderFrame
  image={slides[nextIdx].image}
  className="h-full"
/>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full silver-border text-silver-bright transition-all hover:[box-shadow:var(--glow-violet)]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-[11px] uppercase tracking-[0.3em] text-silver-dim">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button
          onClick={next}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full silver-border text-silver-bright transition-all hover:[box-shadow:var(--glow-violet)]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function PhotographyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-40">
      <AuroraStreaks variant="warm" />
      <FloatingStars count={18} seed={91} />
      <SparkleParticles count={22} seed={37} />

      <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <Link
          to="/others"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-silver-dim transition-colors hover:text-silver-bright"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Others
        </Link>

        <div className="mt-8 mb-4 flex items-center gap-3">
          <SectionStar />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
            Visual Diary
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="font-editorial italic silver-foil"
          style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)", lineHeight: 0.95 }}
        >
          Photography
        </motion.h1>
        <div
          className="mb-16 mt-4 h-px w-28"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />

        <section className="mb-24">
          <h2 className="font-editorial italic silver-foil-static text-4xl sm:text-5xl">Travel</h2>
          <PhotoCarousel slides={travelSlides} />
        </section>

        <section>
          <h2 className="font-editorial italic silver-foil-static text-4xl sm:text-5xl">Sky</h2>
          <PhotoCarousel slides={skySlides} />
        </section>
      </div>
    </main>
  );
}
