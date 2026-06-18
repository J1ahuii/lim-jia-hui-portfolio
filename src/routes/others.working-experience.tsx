import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SectionStar } from "@/components/portfolio/decor";
import { AuroraStreaks, FloatingStars, SparkleParticles } from "@/components/portfolio/celestial";


export const Route = createFileRoute("/others/working-experience")({
  head: () => ({
    meta: [
      { title: "Working Experience — Lim Jia Hui" },
      { name: "description", content: "Working experience timeline." },
      { property: "og:title", content: "Working Experience — Lim Jia Hui" },
      { property: "og:description", content: "Working experience timeline." },
    ],
  }),
  component: WorkingExperiencePage,
});

const entries = [
  {
    company: "1986 About Time Cafe",
    role: "Barista",
    period: "",
    description:
      "",
  },
];

function TiltedPhoto() {
  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className="crystal-card overflow-hidden"
        style={{
          aspectRatio: "4 / 3",
        }}
      >
        <img
  src="/others/work.jpg"
  alt="1986 About Time Cafe"
  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
  style={{
    filter: "brightness(0.95) contrast(1.05)",
  }}
/>
      </div>
    </div>
  );
}

function WorkingExperiencePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-40">
      <AuroraStreaks variant="default" />
      <FloatingStars count={16} seed={113} />
      <SparkleParticles count={20} seed={47} />

      <div className="mx-auto max-w-5xl px-6 pt-10 sm:px-10">
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
            Timeline
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="font-editorial italic silver-foil"
          style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)", lineHeight: 0.95 }}
        >
          Working Experience
        </motion.h1>
        <div
          className="mb-20 mt-4 h-px w-28"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />

        <div className="space-y-28">
          {entries.map((exp, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9 }}
                className={`grid items-center gap-12 md:grid-cols-2 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="px-4 pb-8">
                  <TiltedPhoto />
                </div>
                <div>
                  <h2 className="font-editorial italic silver-foil-static text-4xl sm:text-5xl">
                    {exp.company}
                  </h2>
                  <p className="mt-3 text-lg text-silver-bright">{exp.role}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-aurora">
                    {exp.period}
                  </p>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-silver/85">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
