import { motion } from "framer-motion";
import { portfolio } from "@/content/portfolio";
import { SectionStar, Star } from "./decor";

export function EducationSection() {
  return (
    <section className="relative px-6 py-28 sm:px-10">
      <Star className="absolute top-20 right-[12%] animate-twinkle" color="silver" size={18} />
      <Star className="absolute bottom-20 right-[8%] animate-twinkle" color="lavender" size={14} />

      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <SectionStar />
          <h2 className="font-editorial italic silver-foil text-3xl sm:text-4xl">
            Education
          </h2>
        </div>
        <div
          className="mb-14 h-px w-28"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />

        <div className="relative">
          {/* constellation timeline line */}
          <div
            className="absolute top-0 bottom-0 left-[120px] w-px sm:left-[180px]"
            style={{
              background:
                "linear-gradient(180deg, transparent, oklch(0.86 0.015 270 / 0.45), transparent)",
            }}
            aria-hidden
          />

          <ul className="space-y-10">
            {portfolio.education.map((edu, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative grid grid-cols-[100px_1fr] items-start gap-6 sm:grid-cols-[160px_1fr] sm:gap-10"
              >
                <div className="pt-5 text-right font-editorial italic text-sm text-silver sm:text-base">
                  {edu.period}
                </div>

                <div className="relative pl-10">
                  {/* star node */}
                  <span className="absolute left-[-14px] top-5">
                    <Star size={20} color="silver" className="animate-twinkle" />
                  </span>

                  <div className="crystal-card p-6 transition-transform duration-500 hover:-translate-y-1">
                    <h3 className="font-editorial italic text-xl text-silver-bright">
                      {edu.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-aurora">
                      {edu.place}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-silver/80">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
