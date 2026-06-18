import { motion } from "framer-motion";
import personal from "@/assets/personal.png";

import { SectionStar, Sparkle, Star, Constellation } from "./decor";

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10">
      <Sparkle className="absolute top-12 right-[15%]" color="lavender" />
      <Star
        className="absolute bottom-20 left-[8%] animate-twinkle"
        color="silver"
        size={14}
      />
      <Constellation className="absolute bottom-10 right-[6%] opacity-40" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <SectionStar />
            <h2 className="font-editorial italic silver-foil text-3xl sm:text-4xl">
              About Me
            </h2>
          </div>

          <div
            className="mb-6 h-px w-28"
            style={{
              background:
                "linear-gradient(90deg, var(--color-silver), transparent)",
            }}
          />

          <div className="space-y-5 leading-relaxed text-silver/85">
            <p>
              Computer Science (Artificial Intelligence) student at UTeM with a
              passion for AI, software development, and innovation.
            </p>

            <p>
              I enjoy turning ideas into practical digital solutions, exploring
              emerging technologies, and participating in hackathons to
              continuously expand my skills and knowledge.
            </p>
          </div>

          {/* Interests */}
          <div className="mt-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-aurora">
              My Interests
            </h3>

            <ul className="mt-3 flex flex-wrap gap-2">
              {[
                "Playing Basketball",
                "Listening to Music",
                "Photography",
                "Travel",
              ].map((interest) => (
                <li
                  key={interest}
                  className="cosmic-badge px-4 py-1.5 text-sm font-medium text-silver-bright"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          {/* Career Goal */}
          <div className="mt-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-aurora">
              Career Goal
            </h3>

            <p className="mt-2 leading-relaxed text-silver/85">
              To grow into an AI Engineer and contribute to the development of
              intelligent systems that create meaningful impact in people's
              lives.
            </p>
          </div>
        </motion.div>

        {/* Right Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="relative animate-float-soft"
        >
          {/* Outer Border */}
          <div className="absolute -inset-3 rounded-[1.6rem] silver-border opacity-50" />

          <div
            className="crystal-card relative aspect-[4/5] overflow-hidden"
            style={{
              borderRadius: "1.4rem",
            }}
          >
            {/* Portrait */}
            <motion.img
              src={personal}
              alt="Lim Jia Hui"
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                duration: 0.6,
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55), transparent 40%)",
              }}
            />

            {/* Name Card */}
            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="font-editorial italic text-3xl silver-foil">
                Lim Jia Hui
              </h3>

              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-silver">
                Computer Science (AI)
              </p>
            </div>

            {/* Sparkles */}
            <Sparkle
              className="absolute left-4 top-4"
              color="silver"
              size={14}
            />

            <Sparkle
              className="absolute right-4 bottom-4"
              color="violet"
              size={14}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}