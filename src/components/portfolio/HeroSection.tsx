import { motion } from "framer-motion";
import { Instagram, Linkedin, Github, ArrowDown } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { Constellation } from "./decor";
import { CrystalButterfly } from "./CrystalButterfly";
import { FloatingStars, SparkleParticles } from "./celestial";


export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-10 pb-36 sm:px-10"
    >
      {/* Cosmic atmosphere — starfield, sparkles, a single constellation */}
      <FloatingStars count={14} seed={11} className="opacity-90" />
      <SparkleParticles count={18} seed={3} />
      <Constellation className="absolute bottom-[12%] left-[4%]" />

      {/* Aurora orb behind the centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6 }}
        className="absolute left-1/2 top-[44%] z-0 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.66 0.22 295 / 0.28), oklch(0.74 0.16 230 / 0.16) 50%, transparent 75%)",
        }}
      />



      {/* Center stage */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative"
        >
          <CrystalButterfly />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-editorial italic mt-2 text-xs sm:text-sm uppercase text-silver-dim"
          style={{ letterSpacing: "0.5em" }}
        >
          Welcome To My
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.65 }}
          className="font-display silver-foil mt-3 leading-[0.95]"
          style={{
            fontSize: "clamp(2.75rem, 9vw, 6.5rem)",
            letterSpacing: "0.18em",
          }}
        >
          PORTFOLIO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.85 }}
          className="font-editorial silver-foil mt-6 uppercase"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
            letterSpacing: "0.42em",
            textShadow:
              "0 0 20px oklch(0.86 0.015 270 / 0.45), 0 0 40px oklch(0.66 0.22 295 / 0.28)",
          }}
        >
          Code of Imagination
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-7 inline-flex items-center gap-3"
        >
          <span className="h-px w-10 bg-silver/40" />
          <span className="font-editorial italic text-[13px] tracking-[0.35em] uppercase text-silver">
            {portfolio.role}
          </span>
          <span className="h-px w-10 bg-silver/40" />
        </motion.div>
      </div>

      {/* Vertical socials */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-6 sm:right-10 md:flex"
      >
        <SocialIcon href={portfolio.socials.instagram} label="Instagram">
          <Instagram className="h-[14px] w-[14px]" />
        </SocialIcon>
        <span className="h-8 w-px bg-silver/30" aria-hidden />
        <SocialIcon href={portfolio.socials.linkedin} label="LinkedIn">
          <Linkedin className="h-[14px] w-[14px]" />
        </SocialIcon>
        <span className="h-8 w-px bg-silver/30" aria-hidden />
        <SocialIcon href={portfolio.socials.github} label="GitHub">
          <Github className="h-[14px] w-[14px]" />
        </SocialIcon>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-silver-dim transition-colors hover:text-silver-bright"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">
          Drift onward
        </span>
        <ArrowDown className="h-4 w-4 animate-float-soft" />
      </motion.button>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full silver-border text-silver transition-all hover:scale-110 hover:text-silver-bright hover:[box-shadow:var(--glow-violet)]"
    >
      {children}
    </a>
  );
}
