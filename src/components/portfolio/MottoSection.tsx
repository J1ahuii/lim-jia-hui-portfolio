import { motion } from "framer-motion";
import { portfolio } from "@/content/portfolio";
import { Star, Sparkle, CrystalRibbon } from "./decor";

export function MottoSection() {
  return (
    <section className="relative px-6 py-28 sm:px-10">
      <Star className="absolute top-16 left-[18%] animate-twinkle" color="silver" size={14} />
      <Star className="absolute bottom-20 right-[22%] animate-twinkle" color="lavender" size={16} />
      <Sparkle className="absolute top-1/2 left-[10%]" color="aurora" />
      <Sparkle className="absolute bottom-16 right-[12%]" color="violet" />

      <motion.div
        initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <CrystalRibbon className="mx-auto mb-10 w-2/3" />

        <div className="relative">
          <span
            className="absolute -left-2 -top-10 font-display text-violet/70 sm:-left-6"
            style={{ fontSize: "clamp(4rem, 8vw, 7rem)", lineHeight: 1 }}
            aria-hidden
          >
            “
          </span>

          <blockquote className="px-10 sm:px-16">
            {portfolio.motto.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.18 }}
                className="font-editorial italic silver-foil leading-[1.15]"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.8rem)",
                  letterSpacing: "0.01em",
                }}
              >
                {line}
              </motion.p>
            ))}
          </blockquote>

          <span
            className="absolute -right-2 -bottom-12 font-display text-violet/70 sm:-right-6"
            style={{ fontSize: "clamp(4rem, 8vw, 7rem)", lineHeight: 1 }}
            aria-hidden
          >
            ”
          </span>
        </div>

        <CrystalRibbon className="mx-auto mt-12 w-2/3" />
      </motion.div>
    </section>
  );
}
